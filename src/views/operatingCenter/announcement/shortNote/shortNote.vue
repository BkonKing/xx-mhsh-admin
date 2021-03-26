<template>
  <div class="shortNote">
    <page-header-wrapper>
      <template #content>
        <div class="tabs">
          <div
class="item"
               @click="changeTabs(index)"
               v-for="(item, index) in tabs"
               :key="index"
               :class="{active:currentIndex===index}">
            <span>{{item}}</span>
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <noteList v-if="currentIndex===0"></noteList>
    <history v-else-if="currentIndex===1"></history>
    <noteTemplate v-else></noteTemplate>
  </div>
</template>

<script>
import noteList from './noteList/noteList'
import history from './history/history'
import noteTemplate from './noteTemplate/noteTemplate'
export default {
  components: {
    noteList,
    history,
    noteTemplate
  },
  data () {
    return {
      tabs: ['短信列表', '推送历史', '短信模板', '短信设置'],
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

<style lang="less" scoped>
.shortNote {
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
