<template>
  <page-header-view>
    <!-- actions -->
    <template v-if="isParent" v-slot:extra>
      <a-button @click="handleImport">导入</a-button>
      <a-button type="primary" @click="openAddDimension">新增维度</a-button>
    </template>

    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="维度">
                <a-select v-model="queryParam.dimension" placeholder="请选择">
                  <a-select-option
                    v-for="option in labelList"
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
                <a-input
                  v-model="queryParam.labelText"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span
                class="table-page-search-submitButtons"
                style="text-align: right;"
              >
                <a-button type="primary" @click="search">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset"
                  >重置</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <a-card
      v-for="(item, index) in labelList"
      :title="item.dimension_name"
      :key="item.id"
      class="dimension-card"
      v-show="
        (filterParams.dimension === item.id || !filterParams.dimension) &&
          isHaveTag(item.child)
      "
      ><template slot="extra">
        <a @click="openAddDimension(item)">编辑</a
        ><a v-if="isParent" @click="deleteDimension(item, index)"
          >删除</a
        ></template
      >
      <div class="dimension-tags">
        <s-tag
          v-for="(label, index) in item.child"
          :key="label.id"
          v-show="
            label.tag_name.indexOf(filterParams.labelText) > -1 ||
              !filterParams.labelText
          "
          :closable="isParent || label.project_id == projectId"
          :color="item.colour"
          @close="deleteLabel(label, index, item.child)"
        >
          {{ label.tag_name }}{{ label.count ? `(${label.count})` : "" }}</s-tag
        >
        <s-tag @click.native="openAddDimension(item)" style="cursor: pointer;">
          <a-icon type="plus" /> 新增
        </s-tag>
      </div></a-card
    >

    <div style="padding-bottom: 24px;"></div>

    <a-modal
      :title="`${dimensionForm.dimension_id ? '编辑' : '新增'}标签`"
      :visible="dimensionVisible"
      :confirm-loading="dimensionLoading"
      :width="640"
      :maskClosable="false"
      :keyboard="false"
      @ok="submitDimension"
      @cancel="dimensionVisible = false"
    >
      <a-form-model
        ref="dimensionForm"
        :model="dimensionForm"
        :rules="dimensionRules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item
          label="维度"
          prop="dimension_name"
          required
          style="margin-bottom: 19px;"
        >
          <a-input
            v-model="dimensionForm.dimension_name"
            placeholder="请输入"
            :maxLength="10"
            :disabled="!isParent"
          />
        </a-form-model-item>
        <a-form-model-item label="标签" prop="tagText">
          <div
            v-if="dimensionForm.tag_data && dimensionForm.tag_data.length"
            class="tag-box"
          >
            <div
              v-for="(label, index) in dimensionForm.tag_data"
              :key="label.id"
            >
              <template v-if="label.editable">
                <a-input
                  v-model="label.tag_name"
                  :maxLength="10"
                  class="tag-input"
                  :class="[`tag-input-${index}`]"
                  @blur="handleBlurTag(label, $event)"
                ></a-input>
                <div
                  v-if="label.error"
                  style="color: #f5222d;line-height: 18px;"
                >
                  {{ label.error }}
                </div>
              </template>
              <s-tag
                v-else
                :closable="
                  isParent || label.project_id == projectId || !label.id
                "
                :color="dimensionForm.colour"
                @click.native="editTag(label, index)"
                @close="deleteLabel(label, index, dimensionForm.tag_data, true)"
              >
                {{ label.colour }}
                {{ label.tag_name }}{{ label.count ? `(${label.count})` : "" }}
              </s-tag>
            </div>
          </div>
          <a-textarea
            v-model="dimensionForm.tagText"
            placeholder="请输入"
          ></a-textarea>
          <div class="alert-text">
            多个标签中间以空格隔开；单个标签最多10个字
          </div>
          <a-button type="primary" @click="addLabel" style="margin-top: 20px;"
            >新增</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <import-file
      v-model="importVisible"
      templateUrl="/library/mb/dimension_tag_mould.xlsx"
      name="dimension_tag_file"
      :request="importDimensionTag"
      @submit="getDimensionList"
    >
      <!-- :request="importStaff" -->
    </import-file>
  </page-header-view>
