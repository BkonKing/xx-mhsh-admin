<template>
  <page-header-wrapper>
    <div class="accountInfo">
      <a-card class="card" style="width:360px">
        <div class="top">
          <img src="@/assets/imgs/account_logo.png" alt="" />
          <h3>{{ accountInfo.nickname }}</h3>
        </div>
        <div class="middle">
          <div class="item">
            <div class="t1">幸福币</div>
            <div class="t2">
              <span>{{ accountInfo.credits }}</span>
            </div>
            <a-button type="link">
              <a
                :href="
                  projectID
                    ? '/xmht/credits/grant/getTransferApplyList'
                    : '/zht/credits/grant/getTransferApplyList'
                "
                target="_parent"
                >开通</a
              >
            </a-button>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="t1">短信</div>
            <div class="t2">
              <span>{{ accountInfo.sms_total }}</span> 条
            </div>
            <a-button type="link">
              <a
                :href="
                  projectID
                    ? '/xmht/recharge/recharge/getRechargeList'
                    : '/zht/recharge/recharge/getRechargeList'
                "
                target="_parent"
                >充值</a
              >
            </a-button>
          </div>
          <div class="line" v-if="projectID"></div>
          <div class="item" v-if="projectID">
            <div class="t1">支付通道</div>
            <div class="t2">
              <span>{{ accountInfo.spayment_limit=== '0.00'?'0':accountInfo.spayment_limit}}</span> 元
            </div>
            <a-button type="link">
              <a
                :href="
                  projectID
                    ? '/xmht/recharge/recharge/getRechargeList'
                    : '/zht/recharge/recharge/getRechargeList'
                "
                target="_parent"
                >充值</a
              >
            </a-button>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="t1">用户</div>
            <div class="t2">{{ accountInfo.user_total }}</div>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="t1">{{ projectID ? "业主" : "项目" }}</div>
            <div class="t2">
              {{ projectID ? accountInfo.yz_total : accountInfo.project_total }}
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getAccountInfo } from '@/api/financeCenter'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      accountInfo: {},
      projectID: ''
    }
  },
  async created () {
    // 获取账户信息
    const res = await getAccountInfo()
    this.accountInfo = res.data
    this.projectID = +Cookies.get('project_id') || ''
    // console.log('this.projectID', this.projectID)
    console.log('账户信息', res)
  }
}
</script>

<style lang="less" scoped>
.accountInfo {
  .card {
    width: 362px !important;
    height: 624px;

    .top {
      text-align: center;
      img {
        width: 132px;
        height: 132px;
      }
      h3 {
        font-family: "PingFangSC-Semibold", "PingFang SC Semibold",
          "PingFang SC";
        font-weight: 650;
        font-style: normal;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.847058823529412);
        text-align: center;
      }
    }
    .middle {
      margin-top: 60px;
      display: flex;
      align-items: center;
      border-bottom: 2px dashed #e9e9e9;
      padding-bottom: 30px;
      .item {
        flex: 1;
        text-align: center;
        .t1 {
          font-family: "MicrosoftYaHei", "Microsoft YaHei";
          font-weight: 400;
          font-style: normal;
          color: rgba(0, 0, 0, 0.427450980392157);
          text-align: center;
        }
        .t2 {

          span {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.847058823529412);
            text-align: center;
          }
        }
      }
      .line {
        width: 1px;
        height: 36px;
        background-color: #e9e9e9;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      margin-left: 35px;
      margin-top: 50px;
      .item {
        width: 120px;
        text-align: center;
        .t1 {
          font-family: "MicrosoftYaHei", "Microsoft YaHei";
          font-weight: 400;
          font-style: normal;
          color: rgba(0, 0, 0, 0.427450980392157);
          text-align: center;
          // margin-bottom: 10px;
        }
        .t2 {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.847058823529412);
          text-align: center;
        }
      }
      .line {
        width: 1px;
        height: 36px;
        background-color: #e9e9e9;
      }
    }
  }
}
</style>
