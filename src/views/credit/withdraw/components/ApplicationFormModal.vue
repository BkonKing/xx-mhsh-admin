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
      <a-form-model-item label="账户类型" prop="account_type">
        <a-radio-group v-model="form.account_type">
          <a-radio value="1">项目账户</a-radio>
          <a-radio value="2">商家用户</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <template v-if="form.account_type === '1'">
        <a-form-model-item label="提现账户" required
          ><a-select
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
          ></a-form-model-item
        >
        <a-form-model-item label="到账银行卡"
          >{{ form.nickname }}
          <div>姓名</div></a-form-model-item
        >
      </template>
      <template v-else>
        <a-form-model-item label="提现账户" required
          ><a-select
          v-model="form.uid_text"
          placeholder="输入姓名/手机号/ID进行搜索"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          @search="fetchUser"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="item in userOptions" :key="item.id">{{
            item.name_text
          }}</a-select-option>
        </a-select></a-form-model-item
        >
        <a-form-model-item label="到账银行卡" prop="project_id">
          <a-select
            v-model="form.project_id"
            placeholder="请选择"
            ><a-select-option
              v-for="item in projectOptions"
              :key="item.project_id"
              :value="item.project_id"
              >
                <div>{{ item.project_name }}({{ item.project_name }})</div>
                <div>{{ item.project_name }}</div>
              </a-select-option
            ></a-select
          >
        </a-form-model-item>
      </template>
      <a-form-model-item label="提现幸福币" prop="cash_credits" required>
        <a-input
          v-model="form.cash_credits"
          v-number-input.int
          :maxLength="15"
          placeholder="请输入"
          @blur="setMoney"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="提现人民币">
        {{rmb}}<template v-if="actualMoney">（实际提现<span style="font-size: 22px;color: red;">￥{{actualMoney}}</span>）</template>
        <div>服务费{{serviceMoney * 100}}%，本次收取￥{{charge}}</div>
      </a-form-model-item>
      <a-form-model-item label="申请说明" prop="describe">
        <a-textarea
          v-model="form.describe"
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
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/util'
import { editShops, getUserList } from '@/api/userManage/business'

const initialForm = {
  account_type: '1',
  uid_text: undefined,
  project_id: undefined,
  post_id: undefined,
  cash_credits: '',
  cash_rmb: '',
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
    }
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 500)
    return {
      title: '提现审核',
      modalShow: this.value,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: clonedeep(initialForm),
      fetching: false,
      userOptions: [],
      projectOptions: [],
      serviceMoney: 0.05,
      rules: {
        uid_text: [{ required: true, message: '请选择商家用户' }],
        project_id: [{ required: true, message: '请选择店铺归属' }]
      }
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    rmb () {
      return this.form.cash_rmb || '--'
    },
    charge () {
      if (!this.form.cash_rmb) {
        return 0
      }
      const num = this.form.cash_rmb * this.serviceMoney
      return num.toFixed(2)
    },
    actualMoney () {
      return this.form.cash_rmb - this.charge
    }
  },
  watch: {
    value (val) {
      this.modalShow = val
      if (val) {
        this.form = clonedeep(initialForm)
        if (!this.isParentProject) {
          this.form.project_id = this.projectId
        }
      }
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
    setMoney () {
      this.form.cash_rmb = (+this.form.cash_credits) / 10
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
    }
  }
}
</script>