</template>

<script>
import PageHeaderView from '@/layouts/PageHeaderView'
import clonedeep from 'lodash.clonedeep'
import Cookies from 'js-cookie'
import importFile from './employee/importFile'
import STag from './components/tag'
import {
  getDimensionList,
  editDimension,
  delDimension,
  delTag,
  importDimensionTag
} from '@/api/userManage'

export default {
  components: {
    PageHeaderView,
    importFile,
    STag
  },
  data () {
    const dimensionValid = (rule, value, callback) => {
      if (
        this.labelList.findIndex(obj => {
          return (
            obj.dimension_name === value &&
            obj.id !== this.dimensionForm.dimension_id
          )
        }) !== -1
      ) {
        callback(new Error('已存在相同维度'))
      } else {
        callback()
      }
    }
    return {
      isParent: !+Cookies.get('project_id'), // 是否为总后台
      importDimensionTag,
      projectId: Cookies.get('project_id'),
      filterParams: {},
      queryParam: {},
      dimensionVisible: false,
      dimensionLoading: false,
      dimensionForm: {
        dimension_name: '',
        tagText: '',
        tag_data: []
      },
      tagName: '', // 编辑标签名备份
      dimensionRules: {
        dimension_name: [
          { required: true, message: '请输入维度名称' },
          {
            validator: dimensionValid
          }
        ]
      },
      importVisible: false,
      importStaff: '',
      labelList: []
    }
  },
  created () {
    this.getDimensionList()
  },
  methods: {
    getDimensionList () {
      getDimensionList().then(({ data }) => {
        this.labelList = data || []
      })
    },
    isHaveTag (tags) {
      return tags.some(label => {
        return (
          label.tag_name.indexOf(this.filterParams.labelText) > -1 ||
          !this.filterParams.labelText
        )
      })
    },
    // 提交维度表单
    submitDimension () {
      this.$refs.dimensionForm.validate(valid => {
        if (valid) {
          this.editDimension()
        } else {
          return false
        }
      })
    },
    // 编辑维度请求
    editDimension () {
      const params = clonedeep(this.dimensionForm)
      editDimension(params).then(
        ({ success, message, tag_error_text: error }) => {
          if (success) {
            this.getDimensionList()
            this.$message.success('提交成功')
            if (error) {
              this.$message.warning(`已存在相同标签 "${error}" `)
            }
            this.dimensionVisible = false
          } else {
            this.$message.error(message)
          }
        }
      )
    },
    reset () {
      this.queryParam = {}
      this.filterParams = {}
    },
    search () {
      this.filterParams = clonedeep(this.queryParam)
    },
    // 打开维度编辑弹窗
    openAddDimension (item) {
      const { id } = item
      // 有id为编辑，没有为新增
      if (id) {
        // 列表到表单的数据转换
        const formData = clonedeep(item)
        formData.child.forEach(obj => {
          obj.editable = false
          obj.error = false
        })
        this.dimensionForm = {
          dimension_id: formData.id,
          dimension_name: formData.dimension_name,
          colour: formData.colour,
          tag_data: formData.child || [],
          tagText: ''
        }
      } else {
        this.$refs.dimensionForm && this.$refs.dimensionForm.resetFields()
        this.dimensionForm = {
          dimension_name: '',
          tagText: '',
          tag_data: []
        }
      }
      this.dimensionVisible = true
    },
    // 表单中点击标签转换为输入模式
    editTag (label, index) {
      if (!this.isParent && this.projectId != label.project_id) {
        return
      }
      label.editable = true
      // 切换为输入框后自动获取焦点
      this.$nextTick(() => {
        document.querySelector(`.tag-input-${index}`).focus()
      })
    },
    handleBlurTag (label, event) {
      const { tag_name: name, id } = label
      if (!name) {
        label.error = '标签名不能为空'
        event.target.focus()
        return
      }
      const index = this.dimensionForm.tag_data.findIndex(obj => {
        return obj.tag_name === name && obj.id !== id
      })
      if (index > -1) {
        label.error = '已存在相同标签'
        event.target.focus()
      } else {
        label.error = false
        label.editable = false
      }
    },
    // 转化文本框文本为标签
    addLabel () {
      const tagText = this.dimensionForm.tagText
      if (tagText) {
        const tags = tagText.split(/\s/)

        // 新增标签
        const newTags = tags
          .filter(tag => {
            // 先过滤掉空值和当前维度已经存在的标签名
            return (
              tag &&
              this.dimensionForm.tag_data.findIndex(obj => {
                return obj.tag_name === tag
              }) === -1
            )
          })
          .map(obj => ({
            tag_name: obj.substr(0, 10),
            editable: false,
            error: false
          })) // 转化为tag对象,并将标签名剪切为最大10
        if (newTags && newTags.length) {
          this.dimensionForm.tag_data.push(...newTags)
        }
        this.dimensionForm.tagText = ''
      }
    },
    // 删除维度
    deleteDimension (item, index) {
      const { id, dimension_name: name } = item
      const num = item.child.length
      this.$confirm({
        title: `删除模块 - ${name}`,
        icon: h => <a-icon theme="filled" type="exclamation-circle" />,
        content: h => (
          <div>
            <span style="color:red;">
              该模块{num ? `及其${num}个标签都` : ''}会被删除
            </span>
            ，确定删除吗？
          </div>
        ),
        onOk: () => {
          delDimension({ dimension_id: id }).then(() => {
            this.getDimensionList()
            this.$message.success('删除成功')
          })
          this.labelList.splice(index, 1)
        }
      })
    },
    // 删除标签
    deleteLabel (label, index, item, noReq) {
      const { tag_name: name, count, id } = label
      if (count && +count > 0) {
        this.$confirm({
          title: `删除标签 - ${name}`,
          icon: h => <a-icon theme="filled" type="exclamation-circle" />,
          content: h => (
            <div>
              <span style="color:red;">
                {count ? `已有${count}人使用此标签` : '该标签会被删除'}
              </span>
              ，确定删除吗？
            </div>
          ),
          onOk: () => {
            this.confirmDeleteLabel(item, index, noReq, id)
          }
        })
      } else {
        this.confirmDeleteLabel(item, index, noReq, id)
      }
    },
    // 确认删除标签
    confirmDeleteLabel (item, index, noReq, id) {
      // 编辑维度中，删除只为本地删除
      if (noReq) {
        item.splice(index, 1)
        return
      }
      delTag({ tag_id: id }).then(() => {
        this.getDimensionList()
        this.$message.success('删除成功')
      })
      item.splice(index, 1)
    },
    handleImport () {
      this.importVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper
  /deep/
  .ant-form-inline
  .ant-form-item
  > .ant-form-item-label {
  min-width: 80px;
  flex-shrink: 0;
}
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.alert-text {
  color: #00000072;
  line-height: 1;
  padding-top: 7px;
}
/deep/ .ant-card-extra a {
  color: #00000072;
  line-height: 1;
  & + a {
    padding-left: 20px;
    margin-left: 20px;
    border-left: 1px solid #00000033;
  }
}
.tag-input {
  max-width: 130px;
  height: 24px;
  padding: 2px 11px;
  margin-right: 10px;
  line-height: 20px;
}
.tag-box {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
/deep/ .ant-pro-grid-content {
  min-height: inherit;
}
.dimension-card {
  margin-top: 24px;
  /deep/ .ant-card-body {
    padding-bottom: 19px;
  }
}
.dimension-tags {
  /deep/ .tag {
    margin-bottom: 5px;
  }
}
</style>
