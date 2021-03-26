<template>
  <div class="detailModel">
    <a-modal
v-model="isShow"
             :title="title"
             :footer='null'>
      <div
class="income"
           v-if="title==='收入分类明细'">
        <p>转账</p>
        <p>+10000</p>
        <p>10笔</p>
      </div>
      <div v-else-if="title==='支出分类明细'">
        <a-row>
          <a-col
:span='8'
                 :offset='2'>
            <p>转账</p>
            <p>+10000</p>
            <p>10笔</p>
          </a-col>
          <a-col :span='8'>
            <p>转账</p>
            <p>+10000</p>
            <p>10笔</p>
          </a-col>
          <a-col :span='6'>

          </a-col>
        </a-row>
      </div>
      <div v-else>
        <a-row>
          <a-col
:span='8'
                 :offset='2'>
            <p>购物</p>
            <p>+10000</p>
            <p>10笔</p>
          </a-col>
          <a-col :span='8'>
            <p>退款</p>
            <p>+10000</p>
            <p>10笔</p>
          </a-col>
          <a-col :span='6'>
            <p>提现</p>
            <p>+10000</p>
            <p>10笔</p>
          </a-col>
        </a-row>
      </div>
      <div class="btn">
        <a-button
type='primary'
                  @click="isShow=false">知道了</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      title: '收入分类明细'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.income {
  margin-left: 30px;
}
.btn {
  margin-top: 20px;
  text-align: center;
}
</style>
