<template>
  <a-modal
    v-model="checkVisible"
    title="提现审核"
    :width="600"
    :destroyOnClose="true"
    @ok="submit"
  >
    <users-info v-if="+typeNum === 1" :data="info"></users-info>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item v-if="false" label="打款结果">
        已打款
      </a-form-model-item>
      <a-form-model-item label="上传凭证" required prop="cash_img">
        <upload-image v-model="form.cash_img" maxLength="10"></upload-image>
        <div style="line-height: 1;margin-top: -5px;">
          大小不超过2MB；支持扩展名：.png .jpg；
        </div>
      </a-form-model-item>
      <a-form-model-item label="操作说明" prop="payment_desc">
        <a-textarea
          v-model="form.payment_desc"
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
import { setPayment } from '@/api/credit/withdraw'

const form = {
  payment_desc: '',
  cash_img: []
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
      type: Array,
      default: () => ([])
    },
    info: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: [String, Number],
      default: 1 // 1：申请 2：修改 3：只修改说明
    },
    payId: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      form: clonedeep(form),
      rules: {
        cash_img: [{ required: true, message: '请上传凭证', trigger: 'change' }]
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      checkVisible: this.value
    }
  },
  computed: {
    title () {
      const text = {
        1: '提现已打款',
        2: '修改打款',
        3: '修改打款'
      }
      return text[this.typeNum]
    },
    typeNum () {
      return +this.type
    },
    isUpdateDesc () {
      return this.typeNum === 3
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
        const { success } = await setPayment({
          ids: this.data,
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
