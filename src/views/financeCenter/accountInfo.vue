<template>
  <page-header-wrapper>
    <div class="accountInfo">
      <a-card class="card"  size="default">
        <div class="top">
          <img src="@/assets/imgs/account_logo.png" alt="" />
          <h3>{{ accountInfo.account }}</h3>
        </div>
        <div class="middle">
          <div class="item">
            <div class="t1">幸福币</div>
            <div class="t2">
              <dic class="txt">{{ accountInfo.credits }}</dic>
            </div>
            <a-button type="link">
              <a
                :href="
                  projectID
                    ? '/xmht/credits/grant/getTransferApplyList'
                    : '/zht/credits/grant/getTransferApplyList'
                "
                target="_parent"
                >
                <span v-if="accountInfo.is_open===1">转账</span>
                <span v-else>开通</span>
                </a
              >
            </a-button>
          </div>
          <div class="line"></div>
          <div class="item">
            <div class="t1">短信</div>
            <div class="t2">
              <div class="txt">{{ accountInfo.sms_total }} <span>条</span></div>
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
              <div class="txt">{{ accountInfo.spayment_limit=== '0.00'?'0':accountInfo.spayment_limit}} <span>元</span></div>
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
    display: inline-block;
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
      // display: flex;
      // align-items: center;
      border-bottom: 2px dashed #e9e9e9;
      padding-bottom: 30px;
      text-align: center;
      .item {
        padding: 0 30px;
        // flex: 1;
        display: inline-block;
        min-width: 120px;
        text-align: center;
        .t1 {
          font-family: "MicrosoftYaHei", "Microsoft YaHei";
          font-weight: 400;
          font-style: normal;
          color: rgba(0, 0, 0, 0.427450980392157);
          text-align: center;
        }
        .t2 {

          .txt {
            white-space: nowrap;
            font-size: 24px;
            color: rgba(0, 0, 0, 0.847058823529412);
            text-align: center;
            span{
              font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    font-size: 14px;
    color: rgba(0, 0, 0, 0.427450980392157);
            }
          }
        }
      }
      .item:first-child{
        padding-left: 0;
      }
      .item:last-child{
        padding-right: 0;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 36px;
        background-color: #e9e9e9;
        margin-bottom: 20px;
      }
    }
    .bottom {
      // display: flex;
      // align-items: center;
      margin-top: 50px;
      margin-right: 15px;
      text-align: center;
      .item {
         display: inline-block;
        min-width: 120px;
        // flex: 1;
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
          white-space: nowrap;
          font-size: 24px;
          color: rgba(0, 0, 0, 0.847058823529412);
          text-align: center;
        }
      }
      .item:first-child{
        padding-right: 30px;
      }
      .item:last-child{
        padding-left: 30px;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 36px;
        background-color: #e9e9e9;
      }
    }
  }
}
</style>
