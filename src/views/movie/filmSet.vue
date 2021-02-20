<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="客服">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="影票订单客服"
          :labelCol="{lg: {span: 3}, sm: {span: 4}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 10} }"
          :required="false"
        >
          <a-input placeholder="影票订单客服" type="tel" v-model="form.tel" />
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 10, offset: 3 }"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { setTel } from '@/api/movie'
export default {
  name: 'filmSet',
  components: {
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    setTel()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'time_related_controls' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // this.$store.commit('update', values)
        }
      })
    }
  }
}
</script>

<style less lang="less">
</style>
