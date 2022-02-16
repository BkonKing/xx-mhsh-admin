<template>
  <a-modal
    v-model="checkVisible"
    :title="title"
    :width="600"
    @ok="submit"
    :destroyOnClose="true"
  >
    <div class="selected" v-if="selectedRowKeys.length > 0">
      <a-icon class="icon" type="info-circle" />
      已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
    </div>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="提现用户">
        商家用户 - 用户姓名(手机号) 项目账户 - 项目账户名称(手机号)
      </a-form-model-item>
      <a-form-model-item label="提现幸福币">
        10000
      </a-form-model-item>
      <a-form-model-item label="提现人民币">
        1,000（实际提现<span style="font-size: 22px;color: red;">￥950</span>）
      </a-form-model-item>
      <template v-if="type === '2'">
        <a-form-model-item label="打款结果">
          已打款
        </a-form-model-item>
        <a-form-model-item
          label="上传凭证"
          required
          :rules="{ required: true, message: '请上传凭证' }"
        >
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
      </template>
      <template v-if="type === '1'">
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
      </template>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { UploadImage } from '@/components'
import { validAForm } from '@/utils/util'
const form = {
  auidtStatus: 1,
  describe: '',
  annex: []
}
export default {
  name: 'CheckFormModal',
  components: {
    UploadImage
  },
  props: {
    title: {
      type: String,
      default: '审核'
    },
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '1' // 1：审核，2：已打款
    },
    selectedRowKeys: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    showValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: clonedeep(form),
      rules: {
        auidtStatus: [{ required: true, message: '请填写', trigger: 'change' }]
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
    },
    checkVisible (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    // 审核
    handleSubmit () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve(this.form)
          } else {
            reject(new Error(false))
            return false
          }
        })
      })
    },
    resetFields () {
      this.$refs.form.resetFields()
      this.form = clonedeep(form)
    },
    submit () {
      validAForm(this.$refs.form).then(async () => {
        const { success } = await setShopsPower({
          shops_id_text: this.selectedRowKeys.join(','),
          power: this.powerForm.power.join(',')
        })
        if (success) {
          this.$message.success('提交成功')
          this.refreshTable()
          this.permissionVisible = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.selected {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  line-height: 40px;
  background-color: rgba(230, 247, 255, 1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(186, 231, 255, 1);
  border-radius: 4px;
  .icon {
    color: #0e77d1;
    margin-right: 10px;
  }
  .span1 {
    color: #0e77d1;
  }
  .span2 {
    cursor: pointer;
    color: #0e77d1;
    margin-left: 10px;
  }
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

/deep/ .ant-form-item {
  margin-bottom: 16px;
}
</style>
