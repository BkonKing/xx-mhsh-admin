<template>
  <div class="complainDetail">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card">
      <div class="title">流程进度</div>
      <div class="steps">
        <a-steps progress-dot :current="1">
          <a-step title="投诉时间">
            <template #description>
              <div class="description">
                <div class="t1">项目名称-操作者姓名</div>
                <div class="t2">
                  2021-01-01 00:00
                </div>
              </div>
            </template>
          </a-step>
          <a-step title="待处理" description="This is a description." />
          <a-step title="完成" description="This is a description." />
        </a-steps>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">被投诉内容</div>
      <div class="content">
        <a-row>
          <a-col :span="8">
            <div class="item item1">
              <div class="t1">内容类型：</div>
              <div class="t2">提问/提问回复/任务</div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <div class="t1">内容ID：</div>
              <div class="t2">00000000</div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="item">
              <div class="t1">被投诉次数：</div>
              <div class="t2">2</div>
            </div>
          </a-col>
        </a-row>
        <div class="bottom">
          <div class="t1">被投诉内容：</div>
          <div class="t2">
            任务标题/提问内容/提问回复内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card3">
      <div class="title">投诉信息</div>
      <div class="content">
        <a-row>
          <a-col :span='8'>
            <div class="item item1">
              <div class="t1">投诉人：</div>
              <div class="t2"><span style="color:#1890FF">昵称(姓名)</span>
              项目名称
              </div>
            </div>
          </a-col>
          <a-col :span='8'>
            <div class="item">
              <div class="t1">被投诉人：</div>
              <div class="t2">
                <span style="color:#1890FF">昵称(姓名)</span>
              项目名称
              </div>
            </div>
          </a-col>
          <a-col :span='8'>
            <div class="item">
              <div class="t1">投诉时间：</div>
              <div class="t2">2020-11-20  08:50:08</div>
            </div>
          </a-col>
        </a-row>
        <div class="middle">
          <div class="t1">投诉类型：</div>
          <div class="t2">投诉类型</div>
        </div>
        <div class="bottom">
          <div class="t1">投诉描述：</div>
          <div class="t2">
            描述内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          </div>
        </div>
        <div class="imgs">
          <div class="item">
            <img preview="0" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3851937152,723567732&fm=26&gp=0.jpg" alt="">
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$previewRefresh()
  }
}
</script>

<style lang="less" scoped>
.complainDetail {
  /deep/ .ant-card-body {
    padding: 0;
  }
  .card {
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .steps {
      padding: 30px;
    }
  }
  .card2 {
    margin-top: 20px;
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .content {
      padding: 30px 0;
      .item {
        display: flex;
      }
      .item1 {
        margin-left: 30px;
      }
      .bottom {
        margin-top: 15px;
        display: flex;
        margin-left: 16px;
        .t1 {
          width: 84px;
        }
        .t2 {
          flex: 1;
        }
      }
    }
  }
  .card3 {
    margin-top: 20px;
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .content{
      padding: 20px 0;
      .item{
        display: flex;
      }
      .item1{
        margin-left: 30px;
      }
      .middle{
        margin-top: 10px;
        margin-left: 15px;
        display: flex;
      }
    .bottom{
      display: flex;
       margin-top: 10px;
        margin-left: 15px;
      .t1{
        width: 70px;
      }
      .t2{
        flex: 1;
      }
    }
    .imgs{
      margin-top: 10px;
      margin-left: 85px;
      .item{
        width: 104px;
        height: 104px;
        padding: 10px;
        border: 2px dashed rgba(233, 233, 233, 1);
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    }
  }
}
</style>
