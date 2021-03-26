<template>
  <div class="accountRecharge">
    <page-header-wrapper>
      <template #content>
        <div class="header">
          <div class="left">
            <div
              class="item"
              :class="{ active: currentIndex === 0 }"
              @click="currentIndex = 0"
            >
              充值记录
            </div>
            <div
              class="item"
              :class="{ active: currentIndex === 1 }"
              @click="currentIndex = 1"
            >
              充值设置
            </div>
          </div>
          <div class="right" v-if="projectID === 1">
            <div class="item">
              <div class="t1">短信剩余</div>
              <div class="t2">{{ smsUseInfo.srmeain_numbers }}</div>
              <div class="t3">使用{{ smsUseInfo.suseremain_numbers }}</div>
            </div>
            <div class="line"></div>
            <div class="item">
              <div class="t1">支付通道剩余</div>
              <div class="t2">{{ smsUseInfo.spayment_limit }}</div>
              <div class="t3">使用{{ smsUseInfo.susepayment_limit }}</div>
            </div>
          </div>
          <div class="right" v-if="projectID!==1">
            <div class="item">
              <div class="t1">短信剩余</div>
              <div class="t2">{{ smsUseInfo.srmeain_numbers }}</div>
              <div class="t3">使用{{ smsUseInfo.suseremain_numbers }}</div>
            </div>
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <rechargeRecord v-if="currentIndex === 0"></rechargeRecord>
    <rechargeSet v-else></rechargeSet>
  </div>
</template>

<script>
import rechargeRecord from './rechargeRecord'
import rechargeSet from './rechargeSet'
import { getSmsUseInfo } from '@/api/financeCenter.js'
import Cookies from 'js-cookie'
export default {
  components: {
    rechargeRecord,
    rechargeSet
  },
  data () {
    return {
      currentIndex: 0,
      smsUseInfo: '',
      projectID: ''
    }
  },
  async created () {
    const res2 = await getSmsUseInfo()
    this.smsUseInfo = res2.data
    window.localStorage.setItem('smsUseInfo', JSON.stringify(res2.data))
    // console.log('短信使用信息', res2)
    this.projectID = +Cookies.get('project_id')
    // console.log('this.projectID', typeof this.projectID)
  }
}
</script>

<style lang="less" scoped>
.accountRecharge {
  /deep/ .ant-page-header {
    padding-bottom: 0;
  }
  /deep/ .ant-page-header-content {
    overflow: inherit;
  }
  .header {
    position: relative;
    .left {
      display: flex;
      align-items: center;
      .item {
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-right: 20px;
        cursor: pointer;
      }
      .active {
        border-bottom: 1px solid #1890ff;
        color: #1890ff;
      }
    }
    .right {
      position: absolute;
      top: -70px;
      right: 0;
      z-index: 9999999999;
      display: flex;
      align-items: center;
      .item {
        text-align: right;
        padding-right: 24px;
        .t1 {
          color: #959494;
        }
        .t2 {
          margin: 5px 0;
          font-size: 25px;
          font-weight: 600;
        }
        .t3 {
          color: #959494;
        }
      }
      .line {
        margin: 0 15px;
        width: 1px;
        height: 36px;
        background-color: #e9e9e9;
      }
    }
  }
}
</style>
