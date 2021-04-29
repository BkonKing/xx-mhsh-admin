<template>
  <a-modal
    title="查看"
    :visible="modalShow"
    width="800px"
    :footer="null"
    @cancel="cancelModal"
  >
    <a-descriptions title="房间" :column="2">
      <a-descriptions-item label="房产" :span="infoData.account_numb || infoData.surface ? 1 : 2">{{ infoData.house_property_name }}</a-descriptions-item>
      <a-descriptions-item v-if="infoData.account_numb || infoData.surface" :label="infoData.genre_type_name"><template v-if="infoData.account_numb">户号{{ infoData.account_numb }}&nbsp;&nbsp;&nbsp;&nbsp;</template><template v-if="infoData.surface">表号{{ infoData.surface }}</template></a-descriptions-item>
      <a-descriptions-item label="业主"><a v-if="infoData.uid>0" :href="`/xmht/household/member/getMemberList?uid=${infoData.uid}`" target="_blank">{{ infoData.realname + ' ' + infoData.mobile }}</a><template v-else>{{ infoData.realname + ' ' + infoData.mobile }}</template></a-descriptions-item>
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
        <a-descriptions-item v-if="params && params.genre_id < 3" label="使用数">{{ orderData.disparity }}</a-descriptions-item>
        <a-descriptions-item v-if="params && params.genre_id < 3" label="上次读表数">{{ orderData.old_record }}</a-descriptions-item>
        <a-descriptions-item label="应缴金额" :span="params.genre_id < 3 ? 1 : 2">￥<span class="big-bold">{{ orderData.money }}</span><br /><template v-if="orderData.electric_formula_name">{{ orderData.electric_formula_name }}；</template><span class="color-FAAD14"><template v-if="orderData.violations_money && orderData.violations_money!='0.00'">含违约金￥{{ orderData.violations_money }}</template></span></a-descriptions-item>
        <a-descriptions-item v-if="params && params.genre_id < 3" label="本次读表数">{{ orderData.record }}</a-descriptions-item>
        <a-descriptions-item v-if="orderData.pic" label="图片" span="2">
          <div class="pic-list">
            <img preview="2" v-for="(item, index) in orderData.pic" :key="index" :src="item" />
          </div>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions :title="`${billTypeName} - ${infoData.genre_type_name}（${infoData.zf_type == 1 ? '线下' : '线上'}）`" :column="2">
        <a-descriptions-item :label="`${billTypeName}金额`">￥<span class="big-bold">{{ infoData.money }}</span></a-descriptions-item>
        <a-descriptions-item label="账户余额">￥{{ infoData.balance }}</a-descriptions-item>
        <a-descriptions-item :label="`${billTypeName}单号`">{{ infoData.id_no }}</a-descriptions-item>
        <a-descriptions-item v-if="infoData.bill_type == 1" :label="`${billTypeName}状态`">成功</a-descriptions-item>
        <a-descriptions-item v-if="infoData.bill_type == 2" label="超时天数">{{ infoData.over_day || '--' }}</a-descriptions-item>
        <a-descriptions-item :label="`${billTypeName}用户`"><a v-if="infoData.owner_id > 0" :href="`/xmht/household/member/getMemberList?uid=${infoData.owner_id}`" target="_blank">{{ infoData.user_name }}</a><template v-else>{{ infoData.user_name }}</template></a-descriptions-item>
        <a-descriptions-item :label="`${billTypeName}时间`">{{ infoData.pay_time }}</a-descriptions-item>
        <template v-if="infoData.zf_type == 1">
          <a-descriptions-item v-if="infoData.admin_name" :label="`${billTypeName}操作人`" span="2">{{ infoData.admin_name }}</a-descriptions-item>
          <a-descriptions-item v-if="infoData.proof" :label="`${billTypeName}凭证`" span="2">
            <div class="pic-list">
              <img v-for="(item, index) in infoData.proof" :key="index" :src="item" preview="1" />
            </div>
          </a-descriptions-item>
        </template>
      </a-descriptions>
    </template>
    <a-modal
      width="1200px"
      :visible="imgShow"
      class="cztx-modal"
      :footer="null"
      @cancel="imgShow = false"
    >
      <div class="img-big"><img :src="imgUrl" /></div>
    </a-modal>
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
      orderData: '',
      billTypeName: '充值',
      imgUrl: '',
      imgShow: false
    }
  },
  methods: {
    getData () {
      getPayDetail(this.params).then(res => {
        this.infoData = res.house_data
        this.billTypeName = res.house_data.bill_type == 1 ? '充值' : '缴费'
        this.orderData = res.order_data || ''
        this.$previewRefresh()
      })
    },
    cancelModal () {
      this.$emit('update:modalShow', false)
    },
    showPic (item) {
      this.imgUrl = item
      this.imgShow = true
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
  .ant-descriptions-item .ant-descriptions-item-label {
    white-space: nowrap;
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
    overflow-x: auto;
    img {
      width: 104px;
      height: 104px;
      border: 1px dashed #ccc;
      padding: 8px;
      margin: 0 8px 8px 0;
      border-radius: 2px;
      object-fit: cover;
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
.cztx-modal {
  .img-big {
    text-align: center;
    max-height: 550px;
    overflow-y: auto;
    img {
      max-width: 100%;
    }
  }
}
</style>
