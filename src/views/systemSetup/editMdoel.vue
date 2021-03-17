<template>
  <a-modal v-model="isShow"
           title="编辑模块">
    <template #footer>
      <div class="footer">
        <a-button type='primary'
                  @click="save">保存</a-button>
      </div>
    </template>
    <a-form-model :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label='权限名称'>
        <a-input v-model="item.role_name"></a-input>
      </a-form-model-item>
      <a-form-model-item label='排序'>
        <a-input v-model="item.list_order"></a-input>
      </a-form-model-item>
    </a-form-model>

  </a-modal>
</template>

<script>
import { updateRole } from '@/api/systemSetup'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      item: {}
    }
  },
  methods: {
    // 修改菜单
    async save () {
      await updateRole({
        id: this.item.id,
        parentId: this.item.parent_id,
        roleName: this.item.role_name,
        listOrder: this.item.list_order
      })
      this.isShow = false
      this.$parent.getData()
    }
  }

}
</script>

<style lang='less' scoped>
.footer {
  text-align: center;
}
/deep/ .ant-form-item-label {
  width: 100px;
}
</style>
