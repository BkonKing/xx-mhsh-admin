<template>
  <div>
    <a-modal
class="modal"
             v-model="isShow"
             title="转账申请"
             :footer='false'
             destroyOnClose>
      <a-form-model
ref="form"
                    :rules='rules'
                    :model='form'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='账户类型'>
          <a-radio-group v-model="form.value1">
            <a-radio :value="1">
              用户
            </a-radio>
            <a-radio :value="2">
              对公户
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
prop='value2'
                           label='账户'>
          <a-input
v-model="form.value2"
                   placeholder="手机号/姓名"></a-input>
        </a-form-model-item>
        <a-form-model-item
prop='value3'
                           label='幸福币'>
          <a-input v-model="form.value3"></a-input>
        </a-form-model-item>
        <a-form-model-item label='备注'>
          <div class="input">
            <a-input
v-model="form.value4"
                     maxlength="20"></a-input>
            <div class="num">
              {{form.value4.length}} /20
            </div>
          </div>
        </a-form-model-item>
        <div class="btns">
          <a-button @click="isShow=false">取消</a-button>
          <a-button
type='primary'
                    @click="submit">申请</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      },
      rules: {
        value2: [{ required: true, message: '必填', trigger: 'change' }],
        value3: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    // 申请
    submit () {
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

<style lang='less' scoped>
.modal {
  .input {
    position: relative;
    .num {
      position: absolute;
      right: 6px;
      bottom: 0;
      color: #d7d7d7;
    }
  }
  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
      margin: 0 20px;
    }
  }
}
</style>
