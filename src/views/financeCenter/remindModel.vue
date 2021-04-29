<template>
  <a-modal v-model="isShow" @ok="submit">
    <template #title>
      <div class="title">充值提醒 <span>余额</span></div>
    </template>
    <div class="content">
      <div class="left">手机号：</div>
      <div class="right">
        <div class="item" v-for="(item, index) in list" :key="item.id">
          <a-input
            @input="getData(index, $event)"
            v-model="item.phone"
            placeholder="手机号"
            :maxLength="11"
            style="width:200px"
          ></a-input>
          <a-input
            v-model="item.name"
            :disabled="false"
            @input="getData(index, $event)"
            style="width:200px"
            placeholder="姓名"
            :maxLength="10"
          ></a-input>
          <a-icon
            type="plus"
            class="plus"
            @click="add"
            v-if="list.length != 5"
          />
          <a-icon type="close" class="close" @click="del(index)" />
        </div>
        <div class="box" v-if="userInfoList.length > 0">
          <div class="boxtitle">全部</div>
          <div
            class="item"
            v-for="item in userInfoList"
            :key="item.id"
            @click="selectUser(item)"
          >
            <div class="username">
              {{ item.realname }}
            </div>
            <div class="phone">
              {{ item.mobile }}
            </div>
            <a-tag color="blue">
              {{ item.type_desc }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { setReminder, getUserInfo } from '@/api/financeCenter.js'
export default {
  data () {
    return {
      isShow: false,
      list: [{ id: Math.random() * 999, name: '', phone: '' }],
      type: '',
      userInfoList: [],
      showBox: false,
      currentIndex: 0,
      elm: '',
      userData: ''
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.userInfoList = []
        this.list = [{ id: Math.random() * 999, name: '', phone: '' }]
      }
    },
    userData (newVal) {
      console.log('newVal', newVal)
      if (newVal.length === 0) {
        this.list = [{ id: Math.random() * 999, name: '', phone: '' }]
      } else {
        this.list = this.userData.map(item => {
          return {
            id: Math.random() * 999,
            phone: item.mobile,
            name: item.realname
          }
        })
      }
    }
  },
  methods: {
    // 选择用户
    selectUser (item) {
      this.list[this.currentIndex].name = item.realname
      this.list[this.currentIndex].phone = item.mobile
      this.userInfoList = []
      this.elm.disabled = true
      // console.log(this.elm)
    },
    // 获取用户信息
    async getData (index, e) {
      this.currentIndex = index
      console.log('事件对象', e)
      this.elm = e.target
      if (this.list[index].phone.length === 11) {
        const res = await getUserInfo({
          realname: this.list[index].name,
          mobile: this.list[index].phone
        })
        // console.log('用户信息', res)
        this.userInfoList = res.data.list
      }
      if (this.list[index].name) {
        const res = await getUserInfo({
          realname: this.list[index].name,
          mobile: this.list[index].phone
        })
        // console.log('用户信息', res)
        this.userInfoList = res.data.list
      }
    },
    // 设置提醒用户
    async submit () {
      // console.log(this.list)
     let arr = this.list.map(item => {
        if (item.name !== '' && item.phone != '') {
          return {
            realname: item.name,
            mobile: item.phone
          }
        }
      })
      // console.log(arr)
    arr = arr.filter(item => {
        return item != undefined
      })
      console.log(arr)
      await setReminder({
        user_list: arr,
        type: this.type
      })
      this.list = [{ id: Math.random() * 999, name: '', phone: '' }]
      this.isShow = false
      this.$parent.getData()
    },

    // 删除记录
    del (index) {
      if (this.list.length === 1) {
        this.list = [{ id: Math.random() * 999, name: '', phone: '' }]
        return
      }
      // console.log(index)
      this.list.splice(index, 1)
    },
    // 添加记录
    add () {
      if (this.list.length >= 5) {
        return
      }
      this.list.push({ id: Math.random() * 999, name: '', phone: '' })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: 600;
  color: #5a5d5f;
  span {
    margin-left: 15px;
    font-size: 14px;
    color: #a7a5a0;
  }
}
.content {
  display: flex;
  .left {
    width: 100px;
    text-align: right;
    line-height: 32px;
  }
  .right {
    flex: 1;
    .item {
      margin-bottom: 15px;
      white-space: nowrap;
      input {
        margin: 0 10px;
      }
    }
    .box {
      margin-left: 12px;
      width: 417px;
      max-height: 300px;
      overflow: scroll;
      padding: 0 20px;
      box-shadow: 0px 0px 2px 2px #ededed;
      .boxtitle {
        height: 40px;
        line-height: 40px;
      }
      .item {
        display: flex;
        align-items: center;
        cursor: pointer;
        .username {
          width: 150px;
        }
        .phone {
          flex: 1;
        }
        /deep/ .ant-tag-blue {
          border-radius: 5px;
          margin-right: 0;
        }
      }
    }
  }
}
/deep/ .ant-modal-content {
  width: 600px;
}
.plus {
  color: #309bfe;
  margin-right: 10px;
  font-size: 20px;
}
.close {
  font-size: 20px;
}
</style>
