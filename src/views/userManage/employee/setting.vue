<template>
  <div>
    <page-header :routes="routes"></page-header>
    <a-card title="签到奖励" style="margin: 24px;">
      <a-form-model
        ref="projectForm"
        :model="formData"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item
          label="是否开启"
          prop="employeeSigninReward"
          style="margin-bottom: 0;"
        >
          <a-switch
            v-model="formData.employeeSigninReward"
            @change="setStaff"
          />
        </a-form-model-item>
        <a-form-model-item label="奖励数量" prop="employeeRewardCredits">
          <a-input-number
            v-model="formData.employeeRewardCredits"
            :min="0"
            @blur="setStaff"
          ></a-input-number
          ><span style="margin-left: 7px;">幸福币/次</span>
          <div class="alert-text">
            若员工符合多种签到奖励，则奖励其中最高的
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { PageHeader } from '@/components'
import { getStaff, setStaff } from '@/api/userManage'

export default {
  components: {
    PageHeader
  },
  data () {
    return {
      formData: {
        employeeSigninReward: false,
        employeeRewardCredits: ''
      },
      routes: [
        {
          path: '/zht/user/user/getUserList',
          isTop: true,
          breadcrumbName: '用户管理'
        },
        {
          path: '/employee/list',
          breadcrumbName: '员工管理'
        },
        {
          breadcrumbName: '员工设置'
        }
      ]
    }
  },
  created () {
    this.getStaff()
  },
  methods: {
    getStaff () {
      getStaff().then(({ data }) => {
        data.employeeSigninReward = !!+data.employeeSigninReward
        this.formData = data
      })
    },
    setStaff () {
      if (!this.formData.employeeRewardCredits) {
        this.formData.employeeRewardCredits = 5
      }
      const params = clonedeep(this.formData)
      params.employeeSigninReward = params.employeeSigninReward ? 1 : 0
      setStaff(params).then(({ success }) => {
        success && this.$message.success('提交成功')
      })
    }
  }
}
</script>

<style scoped>
.alert-text {
  color: #00000072;
  line-height: 1;
  padding-top: 7px;
}
</style>
