<template>
  <a-modal
    v-model="checkVisible"
    :title="title"
    :width="600"
    :destroyOnClose="true"
    @ok="submit"
  >
    <users-info v-if="typeNum === 1" :data="info"></users-info>
    <a-form-model
      ref="form"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="审核结果" prop="type">
        <a-radio-group
          v-if="typeNum !== 3"
          v-model="form.type"
          :disabled="typeNum === 2"
        >
          <a-radio :value="1">
            通过
          </a-radio>
          <a-radio :value="2">
            拒绝
          </a-radio>
        </a-radio-group>
        <template v-else>{{ +form.type === 1 ? "通过" : "拒绝" }}</template>
      </a-form-model-item>
      <a-form-model-item
        :label="isUpdate ? '操作说明' : '审核说明'"
        prop="audit_desc"
        :rules="{ required: isUpdate, message: '请输入操作说明' }"
      >
        <a-textarea
          v-model="form.audit_desc"
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
import {
  checkCash,
  updateCheckCash,
  updateCheckDesc
} from '@/api/credit/withdraw'
const form = {
  type: 1,
  audit_desc: ''
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
      type: Array,
      default: () => []
    },
    info: {
      type: Object,
      default: () => ({})
    },
    checkType: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: [String, Number],
      default: 1 // 1：申请 2：修改 3：只修改说明
    },
    checkId: {
      type: [Number, String],
      default: 0
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
  computed: {
    title () {
      const text = {
        1: '提现审核',
        2: '修改审核',
        3: '修改审核'
      }
      return text[this.typeNum]
    },
    typeNum () {
      return +this.type
    },
    isUpdate () {
      return [2, 3].includes(this.typeNum)
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
        this.checkType && (this.form.type = this.checkType)
      }
    },
    checkVisible (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    setCheckType (type) {
      this.form.type = type
    },
    // 审核
    submit () {
      validAForm(this.$refs.form).then(async () => {
        const apiObj = {
          1: checkCash,
          2: updateCheckCash,
          3: updateCheckDesc
        }
        const api = apiObj[this.typeNum]
        let params = {}
        switch (this.typeNum) {
          case 1:
            params = { ids: this.data }
            break
          case 2:
            params = { cash_id: this.data[0] }
            break
          case 3:
            params = {
              cash_id: this.data[0],
              check_id: this.checkId
            }
            break
        }
        const { success } = await api({
          ...params,
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
