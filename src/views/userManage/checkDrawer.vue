<template>
  <div class="checkDrawer">
    <a-drawer placement="right"
              :closable="false"
              :visible="isShow"
              :after-visible-change="afterVisibleChange"
              @close="onClose"
              width='86%'>
      <template #title>
        <div class="title"
             @click="onClose">
          返回
        </div>
      </template>
      <a-card class="card">
        <img class="darImg"
             src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1760725091,1658242212&fm=26&gp=0.jpg"
             alt="">
        <div class="info">
          <div class="t1">15655555555</div>
          <div class="t2">女</div>
          <div class="t3">15392053198</div>
        </div>
      </a-card>
      <div class="changeTitle">
        <div class="item"
             @click="currentIndex=index"
             :class="{active:currentIndex===index}"
             v-for="(item, index) in titleArr"
             :key="index">{{item}}</div>
      </div>
      <info ref="info"
            v-if="currentIndex===0"></info>
      <happyMoney v-else
                  ref="happyMoney"></happyMoney>
    </a-drawer>
  </div>
</template>

<script>
import info from './info'
import happyMoney from './happyMoney'
export default {
  components: {
    info,
    happyMoney
  },
  data () {
    return {
      isShow: false,
      titleArr: ['资料', '幸福币'],
      currentIndex: 0
    }
  },
  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    onClose () {
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped>
.ant-drawer-title {
  .title {
    color: #c7cace;
    cursor: pointer;
  }
}
/deep/ .ant-drawer-body {
  background-color: #f0f2f5;
  height: 100%;
}
/deep/ .card {
  /deep/ .darImg {
    float: left;
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right: 20px;
  }
  .info {
    float: left;
    div {
      margin: 5px 0;
    }
  }
}
.changeTitle {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: #c7cace;
  color: white;
  .item {
    width: 120px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    background-color: #262c33;
  }
}
</style>
