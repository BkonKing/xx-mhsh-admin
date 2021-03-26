<template>
  <div class="cancelModal">
    <a-modal
v-model="isShow"
             title="取消推送"
             @ok="handleOk"
             @cancel="isShow=false"
             ok-text="确认"
             cancel-text="取消">
      <a-form-model
class="form"
                    ref="form"
                    :rules='rules'
                    :model="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item
label="取消说明"
                           prop="value">
          <a-textarea
v-model="form.value"
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
        value: ''
      },
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }]
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

<style>
</style>
