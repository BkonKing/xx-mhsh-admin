<template>
  <a-modal v-model="show"
           title="扫码支付"
           :footer='null'>
    <div class="form">
      <a-form-model :model="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='充值类型'>
          {{toform.radioValue===1?'短信':'支付通道(生活缴费支付)'}}
        </a-form-model-item>
        <a-form-model-item label='充值条数'
                           v-if="!payBol">10000条</a-form-model-item>
        <a-form-model-item label='支付额度'></a-form-model-item>
        <a-form-model-item label='支付金额'>
          <div class="money"
               v-if="!payBol">
            <span>￥</span> 100.00
          </div>
          <div v-else>
            <small>￥</small> <span style="fontSize:18px">100.00</span> <small>(10000条短信)</small>
          </div>
        </a-form-model-item>
        <a-form-model-item label='支付方式'>
          <a-radio-group v-model="form.value"
                         v-if="!payBol">
            <a-radio :value="1">
              支付宝
            </a-radio>
            <a-radio :value="2">
              微信
            </a-radio>
          </a-radio-group>
          <div v-else>
            <span v-if="form.value===1">支付宝</span>
            <span v-else>微信</span>
          </div>
          <div class="img">
            <img v-if="!payBol"
                 src="@/assets/imgs/pay_ma.png"
                 alt="">
            <div v-else>
              <img class="img2"
                   src="@/assets/imgs/pay_success.png"
                   alt="">
              <div class="txt">支付成功</div>
            </div>
          </div>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="footer">
      <a-button v-if="!payBol">取消</a-button>
      <a-button v-else
                type="primary"
                @click="submit">完成</a-button>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: ['toform'],
  data () {
    return {
      show: false,
      payBol: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        value: 1
      }
    }
  },
  watch: {
    show (newVal) {
      if (newVal === true) {
        setTimeout(() => {
          this.payBol = true
        }, 2000)
      } else {
        this.payBol = false
      }
    }
  },
  methods: {
    // 完成
    submit () {
      this.show = false
    }
  }
}
</script>

<style lang='less' scoped>
.money {
  font-size: 18px;
  span {
    font-size: 12px;
  }
  color: #1890ff;
}
.form {
  padding-left: 20px;
  padding-right: 20px;
}
.img {
  width: 150px;
  height: 150px;
  background-color: #f5f5f5;
  text-align: center;
  .img2 {
    margin: 20px 0;
    width: 60px;
    height: 60px;
  }
  .txt {
    font-weight: 600;
  }
}
/deep/ .ant-modal-body {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.footer {
  padding: 10px 0;
  border-top: 1px solid #e4e4e4;
  text-align: right;
  button {
    margin-right: 10px;
  }
}
</style>
