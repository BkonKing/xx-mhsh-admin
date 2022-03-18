<template>
  <a-modal
    v-model="checkVisible"
    title="提现审核"
    :width="600"
    :destroyOnClose="true"
  >
    <users-info v-if="typeNum === 1" :data="info"></users-info>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item v-if="isUpdate" label="打款结果">
        <span style="color: red;">未打款</span>
      </a-form-model-item>
      <a-form-model-item v-if="isUpdateDesc" label="打款结果">
        <span>{{ statusText }}</span>
      </a-form-model-item>
      <a-form-model-item
        v-if="!isUpdate"
        label="上传凭证"
        required
        prop="cash_img"
      >
        <upload-image v-model="form.cash_img" maxLength="10"></upload-image>
        <div style="line-height: 1;margin-top: -5px;">
          大小不超过2MB；支持扩展名：.png .jpg；
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="操作说明"
        prop="payment_desc"
        :rules="{ required: isUpdate, message: '请输入操作说明' }"
      >
        <a-textarea
          v-model="form.payment_desc"
          placeholder="请输入"
          :maxLength="500"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          style="max-width: 328px;"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="submit">
        确认
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { UploadImage } from '@/components'
import UsersInfo from './UsersInfo'
import { validAForm } from '@/utils/util'
import {
  setPayment,
  updatePayment,
  updatePaymentDesc
} from '@/api/credit/withdraw'

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
      default: () => []
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
      loading: false,
      form: clonedeep(form),
      rules: {
        cash_img: [{ required: true, message: '请上传凭证', trigger: 'change' }]
      },
      status: '',
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
    isUpdate () {
      return this.typeNum === 2
    },
    isUpdateDesc () {
      return this.typeNum === 3
    },
    statusText () {
      const text = {
        1: '已打款',
        2: '未打款'
      }
      return text[this.status]
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
    setStatus (status) {
      this.status = status
    },
    setFormData (data) {
      this.form = data
    },
    handleCancel () {
      this.checkVisible = false
    },
    // 审核
    submit () {
      validAForm(this.$refs.form).then(async () => {
        this.loading = true
        const apiObj = {
          1: setPayment,
          2: updatePayment,
          3: updatePaymentDesc
        }
        const api = apiObj[this.typeNum]
        let params = {}
        switch (this.typeNum) {
          case 1:
            params = { ids: this.data, ...this.form }
            break
          case 2:
            params = {
              cash_id: this.data[0],
              status: this.status,
              audit_desc: this.form.payment_desc
            }
            break
          case 3:
            params = {
              cash_id: this.data[0],
              check_id: this.payId,
              img: this.form.cash_img,
              audit_desc: this.form.payment_desc
            }
            break
        }
        const { success } = await api({ ...params })
        this.loading = false
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
