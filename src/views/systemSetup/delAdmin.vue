<template>
  <a-modal class="modal"
           v-model="isShow"
           :footer='null'>
    <template slot="title">
      <div class="title">
        确定删除？
      </div>
    </template>
    <div class="btns">
      <a-button @click="isShow=false">取消</a-button>
      <a-button type='primary'
                @click="remove">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import { removeAdmin } from '@/api/systemSetup'
export default {
  data () {
    return {
      isShow: false,
      id: ''
    }
  },
  methods: {
    // 删除菜单
    async remove () {
      await removeAdmin({ id: this.id })
      this.$parent.getData()
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped>
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
