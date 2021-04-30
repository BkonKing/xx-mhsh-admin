<template>
  <a-modal v-model="isShow" title="扫码支付">
    <template #footer>
      <div>
        <a-button
type="primary"
@click="goPay"
v-if="!isPay && pay_type === 2"
          >去支付</a-button
        >
        <a-button
type="primary"
v-else-if="isPay"
@click="isShow = false"
          >完成</a-button
        >
        <a-button v-else @click="isShow = false">取消</a-button>
      </div>
    </template>
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="充值类型">
        支付通道(生活缴费支付)
      </a-form-model-item>
      <a-form-model-item
label="充值额度"
        >{{ payInfo.recharge_amount }}元</a-form-model-item
      >

      <a-form-model-item label="支付金额" v-if="!isPay">
        <div style="color:#1890FF">
          <small>￥</small>
          <span style="fontSize:20px">{{ payInfo.pay_price }}</span>
        </div>
      </a-form-model-item>
      <a-form-model-item label="充值金额" v-if="isPay">
        <small>￥</small>
        <span style="fontSize:20px">{{ payInfo.pay_price }}</span>
      </a-form-model-item>
      <a-form-model-item label="支付方式">
        <a-radio-group v-model="pay_type" @change="onChange" v-if="!isPay">
          <a-radio :value="2" v-if="false">
            支付宝
          </a-radio>
          <a-radio :value="1">
            微信
          </a-radio>
        </a-radio-group>
        <div>
          <img
          v-if="pay_type === 1 && !isPay"
          :src="payMa"
          class="payma"
          alt=""
        />
        </div>
        <div v-if="isPay">
          {{ pay_type === 1 ? "微信" : "支付宝" }}
          <div class="img">
            <img class="img2" src="@/assets/imgs/pay_success.png" alt="" />
            <div class="txt">支付成功</div>
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { payOrder, payQuery } from '@/api/financeCenter.js'
export default {
  props: ['payInfo'],
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      pay_type: 1, // 支付类型
      payMa: '', // 支付二维码
      isPay: false, // 是否已经支付
      timeId: null,
      projectID: '' // 项目id

    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.isPay = false
        this.payMa = ''
      } else {
        this.onChange()
      }
    }
  },
  methods: {
    // 支付宝支付
    async goPay () {
      const res = await payOrder({
        recharge_id: this.payInfo.recharge_id,
        pay_price: +this.payInfo.pay_price,
        pay_type: this.pay_type
      })
      // console.log('支付', res)
      this.timeId = setInterval(async () => {
        const res2 = await payQuery({
          pay_type: this.pay_type,
          out_trade_no: res.data.order_num + ''
        })
        // console.log('是否支付成功', res2)
        if (res2.is_success === 1) {
          this.isPay = true
          this.$listeners.getData()
          clearInterval(this.timeId)
        }
      }, 2000)
      window.open(res.data.url)
    },
    // 微信支付
    async onChange () {
      if (this.pay_type === 1) {
        const res = await payOrder({
          recharge_id: this.payInfo.recharge_id,
          pay_price: +this.payInfo.pay_price,
          pay_type: this.pay_type
        })

        this.payMa = res.data.url
        this.timeId = setInterval(async () => {
          const res2 = await payQuery({
            pay_type: this.pay_type,
            out_trade_no: res.data.order_num + ''
          })
          // console.log('是否支付成功', res2)
          if (res2.is_success === 1) {
            this.isPay = true
            this.$listeners.getData()
            clearInterval(this.timeId)
          }
        }, 2000)
        // console.log('支付', res)
      }
    }
  },
  destroyed () {
 clearInterval(this.timeId)
        this.onChange = null
  }
}
</script>

<style lang="less" scoped>
.payma {
  width: 150px;
  height: 150px;
}
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
