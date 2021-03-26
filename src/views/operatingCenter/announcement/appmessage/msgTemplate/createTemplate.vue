<template>
  <div class="createTemplate">
    <a-modal
v-model="isShow"
             title="新建模板"
             @ok="handleOk"
             @cancel="isShow=false"
             ok-text="确认"
             cancel-text="取消">
      <a-form-model
:model="form"
                    class="form"
                    ref="form"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item
label="消息类型"
                           prop='value1'>
          <a-select
v-model="form.value1"
                    style="width: 200px"
                    placeholder="请选择">
            <a-select-option value="1">
              系统消息
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
label="消息标题"
                           prop='value2'>
          <a-input
v-model="form.value2"
                   placeholder="请输入"></a-input>
        </a-form-model-item>
        <a-form-model-item
label="消息内容"
                           prop='value3'>
          <a-textarea
v-model="form.value3"
                      placeholder="请输入"
                      :rows="3" />
        </a-form-model-item>
        <a-form-model-item
label='说明'
                           prop='value4'>
          <a-textarea
v-model="form.value4"
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
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
      }
    }
  },
  methods: {
    handleOk () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('验证通过')
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.createTemplate {
  .form {
    width: 400px;
    margin: 0 auto;
  }
}
.ant-form-item-label {
  width: 100px !important;
}
</style>
