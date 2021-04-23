<template>
  <div class="addUserModel">
    <a-modal v-model="isShow" title="添加用户" @ok="submit">
      <div class="content">
        <div class="left">手机号：</div>
        <div class="right">
          <div class="item" v-for="(item, index) in arr" :key="item.id">
            <a-input
              v-model="item.mobile"
              :maxLength='11'
              placeholder="手机号"
              style="width:216px"
            ></a-input>
            <a-input
            :maxLength='10'
              v-model="item.nickname"
              placeholder="姓名"
              style="width:104px"
            ></a-input>
            <a-input
              :maxLength='10'
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
      <div class="info" v-if="false">
        <div class="top">全部</div>
        <div class="bottom">
          <div class="item" v-for="item in 20" :key="item">
            <div class="t1">用户昵称</div>
            <div class="t2">1500000000</div>
            <div class="t3">
              <a-tag color="blue">
                业主
              </a-tag>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { toAddWhiteUser } from '@/api/taskCentre'
export default {
  data () {
    return {
      isShow: false,
      arr: [{ id: Math.random() * 999, mobile: '', nickname: '', remark: '' }]
    }
  },
  methods: {
    // 确定
    async submit () {
      const list = this.arr.map(item => {
        return {
          mobile: item.mobile,
          nickname: item.nickname,
          remark: item.remark
        }
      })
      const res = await toAddWhiteUser({
        user_list: list
      })
      console.log('添加白名单', res)
      this.isShow = false
      this.$parent.pagination.currentPage = 1
      this.$parent.getData()
      this.$message.success('添加成功')
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
.info {
  width: 440px;
  height: 410px;
  overflow: scroll;
  margin-left: 166px;
  box-shadow: 0 0 1px 1px #999;
  padding: 0 10px;
  .top {
    height: 38px;
    line-height: 38px;
    font-family: "MicrosoftYaHei", "Microsoft YaHei";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.647058823529412);
  }
  .bottom {
    .item {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .t1 {
        width: 102px;
      }
      .t2 {
        flex: 1;
      }
    }
  }
}
/deep/ .ant-modal-content {
  width: 864px;
}
</style>
