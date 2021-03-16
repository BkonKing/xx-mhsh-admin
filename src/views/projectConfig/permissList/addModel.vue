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
      <a-form-model-item label='菜单名称'>
        <a-input v-model="form.menuText"></a-input>
      </a-form-model-item>
      <a-form-model-item label='菜单图标样式'>
        <a-input v-model="form.icon"></a-input>
      </a-form-model-item>
      <a-form-model-item label='访问路径'>
        <a-input v-model='form.limitsPath'></a-input>
      </a-form-model-item>
      <a-form-model-item label='排序'>
        <a-input v-model="form.listOrder"></a-input>
      </a-form-model-item>
      <a-form-model-item label='是否显示'>
        <a-radio-group v-model="form.display">
          <a-radio :value="0">
            隐藏
          </a-radio>
          <a-radio :value="1">
            显示
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>

  </a-modal>
</template>

<script>
import { addMenu } from '@/api/projectConfig.js'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      form: {
        menuText: '',
        limitsPath: '',
        icon: '',
        listOrder: '',
        display: ''
      }
    }
  },
  methods: {
    async add () {
      await addMenu(this.form)
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
