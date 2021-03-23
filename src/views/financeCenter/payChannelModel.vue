<template>
  <a-modal v-model="isShow"
           title="扫码支付">
    <template #footer>
      <div>
        <a-button>取消</a-button>
      </div>
    </template>
    <a-form-model :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label='充值类型'>
        支付通道(生活缴费支付)
      </a-form-model-item>
      <a-form-model-item label='充值额度'>1000000元</a-form-model-item>

      <a-form-model-item label='支付金额'>
        <div style="color:#1890FF">
          <small>￥</small> <span style="fontSize:20px"> 3500.00</span>
        </div>
      </a-form-model-item>
      <a-form-model-item label='支付方式'>
        <a-radio-group>
          <a-radio :value="2">
            支付宝
          </a-radio>
          <a-radio :value="1">
            微信
          </a-radio>
        </a-radio-group>
        <img src="@/assets/imgs/pay_ma.png"
             alt="">
      </a-form-model-item>

    </a-form-model>
  </a-modal>
</template>

<script>

export default {
  props: ['toform'],
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  }
}
</script>

<style>
</style>
