<template>
  <div class="addUserModel">
    <a-modal v-model="isShow" title="添加用户" @ok="submit">
      <div class="content">
        <div class="left">手机号：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr" :key="item.id">
            <!-- onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" -->
            <a-input
              @input="getData(index, $event)"
               class="input1"
              v-model="item.mobile"
              :maxLength="11"
              placeholder="手机号"
              style="width:216px"
            ></a-input>
            <a-input
            :disabled="false"
               @input="getData(index, $event)"
              :maxLength="10"
              v-model="item.nickname"
               class="input2"
              placeholder="昵称"
              style="width:104px"
            ></a-input>
            <a-input

              :maxLength="10"
              v-model="item.remark"
              placeholder="备注"
              style="width:104px"
            ></a-input>
            <a-icon
              class="plus"
              type="plus"
              @click="add"
              v-if="arr.length < 5"
            />
            <a-icon
              class="close"
              type="close"
              @click="del(index)"
              v-if="arr.length > 1"
            />
          </div>
        </div>
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
    </a-modal>
  </div>
</template>

<script>
import { toAddWhiteUser, toAddGroupUser } from '@/api/taskCentre'
import { getUserInfo } from '@/api/financeCenter.js'
// function isNumber (value) {
//   // 验证是否为数字
//   var patrn = /^(-)?\d+(\.\d+)?$/
//   if (patrn.exec(value) == null || value == '') {
//     return false
//   } else {
//     return true
//   }
// }

export default {
  props: ['mode', 'id'],
  data () {
    return {
      isShow: false,
      arr: [{ id: Math.random() * 999, mobile: '', nickname: '', remark: '' }],
      userInfoList: [], // 用户列表
      currentIndex: 0,
      elm: '' // dom元素
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.arr = [
          { id: Math.random() * 999, mobile: '', nickname: '', remark: '' }
        ]
        this.userInfoList = []
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            const arr = document.getElementsByClassName('input1')
            // console.log('元素数组', arr)
            for (let i = 0; i < arr.length; i++) {
              arr[i].addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                // console.log(e.target)
              }, false)
            }

            const arr2 = document.getElementsByClassName('input2')
            // console.log('元素数组', arr)
            for (let i = 0; i < arr2.length; i++) {
              arr2[i].addEventListener('input', function (e) {
                // e.target.value = e.target.value.replace(/[^0-9]/g, '')
                e.target.previousElementSibling.value = e.target.previousElementSibling.value.replace(/[^0-9]/g, '')
                // console.log(e.target)
              }, false)
            }
          })
        })
      }
    }
  },
  mounted () {

  },
  methods: {
    // 选择用户
    selectUser (item) {
      this.arr[this.currentIndex].nickname = item.realname
      this.arr[this.currentIndex].mobile = item.mobile
      this.userInfoList = []
      this.elm.disabled = true
      this.elm.nextElementSibling.disabled = true
      // console.log(this.elm)
    },
    // 获取用户信息
    async getData (index, e) {
      this.currentIndex = index
      this.elm = e.target
      if (e.target.value.length < 11 && e.target.nextElementSibling.value) {
        e.target.nextElementSibling.value = ''
        this.arr[index].nickname = ''
      }
      if (this.arr[index].mobile.length > 5) {
        const res = await getUserInfo({
          realname: this.arr[index].nickname,
          mobile: this.arr[index].mobile
        })
        // console.log('用户信息', res)
        this.userInfoList = res.data.list
        // if (this.userInfoList.length === 1) {
        //   this.selectUser(this.userInfoList[0])
        // }
      }
      if (this.arr[index].nickname) {
        const res = await getUserInfo({
          realname: this.arr[index].nickname,
          mobile: this.arr[index].mobile
        })
        // console.log('用户信息', res)
        this.userInfoList = res.data.list
        // if (this.userInfoList.length === 1) {
        //   this.selectUser(this.userInfoList[0])
        // }
      }
    },
    // 确定
    async submit () {
      if (this.mode === 'whiteUser') {
        // const list = this.arr.map(item => {
        //   if (item.mobile) {
        //     return {
        //       mobile: item.mobile,
        //       nickname: item.nickname,
        //       remark: item.remark
        //     }
        //   }
        // })
        const list = []
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i].mobile) {
            if (this.arr[i].mobile.length !== 11) {
              this.$message.warning('请正确填写手机号')
              return
            }
            list.push(this.arr[i])
          }
        }
        const res = await toAddWhiteUser({
          user_list: list
        })
        // console.log('添加白名单', res)
        if (res.code === '201') {
          this.$message.error(res.message)
        } else {
          this.isShow = false
          this.$parent.pagination.currentPage = 1
          this.$message.success('添加成功')
          this.$parent.getData()
          // this.$parent.getGroupBase()
          // this.$parent.getRegister()
          // console.log('添加群用户', res2)
        }
      } else {
        // const list2 = this.arr.map(item => {
        //   if (item.mobile) {
        //     return {
        //       mobile: item.mobile,
        //       nickname: item.nickname,
        //       remark: item.remark
        //     }
        //   }
        // })
        const list2 = []
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i].mobile) {
            if (this.arr[i].mobile.length !== 11) {
              this.$message.warning('请正确填写手机号')
              return
            }
            list2.push(this.arr[i])
          }
        }
        const res2 = await toAddGroupUser({
          user_list: list2,
          group_id: this.id
        })
        if (res2.code === '201') {
          this.$message.error(res2.message)
        } else {
          this.isShow = false
          this.$parent.pagination.currentPage = 1
          this.$message.success('添加成功')
          this.$parent.getData()
          this.$parent.getGroupBase()
          this.$parent.getRegister()
          // console.log('添加群用户', res2)
        }
      }
    },
    // 添加
    add () {
      if (this.arr.length === 5) {
        return
      }
      this.arr.push({
        id: Math.random() * 999,
        mobile: '',
        nickname: '',
        remark: ''
      })
    },
    del (index) {
      console.log(index)
      this.arr.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  width: 600px;
  margin: 0 auto;
  .left {
    width: 56px;
  }
  .right {
    flex: 1;
    .item {
      margin-bottom: 10px;
      input {
        margin-right: 10px;
      }
      .plus {
        margin-right: 10px;
        color: #1890ff;
        font-size: 20px;
      }
      .close {
        font-size: 20px;
      }
    }
  }
}
.box {
  margin-left: 58px;
  width: 446px;
  max-height: 300px;
  overflow: auto;
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
    margin-bottom: 10px;
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
/deep/ .ant-modal-content {
  width: 600px;
}
</style>
