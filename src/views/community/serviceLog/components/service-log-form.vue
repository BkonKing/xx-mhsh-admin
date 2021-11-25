<template>
  <a-modal
    v-model="editVisible"
    :title="title"
    :width="640"
    @ok="submit"
    :destroyOnClose="true"
    v-bind="$attrs"
  >
    <a-form-model
      ref="editForm"
      :model="editForm"
      :rules="editRules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
    >
      <h3>用户信息</h3>
      <a-form-model-item
        label="房产"
        :class="{ 'form-item-text': editForm.id }"
        :required="!editForm.id"
      >
        <template v-if="editForm.id">{{ editForm.house_property }}</template>
        <template v-else>
          <a-row :gutter="12">
            <a-col :md="8" :sm="24">
              <a-form-model-item prop="build_id" style="margin-bottom: 0;">
                <a-select
                  v-model="editForm.build_id"
                  placeholder="楼栋"
                  @change="handleBuildChange"
                >
                  <a-select-option
                    v-for="item in buildOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.building_name }}</a-select-option
                  >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item prop="unit_id" style="margin-bottom: 0;">
                <a-select
                  v-model="editForm.unit_id"
                  placeholder="单元"
                  @change="handleUnitChange"
                >
                  <a-select-option
                    v-for="item in unitOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.unit_name }}</a-select-option
                  >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item prop="house_id" style="margin-bottom: 0;">
                <a-select
                  v-model="editForm.house_id"
                  placeholder="房屋"
                  @change="getOwnerInfo"
                >
                  <a-select-option
                    v-for="item in houseOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.house_name }}</a-select-option
                  >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </template>
      </a-form-model-item>
      <a-form-model-item
        label="业主"
        :class="{ 'form-item-text': editForm.id }"
      >
        <div v-if="editForm.owner || editForm.mobile">
          <a
            v-if="editForm.uid"
            :href="`/xmht/household/member/getMemberList?uid=${editForm.uid}`"
            target="_blank"
            style="margin-right: 10px;"
            >{{ editForm.owner }}</a
          ><span v-else style="margin-right: 10px;">{{ editForm.owner }}</span><span>{{ editForm.mobile }}</span>
        </div>
        <div v-else>--</div>
      </a-form-model-item>
      <a-form-model-item
        label="用户标签"
        :class="{ 'form-item-text': editForm.id }"
      >
        <span v-if="editForm.user_tag_data && editForm.user_tag_data.length">
          <s-tag
            v-for="label in editForm.user_tag_data"
            v-show="label.sy_project_id == projectId"
            :key="label.id"
            :color="label.colour"
            style="margin-bottom: 5px;"
          >
            {{ label.tag_name }}
          </s-tag>
        </span>
        <span v-else>--</span>
        <a-icon
          v-if="(editForm.owner_id || editForm.house_id) && !isLook"
          type="edit"
          @click="editUserTag"
          style="margin-left: 10px;color: #1890ff;"
        ></a-icon>
      </a-form-model-item>
      <a-form-model-item class="form-item-text" label="用户满意度">
        {{ editForm.service_satisfied_desc || "--" }}
      </a-form-model-item>
      <h3>服务内容</h3>
      <a-form-model-item label="服务主题" prop="service_title" required>
        <template v-if="(isLook || isFollow) && !isPreview"
          >{{ editForm.service_title || "--"
          }}<a-icon
            v-if="isFollow"
            type="edit"
            @click="
              isPreview = true;
              titleCopy = editForm.service_title;
            "
            style="margin-left: 10px;color: #1890ff;"
          ></a-icon
        ></template>
        <a-row v-else type="flex">
          <a-col flex="1">
            <a-input
              v-model="editForm.service_title"
              :maxLength="25"
              placeholder="请简单概括本次服务"
              style="width: 100%;"
            ></a-input>
          </a-col>
          <a-col v-if="isPreview" flex="80px">
            <div>
              <a @click="isPreview = false" style="margin-left: 10px;">确定</a
              ><a
                @click="
                  isPreview = false;
                  editForm.service_title = titleCopy;
                "
                style="margin-left: 10px;"
                >取消</a
              >
            </div>
          </a-col>
        </a-row>
      </a-form-model-item>
      <!-- 查看 -->
      <template v-if="isLook">
        <a-form-model-item class="timeline-item">
          <a-timeline>
            <a-timeline-item v-for="(item, index) in records" :key="index">
              <div>
                <a>进度{{ records.length - index }}</a> 服务时间：{{
                  item.service_time
                }}<a-icon type="edit" @click="toEditStep(item)"></a-icon>
              </div>
              <div>{{ item.service_satisfied_desc || "--" }}</div>
              <!-- <div class="detai-cont">
                <div class="text-block">
                  <div
                    class="cont-text"
                    :class="{ 'text-hidden': isOver && !isDown }"
                    ref="textCont"
                  >
                    <div
                      @click="isDown = !isDown"
                      v-show="isOver"
                      class="more-down"
                      :class="{ 'down-up': isDown }"
                    >
                      {{ isDown ? "收起" : "展开" }}
                    </div>
                    <div>
                      {{ item.service_provider }}：{{ item.service_content }}
                    </div>
                  </div>
                </div>
              </div> -->
              <div>{{ item.service_provider }}：{{ item.service_content }}</div>
              <div>创建时间：{{ item.create_user }} {{ item.ctime }}</div>
            </a-timeline-item>
          </a-timeline>
        </a-form-model-item>
      </template>
      <!-- 编辑模式 -->
      <template v-else>
        <a-form-model-item class="form-item-text" label="服务进度">
          进度{{ editForm.id ? editForm.process_step + 1 : 1 }}
        </a-form-model-item>
        <a-form-model-item label="用户满意度" prop="service_satisfied">
          <a-select v-model="editForm.service_satisfied" placeholder="请选择">
            <a-select-option
              v-for="item in satisfactionOptions"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="服务者" prop="service_provider" required>
          <a-input
            v-model="editForm.service_provider"
            :maxLength="20"
            placeholder="请简单概括本次服务"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="服务时间" prop="service_time" required>
          <a-date-picker
            v-model="editForm.service_time"
            :show-time="{ defaultValue: defaultTime }"
            placeholder="请选择"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item
          label="服务内容"
          prop="service_content"
          required
          style="margin-bottom: 0;"
        >
          <a-textarea
            v-model="editForm.service_content"
            placeholder="请详细说明本次服务"
            :maxLength="1000"
            :autoSize="{ minRows: 4, maxRows: 4 }"
          ></a-textarea>
        </a-form-model-item>
      </template>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from 'moment'
