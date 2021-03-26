<template>
  <a-modal
class="modal"
           v-model="isShow"
           :footer='null'>
    <template slot="title">
      <div class="title">
        确定删除？
      </div>
    </template>
    <div class="btns">
      <a-button @click="isShow=false">取消</a-button>
      <a-button type='primary'>确定</a-button>
    </div>
  </a-modal>
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

<style lang='less'>
.modal {
  .title {
    margin-top: 30px;
    text-align: center;
  }
  .ant-modal-header {
    border-bottom: none;
  }
  .btns {
    display: flex;
    justify-content: center;
    button {
      margin: 0 20px;
    }
  }
}
</style>
