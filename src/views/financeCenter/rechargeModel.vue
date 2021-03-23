<template>
  <div class="regchargeModel">
    <a-modal v-model="isShow"
             title="充值"
             ok-text="充值"
             @ok='recharge'>
      <a-form-model :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='充值类型'>
          <a-radio-group v-model="recharge_type">
            <a-radio :value="1">
              短信
            </a-radio>
            <a-radio :value="2">
              支付通道(生活缴费支付)
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label='当前剩余'>
          <span v-if="recharge_type===1">{{smsUseInfo.srmeain_numbers}}条</span>
          <span v-else>{{smsUseInfo.spayment_limit}}元</span>
        </a-form-model-item>
        <a-form-model-item :label="recharge_type===1?'充值条数':'充值额度'">
          <a-input v-if="recharge_type===1"
                   v-model="count"
                   placeholder="请输入"
                   suffix="0.1/条" />
          <a-input v-else
                   placeholder="请输入"
                   v-model="rechargeMoney"
                   @input="setPrice"
                   suffix="3.5%手续费" />
        </a-form-model-item>
        <a-form-model-item label='金额'>
          <a-input addon-before="￥"
                   v-model="price"
                   @input="setRechargeMoney"
                   placeholder="请输入" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <shortNoteModel ref="shortNoteModel"
                    :rechargeType="recharge_type"></shortNoteModel>
    <payChannelModel ref="payChannelModel"></payChannelModel>
  </div>
</template>

<script>
import shortNoteModel from './shortNoteModel.vue'
import payChannelModel from './payChannelModel'
import { addRecharge } from '@/api/financeCenter.js'

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
      count: '',
      rechargeMoney: '',
      price: '',
      recharge_type: 1, // 是int充值类型 1短信2支付通道
      smsUseInfo: {}
    }
  },
  watch: {
    recharge_type () {
      this.count = ''
      this.price = ''
    },
    count () {
      this.price = this.count * 0.1
    },
    price () {
      this.count = this.price / 0.1
    },
    // rechargeMoney () {
    //   this.price = this.rechargeMoney * 0.0035
    // },
    isShow (newVal) {
      if (newVal === false) {
        this.recharge_type = 1
        this.count = ''
        this.price = ''
      }
    }
  },

  methods: {
    // 设置充值金额
    setRechargeMoney () {
      this.rechargeMoney = Number((this.price / 0.0035).toString().match(/^\d+(?:\.\d{0,2})?/))
    },
    // 设置金额
    setPrice () {
      this.price = Number((this.rechargeMoney * 0.0035).toString().match(/^\d+(?:\.\d{0,2})?/))
    },
    // 充值
    async recharge () {
      if (this.recharge_type === 1) {
        this.$refs.shortNoteModel.isShow = true
        await addRecharge({
          recharge_type: this.recharge_type,
          recharge_amount: this.count,
          pay_price: this.price
        })
        this.$parent.getData()
        this.$parent.pagination.currentPage = 1
        // console.log('充值短信', res)
      } else {
        this.$refs.payChannelModel.isShow = true
        await addRecharge({
          recharge_type: this.recharge_type,
          recharge_amount: +this.rechargeMoney,
          pay_price: this.price
        })
        this.$parent.getData()
        this.$parent.pagination.currentPage = 1
      }
      this.isShow = false
    }
  },
  created () {
    this.smsUseInfo = JSON.parse(window.localStorage.getItem('smsUseInfo')) || {}
  }

}
</script>

<style lang='less' scoped>
/deep/ .ant-input-suffix {
  color: #d9d9d9;
}
/deep/ .ant-input-group-addon {
  background-color: #ebebeb;
}
/deep/ .ant-radio-group {
  white-space: nowrap;
}
</style>