import clonedeep from 'lodash.clonedeep'
import Cookies from 'js-cookie'
import {
  getUnit,
  getHouse,
  getOwnerInfo,
  getHouseTagData,
  getServiceProvider,
  addServiceRecord,
  addSpeedInfo,
  viewRecord
} from '@/api/community'
import STag from '@/views/userManage/components/tag'
import { getUserTag } from '@/api/userManage'

export default {
  name: 'serviece-log-form',
  components: {
    STag
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    satisfactionOptions: {
      type: Array,
      default: () => []
    },
    buildOptions: {
      type: Array,
      default: () => []
    },
    isLook: {
      type: Boolean,
      default: false // 默认编辑模式
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      projectId: Cookies.get('project_id'),
      editVisible: this.value,
      provider: '', // 当前用户名称
      unitOptions: [],
      houseOptions: [],
      editForm: this.data,
      editRules: {
        build_id: [{ required: true, message: '请选择楼栋' }],
        unit_id: [{ required: true, message: '请选择单元' }],
        house_id: [{ required: true, message: '请选择房屋' }],
        service_title: [{ required: true, message: '请输入服务主题' }],
        service_provider: [{ required: true, message: '请输入服务者' }],
        service_time: [{ required: true, message: '请选择服务时间' }],
        service_content: [{ required: true, message: '请输入服务内容' }]
      },
      isPreview: false, // 跟进服务主题预览
      titleCopy: '', // 跟进服务主题服务主题备份
      isOver: false,
      isDown: false,
      records: [] // 跟进记录
    }
  },
  computed: {
    title () {
      return this.isLook
        ? '查看服务记录'
        : this.editForm.id
          ? '跟进服务记录'
          : '新增服务记录'
    },
    // 跟进服务记录或者编辑已有服务记录
    isFollow () {
      return !this.isLook && this.editForm.id
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.$nextTick(() => {
          if (this.isLook) {
            this.viewRecord()
          }
        })
      }
      this.editVisible = val
    },
    editVisible (val) {
      !val && (this.isPreview = false)
      this.$emit('input', val)
    },
    data (val) {
      if (!this.isLook) {
        // 跟进服务记录
        if (val.id && !val.process_id) {
          val.service_time = ''
          val.service_content = ''
          val.owner_id = val.uid
          this.getServiceProvider()
          val.service_satisfied = val.service_satisfied || undefined
        } else {
          val.service_provider = this.provider
        }
      }
      this.editForm = clonedeep(val)
    }
  },
  mounted () {
    !this.isLook && this.getServiceProvider()
  },
  methods: {
    submit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editForm.id ? this.addSpeedInfo() : this.addServiceRecord()
        } else {
          return false
        }
      })
    },
    // 新增服务记录
    addServiceRecord () {
      addServiceRecord(this.editForm).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.editVisible = false
          this.$emit('success')
        }
      })
    },
    // 添加跟进记录
    addSpeedInfo () {
      const params = clonedeep(this.editForm)
      params.step = this.editForm.process_id
        ? params.process_step
        : params.process_step + 1
      params.service_id = params.id
      addSpeedInfo(params).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.editVisible = false
          this.$emit('success')
        }
      })
    },
    // 查看跟进记录
    viewRecord () {
      viewRecord({ service_id: this.editForm.id }).then(({ data }) => {
        this.editForm.service_title = data.service_title || ''
        this.editForm.service_satisfied_desc =
          data.service_satisfied_desc || ''
        this.records = data.list || []
      })
    },
    toEditStep (item) {
      const params = clonedeep(this.editForm)
      params.service_content = item.service_content
      params.service_provider = item.service_provider
      params.service_time = item.service_time
      params.service_satisfied = item.service_satisfied || undefined
      this.$emit('editStep', { ...params, process_id: item.id })
    },
    // 获取服务者（当前账号）
    getServiceProvider () {
      getServiceProvider().then(({ data }) => {
        this.provider = data.provider
        this.$set(this.editForm, 'service_provider', data.provider)
      })
    },
    handleBuildChange () {
      this.$set(this.editForm, 'unit_id', undefined)
      this.$set(this.editForm, 'house_id', undefined)
      this.$set(this.editForm, 'user_tag_data', [])
      this.setUserInfo()
      this.getUnit(this.editForm.build_id)
      this.houseOptions = []
    },
    handleUnitChange () {
      this.$set(this.editForm, 'house_id', undefined)
      this.$set(this.editForm, 'user_tag_data', [])
      this.setUserInfo()
      this.getHouse(this.editForm.build_id, this.editForm.unit_id)
    },
    getUnit () {
      getUnit({
        build_id: this.editForm.build_id
      }).then(({ data }) => {
        this.unitOptions = data || []
      })
    },
    getHouse () {
      getHouse({
        build_id: this.editForm.build_id,
        unit_id: this.editForm.unit_id
      }).then(({ data }) => {
        this.houseOptions = data || []
      })
    },
    // 选完楼栋-单元-房间后获取当前房屋
    getOwnerInfo () {
      getOwnerInfo({
        build_id: this.editForm.build_id,
        unit_id: this.editForm.unit_id,
        house_id: this.editForm.house_id
      }).then(({ data }) => {
        parseInt(data.satisfied) > 1 &&
          this.$set(
            this.editForm,
            'service_satisfied',
            parseInt(data.satisfied)
          )
        data.satisfied_name &&
          this.$set(
            this.editForm,
            'service_satisfied_desc',
            data.satisfied_name
          )
        this.setUserInfo(
          data.owner_name,
          data.mobile,
          data.owner_id,
          data.nickname
        )
        this.getTags()
      })
    },
    getTags () {
      const { owner_id: id } = this.editForm
      id ? this.getUserTag(id) : this.getHouseTagData()
    },
    // 获取用户标签
    getUserTag (uid) {
      getUserTag({
        uid: uid || this.editForm.owner_id
      }).then(({ data }) => {
        this.$set(this.editForm, 'user_tag_data', data)
      })
    },
    // 获取房屋标签
    getHouseTagData () {
      getHouseTagData({
        house_id: this.editForm.house_id
      }).then(({ data }) => {
        this.$set(this.editForm, 'user_tag_data', data)
      })
    },
    // 设置用户信息
    setUserInfo (name = '', mobile = '', ownerId = '', nickname = '') {
      this.$set(this.editForm, 'owner', name)
      this.$set(this.editForm, 'mobile', mobile)
      this.$set(this.editForm, 'owner_id', ownerId)
      this.$set(this.editForm, 'nickname', nickname)
    },
    editUserTag () {
      this.$emit('editUserTag', {
        userInfo: {
          uid: this.editForm.owner_id,
          house_id: this.editForm.house_id,
          nickname: this.editForm.nickname,
          realname: this.editForm.owner
        }
        // userTags: this.editForm.user_tag_data || []
      })
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
  font-weight: bold;
}
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.form-item-text {
  /deep/ .ant-form-item-control,
  /deep/ .ant-form-item-label {
    line-height: 24px;
  }
}
.timeline-item {
  max-height: 200px;
  margin-left: calc(20.84% - 80px);
  margin-bottom: 0;
  padding-top: 3px;
  overflow-y: auto;
}
/deep/ .ant-timeline-item-content > div {
  margin-bottom: 4px;
  a {
    margin-right: 10px;
  }
  i {
    margin-left: 10px;
    color: @primary-color;
    cursor: pointer;
  }
}
.detai-cont {
  .text-block {
    display: flex;
  }
  .cont-text {
    color: #8f8f94;
    line-height: 48px;
    font-size: 30px;
    position: relative;
    margin-bottom: 30px;
    &.text-hidden {
      height: 288px;
      overflow: hidden;
      // .text-multiple-ellipsis(6);
    }
    &::before {
      content: "";
      float: right;
      height: calc(100% - 48px); /*先随便设置一个高度*/
    }
  }
  .cont-pic {
    img {
      width: 150px;
      height: 150px;
      margin: 0 16px 16px 0;
      object-fit: cover;
    }
    img:nth-child(4n) {
      margin-right: 0;
    }
    margin-bottom: 24px;
  }
}
</style>
