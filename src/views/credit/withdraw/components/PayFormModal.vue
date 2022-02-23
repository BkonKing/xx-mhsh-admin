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
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="打款结果">
        已打款
      </a-form-model-item>
      <a-form-model-item label="上传凭证" required prop="annex">
        <upload-image v-model="form.annex" maxLength="10"></upload-image>
        <div style="line-height: 1;margin-top: -5px;">
          大小不超过2MB；支持扩展名：.png .jpg；
        </div>
      </a-form-model-item>
      <a-form-model-item label="操作说明" prop="describe">
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
import { UploadImage } from '@/components'
import UsersInfo from './UsersInfo'
import { validAForm } from '@/utils/util'
const form = {
  describe: '',
  annex: []
}
export default {
  name: 'PayFormModal',
  components: {
    UploadImage,
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
      rules: {
        annex: [{ required: true, message: '请上传凭证', trigger: 'change' }]
      },
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
          power: this.powerForm.power.join(',')
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
