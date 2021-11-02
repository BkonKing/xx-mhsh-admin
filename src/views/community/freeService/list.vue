<template>
  <page-header-view
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <reservation-list v-show="tabActiveKey === '0'"></reservation-list>
    <service-list v-show="tabActiveKey === '1'"></service-list>
  </page-header-view>
</template>

<script>
/// community/freeService/list
import PageHeaderView from '@/layouts/PageHeaderView'
import ReservationList from './components/ReservationList'
import ServiceList from './components/ServiceList.vue'

export default {
  components: {
    PageHeaderView,
    ReservationList,
    ServiceList
  },
  data () {
    return {
      tabList: [
        { key: '0', tab: '预约列表' },
        { key: '1', tab: '服务项目' }
      ],
      tabActiveKey: '0'
    }
  },
  created () {
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
    }
  }
}
</script>

<style></style>
