<template>
  <div class="createTemplate">
    <a-modal v-model="isShow"
             title="新建模板"
             @ok="handleOk"
             @cancel="isShow=false">
      <a-form-model ref="form"
                    :model='form'
                    :rules='rules'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item prop='value1'
                           label='短信类型'>
          <a-select v-model="form.value1"
                    style="width: 250px">
            <a-select-option value="1">
              开启
            </a-select-option>
            <a-select-option value="2">
              关闭
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop='value2'
                           label='短信标题'>
          <a-input v-model="form.value2"
                   placeholder="请输入"></a-input>
        </a-form-model-item>
        <a-form-model-item prop='value3'
                           label='短信内容'>
          <a-textarea v-model="form.value3"
                      placeholder="请输入"
                      :rows="3" />
        </a-form-model-item>
        <a-form-model-item prop='value4'
                           label='说明'>
          <a-textarea v-model="form.value4"
                      placeholder="请输入"
                      :rows="3" />
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
      form: {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }],
        value2: [{ required: true, message: '必填', trigger: 'change' }],
        value3: [{ required: true, message: '必填', trigger: 'change' }],
        value4: [{ required: true, message: '必填', trigger: 'change' }]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    handleOk () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('验证成功')
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style>
</style>
