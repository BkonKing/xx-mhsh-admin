<template>
  <div class="regchargeModel">
    <a-modal v-model="isShow"
             title="充值"
             ok-text="充值"
             @ok='recharge'>
      <a-form-model :model="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='充值类型'>
          <a-radio-group v-model="form.radioValue">
            <a-radio :value="1">
              短信
            </a-radio>
            <a-radio :value="2">
              支付通道(生活缴费支付)
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label='当前剩余'>
          <span v-if="form.radioValue===1">10000条</span>
          <span v-else>100000元</span>
        </a-form-model-item>
        <a-form-model-item :label="form.radioValue===1?'充值条数':'充值额度'">
          <a-input v-if="form.radioValue===1"
                   placeholder="请输入"
                   v-model="form.count"
                   suffix="0.1/条" />
          <a-input v-else
                   placeholder="请输入"
                   v-model="form.serviceCharge"
                   suffix="3.5%手续费" />
        </a-form-model-item>
        <a-form-model-item label='金额'>
          <a-input addon-before="￥"
                   v-model="form.money"
                   placeholder="请输入" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <toRecharge ref="toRecharge"
                :toform="form"></toRecharge>
  </div>
</template>

<script>
import toRecharge from './toRecharge.vue'
export default {
  components: {
    toRecharge
  },
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      title: '哈哈哈',
      form: {
        radioValue: 1,
        count: '',
        money: '',
        serviceCharge: ''
      }
    }
  },
  methods: {
    // 充值
    recharge () {
      this.$refs.toRecharge.show = true
      this.isShow = false
    }
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
