<template>
  <div class="regchargeModel">
    <a-modal v-model="isShow" title="充值" ok-text="充值" @ok="recharge">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="充值类型">
          <a-radio-group v-model="recharge_type">
            <a-radio :value="1">
              短信
            </a-radio>
            <a-radio :value="2">
              支付通道(生活缴费支付)
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="当前剩余">
          <span
v-if="recharge_type === 1"
            >{{ smsUseInfo.srmeain_numbers }}条</span
          >
          <span v-else>{{ smsUseInfo.spayment_limit }}元</span>
        </a-form-model-item>
        <a-form-model-item
          :label="recharge_type === 1 ? '充值条数' : '充值额度'"
        >
          <a-input
            v-if="recharge_type === 1"
            v-model="count"
            @input="setPrice"
            placeholder="请输入"
            suffix="0.1元/条"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
          />
          <a-input
            v-else
            placeholder="请输入"
            v-model="rechargeMoney"
            @input="setPrice"
            @blur="ismore100"
            suffix="3.5‰手续费"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
          />
        </a-form-model-item>
        <a-form-model-item label="金额">
          <a-input
          v-if="bol"
            addon-before="￥"
            v-model="price"
            @input="setRechargeMoney"
            placeholder="请输入"
            onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <shortNoteModel
      :payInfo="payInfo"
      ref="shortNoteModel"
      :rechargeType="recharge_type"
      v-on="$listeners"
    ></shortNoteModel>
    <payChannelModel v-on="$listeners" :payInfo="payInfo" ref="payChannelModel"></payChannelModel>
  </div>
</template>

<script>
import shortNoteModel from './shortNoteModel.vue'
import payChannelModel from './payChannelModel'
import { addRecharge } from '@/api/financeCenter.js'
// 四舍五入保留2位小数
function keepTwoDecimalFull (num) {
  var result = parseFloat(num)
  if (isNaN(result)) {
    alert('传递参数错误，请检查！')
    return false
  }
  result = Math.round(num * 100) / 100
  var sX = result.toString()
  var posDecimal = sX.indexOf('.')
  if (posDecimal < 0) {
    posDecimal = sX.length
    sX += '.'
  }
  while (sX.length <= posDecimal + 2) {
    sX += '0'
  }
  return sX
}

export default {
  components: {
    shortNoteModel,
    payChannelModel
  },
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      title: '哈哈哈',
      count: '', // 充值条数
      rechargeMoney: '', // 充值额度
      price: '', // 金额
      recharge_type: 1, // 是int充值类型 1短信2支付通道
      smsUseInfo: {},
      payInfo: {}, // 支付信息
      bol: true // 更新
    }
  },
  watch: {
    recharge_type () {
      this.count = ''
      this.price = ''
    },
    count () {
      if (this.count === '') {
        this.price = ''
      }
    },
    rechargeMoney () {
       if (this.rechargeMoney === '') {
        this.price = ''
      }
    },
    price () {
      if (this.price === '') {
        this.count = ''
        this.rechargeMoney = ''
      }
    },
    isShow (newVal) {
      if (newVal === false) {
        this.recharge_type = 1
        this.count = ''
        this.price = ''
        this.rechargeMoney = ''
      }
    }
  },

  methods: {
    // 判断充值额度是否大于100
    ismore100 () {
      if (this.rechargeMoney < 100) {
        this.rechargeMoney = ''
        this.price = ''
        this.$message.error('充值额度要大于100')
      }
    },
    // 设置充值额度  / 条数
    setRechargeMoney () {
      // Number((this.price / 0.0035).toString().match(/^\d+(?:\.\d{0,2})?/))
      if (this.recharge_type === 2) {
        this.rechargeMoney = keepTwoDecimalFull(this.price / 0.0035)
      } else {
        this.count = this.price / 0.1
      }
    },
    // 设置金额
    setPrice () {
      if (this.rechargeMoney != '') {
          this.price = keepTwoDecimalFull(this.rechargeMoney * 0.0035)
      }
      if (this.count != '') {
        this.price = keepTwoDecimalFull(this.count * 0.1)
      }
    },
    // 充值
    async recharge () {
      if (this.recharge_type === 1) {
        if (this.count === '' || this.price === '') {
          this.$message.error('请输入充值条数或者金额')
          return
        }
         const res = await addRecharge({
          recharge_type: this.recharge_type,
          recharge_amount: this.count,
          pay_price: +this.price
        })
        this.payInfo = res.data
        this.$refs.shortNoteModel.isShow = true
        this.$parent.getData()
        this.$parent.pagination.currentPage = 1
        // console.log('充值短信', res)
      } else {
        if (this.rechargeMoney === '' || this.price === '') {
          this.$message.error('请输入充值额度或者金额')
          return
        }
          const res = await addRecharge({
          recharge_type: this.recharge_type,
          recharge_amount: +this.rechargeMoney,
          pay_price: +this.price
        })
        // console.log('支付通过', res)
        this.payInfo = res.data
        this.$refs.payChannelModel.isShow = true

        this.$parent.getData()
        this.$parent.pagination.currentPage = 1
      }
      this.isShow = false
    }
  },
  created () {
    this.smsUseInfo =
      JSON.parse(window.localStorage.getItem('smsUseInfo')) || {}
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-input-suffix {
  color: #d9d9d9;
}
/deep/ .ant-input-group-addon {
  background-color: #ebebeb;
}
/deep/ .ant-radio-group {
  white-space: nowrap;
}
/deep/ .ant-input-group-addon{
  padding: 0;
  width: 31px;
  height: 32px;
}
</style>
