<template>
  <div class="noteModel">
    <a-modal v-model="isShow"
             title="短信模板"
             @ok="handleOk"
             @cancel="isShow=false">
      <a-form-model class="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='短信类型'>营销短信/通知短信</a-form-model-item>
        <a-form-model-item label='短信标题'>标题标题标题</a-form-model-item>
        <a-form-model-item label='短信内容'>短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</a-form-model-item>
        <a-form-model-item label='说明'>
          短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    handleOk () { }
  }
}
</script>

<style lang='less' scoped>
.noteModel {
  .form {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
