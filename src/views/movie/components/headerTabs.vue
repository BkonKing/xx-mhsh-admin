<template>
  <div class="header-tabs">
    <a-tabs :default-active-key="tabIndex" @change="tabSelect">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabIndex: {
      type: String,
      default: '0'
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    tabSelect (key) {
      this.$emit('tabCall', key)
    }
  }
}
</script>

<style less lang="less">
.header-tabs {
  padding-left: 24px;
  margin: -24px -24px 24px;
  background-color: #fff;
  /deep/ .ant-tabs .ant-tabs-bar {
    margin-bottom: 0;
  }
}
</style>
