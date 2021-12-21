<template>
  <page-header-view
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <coupon-list ref="coupon-list" v-show="tabActiveKey === '0'"></coupon-list>
    <coupon-records
      v-if="!first"
      ref="coupon-records"
      v-show="tabActiveKey === '1'"
    ></coupon-records>
  </page-header-view>
</template>

<script>
// /store/coupon
import CouponList from './components/CouponList'
import CouponRecords from './components/CouponRecords'

export default {
  name: 'storeCoupon',
  components: {
    CouponList,
    CouponRecords
  },
  data () {
    return {
      tabList: [
        { key: '0', tab: '券列表' },
        { key: '1', tab: '领取记录' }
      ],
      tabActiveKey: '0',
      first: true
    }
  },
  created () {},
  activated () {
    this.tabActiveKey === '0' ? this.refreshTable('coupon-list') : this.refreshTable('coupon-records')
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
      this.first = false
    },
    refreshTable (ref) {
      this.$refs[ref] && this.$refs[ref].refreshTable()
    }
  }
}
</script>
