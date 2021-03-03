<template>
  <a-modal v-model="isShow">
    <template #title>
      <div class="title">
        充值提醒 <span>余额</span>
      </div>
    </template>
    <div class="content">
      <div class="left">手机号：</div>
      <div class="right">
        <div class="item"
             v-for="(item, index) in list"
             :key="index">
          <a-select mode="tags"
                    style="width: 200px"
                    placeholder="手机号"
                    :token-separators="[',']"
                    @change="handleChange">
            <a-select-option v-for="i in 25"
                             :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
          <a-input style="width:200px"
                   placeholder="姓名"></a-input>
          <a-icon type="plus"
                  class="plus"
                  @click="add"
                  v-if="list.length !=5" />
          <a-icon type="close"
                  class="close"
                  @click="del(index)"
                  v-if="list.length>1" />
        </div>

      </div>
    </div>
  </a-modal>

</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      list: [1]
    }
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    // 删除记录
    del (index) {
      if (this.list.length === 1) {
        return
      }
      console.log(index)
      this.list.splice(index, 1)
    },
    // 添加记录
    add () {
      if (this.list.length >= 5) {
        return
      }
      this.list.push(1)
    }
  }

}

</script>

<style lang='less' scoped>
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
