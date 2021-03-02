<template>
  <div class="accountInfo">
    <a-card class="card"
            style="width:360px">
      <div class="top">
        <img src="@/assets/imgs/account_logo.png"
             alt="">
        <h3>
          XX美好生活家园
        </h3>
      </div>
      <div class="middle">
        <div class="item">
          <div class="t1">幸福币</div>
          <div class="t2"> <span>50000</span> </div>
          <a-button type="link"
                    @click="$router.push('/happyMoney/transfer')">
            转账
          </a-button>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="t1">短信</div>
          <div class="t2"><span>10000</span> 条</div>
          <a-button type="link">
            充值
          </a-button>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="t1">支付通道</div>
          <div class="t2"><span>10W</span> 元</div>
          <a-button type="link">
            充值
          </a-button>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <div class="t1">用户</div>
          <div class="t2">50000</div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="t1">项目</div>
          <div class="t2">100</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.accountInfo {
  .card {
    .top {
      text-align: center;
      h3 {
        font-weight: 600;
        font-size: 24px;
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
          color: #969696;
        }
        .t2 {
          margin: 10px 0;
          color: #969696;
          span {
            font-size: 18px;
            font-weight: 600;
            color: #2a2727;
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
      margin-top: 50px;
      .item {
        flex: 1;
        text-align: center;
        .t1 {
          color: #969696;
          margin-bottom: 10px;
        }
        .t2 {
          font-size: 18px;
          font-weight: 600;
          color: #2a2727;
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
