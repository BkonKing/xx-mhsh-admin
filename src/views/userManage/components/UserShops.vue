<template>
  <div class="user-shops-info">
    <a-card title="店铺资料" style="margin-top: 24px;">
      <h3>店铺信息</h3>
      <a-descriptions size="small" :column="3">
        <a-descriptions-item label="店铺编号">
          {{ info.shops_id || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺归属">
          {{ info.project_name || "美好生活家园总部" }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ info.ctime || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺名称">
          {{ info.shops_name || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="营业时间" :span="2">
          {{ info.business_hours || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺地址" :span="3">
          {{ info.address_detail || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺公告" :span="3">
          {{ info.shops_notice || "--" }}
        </a-descriptions-item>
      </a-descriptions>
      <h3>商家认证</h3>
      <a-descriptions size="small" :column="3">
        <a-descriptions-item label="认证状态">
          {{ info.attestation_text || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="经营者">
          {{ info.operator_realname || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="联系方式">
          {{ info.operator_mobile || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="认证类型">
          {{ info.a_type_text || "--" }}
        </a-descriptions-item>
        <a-descriptions-item
          :label="+info.a_type === 1 ? '身份证' : '营业执照'"
          :span="2"
        >
          {{
            info.voucher_img_data ? `${info.voucher_img_data.length}张` : "--"
          }}
          <a @click="openImg">查看</a>
        </a-descriptions-item>
      </a-descriptions>
      <audit-table ref="auditTable" :info="info"></audit-table>
    </a-card>
    <a-card
      v-if="info.uid"
      :tab-list="tabList"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
      style="margin-top: 24px;"
    >
      <coupon-tab
        v-show="activeKey === '1'"
        ref="couponTab"
        :info="info"
      ></coupon-tab>
      <withdraw-tab
        v-show="activeKey === '2'"
        ref="withdrawTab"
        :info="info"
      ></withdraw-tab>
      <staff-tab
        v-show="activeKey === '3'"
        ref="staffTab"
        :info="info"
      ></staff-tab>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import auditTable from './components/auditTable'
import couponTab from './components/couponTab'
import withdrawTab from './components/withdrawTab'
import staffTab from './components/staffTab'

export default {
  components: {
    auditTable,
    couponTab,
    withdrawTab,
    staffTab
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(['isParentProject']),
    baseUrl () {
      return this.isParentProject ? '/zht' : '/xmht'
    }
  },
  data () {
    return {
      activeKey: '1',
      tabList: [
        {
          key: '1',
          tab: '店铺券'
        },
        {
          key: '2',
          tab: '提现申请'
        },
        {
          key: '3',
          tab: '店员管理'
        }
      ]
    }
  },
  methods: {
    openImg () {
      this.$viewerApi({
        images: this.info.voucher_img_data
      })
    },
    onTabChange (key) {
      this.activeKey = key
    },
    refreshTable () {
      this.onTabChange('1')
      this.$refs.auditTable && this.$refs.auditTable.refreshTable()
      this.$refs.couponTab && this.$refs.couponTab.refreshTable()
      this.$refs.staffTab && this.$refs.staffTab.refreshTable()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .table-action a + a {
  margin-left: 10px;
}
h3 {
  font-weight: bold;
}
</style>
