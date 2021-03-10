<template>
  <a-modal v-model="isShow"
           title="编辑模块">
    <template #footer>
      <div class="footer">
        <a-button type='primary'>保存</a-button>
      </div>
    </template>
    <a-form-model :model="form"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label='所属产品'>
        <a-select style="width: 275px">
          <a-select-option value="jack">
            美好生活家园APP
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label='上级模块'>
        <a-select style="width: 275px">
          <a-select-option value="jack">
            /
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label='模块名称'>
        <a-input v-model="item.title"></a-input>
      </a-form-model-item>
      <a-form-model-item label='简称'>
        <a-input></a-input>
      </a-form-model-item>
    </a-form-model>

  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      form: {},
      item: {}
    }
  }

}
</script>

<style lang='less' scoped>
.footer {
  text-align: center;
}
</style>
