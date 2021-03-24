<template>
  <a-modal v-model="isShow"
           title="扫码支付">
    <template #footer>
      <div>
        <a-button type='primary'>去支付</a-button>
      </div>
    </template>
    <a-form-model :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item lable='充值类型'>
        短信
      </a-form-model-item>
      <a-form-model-item label='充值条数'>10000条</a-form-model-item>
      <a-form-model-item label='支付金额'>
        <div class="txt"
             style="color:#1890FF">
          <small>￥</small> <span style="fontSize:20px">100.00</span>
        </div>
      </a-form-model-item>
      <a-form-model-item label='支付方式'>
        <a-radio-group>
          <a-radio :value="1">
            支付宝
          </a-radio>
          <a-radio :value="2">
            微信
          </a-radio>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
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
