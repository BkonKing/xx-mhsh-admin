<template>
  <a-modal v-model="isShow"
           title="新增模块">
    <template #footer>
      <div class="footer">
        <a-button type='primary'
                  @click="add">保存</a-button>
      </div>
    </template>
    <a-form-model :model='form'
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label='权限名称'>
        <a-input v-model="form.roleName"></a-input>
      </a-form-model-item>
      <a-form-model-item label='排序'>
        <a-input v-model="form.listOrder"></a-input>
      </a-form-model-item>
    </a-form-model>

  </a-modal>
</template>

<script>
import { addRole } from '@/api/systemSetup'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      form: {
        parentId: '', // 是int父ID
        roleName: '', // 是varchar角色名称
        listOrder: '' // 否int排序
      }
    }
  },
  methods: {
    async add () {
      await addRole(this.form)
      this.$parent.getData()
      this.isShow = false
      // console.log(res)
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
