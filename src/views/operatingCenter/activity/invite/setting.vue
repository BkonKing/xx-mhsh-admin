<template>
  <page-header-view>
      <a-card title="基础信息" :bordered="false">
        <a-form-model
          ref="BasicForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item required prop="is_open" label="是否开启">
            <a-switch v-model="form.is_open" @change="triggerChange"></a-switch>
            <div style="color: #00000072;">
              开启则显示美好红包活动banner入口
            </div>
            <a-form-model-item
              v-if="form.is_open"
              prop="time"
              style="margin: 10px 0 0;"
            >
              <a-range-picker
                v-model="form.time"
                :show-time="{ defaultValue: [defaultTime, defaultTime] }"
                :placeholder="['开始时间', '结束时间']"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
                @change="triggerChange"
              />
            </a-form-model-item>
          </a-form-model-item>
          <a-form-model-item required prop="project_ids" label="开启项目">
            <a-select
              v-model="form.project_ids"
              mode="multiple"
              placeholder="请选择"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              @change="triggerChange"
            >
              <a-select-option
                v-for="item in projectList"
                :key="item.id"
                :value="item.id"
                >{{ item.project_name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
          <a-form-model-item required prop="user_type" label="邀请人">
            <a-checkbox-group v-model="form.user_type" @change="triggerChange">
              <a-checkbox
                v-for="option in inviterOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.label }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item required prop="banner_url" label="banner-我的">
            <upload-image
              v-model="form.banner_url"
              maxLength="1"
              :noHost="true"
              @change="triggerChange"
            ></upload-image>
            <div style="margin-top: -11px;color: #00000072;">
              尺寸710*140；支持扩展名：.png .jpg；
            </div>
          </a-form-model-item>
          <a-form-model-item required label="邀请文案">
            <a-form-model
              ref="inviteForm"
              v-show="isHaveInviteTask"
              :model="inviteCredits"
            >
              <a-row
                v-for="(item, index) in inviteCredits.form"
                class="copywriting-row"
                type="flex"
                :key="index"
              >
                <a-col>{{ index === 0 ? "每邀请1位新用户" : "好友" }}</a-col>
                <a-col style="margin: 0 5px;"
                  ><a-input v-model="item.task_name" disabled></a-input
                ></a-col>
                <a-col>可得</a-col>
                <a-col style="margin: 0 5px;"
                  ><a-form-model-item
                    :prop="`form.${index}.credits`"
                    :rules="{ required: true, message: '必填' }"
                    style="margin-bottom: 0;"
                    ><a-input
                      v-model="item.credits"
                      v-number-input.int="{ min: 1 }"
                      :maxLength="15"
                      @change="triggerChange"
                    ></a-input></a-form-model-item></a-col
                ><a-col>幸福币</a-col>
              </a-row>
            </a-form-model>
            <div v-if="!isHaveInviteTask">
              无
            </div>
          </a-form-model-item>
          <a-form-model-item required prop="poster_url" label="面对面邀请海报">
            <upload-image
              v-model="form.poster_url"
              maxLength="1"
              :noHost="true"
              @change="triggerChange"
            ></upload-image>
            <div style="margin-top: -11px;color: #00000072;">
              尺寸750*1207；支持扩展名：.png .jpg；
            </div>
          </a-form-model-item>
        </a-form-model>
      </a-card>
      <a-card title="邀请奖励" style="margin-top: 24px" :bordered="false">
        <div style="font-size: 16px;font-weight: bold;">奖励被邀请人</div>
        <a-row type="flex" style="margin: 24px 0;line-height: 32px;">
          <a-col>关联任务：</a-col>
          <a-col>
            <a-checkbox-group
              v-model="taskCheckbox"
              @change="changeTaskChecked"
              class="invite-checkbox"
            >
              <a-checkbox
                v-for="item in taskOptions"
                :key="item.task_type"
                :value="item.task_type"
                @change="triggerChange"
              >
                {{ item.task_name }}
              </a-checkbox>
            </a-checkbox-group>
            <!-- <a @click="openTaskTable">新增</a> -->
          </a-col>
        </a-row>
        <div class="edit-table">
          <a-row class="edit-table-header" type="flex">
            <a-col
              v-for="item in columns"
              :flex="item.flex || 1"
              :key="item.dataIndex"
              style="width: 0"
              >{{ item.title }}</a-col
            >
          </a-row>
          <a-form-model
            v-show="isHaveInviteTask"
            ref="editTable"
            :model="inviteCredits"
            class="edit-table-body"
          >
            <a-row
              v-for="(record, index) in inviteCredits.form"
              :key="index"
              type="flex"
            >
              <a-col flex="1" style="width: 0" class="two-Multi">{{
                record.task_name
              }}</a-col>
              <a-col
                v-for="item in inputColumns"
                :key="item.dataIndex"
                flex="1"
                style="width: 0"
              >
                <a-form-model-item
                  :prop="`form.${index}.${item.dataIndex}`"
                  :rules="{
                    required: !(
                      item.dataIndex === 'yk_credits' &&
                      record.task_type === '2'
                    ),
                    message: '必填'
                  }"
                >
                  <span
                    v-if="
                      item.dataIndex === 'yk_credits' &&
                        record.task_type === '2'
                    "
                    >———</span
                  >
                  <a-input
                    v-else
                    v-model="record[item.dataIndex]"
                    v-number-input.int="{ min: 1 }"
                    placeholder="请输入"
                    :maxLength="50"
                    style="width: 100%;"
                    @change="triggerChange"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
          <a-row v-if="!isHaveInviteTask"
            ><a-empty :image="simpleImage"
          /></a-row>
        </div>
      </a-card>
      <div style="height: 56px;"></div>
      <footer-toolbar style="width: 100%;">
        <a-button @click="$router.go(-1)" style="margin-right: 15px;">
          取消
        </a-button>
        <a-button
          type="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="!isChange"
          >提交</a-button
        >
      </footer-toolbar>
    <a-modal
      title="新增关联任务"
      width="1000px"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <task-table v-if="visible" ref="goods-table"></task-table>
    </a-modal>
  </page-header-view>
</template>

<script>
// /operatingCenter/activity/invite/setting
import moment from 'moment'
import clonedeep from 'lodash.clonedeep'
import { Empty } from 'ant-design-vue'
import PageHeaderView from '@/layouts/PageHeaderView'
import { UploadImage, FooterToolbar } from '@/components'
import taskTable from './components/taskTable'
import { getInviteSetting, saveInviteSetting } from '@/api/invite'

export default {
  name: 'inviteSetting',
  components: {
    FooterToolbar,
    UploadImage,
    PageHeaderView,
    taskTable
  },
  data () {
    const textColumns = [
      {
        title: '任务类型',
        dataIndex: 'task_name'
      }
    ]
    const inputColumns = [
      {
        title: '业主（币）',
        dataIndex: 'yz_credits',
        scopedSlots: { customRender: 'yz_credits' }
      },
      {
        title: '业主成员（币）',
        dataIndex: 'yzcy_credits',
        scopedSlots: { customRender: 'yzcy_credits' }
      },
      {
        title: '租户（币）',
        dataIndex: 'zh_credits',
        scopedSlots: { customRender: 'zh_credits' }
      },
      {
        title: '租户成员（币）',
        dataIndex: 'zhcy_credits',
        scopedSlots: { customRender: 'zhcy_credits' }
      },
      {
        title: '游客（币）',
        dataIndex: 'yk_credits',
        scopedSlots: { customRender: 'yk_credits' }
      }
    ]
    return {
      projectList: [],
      // 邀请人选项
      inviterOptions: [
        {
          label: '业主',
          value: '1'
        },
        {
          label: '业主成员',
          value: '2'
        },
        {
          label: '租户',
          value: '3'
        },
        {
          label: '租户成员',
          value: '4'
        },
        {
          label: '游客',
          value: '5'
        }
      ],
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 10 } },
      form: {
        title: '',
        is_open: true,
        time: []
      },
      rules: {
        project_ids: [{ required: true, message: '请选择开启项目' }],
        user_type: [{ required: true, message: '请选择邀请人' }],
        banner_url: [{ required: true, message: '请上传banner图片' }],
        poster_url: [{ required: true, message: '请上传邀请海报' }]
      },
      taskOptions: [
        {
          task_type: '6',
          task_name: '下载登录'
        },
        {
          task_type: '2',
          task_name: '房间认证'
        }
      ],
      taskCheckbox: [], // 值为关联任务的类型
      inviteCredits: { form: [] },
      inviteTaskData: [],
      visible: false,
      loading: false,
      confirmLoading: false,
      isChange: false,
      textColumns,
      inputColumns,
      columns: [...textColumns, ...inputColumns]
    }
  },
  computed: {
    isHaveInviteTask () {
      return this.inviteCredits.form && this.inviteCredits.form.length
    }
  },
  beforeCreate () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  created () {
    this.getInviteSetting()
  },
  methods: {
    getInviteSetting () {
      getInviteSetting().then(
        ({
          project_list: projectList,
          invite_setting_info: settingInfo,
          invite_task_data: inviteTaskData
        }) => {
          this.setForm(settingInfo || {})
          this.projectList = projectList || []
          this.inviteTaskData = inviteTaskData
          this.inviteCredits.form = clonedeep(inviteTaskData)
          this.taskCheckbox = inviteTaskData.map(obj => obj.task_type)
        }
      )
    },
    // 表单回填
    setForm (data) {
      data.project_ids = data.project_ids ? data.project_ids.split(',') : []
      data.user_type = data.user_type_data ? data.user_type_data : []
      data.banner_url = data.banner_url ? [data.banner_url] : []
      data.poster_url = data.poster_url ? [data.poster_url] : []
      data.is_open = !!+data.is_open
      if (data.s_time) {
        data.time = [data.s_time, data.e_time]
      }
      this.form = data
      this.$nextTick(() => {
        this.isChange = false
      })
    },
    taskAlert (title) {
      const modal = this.$warning({
        class: 'warning-toast',
        maskClosable: true,
        mask: false,
        title
      })
      setTimeout(() => {
        modal.destroy()
      }, 1500)
    },
    changeTaskChecked () {
      if (this.taskCheckbox.length > this.inviteCredits.form.length) {
        // 新增
        this.taskCheckbox.forEach(taskType => {
          if (
            this.inviteCredits.form.findIndex(
              obj => obj.task_type === taskType
            ) === -1
          ) {
            // const index = this.inviteTaskData.findIndex(obj => obj.task_type === taskType)
            // this.inviteCredits.form.splice(index, 0, this.inviteTaskData[index])
            const form = {
              credits: '',
              yk_credits: '',
              yz_credits: '',
              yzcy_credits: '',
              zh_credits: '',
              zhcy_credits: ''
            }
            const index = this.taskOptions.findIndex(
              obj => obj.task_type === taskType
            )
            this.inviteCredits.form.splice(index, 0, {
              ...this.taskOptions[index],
              ...form
            })
          }
        })
      } else {
        // 删除
        this.inviteCredits.form = this.inviteCredits.form.filter(obj => {
          return this.taskCheckbox.includes(obj.task_type)
        })
      }
    },
    formValidate (ref) {
      return new Promise((resolve, reject) => {
        ref.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject(new Error(false))
            return false
          }
        })
      })
    },
    handleSubmit () {
      const DOWNLOADTASKTYPE = '6'
      if (!this.taskCheckbox || !this.taskCheckbox.length) {
        this.$message.warning('请选择关联任务')
        return
      }
      if (!this.taskCheckbox.includes(DOWNLOADTASKTYPE)) {
        this.taskAlert('请先关联下载登录任务')
        return
      }
      Promise.all([
        this.formValidate(this.$refs.BasicForm),
        this.formValidate(this.$refs.inviteForm),
        this.formValidate(this.$refs.editTable)
      ]).then(() => {
        this.saveInviteSetting({
          ...this.form,
          invite_task_data: this.inviteCredits.form
        })
      })
    },
    // 提交请求
    saveInviteSetting (params) {
      const { time } = params
      if (time && time.length) {
        params.s_time = time[0]
        params.e_time = time[1]
      }
      params.is_open = params.is_open ? 1 : 0
      params.user_type = params.user_type.join(',')
      params.project_ids = params.project_ids.join(',')
      params.banner_url =
        params.banner_url && params.banner_url.length
          ? params.banner_url[0]
          : ''
      params.poster_url =
        params.poster_url && params.poster_url.length
          ? params.poster_url[0]
          : ''
      saveInviteSetting(params).then(({ success, message }) => {
        if (success) {
          this.$message.success('提交成功')
          this.getInviteSetting()
        } else {
          this.$message.error(message)
        }
      })
    },
    openTaskTable () {
      this.visible = true
    },
    triggerChange () {
      this.isChange = true
    },
    handleAddOk () {},
    handleAddCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-table-thead > tr > th {
  padding: 12px 8px;
}
/deep/ .ant-table-tbody > tr > td {
  padding: 12px 8px;
  vertical-align: top;
  line-height: 32px;
}
.copywriting-row {
  line-height: 32px;
  /deep/ .ant-input {
    width: 100px;
  }
}
.copywriting-row + .copywriting-row {
  margin-top: 16px;
}
</style>

<style lang="less">
.warning-toast {
  .ant-modal-body {
    padding: 12px 32px 4px;
    background-color: #fffbe6;
  }
  .ant-modal-confirm-btns {
    display: none;
  }
}
</style>
