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
import { removeMenu } from '@/api/projectConfig.js'
export default {
  data () {
    return {
      isShow: false,
      id: '',
      itemInfo: {}
    }
  },
  methods: {
    // 删除菜单
    async remove () {
      await removeMenu({ id: this.id })
      this.$parent.getData()
      if (this.itemInfo.children) {
        const index = this.itemInfo.children.findIndex(item => {
          return item.id === this.id
        })
        this.itemInfo.children.splice(index, 1)
        // console.log(index)
      }
      this.isShow = false
      // console.log(res)
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
