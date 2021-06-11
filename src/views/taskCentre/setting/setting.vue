<template>
  <div class="basics">
    <page-header-wrapper>
      <template #content>
        <div class="task-top">
          <div
            class="item"
            @click="currentIndex = 1"
            :class="{ active: currentIndex === 1 }"
          >
            基础
          </div>
          <div
            class="item"
            @click="currentIndex = 2"
            :class="{ active: currentIndex === 2 }"
          >
            审核投诉
          </div>
          <div
            class="item"
            @click="currentIndex = 3"
            :class="{ active: currentIndex === 3 }"
          >
            任务类型
          </div>
          <div
            class="item"
            @click="currentIndex = 4"
            :class="{ active: currentIndex === 4 }"
          >
            白名单
            <a-tooltip>
              <template slot="title">
                用户发布任务、提问免审核
              </template>
              <a-icon style="color:black" type="info-circle" />
            </a-tooltip>
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <div class="content">
      <basics ref="basics" v-if="currentIndex === 1"></basics>
      <complainCheck v-else-if="currentIndex === 2"></complainCheck>
      <taskType v-else-if="currentIndex === 3"></taskType>
      <whiteList v-else></whiteList>
    </div>
  </div>
</template>

<script>
import basics from './basics'
import complainCheck from './complainCheck'
import taskType from './taskType'
import whiteList from './whiteList'
export default {
  components: {
    basics,
    complainCheck,
    taskType,
    whiteList
  },
  data () {
    return {
      currentIndex: 1
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.basics {
  padding-bottom: 20px;
  /deep/ .ant-page-header {
    padding-bottom: 0px !important;
  }
  .task-top {
    display: flex;
    align-items: center;

    .item {
      padding: 0 20px;
      cursor: pointer;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      font-family: "MicrosoftYaHei", "Microsoft YaHei";
      line-height: 50px;
      border-bottom: 2px solid transparent;
    }
    .active {
      color: #1890ff;
      border-bottom: 2px solid #1890ff;
    }
  }
  .content {
    padding: 0 20px;
  }
}
</style>
