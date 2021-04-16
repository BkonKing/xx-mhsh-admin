<template>
   <a-modal v-model="isShow" title="新增/修改群" @ok='submit'>
      <a-form-model :model="form" :rules='rules' :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="群名称" prop='value'>
                <a-input v-model="form.value" :maxLength='10'  :suffix="form.value.length+'/10'" />
        </a-form-model-item>
        <a-form-model-item label="允许加入">
           <a-switch default-checked />
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
      form: {
        value: ''
      },
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false
    }
  },
  methods: {
    submit () {
      this.$message.success('创建成功')
    }
  }
}
</script>

<style>

</style>
