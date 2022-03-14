<template>
  <a-modal
    v-model="modalShow"
    :title="title"
    :width="600"
    :destroyOnClose="true"
    @ok="handleSubmit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="店铺" prop="shops_id">
        <a-select
          v-model="form.shops_id"
          show-search
          :filter-option="filterProject"
          placeholder="输入名称进行搜索"
          @change="getShopPower"
          ><a-select-option
            v-for="item in shopOptions"
            :key="item.id"
            :value="item.id"
            >{{ item.shops_name }}</a-select-option
          ></a-select
        >
      </a-form-model-item>
      <a-form-model-item label="店员手机号" prop="mobile" required>
        <a-select
          v-model="form.mobile"
          placeholder="输入姓名/手机号/ID进行搜索"
          show-search
          optionLabelProp="value"
          :filter-option="false"
          :disabled="isEdit"
          :not-found-content="fetching ? undefined : null"
          @search="fetchUser"
          @change="handleChangeProject"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option
            v-for="item in userOptions"
            :key="item.mobile"
            :disabled="+item.is_shops || +item.is_shops_clerk"
            >{{ item.mobile }} {{ item.nickname }}
            {{ item.realname ? `(${item.realname})` : "" }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="店员姓名" prop="clerk_name" required>
        <a-input
          v-model="form.clerk_name"
          :maxLength="10"
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="权限" prop="clerk_power_data" required>
        <a-checkbox-group
          v-model="form.clerk_power_data"
          :options="powerOptions"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/util'
import {
  saveShopStaff,
  getShopOption,
  getUserList,
  getShopPrivilege
} from '@/api/userManage/business'

const initialForm = {
  mobile: undefined,
  shops_id: undefined,
  clerk_name: '',
  clerk_power_data: []
}
export default {
  name: 'staffForm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    powers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 500)
    return {
      title: '新增店员',
      modalShow: this.value,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: clonedeep(initialForm),
      fetching: false,
      shopOptions: [],
      userOptions: [],
      powerOptions: [
        {
          label: '店铺券管理',
          value: '1'
        },
        {
          label: '扫码核销券',
          value: '2'
        }
      ],
      rules: {
        shops_id: [{ required: true, message: '请选择店铺' }],
        mobile: [{ required: true, message: '请选择店员手机号' }],
        clerk_name: [{ required: true, message: '请输入店员姓名' }],
        clerk_power_data: [{ required: true, message: '请选择权限' }]
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
          ? `编辑店员 ${
              this.form.clerk_name ? `- ${this.form.clerk_name}` : ''
            }`
          : '新增店员'
      }
      this.modalShow = val
    },
    modalShow (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.getShopOption()
  },
  methods: {
    async getShopOption () {
      const { data } = await getShopOption({
        pageindex: 1,
        pagesize: 10,
        shops_name: ''
      })
      this.shopOptions = data.list || []
    },
    async getShopPower () {
      const { list } = await getShopPrivilege({
        shops_id: this.form.shops_id
      })
      this.powerOptions = list || []
    },
    filterProject (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    handleChangeProject (value, option) {
      if (!this.form.clerk_name) {
        const text = option.componentOptions.children[0].text
        const index1 = text.indexOf('(') + 1
        if (index1 > 0) {
          const index2 = text.indexOf(')')
          this.form.clerk_name = text.slice(index1, index2)
        }
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
          this.editStaff()
        } else {
          return false
        }
      })
    },
    editStaff () {
      const params = clonedeep(this.form)
      params.clerk_power_data = params.clerk_power_data.filter(obj =>
        this.powerOptions.findIndex(option => option.value === obj) > -1
      )
      saveShopStaff(params).then(({ success, message }) => {
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
      this.getShopPower()
    },
    resetFields () {
      this.userOptions = []
      this.$refs.form && this.$refs.form.resetFields()
      this.form = clonedeep(initialForm)
      this.powerOptions = clonedeep(this.powers)
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
