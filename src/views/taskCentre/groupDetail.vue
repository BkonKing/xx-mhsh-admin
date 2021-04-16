<template>
  <div class="groupDetail">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card">
      <div class="title">基础信息</div>
      <div class="content">
        <a-row>
        <a-col :span='8'>
          <div class="item">
            <span>群ID：</span>
            <span>000000</span>
          </div>
        </a-col>
        <a-col :span='8'>
          <div class="item">
            <span>群名称：</span>
            <span>名称名称名称</span>
            <a-icon type="edit" style="color:#1890ff" />
          </div>
        </a-col>
        <a-col :span='8'>
          <div class="item">
            <span>群主：</span>
            <span style="color:#1890ff;marginRight:10px">昵称(王小明)</span>
            <span style="color:#1890ff">1500000000</span>
          </div>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span='8'>
          <div class="item">
            <span>成员：</span>
            <span>100人</span>
          </div>
        </a-col>
        <a-col :span='8'>
          <div class="item">
            <span>允许加入：</span>
             <a-switch default-checked  />
          </div>
        </a-col>
        <a-col :span='8'>
          <div class="item">
            <span>创建时间：</span>
            <span>2020-11-20  08:50:08</span>
          </div>
        </a-col>
      </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.groupDetail {
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .content{
      padding: 30px 40px;
      .item{
      display: flex;
      align-items: center;
    }
    .row{
      margin-top: 10px;
    }
    }
  }
}
</style>
