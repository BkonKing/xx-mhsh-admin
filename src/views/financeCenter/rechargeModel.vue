<template>
  <a-modal v-model="isShow"
           title="充值">
    <a-form-model :model="form"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">

    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {}
    }
  }
}
</script>

<style>
</style>
