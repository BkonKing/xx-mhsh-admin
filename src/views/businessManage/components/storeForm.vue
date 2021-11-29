<template>
  <a-modal
    v-model="modalShow"
    :title="title"
    :width="600"
    @ok="handleSubmit"
    :destroyOnClose="true"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <h3>商家资料</h3>
      <a-form-model-item label="商家用户" prop="uid_text" required>
        <a-select
          v-model="form.uid_text"
          placeholder="请选择"
          @change="handleCompanyChange"
        >
          <a-select-option
            v-for="item in companyOptions"
            :key="item.id"
            :value="item.id"
            >{{ item.company_name }}</a-select-option
          >
        </a-select>
        <div class="alert-text">输入用户姓名、手机号、ID进行搜索</div>
      </a-form-model-item>
      <a-form-model-item label="店铺归属" prop="project_id">
        <a-select
          v-model="form.project_id"
          placeholder="请选择"
          @change="handleDivisionChange"
          ><a-select-option
            v-for="item in divisionOptions"
            :key="item.id"
            :value="item.id"
            >{{ item.division_name }}</a-select-option
          ></a-select
        >
      </a-form-model-item>
      <a-form-model-item label="店铺名称" prop="shops_name">
        <a-input
          v-model="form.shops_name"
          :maxLength="20"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="营业时间" prop="business_hours">
        <a-input
          v-model="form.business_hours"
          :maxLength="20"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="联系方式" prop="phone" required>
        <a-input
          v-model="form.phone"
          v-number-input
          :maxLength="15"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="店铺公告" prop="shops_notice">
        <a-textarea
          v-model="form.shops_notice"
          :maxLength="50"
          rows="4"
          placeholder="请输入"
        />
      </a-form-model-item>
    </a-form-model>
    <h3>商家权限</h3>
    <a-form-model-item label="权限" prop="power">
      <a-checkbox-group v-model="form.power" :options="powerOptions" />
    </a-form-model-item>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { editShops } from '@/api/userManage'

const initialForm = {
  uid_text: undefined,
  project_id: undefined,
  post_id: undefined,
  shops_name: '',
  business_hours: '',
  phone: '',
  entry_time: '',
  item_ids: [],
  shops_notice: '',
  is_go_on: 0
}
export default {
  name: 'RepositoryForm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    projectOptions: {
      type: Array,
      default: () => []
    },
    companyOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      modalShow: this.value,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: clonedeep(initialForm),
      powerOptions: [
        {
          label: '提现申请',
          value: '1'
        },
        {
          label: '商铺券管理',
          value: '2'
        },
        {
          label: '扫码核销券',
          value: '3'
        }
      ],
      divisionOptions: [],
      postOptions: [],
      rules: {
        phone: [{ required: true, message: '请输入手机号' }]
      }
    }
  },
  computed: {
    title () {
      return this.form.shops_id ? `编辑商家 - ${this.form.shops_name}` : '新增商家'
    }
  },
  watch: {
    value (val) {
      this.modalShow = val
    },
    modalShow (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleCompanyChange () {
      this.$set(this.form, 'project_id', undefined)
      this.$set(this.form, 'post_id', undefined)
      this.postOptions = []
    },
    handleDivisionChange () {
      this.$set(this.form, 'post_id', undefined)
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.editShops()
        } else {
          return false
        }
      })
    },
    editShops () {
      const params = clonedeep(this.form)
      params.item_ids = params.item_ids.join(',')
      editShops(params).then(({ success, code, message, user_text }) => {
        if (success) {
          this.$message.success('保存成功')
          this.modalShow = false
          this.$emit('submit')
        } else if (code === '205') {
          this.mergeUser(message, user_text)
        } else {
          this.$message.error(message)
        }
      })
    },
    // 合并相同手机号商家
    mergeUser (message, text) {
      const that = this
      this.$confirm({
        title: '合并账号',
        content: () => {
          return (
            <div>
              <div>{message}</div>
              <div style="color: #f5222d;margin-top: 5px;">{text}</div>
            </div>
          )
        },
        icon: () => (
          <a-icon
            type="exclamation-circle"
            style="color: #faad14"
            theme="filled"
          />
        ),
        cancelText: '取消',
        okText: '确定',
        onOk () {
          that.form.is_go_on = 1
          that.editShops()
        },
        onCancel () {}
      })
    },
    setFieldsValue (data) {
      this.form = data
    },
    resetFields () {
      this.$refs.form && this.$refs.form.resetFields()
      this.form = clonedeep(initialForm)
      this.divisionOptions = []
      this.postOptions = []
    }
  }
}
</script>

<style lang="less" scoped>
.form-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
}
.companyIds-checkbox {
  /deep/ .ant-checkbox-wrapper {
    display: block;
    margin-top: 5px;
  }
}
</style>
