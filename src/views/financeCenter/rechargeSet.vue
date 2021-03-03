<template>
  <div class="rechargeSet">
    <a-card class="card">
      <div class="title">预警</div>
      <div class="content">
        <div class="t1">
          短信剩余条数小于 <a-input v-model="input1"></a-input>时，短信提醒指定人
        </div>
        <div class="t2">
          支付通道剩余额度小于<a-input v-model="input1"></a-input>时，短信提醒指定人
        </div>
        <div class="t3">
          <a-button type='primary'>提交</a-button>
        </div>
      </div>
    </a-card>
    <a-card class="card">
      <div class="title">预警</div>
      <div class="content">
        <div class="t1">
          短信剩余条数小于 <a-input v-model="input1"></a-input>时，短信提醒指定人
        </div>
        <div class="t2">
          支付通道剩余额度小于<a-input v-model="input1"></a-input>时，短信提醒指定人
        </div>
        <div class="t4">
          项目方支付剩余额度小于 <a-input v-model="input1"></a-input>时，短信提醒指定人
        </div>
        <div class="t3">
          <a-button type='primary'>提交</a-button>
        </div>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">充值提醒 <span>剩余不足时通知提醒指定手机</span></div>
      <div class="content">
        <div class="t1">
          <span>余额：</span>
          15050505050；15050505050(姓名)；15050505050(姓名名)；15050505050(姓名名)；
          <a-icon class="icon"
                  type="edit"
                  @click="$refs.remindModel.isShow=true" />
        </div>
        <div class="t2">
          <span>短信：</span>
          15050505050；15050505050(姓名)；15050505050(姓名名)；15050505050(姓名名)；15050505050(姓名名)；15050505050(姓名名)；
          <a-icon class="icon"
                  type="edit"
                  @click="$refs.remindModel.isShow=true" />
        </div>
        <div class="t3">
          <span>支付通道：</span>
          15050505050；15050505050(姓名);
          <a-icon class="icon"
                  type="edit"
                  @click="$refs.remindModel.isShow=true" />
        </div>
      </div>
    </a-card>
    <remindModel ref="remindModel"></remindModel>
  </div>
</template>

<script>
import remindModel from './remindModel'
export default {
  components: {
    remindModel
  },
  data () {
    return {
      input1: 200
    }
  }
}
</script>

<style lang='less' scoped>
.rechargeSet {
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding-left: 0;
      padding-right: 0;
    }
    .title {
      font-weight: 700;
      font-size: 18px;
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 20px;
      padding-left: 30px;
      color: #272727;
    }
    .content {
      padding-top: 30px;
      padding-left: 30px;
      input {
        width: 100px;
        margin: 0 10px;
        text-align: center;
      }
      .t2 {
        margin-top: 20px;
      }
      .t3 {
        margin-top: 20px;
        margin-left: 100px;
      }
      .t4 {
        margin-top: 20px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding-left: 0;
      padding-right: 0;
    }
    .title {
      padding-left: 30px;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid #ebebeb;
      padding-bottom: 20px;
      span {
        font-size: 12px;
        color: #9e9797;
        font-weight: 400;
      }
    }
    .content {
      padding-left: 70px;
      padding-top: 20px;
      .t1 {
        margin-bottom: 20px;
      }
      .t2 {
        margin-bottom: 20px;
      }
      span {
        color: #37313b;
      }
      .icon {
        color: #67b5ff;
        font-weight: 600;
      }
    }
  }
}
</style>
