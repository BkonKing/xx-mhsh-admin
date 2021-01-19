<template>
  <div class="appmessage">
    <page-header-wrapper>
      <template #content>
        <div class="tabs">
          <div class="item"
               @click="changeTabs(index)"
               v-for="(item, index) in tabs"
               :key="index"
               :class="{active:currentIndex===index}">
            <span>{{item}}</span>
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <msgList v-if="currentIndex===0"></msgList>
    <history v-else-if="currentIndex===1"></history>
    <msgTemplate v-else></msgTemplate>
  </div>
</template>

<script>
import msgList from './msgList/msgList'
import history from './history/history'
import msgTemplate from './msgTemplate/msgTemplate'
export default {
  components: {
    msgList,
    history,
    msgTemplate
  },
  data () {
    return {
      tabs: ['消息列表', '推送历史', '消息模块'],
      currentIndex: 2
    }
  },
  methods: {
    // 切换tabs
    changeTabs (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang='less'>
.appmessage {
  .ant-page-header {
    padding-bottom: 0px;
  }
  .ant-page-header-content {
    padding-top: 0;
  }
  .tabs {
    display: flex;
    align-items: center;
    .item {
      width: 100px;
      height: 40px;
      // border: 1px solid #cccccc;
      text-align: center;
      line-height: 40px;
      margin-right: 20px;
      cursor: pointer;
    }
    .active {
      border-bottom: 2px solid #1890ff;
      color: #1890ff;
    }
  }
}
</style>
