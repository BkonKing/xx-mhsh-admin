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
      <a-form-model-item label="账户类型" prop="user_type">
        <a-radio-group v-model="form.user_type" @change="changeUserType">
          <a-radio value="1">项目账户</a-radio>
          <a-radio value="2">商家用户</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <template v-if="form.user_type === '1'">
        <a-form-model-item label="提现账户" prop="uid" required
          ><a-select
            v-model="form.uid"
            show-search
            placeholder="请选择"
            :disabled="!isParentProject"
            :filter-option="filterProject"
            @change="setProjectBank"
            ><a-select-option
              v-for="item in projectOptions"
              :key="item.id"
              :value="item.id"
              :disabled="!(item.card_info && item.card_info.length)"
              >{{ item.nickname }}</a-select-option
            ></a-select
          ></a-form-model-item
        >
        <a-form-model-item label="到账银行卡"
          ><template v-if="form.bank_id"
            >{{ projectBankInfo.bark_card }}（{{ projectBankInfo.bank_name }}）
            <div>{{ projectBankInfo.realname }}</div></template
          ><template v-else>--</template></a-form-model-item
        >
      </template>
      <template v-else>
        <a-form-model-item label="提现账户" prop="uid" required
          ><a-select
            v-model="form.uid"
            show-search
            placeholder="输入姓名/手机号/ID进行搜索"
            :filter-option="filterUser"
            @change="setBank"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option
              v-for="item in userOptions"
              :key="item.id"
              :value="item.id"
              :disabled="
                +item.project_id != projectIdNum ||
                  !(item.card_info && item.card_info.length)
              "
              >{{ item.nickname }}</a-select-option
            >
          </a-select></a-form-model-item
        >
        <a-form-model-item label="到账银行卡" prop="bank_id">
          <a-select v-model="form.bank_id" placeholder="请选择"
            ><a-select-option
              v-for="item in bankOptions"
              :key="item.id"
              :value="item.id"
            >
              <div>{{ item.bark_card }}({{ item.bank_name }})</div>
              <div>{{ item.realname }}</div>
            </a-select-option></a-select
          >
        </a-form-model-item>
      </template>
      <a-form-model-item label="提现幸福币" prop="credits" required>
        <a-input
          v-model="form.credits"
          v-number-input.int
          :maxLength="15"
          placeholder="请输入"
          @blur="setMoney"
        ></a-input>
        <div>单个账户的提现数量</div>
      </a-form-model-item>
      <a-form-model-item label="提现人民币">
        {{ rmb
        }}<template v-if="actualMoney"
          >（实际提现<span style="font-size: 22px;color: red;line-height: 1;"
            >￥{{ actualMoney }}</span
          >）</template
        >
        <div>服务费{{ serviceMoney * 100 }}%，本次收取￥{{ charge }}</div>
      </a-form-model-item>
      <a-form-model-item label="申请说明" prop="apply_desc">
        <a-textarea
          v-model="form.apply_desc"
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
import NP from 'number-precision'
import clonedeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/util'
import {
  cashApply,
  getDropDownUser,
  getProjectServiceFee
} from '@/api/credit/withdraw'

const initialForm = {
  user_type: '1',
  uid_text: undefined,
  uid: undefined,
  credits: '',
  cash_rmb: '',
  bank_id: ''
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
      title: '提现申请',
      modalShow: this.value,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: clonedeep(initialForm),
      fetching: false,
      userOptions: [],
      projectOptions: [],
      bankOptions: [],
      serviceMoney: 0,
      projectBankInfo: {
        bank_name: '',
        bark_card: '',
        realname: ''
      },
      rules: {
        credits: [{ required: true, message: '请输入提现幸福币' }],
        uid: [{ required: true, message: '请选择店铺归属' }]
      }
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    projectIdNum () {
      return this.projectId ? +this.projectId : 0
    },
    rmb () {
      return this.form.cash_rmb || '--'
    },
    charge () {
      if (!this.form.cash_rmb) {
        return 0
      }
      const num = NP.times(this.form.cash_rmb, this.serviceMoney)
      return (Math.floor(num * 100) / 100).toFixed(2)
    },
    actualMoney () {
      return NP.minus(this.form.cash_rmb, this.charge)
    }
  },
  watch: {
    value (val) {
      this.modalShow = val
      if (val) {
        this.form = clonedeep(initialForm)
      }
    },
    modalShow (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.getProjectServiceFee()
  },
  methods: {
    async getProjectServiceFee () {
      const { data } = await getProjectServiceFee()
      this.serviceMoney = data
    },
    changeUserType () {
      this.form.uid = undefined
      this.form.bank_id = undefined
      this.getDropDownUser()
    },
    async getDropDownUser (params) {
      const { list } = await getDropDownUser({
        type: this.form.user_type,
        ...params
      })
      if (+this.form.user_type === 1) {
        this.projectOptions = list || []
        if (!this.isParentProject) {
          this.form.uid = list[0] ? list[0].id : ''
          this.setProjectBank()
        }
      } else {
        this.userOptions = list || []
        this.fetching = false
      }
    },
    filterProject (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    filterUser (input, option) {
      const value = input.toLowerCase()
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.indexOf(value) >= 0 || option.key == value
    },
    fetchUser (value) {
      const isNumber = /^\d+$/.test(value) && value.length > 5
      const isChinese = /[\u4e00-\u9fa5]/gm.test(value)
      if (!isNumber && !isChinese) {
        return
      }
      this.userOptions = []
      this.fetching = true
      this.getDropDownUser({
        user: value
      })
    },
    setProjectBank () {
      this.form.bank_id = ''
      const data = this.projectOptions.find(obj => obj.id === this.form.uid)
      const cardList = data.card_info || []
      if (cardList && cardList.length) {
        this.form.bank_id = cardList[0].id
        this.projectBankInfo = cardList[0]
      }
    },
    setBank () {
      this.form.bank_id = ''
      const data = this.userOptions.find(obj => obj.id === this.form.uid)
      this.bankOptions = data.card_info || []
      if (this.bankOptions && this.bankOptions.length) {
        this.form.bank_id = this.bankOptions[0].id
      }
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.cashApply()
        } else {
          return false
        }
      })
    },
    setMoney () {
      this.form.cash_rmb = +this.form.credits / 10
    },
    cashApply () {
      cashApply(this.form).then(({ success, message }) => {
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
      this.form = clonedeep(data)
      this.getDropDownUser()
    },
    resetFields () {
      this.projectOptions = []
      this.projectBankInfo = {}
      this.userOptions = []
      this.bankOptions = []
      this.$refs.form && this.$refs.form.resetFields()
      this.form = clonedeep(initialForm)
      this.getDropDownUser()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-select-selection-selected-value {
  height: 30px;
}
</style>
