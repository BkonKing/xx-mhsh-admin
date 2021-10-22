<template>
  <a-modal
    v-model="tagVisible"
    title="编辑标签"
    :width="800"
    :zIndex="1004"
    @ok="submit"
    :destroyOnClose="true"
  >
    <div class="header">
      <div class="user-info">
        <template v-if="multiple"
          >给{{ userList.length }}人添加共同标签：</template
        ><template v-else
          >{{ userInfo.nickname }}({{ userInfo.realname }})：</template
        >
      </div>
      <div>
        <s-tag
          v-for="(label, index) in tagChecked"
          :key="label.id"
          :closable="!disabledTagIds.includes(label.id) || isParent"
          :color="label.colour"
          @close="cancleChecked(index)"
        >
          {{ label.tag_name }}</s-tag
        >
      </div>
    </div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="维度">
              <a-select v-model="tagParams.dimension" placeholder="请选择">
                <a-select-option
                  v-for="option in newTags"
                  :value="option.id"
                  :key="option.id"
                >
                  {{ option.dimension_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="标签">
              <a-input v-model="tagParams.text" placeholder="请输入"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span
              class="table-page-search-submitButtons"
              style="text-align: right;"
            >
              <a-button type="primary" @click="search">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="tags-container">
      <a-checkbox-group v-model="tagChecked">
        <div
          v-for="item in newTags"
          :key="item.id"
          v-show="filter.dimension === item.id || !filter.dimension"
          class="dimension-box"
        >
          <div class="dimension-name">{{ item.dimension_name }}</div>
          <div class="tag-box">
            <a-checkbox
              v-for="label in item.child"
              :value="label"
              :key="label.id"
              :disabled="disabledTagIds.includes(label.id) && !isParent"
              v-show="label.tag_name.indexOf(filter.text) > -1 || !filter.text"
              >{{ label.tag_name }}</a-checkbox
            >
          </div>
        </div>
      </a-checkbox-group>
    </div>
  </a-modal>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import Cookies from 'js-cookie'
import STag from '../../userManage/components/tag'
import { getUserTag, editUserTag, editBatchUserTag } from '@/api/userManage'

export default {
  name: 'check-user-tag',
  components: {
    STag
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    },
    tags: {
      type: Array,
      default: () => []
    },
    checkTags: {
      type: Array,
      default: () => []
    },
    // 获取tag不保存
    isGetTag: {
      type: Boolean,
      default: false
    },
    // 批量添加
    multiple: {
      type: Boolean,
      default: false
    },
    // 用户数组（批量下有效）
    userList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      projectId: Cookies.get('project_id'),
      isParent: !+Cookies.get('project_id'),
      tagVisible: this.value,
      tagForm: {
        child: []
      },
      tagParams: {},
      filter: {},
      tagChecked: [],
      disabledTagIds: [],
      disabledTag: {},
      isEmitChange: true
    }
  },
  computed: {
    newTags () {
      return this.tags.map(obj => {
        const { child, ...info } = obj
        return {
          ...info,
          child: child.map(label => {
            return {
              ...label,
              colour: obj.colour
            }
          })
        }
      })
    },
    tagObject () {
      const tagObj = {}
      const tags = this.newTags
      tags.forEach(obj => {
        const childObj = {}
        obj.child.forEach(label => {
          childObj[label.id] = label
        })
        tagObj[obj.id] = childObj
      })
      return tagObj
    }
  },
  watch: {
    value (val) {
      if (val && this.userInfo.uid && !this.isGetTag) {
        this.getUserTag()
      }
      if (val && this.multiple) {
        this.tagChecked = []
      }
      this.tagVisible = val
    },
    tagVisible (val) {
      this.$emit('input', val)
    },
    checkTags: {
      deep: true,
      handler (val) {
        if (val != this.tagChecked) {
          if (this.isEmitChange) {
            this.formatCheck(val)
          } else {
            this.isEmitChange = true
          }
        }
      }
    }
  },
  methods: {
    submit () {
      this.multiple ? this.editBatchUserTag() : this.editUserTag()
    },
    editUserTag () {
      if (this.isGetTag) {
        if (!this.multiple) {
          console.log(this.disabledTagIds, this.disabledTag)
          const data = this.tagChecked.map(obj => {
            console.log(obj)
            if (this.disabledTagIds.includes(obj.id)) {
              console.log('object', this.disabledTag[obj.id])
              return this.disabledTag[obj.id]
            }
            return obj
          })
          console.log(data)
          this.isEmitChange = false
          this.$emit('getTag', data)
        } else {
          this.$emit('getTag', this.tagChecked)
        }
        this.tagVisible = false
        return
      }
      const tagChecked = cloneDeep(this.tagChecked)
        .map(obj => obj.id)
        .join(',')
      editUserTag({
        uid: this.userInfo.uid,
        tag_id_text: tagChecked,
        remarks: ''
      }).then(({ success, message }) => {
        if (success) {
          this.tagVisible = false
          this.$message.success('提交成功')
          this.$emit('success')
        } else {
          this.$message.error(message)
        }
      })
    },
    // 批量添加用户便签
    editBatchUserTag () {
      const tagChecked = cloneDeep(this.tagChecked)
        .map(obj => obj.id)
        .join(',')
      editBatchUserTag({
        uid_text: this.userList.join(','),
        tag_id_text: tagChecked
      }).then(({ success, message }) => {
        if (success) {
          this.tagVisible = false
          this.$message.success('提交成功')
          this.$emit('success')
        } else {
          this.$message.error(message)
        }
      })
    },
    cancleChecked (index) {
      this.tagChecked.splice(index, 1)
    },
    // 获取用户标签
    getUserTag () {
      getUserTag({
        uid: this.userInfo.uid
      }).then(({ data }) => {
        this.formatCheck(data || [])
      })
    },
    formatCheck (val) {
      const arr = []
      const disabled = []
      const disabledTag = {}
      val.forEach(obj => {
        if (obj.sy_project_id != this.projectId) {
          disabled.push(obj.tag_id)
          disabledTag[obj.tag_id] = obj
        }
        arr.push(this.tagObject[obj.dimension_id][obj.tag_id])
      })
      this.tagChecked = arr
      this.disabledTag = disabledTag
      this.disabledTagIds = disabled
    },
    reset () {
      this.tagParams = {}
      this.filter = {}
    },
    search () {
      this.filter = cloneDeep(this.tagParams)
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  margin-top: 24px;
  /deep/ .ant-form-inline .ant-form-item > .ant-form-item-label {
    min-width: 80px;
    flex-shrink: 0;
  }
}
.header {
  padding: 0 24px 6px 0;
  border-bottom: 1px solid #eee;
  /deep/ .tag {
    margin-bottom: 10px;
  }
}
.user-info {
  margin-bottom: 16px;
  color: #222;
}
.tags-container {
  max-height: 400px;
  overflow-y: auto;
}
.dimension-box {
  margin-bottom: 20px;
  .dimension-name {
    font-size: 15px;
    color: #222;
    margin-bottom: 10px;
  }
  .tag-box {
    margin-left: -8px;
    /deep/ .ant-checkbox-wrapper {
      width: 143px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/deep/ .ant-checkbox-wrapper {
  margin-left: 8px;
}
</style>
