<template>
  <div>
    <page-header :routes="routes"></page-header>
    <div style="padding: 24px;">
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
            <a-form-model ref="inviteForm" :model="inviteCredits">
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
                    ></a-input></a-form-model-item
                ></a-col>
              </a-row>
            </a-form-model>
          </a-form-model-item>
          <a-form-model-item required prop="poster_url" label="面对面邀请海报">
            <upload-image
              v-model="form.poster_url"
              maxLength="1"
              :noHost="true"
              @change="triggerChange"
            ></upload-image>
            <div style="margin-top: -11px;color: #00000072;">
              尺寸320*320；支持扩展名：.png .jpg；
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
            >
              <a-checkbox
                v-for="item in taskData"
                :key="item.id"
                :value="item.id"
                :disabled="!+item.is_enabled"
                @click="stopReminding(!+item.is_enabled, item.task_name)"
                @change="triggerChange"
              >
                {{ item.task_name }}
              </a-checkbox>
            </a-checkbox-group>
            <!-- <a @click="openTaskTable">新增</a> -->
          </a-col>
        </a-row>
        <edit-table
          ref="editTable"
          :data="inviteTaskData"
          :taskData="taskData"
          :checked="taskCheckbox"
          @input="triggerChange"
        ></edit-table>
      </a-card>
      <div style="height: 56px;"></div>
      <footer-tool-bar style="width: 100%;">
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
      </footer-tool-bar>
    </div>
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
  </div>
</template>

<script>
// /operatingCenter/activity/invite/setting
import { PageHeader, UploadImage } from '@/components'
import moment from 'moment'
import FooterToolBar from '@/components/FooterToolbar'
import taskTable from './components/taskTable'
import editTable from './components/editTable'
import { getInviteSetting, saveInviteSetting } from '@/api/invite'
import clonedeep from 'lodash.clonedeep'

export default {
  name: 'SpecialEdit',
  components: {
    FooterToolBar,
    UploadImage,
    PageHeader,
    taskTable,
    editTable
  },
  data () {
    // const validateTime = (rule, value, callback) => {
    //   if (this.form.is_open && !value[0]) {
    //     callback(new Error('请设定开启时间'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      routes: [
        {
          path: '/operatingCenter/activity/invite/index',
          breadcrumbName: '运营中心'
        },
        {
          path: '',
          breadcrumbName: '活动管理'
        },
        {
          path: '/operatingCenter/activity/invite/index',
          breadcrumbName: '美好红包'
        },
        {
          breadcrumbName: '邀请设置'
        }
      ],
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
        // time: [
        //   {
        //     validator: validateTime
        //   }
        // ]
      },
      taskCheckbox: [],
      taskData: {},
      inviteCredits: { form: [] },
      inviteTaskData: [],
      visible: false,
      loading: false,
      confirmLoading: false,
      isChange: false
    }
  },
  created () {
    this.getInviteSetting()
  },
  methods: {
    getInviteSetting () {
      getInviteSetting().then(
        ({
          project_list: projectList,
          task_data: taskData,
          invite_setting_info: settingInfo,
          invite_task_data: inviteTaskData
        }) => {
          this.setForm(settingInfo || {})
          this.projectList = projectList || []
          this.setTaskData(taskData, inviteTaskData)
          this.inviteTaskData = inviteTaskData
          this.inviteCredits.form = clonedeep(inviteTaskData)
          this.taskCheckbox = inviteTaskData.map(obj => obj.id)
        }
      )
    },
    setTaskData (taskData, inviteTaskData) {
      // 服务端返回数据将邀请奖励任务表格分成了两个数组，需要将他们组合起来
      const keys = Object.keys(taskData)
      keys.forEach(key => {
        // 查找现有的邀请任务中对应的任务
        let inviteTask = {
          credits: '',
          yk_credits: '',
          yz_credits: '',
          yzcy_credits: '',
          zh_credits: '',
          zhcy_credits: ''
        }
        const index = inviteTaskData.findIndex(
          obj => obj.id === taskData[key].invite_task_id
        )
        if (index > -1) {
          const {
            id,
            task_id,
            task_name,
            task_type,
            ...inviteTaskValue
          } = inviteTaskData[index]
          inviteTask = inviteTaskValue
        }
        Object.assign(taskData[key], inviteTask)
        taskData[key].task_id = taskData[key].id
        if (index > -1) {
          inviteTaskData[index] = clonedeep(taskData[key])
        }
        // 后台返回的key值为任务类型，为了跟CheckBox值对应将其key改为id
        const newKey = taskData[key].id
        if (newKey !== key) {
          taskData[newKey] = taskData[key]
          delete taskData[key]
        }
      })
      this.taskData = taskData
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
    stopReminding (isUnabled, taskName) {
      isUnabled && this.$toast.warning(`请先开启幸福币任务【${taskName}】`)
    },
    changeTaskChecked () {
      if (this.taskCheckbox.length > this.inviteCredits.form.length) {
        // 新增
        this.taskCheckbox.forEach(id => {
          if (!this.inviteCredits.form.find(obj => obj.id === id)) {
            this.inviteCredits.form.push(this.taskData[id])
          }
        })
      } else {
        // 删除
        this.inviteCredits.form = this.inviteCredits.form.filter(obj => {
          return this.taskCheckbox.includes(obj.id)
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
      const editForm = this.$refs.editTable
      Promise.all([
        this.formValidate(this.$refs.BasicForm),
        this.formValidate(this.$refs.inviteForm),
        this.formValidate(editForm.$refs.tableForm)
      ]).then(() => {
        this.saveInviteSetting({
          ...this.form,
          invite_task_data: clonedeep(editForm.tableData.form)
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
      params.invite_task_data = params.invite_task_data.map(obj => {
        const creditIndex = this.inviteCredits.form.findIndex(
          item => item.id === obj.id
        )
        obj.credits = this.inviteCredits.form[creditIndex].credits
        obj.id = obj.invite_task_id || '0'
        return obj
      })
      saveInviteSetting(params).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.getInviteSetting()
          // this.$router.go(-1)
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
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
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
