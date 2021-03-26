<template>
  <div class="setAccount">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <div class="avatar">
            头像
          </div>
          <div class="title">美好生活家园运营中心</div>
          <div class="happyMoney">
            <div class="t1">
              <div>可用幸福币</div>
              <div class="num">100000</div>
            </div>
            <div class="t2">
              <div>不可用幸福币</div>
              <div class="num">500</div>
            </div>
          </div>
          <div class="btns">
            <a-button
              type="primary"
              @click="$router.push('/happyMoney/transfer')"
              >转账</a-button
            >
            <a-button
              type="primary"
              @click="$router.push('/happyMoney/detailTotal')"
              >明细</a-button
            >
          </div>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card class="panelCard">
          <div class="panel">
            <div class="t1">
              <span class="s1">账户</span>
              <span> 河南省美好生活家园运营中心</span>
            </div>
            <div class="t1">
              <span class="s2">手机号</span>
              <span>15000000000</span>
              <span class="unbind">解绑</span>
            </div>
            <div class="t1">
              <span class="s3">支付密码</span>
              <span>******</span>
              <span class="reset">重置</span>
            </div>
            <div class="t1">
              <span class="s4">地址</span>
              <span>河南省XXXXXXXXXXXXXXXXXXXXXXXXXX</span>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-card class="card">
      <div class="top">
        <div class="left">幸福币账户</div>
        <div class="right">
          <a-date-picker />
        </div>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <div class="txt">幸福币总数</div>
            <div class="num">400500</div>
          </li>
          <li>
            <div class="txt">总部持有</div>
            <div class="num">1000500</div>
          </li>
          <li>
            <div class="txt">项目持有</div>
            <div class="num">1000000</div>
            <div class="t1">6个项目 <span @click="openHole">详细</span></div>
          </li>
          <li>
            <div class="txt">用户持有</div>
            <div class="num">1000000</div>
            <div class="t1">200个用户</div>
          </li>
          <li>
            <div class="txt">消费总账户</div>
            <div class="num">10000000</div>
          </li>
        </ul>
      </div>
    </a-card>
    <holeModel ref="holeModel"></holeModel>
  </div>
</template>

<script>
import holeModel from './holeModel'
export default {
  components: {
    holeModel
  },
  methods: {
    // 打开项目持有
    openHole () {
      this.$refs.holeModel.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.setAccount {
  .avatar {
    color: #ccc;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #f2f2f2;
    line-height: 100px;
    text-align: center;
  }
  .title {
    margin-top: 20px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }
  .happyMoney {
    .t1 {
      margin-top: 30px;
      .num {
        font-weight: 600;
        font-size: 18px;
      }
    }
    .t2 {
      margin-top: 20px;
      .num {
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
  .btns {
    margin-top: 20px;
    text-align: center;
    button {
      margin: 0 10px;
    }
  }
  /deep/.ant-card-body {
    height: 394px;
  }
  .panel {
    line-height: 40px;
    .t1 {
      span:nth-child(1) {
        color: #ccc;
      }
      .s1 {
        margin-right: 50px;
      }
      .s2 {
        margin-right: 40px;
      }
      .s3 {
        margin-right: 30px;
      }
      .s4 {
        margin-right: 55px;
      }
      .unbind {
        color: #ccc;
        margin-left: 10px;
      }
      .reset {
        color: #ccc;
        margin-left: 10px;
      }
    }
  }
  .card {
    /deep/ .ant-card-body {
      height: 226px;
    }
    margin-top: 20px;
    .ant-card-body {
      padding: 0;
    }
    .top {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
    }
    .bottom {
      margin-top: 30px;
      ul {
        display: flex;
        li {
          list-style: none;
          flex: 1;
          .num {
            margin-top: 20px;
            font-size: 20px;
            font-weight: 600;
          }
          .t1 {
            margin-top: 20px;
            span {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
