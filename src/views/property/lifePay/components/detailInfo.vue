<template>
  <a-modal
    title="查看"
    :visible="modalShow"
    width="800px"
    :footer="null"
    @cancel="cancelModal"
  >
    <a-descriptions title="房间" :column="2">
      <a-descriptions-item label="房产">{{ infoData.house_property_name }}</a-descriptions-item>
      <a-descriptions-item :label="infoData.genre_type_name"><template v-if="infoData.account_numb">户号{{ infoData.account_numb }}</template> <template v-if="infoData.surface">表号{{ infoData.surface }}</template></a-descriptions-item>
      <a-descriptions-item label="业主">{{ infoData.realname + ' ' + infoData.mobile }}</a-descriptions-item>
    </a-descriptions>
    <template v-if="params && params.bill_type == 3">
      <a-descriptions title="调整" :column="2">
        <a-descriptions-item label="调整余额" span="2">￥{{ infoData.money }}</a-descriptions-item>
        <a-descriptions-item v-if="infoData.admin_name" label="调整操作人">[{{ infoData.admin_name }}]</a-descriptions-item>
        <a-descriptions-item label="调整时间" :span="infoData.admin_name ? 1 : 2">{{ infoData.pay_time }}</a-descriptions-item>
        <a-descriptions-item label="原因说明" span="2">{{ infoData.adjust }}</a-descriptions-item>
      </a-descriptions>
    </template>
    <template v-else>
      <a-descriptions v-if="orderData" class="bill-table" title="账单" :column="2">
        <a-descriptions-item label="缴费类型">{{ orderData.genre_name }}</a-descriptions-item>
        <a-descriptions-item label="月份属期">{{ orderData.month_setmeal_days }}</a-descriptions-item>
        <a-descriptions-item label="使用数">{{ orderData.disparity }}</a-descriptions-item>
        <a-descriptions-item label="上次读表数">{{ orderData.old_record }}</a-descriptions-item>
        <a-descriptions-item label="应缴金额">￥<span class="big-bold">{{ orderData.money }}</span><br />5元/单位；<span class="color-FAAD14">含违约金￥10.00</span></a-descriptions-item>
        <a-descriptions-item label="本次读表数">10100</a-descriptions-item>
        <a-descriptions-item label="图片" span="2"><div class="pic-list"><img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /><img src="https://test.tosolomo.com/upload/image/20200826/20200826173404_56269.png" /></div></a-descriptions-item>
      </a-descriptions>
      <a-descriptions v-if="infoData.bill_type == 1" :title="`充值 - ${infoData.genre_type_name}（${infoData.zf_type == 1 ? '线下' : '线上'}）`" :column="2">
        <a-descriptions-item label="充值金额">￥<span class="big-bold">{{ infoData.money }}</span></a-descriptions-item>
        <a-descriptions-item label="账户余额">￥{{ infoData.balance }}</a-descriptions-item>
        <a-descriptions-item label="充值单号">0000000000</a-descriptions-item>
        <a-descriptions-item label="充值状态">成功</a-descriptions-item>
        <a-descriptions-item label="充值用户">{{ infoData.user_name }}</a-descriptions-item>
        <a-descriptions-item label="充值时间">{{ infoData.pay_time }}</a-descriptions-item>
        <template v-if="infoData.zf_type == 1">
          <a-descriptions-item :class="'dddaaa'" label="充值操作人" span="2">[{{ infoData.admin_name }}]</a-descriptions-item>
          <a-descriptions-item v-if="infoData.proof" label="充值凭证" span="2"><div class="pic-list"><img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /><img src="https://test.tosolomo.com/upload/image/20200826/20200826173404_56269.png" /></div></a-descriptions-item>
        </template>
      </a-descriptions>
      <!-- <a-descriptions v-if="infoData.bill_type == 2" :title="`充值 - ${infoData.genre_type_name}（${infoData.zf_type == 1 ? '线下' : '线上'}）`" :column="2">
        <a-descriptions-item label="缴费金额">￥<span class="big-bold">{{ infoData.money }}</span></a-descriptions-item>
        <a-descriptions-item label="账户余额">￥{{ infoData.balance }}</a-descriptions-item>
        <a-descriptions-item label="缴费单号">0000000000</a-descriptions-item>
        <a-descriptions-item label="超时天数">30天</a-descriptions-item>
        <a-descriptions-item label="缴费用户">XXX(租户)   15050505050</a-descriptions-item>
        <a-descriptions-item label="缴费时间">2021-02-08  08:50:08</a-descriptions-item>
        <a-descriptions-item :class="'dddaaa'" label="缴费操作人" span="2">[后台操作人姓名]</a-descriptions-item>
        <a-descriptions-item label="缴费凭证" span="2"><div class="pic-list"><img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /><img src="https://test.tosolomo.com/upload/image/20200826/20200826173404_56269.png" /></div></a-descriptions-item>
      </a-descriptions> -->
    </template>
  </a-modal>
</template>

<script>
import { getPayDetail } from '@/api/property'
export default {
  name: 'detailInfo',
  props: {
    modalShow: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      infoData: '',
      orderData: ''
    }
  },
  methods: {
    getData () {
      getPayDetail(this.params).then(res => {
        this.infoData = res.house_data
        this.orderData = res.order_data || ''
      })
    },
    cancelModal () {
      this.$emit('update:modalShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-modal {
  .ant-descriptions-title {
    & + .ant-descriptions-view {
      padding-left: 50px;
    }
  }
  .ant-modal-body {
    max-height: 600px;
    overflow-y: auto;
  }
  .ant-descriptions-item > span {
    vertical-align: top;
  }
  .big-bold {
    font-size: 23px;
    line-height: 20px;
  }
  .color-FAAD14 {
    color: #FAAD14;
  }
  .pic-list {
    display: flex;
    img {
      width: 104px;
      height: 104px;
      border: 1px dashed #ccc;
      padding: 8px;
      margin: 0 8px 8px 0;
      border-radius: 2px;
    }
  }
}
.bill-table {
  /deep/ tbody {
    tr:nth-child(3) {
      td:nth-child(1) {
        display: flex;
      }
      td:nth-child(2) {
        vertical-align: top;
      }
    }
  }
}
</style>
