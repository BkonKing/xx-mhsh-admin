<template>
  <a-modal v-model="isShow"
           title="扫码支付">
    <template #footer>
      <div>
        <a-button type='primary'
                  @click="goPay"
                  v-if="!isPay && pay_type===2 ">去支付</a-button>
        <a-button type='primary'
                  v-else-if="isPay"
                  @click="isShow=false">完成</a-button>
        <a-button v-else
                  @click="isShow=false">取消</a-button>
      </div>
    </template>
    <a-form-model :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label='充值类型'>
        短信
      </a-form-model-item>
      <a-form-model-item label='充值条数'
                         v-if="!isPay">{{payInfo.recharge_amount}}条</a-form-model-item>

      <a-form-model-item label='支付金额'>
        <div style="color:#1890FF"
             v-if="!isPay">
          <small>￥</small> <span style="fontSize:20px"> {{payInfo.pay_price }}</span>
        </div>
        <div v-else>
          <small>￥</small>
          <span style="fontSize:20px">
            {{payInfo.pay_price }}
            <small>({{payInfo.recharge_amount}}条短信)</small>
          </span>
        </div>
      </a-form-model-item>
      <a-form-model-item label='支付方式'>
        <a-radio-group v-model="pay_type"
                       v-if="!isPay"
                       @change="onChange">
          <a-radio :value="2">
            支付宝
          </a-radio>
          <a-radio :value="1">
            微信
          </a-radio>
        </a-radio-group>
        <div class="img"
             v-if="pay_type===1 && !isPay">
          <img v-if="!isPay"
               :src="payMa"
               alt="">
        </div>
        <div v-if="isPay">
          {{pay_type===1?'微信':'支付宝'}}
          <div class="img">
            <img class="img2"
                 src="@/assets/imgs/pay_success.png"
                 alt="">
            <div class="txt">支付成功</div>
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { payOrder } from '@/api/financeCenter.js'
export default {
  props: ['payInfo'],
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      pay_type: 2,
      isPay: false,
      payMa: ''
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.isPay = false
      }
    }
  },
  methods: {
    // 微信支付
    async onChange () {
      if (this.pay_type === 1) {
        const res = await payOrder({
          recharge_id: this.payInfo.recharge_id,
          pay_price: +this.payInfo.pay_price,
          pay_type: this.pay_type
        })
        this.payMa = res.data
        console.log('支付', res)
      }
    },
    // 支付宝支付
    async goPay () {
      const res = await payOrder({
        recharge_id: this.payInfo.recharge_id,
        pay_price: +this.payInfo.pay_price,
        pay_type: this.pay_type
      })
      console.log('支付', res)
      window.open(res.data.url)
    }
  }
}
</script>

<style lang='less' scoped>
.img {
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
  .img2 {
    margin: 20px 0;
    width: 60px;
    height: 60px;
  }
  .txt {
    font-weight: 600;
  }
}
</style>
