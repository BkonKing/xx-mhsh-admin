<template>
  <a-modal v-model="isShow" title="奖励" @ok="handleOk">
    <a-form-model
    :model='form'
    :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
  <a-form-model-item label='已奖励'>
    0幸福币
  </a-form-model-item>
  <a-form-model-item label="奖励" prop="value">
    <a-input v-model="value" placeholder="请输入"  addon-after="币" />
    <div class="txt">还可以奖励2000幸福币</div>
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
      form: {
        value: ''
      },
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  }
}
</script>

<style lang='less' scoped>
.txt{
  font-family: 'MicrosoftYaHei', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.447058823529412);
}
</style>
