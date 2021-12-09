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
      <a-form-model-item
        v-if="isEdit"
        label="商家用户"
      >{{this.form.nickname}}{{realName}} {{this.form.mobile}}</a-form-model-item>
      <a-form-model-item v-else label="商家用户" prop="uid_text" required>
        <a-select
          v-model="form.uid_text"
          mode="multiple"
          label-in-value
          placeholder="请选择"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          @search="fetchUser"
          @change="handleChangeProject"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option
            v-for="item in userOptions"
            :key="item.id"
            :value="item.id"
            >{{ item.nickname }}({{ item.realname }})</a-select-option
          >
        </a-select>
        <div class="alert-text">输入用户姓名、手机号、ID进行搜索</div>
      </a-form-model-item>
      <a-form-model-item label="店铺归属" prop="project_id">
        <a-select
          v-model="form.project_id"
          show-search
          :filter-option="filterProject"
          placeholder="请选择"
          ><a-select-option
            v-for="item in projectOptions"
            :key="item.project_id"
            :value="item.project_id"
            >{{ item.project_name }}</a-select-option
          ></a-select
        >
      </a-form-model-item>
      <a-form-model-item label="店铺名称" prop="shops_name">
        <a-input
          v-model="form.shops_name"
          :maxLength="20"
          :disabled="isMulDisabled"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="营业时间" prop="business_hours">
        <a-input
          v-model="form.business_hours"
          :maxLength="20"
          :disabled="isMulDisabled"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="联系方式" prop="phone">
        <a-input
          v-model="form.phone"
          v-number-input
          :maxLength="15"
          :disabled="isMulDisabled"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="店铺公告" prop="shops_notice">
        <a-textarea
          v-model="form.shops_notice"
          :maxLength="50"
          rows="4"
          :disabled="isMulDisabled"
          placeholder="请输入"
        />
      </a-form-model-item>
      <h3>商家权限</h3>
      <a-form-model-item label="权限" prop="power">
        <a-checkbox-group v-model="form.power" :options="powerOptions" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
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
  name: 'RepositoryForm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    projectOptions: {
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
      rules: {
        uid_text: [{ required: true, message: '请选择商家用户' }],
        project_id: [{ required: true, message: '请选择店铺归属' }]
      }
    }
  },
  computed: {
    title () {
      return this.isEdit
        ? `编辑商家 - ${this.form.shops_name}`
        : '新增商家'
    },
    isEdit () {
      return this.form.id
    },
    isMulDisabled () {
      return this.form.uid_text && this.form.uid_text.length > 1
    },
    realName () {
      const realname = this.form.realname
      return realname ? `(${realname})` : ''
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
        params.uid_text = params.uid_text.map(obj => obj.id)
      }
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
