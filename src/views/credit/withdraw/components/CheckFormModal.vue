<template>
  <a-modal
    v-model="checkVisible"
    title="提现审核"
    :width="600"
    :destroyOnClose="true"
    @ok="submit"
  >
    <users-info :data="data"></users-info>
    <a-form-model
      ref="form"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="审核结果" prop="auidtStatus">
        <a-radio-group v-model="form.auidtStatus">
          <a-radio :value="1">
            通过
          </a-radio>
          <a-radio :value="2">
            拒绝
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="审核说明" prop="describe">
        <a-textarea
          v-model="form.describe"
          placeholder="请输入"
          :maxLength="500"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          style="max-width: 328px;"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import UsersInfo from './UsersInfo'
import { validAForm } from '@/utils/util'
const form = {
  auidtStatus: 1,
  describe: ''
}
export default {
  name: 'CheckFormModal',
  components: {
    UsersInfo
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: clonedeep(form),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      checkVisible: this.value
    }
  },
  watch: {
    value (newValue) {
      if (newValue !== this.checkVisible) {
        this.checkVisible = newValue
      }
      if (newValue) {
        this.form = clonedeep(form)
      }
    },
    checkVisible (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    // 审核
    submit () {
      validAForm(this.$refs.form).then(async () => {
        const { success } = await setShopsPower({
          shops_id_text: this.data.map(obj => obj.id).join(','),
          ...this.form
        })
        if (success) {
          this.$message.success('提交成功')
          this.$emit('success')
          this.checkVisible = false
        }
      })
    }
  }
}
</script>
