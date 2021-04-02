<template>
  <div class="rechargeSet">
    <a-card class="card" v-if="projectID">
      <div class="title">预警</div>
      <div class="content">
        <div class="t1">
          短信剩余条数小于
          <a-input
            v-model="sremain_amount1"
            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
          ></a-input
          >时，短信提醒指定人
        </div>
        <div class="t2">
          支付通道剩余额度小于<a-input
            onkeyup="this.value=this.value.replace( /\D|^0/g,'')"
            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
            v-model="payment_amount1"
          >
          </a-input
          >时，短信提醒指定人
        </div>
        <div class="t3">
          <a-button type="primary" @click="submit1">提交</a-button>
        </div>
      </div>
    </a-card>
    <a-card class="card" v-else>
      <div class="title">预警</div>
      <div class="content">
        <div class="t1">
          短信剩余条数小于
          <a-input
            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
            v-model="sremain_amount2"
          ></a-input
          >时，短信提醒指定人
        </div>
        <div class="t2">
          支付通道剩余额度小于<a-input
            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
            v-model="payment_amount2"
          ></a-input
          >时，短信提醒指定人
        </div>
        <div class="t4">
          项目方支付剩余额度小于
          <a-input
            onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
            onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
            v-model="project_amount"
          ></a-input
          >时，短信提醒指定人
        </div>
        <div class="t3">
          <a-button type="primary" @click="submit2">提交</a-button>
        </div>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">充值提醒 <span>剩余不足时通知提醒指定手机</span></div>
      <div class="content">
        <div class="t1">
          <span>余额：</span>
          {{ balance }}
          <a-icon class="icon" type="edit" @click="remind(1)" />
        </div>
        <div class="t2">
          <span>短信：</span>
          {{ sms_list }}
          <a-icon class="icon" type="edit" @click="remind(2)" />
        </div>
        <div class="t3">
          <span>支付通道：</span>
          {{ channel }}
          <a-icon class="icon" type="edit" @click="remind(3)" />
        </div>
      </div>
    </a-card>
    <remindModel ref="remindModel"></remindModel>
  </div>
</template>

<script>
import remindModel from './remindModel'
import { setWarning, getRemindUser } from '@/api/financeCenter.js'
import Cookies from 'js-cookie'
export default {
  components: {
    remindModel
  },
  data () {
    return {
      sremain_amount1: 200,
      payment_amount1: 5000,
      sremain_amount2: 200,
      payment_amount2: 5000,
      project_amount: 0,
      balance: '', // 余额
      channel: '', // 支付通道
      sms_list: '', // 短信
      userData: '',
      projectID: '' // 项目ID
    }
  },
  methods: {
    // 获取充值提醒用户列表
    async getData () {
      const res = await getRemindUser()
      this.balance = res.data.balance
        .map(item => {
          return item.mobile + ' (' + item.realname + ')' + ''
        })
        .join('；')
      this.channel = res.data.channel
        .map(item => {
          return item.mobile + ' (' + item.realname + ')' + ''
        })
        .join('；')
      this.sms_list = res.data.sms_list
        .map(item => {
          return item.mobile + ' (' + item.realname + ')' + ''
        })
        .join('；')
      this.userData = res.data
      console.log('获取充值提醒用户列表', res)
    },
    // 提醒
    remind (type) {
      this.$refs.remindModel.isShow = true
      this.$refs.remindModel.type = type
      if (type === 1) {
        // console.log(this.userData.balance)
        this.$refs.remindModel.userData = JSON.parse(JSON.stringify(this.userData.balance))
      } else if (type === 2) {
        // console.log(this.userData.sms_list)
        this.$refs.remindModel.userData = JSON.parse(JSON.stringify(this.userData.sms_list))
      } else {
        // console.log(this.userData.channel)
        this.$refs.remindModel.userData = JSON.parse(JSON.stringify(this.userData.channel))
      }
    },
    // 预警
    async submit1 () {
      await setWarning({
        sremain_amount: this.sremain_amount1,
        payment_amount: this.payment_amount1
      })
      this.$message.success('提交成功')
      // console.log('预警', res)
    },
    // 预警
    async submit2 () {
      await setWarning({
        sremain_amount: this.sremain_amount1,
        payment_amount: this.payment_amount1,
        project_amount: this.project_amount
      })
      this.$message.success('提交成功')
      // console.log('预警', res)
    }
  },
  created () {
    this.getData()
    this.projectID = +Cookies.get('project_id') || ''
  }
}
</script>

<style lang="less" scoped>
.rechargeSet {
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding-left: 0;
      padding-right: 0;
    }
    .title {
      font-weight: 700;
      font-size: 18px;
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 20px;
      padding-left: 30px;
      color: #272727;
    }
    .content {
      padding-top: 30px;
      padding-left: 30px;
      input {
        width: 100px;
        margin: 0 10px;
        text-align: center;
      }
      .t2 {
        margin-top: 20px;
      }
      .t3 {
        margin-top: 20px;
        margin-left: 100px;
      }
      .t4 {
        margin-top: 20px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding-left: 0;
      padding-right: 0;
    }
    .title {
      padding-left: 30px;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 20px;
      span {
        font-size: 12px;
        color: #9e9797;
        font-weight: 400;
      }
    }
    .content {
      padding-left: 70px;
      padding-top: 20px;
      .t1 {
        margin-bottom: 20px;
      }
      .t2 {
        margin-bottom: 20px;
      }
      span {
        color: #37313b;
      }
      .icon {
        color: #67b5ff;
        font-weight: 600;
      }
    }
  }
}
</style>
