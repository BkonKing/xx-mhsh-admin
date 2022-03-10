<template>
  <page-header-view>
    <a-card title="幸福币提现" style="margin-top: 24px;">
      <a-form-model
        ref="withdrawForm"
        :model="formData"
        :rules="formRules"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="提现项目审核" prop="project_examine_day">
          <a-input-number
            v-model="formData.project_examine_day"
            @focus="saveCopyValue('project_examine_day')"
            @blur="setNullValue('project_examine_day')"
          ></a-input-number
          ><span style="margin-left:8px;">个工作日内</span>
        </a-form-model-item>
        <a-form-model-item label="提现总部审核" prop="examine_day">
          <a-input-number
            v-model="formData.examine_day"
            @focus="saveCopyValue('examine_day')"
            @blur="setNullValue('examine_day')"
          ></a-input-number
          ><span style="margin-left:8px;">个工作日内</span>
        </a-form-model-item>
        <a-form-model-item label="提现打款处理" prop="handle_day">
          <a-input-number
            v-model="formData.handle_day"
            @focus="saveCopyValue('handle_day')"
            @blur="setNullValue('handle_day')"
          ></a-input-number
          ><span style="margin-left:8px;">个工作日内</span>
        </a-form-model-item>
        <a-form-model-item label="单笔提现限额(幸福币)">
          <a-row type="flex">
            <a-col flex="1"
              ><a-form-model-item prop="min_credits" style="margin-bottom: 0;"
                ><a-input
                  v-model="formData.min_credits"
                  addon-before="最低(含)"
                  placeholder="请输入"
                  v-number-input.int="{
                    min: 1
                  }"
                  @change="$refs.withdrawForm.validateField('max_credits')"
                ></a-input></a-form-model-item
            ></a-col>
            <a-col flex="30px" style="text-align: center;"> ~ </a-col>
            <a-col flex="1"
              ><a-form-model-item prop="max_credits" style="margin-bottom: 0;"
                ><a-input
                  v-model="formData.max_credits"
                  addon-before="最高(含)"
                  placeholder="请输入"
                  v-number-input.int="{
                    min: 1
                  }"
                  @change="$refs.withdrawForm.validateField('min_credits')"
                ></a-input></a-form-model-item
            ></a-col>
          </a-row>
          <div class="alert-text">可只填一个，都不填则代表不限额</div>
        </a-form-model-item>
        <a-form-model-item label="商家提现服务费" prop="service_fee">
          <a-input-number
            v-model="formData.service_fee"
            :min="0"
            :max="100"
            @focus="saveCopyValue('service_fee')"
            @blur="setNullValue('service_fee')"
          ></a-input-number
          ><span style="margin-left:8px;">%</span>
          <div class="alert-text">商家最终提现到账金额将扣除服务费</div>
        </a-form-model-item>
        <a-form-model-item label="商家提现审核流程" prop="procedure">
          <a-radio-group
            v-model="formData.procedure"
            :options="shopAudit"
          ></a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="项目提现审核流程">
          <a-radio :default-checked="true">总部审核</a-radio>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <div style="height: 80px;"></div>

    <footer-toolbar style="width: 100% !important;">
      <a-button
        type="primary"
        :disabled="isChange"
        :loading="loading"
        @click="setCredits"
      >
        提交
      </a-button>
    </footer-toolbar>
  </page-header-view>
</template>

<script>
// /credit/setting
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { FooterToolbar } from '@/components'
import { getCreditSetting, setCredits } from '@/api/credit/setting'

export default {
  name: 'storeSetting',
  components: {
    FooterToolbar
  },
  data () {
    const compareMinCredit = (rule, value, callback) => {
      if (
        this.formData.max_credits &&
        parseFloat(value) > this.formData.max_credits
      ) {
        callback(new Error('单笔提现最低值不能比最高值高'))
      } else {
        callback()
      }
    }
    const compareMaxCredit = (rule, value, callback) => {
      if (
        this.formData.min_credits &&
        parseFloat(value) < this.formData.min_credits
      ) {
        callback(new Error('单笔提现最高值不能比最低值低'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        project_examine_day: '',
        examine_day: '',
        handle_day: '',
        service_fee: '',
        procedure: '',
        min_credits: '',
        max_credits: ''
      },
      formRules: {
        min_credits: [{ validator: compareMinCredit }],
        max_credits: [{ validator: compareMaxCredit }]
      },
      shopAudit: [
        {
          label: '项目审核+总部审核',
          value: '2'
        },
        {
          label: '总部审核',
          value: '1'
        }
      ],
      isChange: true,
      loading: false,
      copyNum: 0
    }
  },
  computed: {
    ...mapGetters(['isParentProject', 'userUrl'])
  },
  watch: {
    formData: {
      handler () {
        this.isChange = false
      },
      deep: true
    }
  },
  created () {
    this.getCreditSetting()
  },
  methods: {
    async getCreditSetting () {
      const { data } = await getCreditSetting()
      this.formData = data
      this.$nextTick(() => {
        this.isChange = true
      })
    },
    saveCopyValue (key) {
      this.copyNum = this.formData[key]
    },
    setNullValue (key) {
      if (!this.formData[key]) {
        this.formData[key] = this.copyNum
      }
    },
    async setCredits () {
      const params = cloneDeep(this.formData)
      const { success, message } = await setCredits({
        ...params
      })
      if (success) {
        this.$message.success('提交成功')
        this.isChange = true
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 表单行高
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.alert-text {
  color: #00000072;
  line-height: 1;
  padding-top: 7px;
}
.no-required /deep/ .ant-form-item-required::before {
  content: "";
}
.upload-item /deep/ .ant-form-item-control {
  line-height: 1;
}
/deep/ .ant-upload.ant-upload-select-picture-card,
/deep/ .ant-upload-list-picture-card-container {
  margin-bottom: 0;
}
</style>
