<template>
  <div class="info">
    <a-card class="card">
      <div class="title">基础信息</div>
      <div class="content">
        <a-row class="row">
          <a-col :span='10'>
            <div class="t1">生日: <span></span></div>
            <div class="t2">幸福币：<span>6</span></div>
          </a-col>
          <a-col :span='10'>
            <div class="t1">角色：<span>游客</span></div>
            <div class="t2">注册时间：<span>2021-01-14 14:52:52</span></div>
          </a-col>
          <a-col :span='4'>消费总额: <span>0.00</span></a-col>
        </a-row>
      </div>
    </a-card>
    <a-card class="card2">
      <a-row>
        <div class="title">
          <div class="t1">收货地址</div>
          <div class="t2">收件人</div>
          <div class="t3">手机号</div>
        </div>
        <div class="bottom"></div>
      </a-row>
    </a-card>
    <a-card class="card2">
      <a-row>
        <div class="title">
          <div class="t1">房产信息</div>
          <div class="t2">角色</div>
          <div class="t3">绑定</div>
        </div>
        <div class="bottom"></div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.info {
  .card {
    margin-top: 20px;
    .title {
      border-bottom: 1px solid #ccc;
      padding-bottom: 15px;
      font-weight: 600;
    }
    /deep/ .ant-card-body {
      padding: 15px;
    }
    .content {
      width: 100%;
      .row {
        width: 100%;
        // padding: 15px;
        div {
          line-height: 40px;
        }
        span {
          color: #ccc;
        }
      }
    }
  }
  .card2 {
    margin-top: 20px;
    /deep/.ant-card-body {
      padding: 15px;
    }
    .title {
      // padding: 0 10px;
      display: flex;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      .t1 {
        flex: 3;
      }
      .t2 {
        flex: 1;
      }
      .t3 {
        flex: 1;
      }
    }
    .bottom {
      height: 30px !important;
    }
  }
}
</style>
