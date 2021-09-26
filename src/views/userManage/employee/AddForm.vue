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
      <!-- <a-form-model-item label="公司" prop="company_id">
        <a-select v-model="form.company_id" placeholder="请选择"></a-select>
      </a-form-model-item>
      <a-form-model-item label="部门" prop="division_id">
        <a-select v-model="form.division_id" placeholder="请选择"></a-select>
      </a-form-model-item>
      <a-form-model-item label="职务" prop="post_id">
        <a-select v-model="form.post_id" placeholder="请选择"></a-select>
      </a-form-model-item> -->
      <a-form-model-item label="员工编号" prop="staff_numb">
        <a-input v-model="form.staff_numb" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label="姓名" prop="realname">
        <a-input v-model="form.realname" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label="手机号" prop="mobile" required>
        <a-input
          v-model="form.mobile"
          v-number-input
          :maxLength="11"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="入职日期" prop="entry_time">
        <a-date-picker
          v-model="form.entry_time"
          valueFormat="YYYY-MM-DD"
          style="width: 100%;"
          placeholder="请选择"
        ></a-date-picker>
      </a-form-model-item>
      <!-- <a-form-model-item label="工作项目" prop="item_ids">
        <a-select
          v-model="form.item_ids"
          mode="multiple"
          placeholder="请选择"
        ></a-select>
      </a-form-model-item> -->
      <a-form-model-item label="备注" prop="remark">
        <a-textarea
          v-model="form.address"
          :maxLength="300"
          rows="4"
          placeholder="请输入"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { editStaff } from '@/api/userManage'

const initialForm = {
  company_id: undefined,
  division_id: undefined,
  post_id: undefined,
  staff_numb: '',
  realname: '',
  mobile: '',
  entry_time: '',
  item_ids: [],
  remark: '',
  is_go_on: 0
}
export default {
  name: 'RepositoryForm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    companyList: {
      type: Array,
      default: () => []
    },
    stageList: {
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
      rules: {
        mobile: [{ required: true, message: '请输入手机号' }]
      }
    }
  },
  computed: {
    title () {
      return this.id ? '编辑员工' : '新增员工'
    },
    options () {
      return this.companyList.map(option => {
        return {
          label: option.companyName,
          value: option.companyId,
          disabled:
            this.form.glStatus && this.form.glStatus.includes(option.companyId)
        }
      })
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
  mounted () {
    this.stageList[0] && (this.form.stage = this.stageList[0].stageId)
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.editStaff()
        } else {
          return false
        }
      })
    },
    editStaff () {
      const params = clonedeep(this.form)
      params.item_ids = params.item_ids.join(',')
      editStaff(params).then(({ success, code, message, user_text }) => {
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
    // 合并相同手机号员工
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
          that.editStaff()
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
      this.stageList[0] && (this.form.stage = this.stageList[0].stageId)
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
