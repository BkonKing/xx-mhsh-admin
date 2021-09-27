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
      <a-form-model-item label="公司" prop="company_id">
        <a-select
          v-model="form.company_id"
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
      </a-form-model-item>
      <a-form-model-item label="部门" prop="division_id">
        <a-select
          v-model="form.division_id"
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
      <a-form-model-item label="职务" prop="post_id">
        <a-select v-model="form.post_id" placeholder="请选择">
          <a-select-option
            v-for="item in postOptions"
            :key="item.id"
            :value="item.id"
            >{{ item.post_name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
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
      <a-form-model-item label="工作项目" prop="item_ids">
        <a-select v-model="form.item_ids" mode="multiple" placeholder="请选择" @change="selectProject">
          <a-select-option key="all" :value="0">全部</a-select-option>
          <a-select-option
            v-for="item in projectOptions"
            :key="item.id"
            :value="item.id"
            >{{ item.item_name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-textarea
          v-model="form.remark"
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
import { editStaff, getDivisionList, getPostList } from '@/api/userManage'

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
      divisionOptions: [],
      postOptions: [],
      rules: {
        mobile: [{ required: true, message: '请输入手机号' }]
      }
    }
  },
  computed: {
    title () {
      return this.form.staff_id ? '编辑员工' : '新增员工'
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
    // 获取部门
    getDivisionList (companyId) {
      getDivisionList({
        company_id: companyId
      }).then(({ data }) => {
        this.divisionOptions = data || []
      })
    },
    // 获取职务
    getPostList (companyId, divisionId) {
      getPostList({
        company_id: companyId,
        division_id: divisionId
      }).then(({ data }) => {
        this.postOptions = data || []
      })
    },
    handleCompanyChange () {
      this.$set(this.form, 'division_id', undefined)
      this.$set(this.form, 'post_id', undefined)
      this.getDivisionList(this.form.company_id)
      this.postOptions = []
    },
    handleDivisionChange () {
      this.$set(this.form, 'post_id', undefined)
      this.getPostList(this.form.company_id, this.form.division_id)
    },
    // 选中工作项目，主要处理选中全部，则自动选中所有值
    selectProject (value, option) {
      console.log(value)
      const index = value.findIndex(obj => obj === 0)
      // 有选中全部
      if (index > -1) {
        this.form.item_ids = this.projectOptions.map(obj => obj.id)
      }
    },
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
      this.form.company_id && this.getDivisionList(this.form.company_id)
      this.form.division_id && this.getPostList(this.form.company_id, this.form.division_id)
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
