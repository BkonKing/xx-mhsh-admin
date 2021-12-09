<template>
  <div class="checkDrawer">
    <a-drawer
      placement="right"
      :closable="false"
      :visible="isShow"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="100%"
    >
      <template #title>
        <div class="title" @click="onClose">
          返回
        </div>
      </template>
      <a-card class="card">
        <img class="darImg" :src="userInfo.avatar" alt="" />
        <div class="info">
          <div class="t1">{{ userInfo.nickname }}</div>
          <div class="t2">{{ userInfo.realname }}</div>
          <div class="t2">
            {{
              userInfo.gender == 1 ? "男" : userInfo.gender == 2 ? "女" : "--"
            }}
          </div>
          <div class="t2">{{ userInfo.mobile }}</div>
        </div>
      </a-card>
      <div class="changeTitle">
        <div
          v-for="(item, index) in titleArr"
          :key="index"
          class="item"
          :class="{ active: currentIndex === index }"
          @click="currentIndex = index"
        >
          {{ item }}
        </div>
      </div>
      <info
        ref="info"
        v-show="currentIndex === 0"
        :userInfo="userInfo"
        :addressData="addressData"
        :houseData="houseData"
      ></info>
      <happyMoney
        ref="happyMoney"
        v-show="currentIndex === 1"
        :uid="uid"
      ></happyMoney>
      <user-shops
        ref="userShops"
        v-show="currentIndex === 2"
        :uid="uid"
      ></user-shops>
    </a-drawer>
  </div>
</template>

<script>
import info from './components/UserInfo'
import happyMoney from './components/happyMoney'
import UserShops from './components/UserShops'
import { getUserInfo } from '@/api/userManage'
export default {
  props: {
    uid: {
      type: [Number, String],
      default: ''
    }
  },
  components: {
    info,
    happyMoney,
    UserShops
  },
  data () {
    return {
      isShow: false,
      titleArr: ['资料', '幸福币', '商家'],
      currentIndex: 0,
      userInfo: {},
      addressData: [],
      houseData: []
    }
  },
  watch: {
    isShow (val) {
      val && this.init()
    }
  },
  methods: {
    init () {
      this.currentIndex = 0
      this.getUserInfo()
      this.$nextTick(() => {
        this.$refs.happyMoney.refresh()
      })
    },
    getUserInfo () {
      getUserInfo({ uid: this.uid }).then(({ data, address, binding }) => {
        this.userInfo = data
        this.addressData = address
        this.houseData = binding
      })
    },
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    onClose () {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.ant-drawer-title {
  .title {
    color: #333;
    cursor: pointer;
  }
}
/deep/ .ant-drawer-body {
  background-color: #f0f2f5;
}
/deep/ .card {
  .darImg {
    float: left;
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right: 20px;
  }
  .info {
    float: left;
    .t1 {
      line-height: 36px;
      font-size: 16px;
      color: #000;
    }
    .t2 {
      line-height: 28px;
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
