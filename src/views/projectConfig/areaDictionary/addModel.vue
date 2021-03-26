<template>
  <div class="addModel">
    <a-modal
v-model="isShow"
             @ok="handleOk"
             ok-text="保存"
             cancel-text="关闭">
      <template #title>
        <!-- <div v-show="false">
          标题
        </div> -->
      </template>
      <a-form-model
:label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    ref="form"
                    :model='form'
                    :rules='rules'>
        <a-form-model-item label='父区域'>
          <a-select
placeholder="作为一级区域"
                    style="width: 276px">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled">
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
prop='value'
                           label='区域名称'>
          <a-input v-model="form.value"></a-input>
        </a-form-model-item>
        <a-form-model-item label='排序'>
          <a-input></a-input>
        </a-form-model-item>
        <a-form-model-item label='启用'>
          <a-radio-group>
            <a-radio :value="1">
              是
            </a-radio>
            <a-radio :value="2">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        value: ''
      },
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false,
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

<style lang='less' scoped>
/deep/ .ant-modal-header {
  padding: 26px 24px;
}
/deep/ .ant-modal-footer {
  text-align: center;
}
</style>
