<template>
  <div class="cancelPush">
    <a-modal v-model="isShow"
             title="Basic Modal"
             @ok="handleOk"
             @cancel="isShow=false">
      <a-form-model ref="form"
                    :model='form'
                    :rules='rules'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item prop='value'
                           label='取消说明'>
          <a-textarea v-model="form.value"
                      rows='3'
                      placeholder="请输入"></a-textarea>
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
      wrapperCol: { span: 14 },
      form: {
        value: ''
      },
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleOk () { }
  }
}
</script>

<style>
</style>
