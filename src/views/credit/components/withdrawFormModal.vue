<template>
  <a-modal
    v-model="modalShow"
    title="提现审核"
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
      <a-form-model-item label="店铺" prop="project_id">
        <a-select
          v-model="form.project_id"
          show-search
          :filter-option="filterProject"
          placeholder="输入名称进行搜索"
          ><a-select-option
            v-for="item in projectOptions"
            :key="item.project_id"
            :value="item.project_id"
            >{{ item.project_name }}</a-select-option
          ></a-select
        >
      </a-form-model-item>
      <a-form-model-item label="店员手机号" prop="uid_text" required>
        <a-select
          v-model="form.uid_text"
          placeholder="输入姓名/手机号/ID进行搜索"
          :filter-option="false"
          :disabled="isEdit"
          :not-found-content="fetching ? undefined : null"
          @search="fetchUser"
          @change="handleChangeProject"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="item in userOptions" :key="item.id">{{
            item.name_text
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        label="店员姓名"
        prop="shops_name"
        required
      >
        <a-input
          v-model="form.shops_name"
          :maxLength="20"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="权限" prop="power" required>
        <a-checkbox-group v-model="form.power" :options="powerOptions" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/util'
import { editShops, getUserList } from '@/api/userManage/business'

const initialForm = {
  uid_text: undefined,
  project_id: undefined,
  post_id: undefined,
  shops_name: '',
  business_hours: '',
  phone: '',
  power: [],
  shops_notice: ''
}
export default {
  name: 'staffForm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    projectOptions: {
      type: Array,
      default: () => []
    },
    powerOptions: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 500)
    return {
      modalShow: this.value,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: clonedeep(initialForm),
      fetching: false,
      userOptions: [],
      rules: {
        project_id: [{ required: true, message: '请选择店铺' }],
        uid_text: [{ required: true, message: '请选择店员手机号' }],
        shops_name: [{ required: true, message: '请输入店员姓名' }],
        power: [{ required: true, message: '请选择权限' }]
      }
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    isEdit () {
      return !!this.form.id
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.title = this.isEdit
          ? `编辑商家 ${
              this.form.shops_name ? `- ${this.form.shops_name}` : ''
            }`
          : '新增商家'
        this.setDefaultPower()
      }
      this.modalShow = val
    },
    modalShow (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    setDefaultPower () {
      if (this.isEdit) return
      const value = this.powerOptions.map(obj => obj.value)
      this.$set(this.form, 'power', value)
    },
    filterProject (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    handleChangeProject (value) {
      if (value && value.length > 1) {
        this.form.shops_name = ''
        this.form.business_hours = ''
        this.form.phone = ''
        this.form.shops_notice = ''
      }
    },
    fetchUser (value) {
      const isNumber = /^\d+$/.test(value) && value.length > 5
      const isChinese = /[\u4e00-\u9fa5]/gm.test(value)
      if (!isNumber && !isChinese) {
        return
      }
      this.data = []
      this.fetching = true
      getUserList({
        user_text: value
      }).then(({ data }) => {
        this.userOptions = data.list
        this.fetching = false
      })
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
      params.power = params.power.join(',')
      if (!this.isEdit) {
        params.uid_text = params.uid_text.map(obj => obj.key).join(',')
      } else {
        params.uid && (params.uid_text = params.uid)
      }
      params.id && (params.shops_id = params.id)
      editShops(params).then(({ success, message }) => {
        if (success) {
          this.$message.success('保存成功')
          this.modalShow = false
          this.$emit('submit')
        } else {
          this.$message.error(message)
        }
      })
    },
    setFieldsValue (data) {
      this.form = data
    },
    resetFields () {
      this.userOptions = []
      this.$refs.form && this.$refs.form.resetFields()
      this.form = clonedeep(initialForm)
      if (!this.isParentProject) {
        this.form.project_id = this.projectId
      }
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 24px;
  font-weight: bold;
}
</style>
