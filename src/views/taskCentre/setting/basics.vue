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
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <a-card class="card">
      <div class="title">功能开关</div>
      <div class="content">
        <div class="left">任务功能：</div>
        <div class="right">
          <div class="top">
            <div class="t1">
              全部用户 <a-switch style="marginLeft:10px" default-checked @change="onChange" />
            </div>
            <div class="t2">
              对全部用户开放任务功能，APP端显示任务模块、可发布任务、可见任务
            </div>
          </div>
          <div class="bottom">
            <div class="t1">
              白名单用户 <a-switch style="marginLeft:10px" default-checked :disabled="disabled" />
            </div>
            <div class="t2">
              仅对白名单用户开放任务功能，APP端白名单用户显示任务模块、可发布任务、可见任务
            </div>
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">基础设置</div>
      <div class="content">
        <div class="top">
          <span>任务交易关闭：任务结束</span>
          <a-input  v-model="value1" style="width:87px;textAlign: center;"></a-input>
          <span>天后关闭交易，不可再进行投诉、评价、任务方幸福币冻结</span>
        </div>
        <div class="mid">
          <span>群人数上限：</span>
          <a-input v-model="value2" style="width:87px;textAlign: center;"></a-input>
          <span>人</span>
        </div>
        <div class="bottom">
          <span>任务处理客服：</span>
          <a-input v-model="value3" onkeyup="value=value.replace(/[\u4E00-\u9FA5]|[A-Za-z]/g,'')" style="width:440px"></a-input>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentIndex: 1,
      disabled: true,
      value1: 10,
      value2: 500,
      value3: ''
    }
  },
  methods: {

     onChange (checked) {
      if (checked == false) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.basics {
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
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content {
      padding: 30px;
      display: flex;
      .left {
        width: 70px;
      }
      .right {
        flex: 1;
        .top {
          .t2 {
            margin-top: 10px;
            font-family: MicrosoftYaHei, "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447);
          }
        }
        .bottom{
          margin-top: 10px;
          .t2 {
            margin-top: 10px;
            font-family: MicrosoftYaHei, "Microsoft YaHei";
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.447);
          }
        }
      }
    }
  }
  .card2{
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    .content{
      padding: 30px;
      .top{
        span{
          margin: 0 10px;
        }
      }
      .mid{
        margin-top: 20px;
        margin-left: 12px;
        span{
           margin: 0 10px;
        }
      }
      .bottom{
         margin-top: 20px;
        margin-left: 8px;
      }
    }
  }
}
</style>
