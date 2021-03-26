<template>
  <div class="holdModel">
    <a-modal v-model="isShow" title="项目持有" :footer="null">
      <div class="content">
        <div class="item">
          <div class="txt">新乡美好生活家园</div>
          <div class="num">10000</div>
        </div>
        <div class="item">
          <div class="txt">新乡美好生活家园</div>
          <div class="num">10000</div>
        </div>
        <div class="item">
          <div class="txt">新乡美好生活家园</div>
          <div class="num">10000</div>
        </div>
        <div class="item">
          <div class="txt">新乡美好生活家园</div>
          <div class="num">10000</div>
        </div>
      </div>
      <div class="btn">
        <a-button type="primary" @click="isShow = false">知道了</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 33.33333333%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .num {
      font-weight: 600;
      margin-top: 5px;
    }
  }
}
.btn {
  text-align: center;
}
</style>
