<template>
  <page-header-view
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <reservation-list v-show="tabActiveKey === '0'"></reservation-list>
    <server-list v-if="!first" v-show="tabActiveKey === '1'"></server-list>
  </page-header-view>
</template>

<script>
// /community/freeServer/list
import PageHeaderView from '@/layouts/PageHeaderView'
import ReservationList from './components/ReservationList'
import ServerList from './components/ServerList.vue'

export default {
  name: 'freeServerList',
  components: {
    PageHeaderView,
    ReservationList,
    ServerList
  },
  data () {
    return {
      tabList: [
        { key: '0', tab: '预约列表' },
        { key: '1', tab: '服务项目' }
      ],
      tabActiveKey: '0',
      first: true
    }
  },
  created () {
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
      this.first = false
    }
  }
}
</script>

<style></style>
