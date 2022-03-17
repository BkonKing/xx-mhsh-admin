<template>
  <page-header-view>
    <a-card title="基础设置" style="margin-top: 24px;">
      <a-form-model
        ref="basicForm"
        :model="formData"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="APP商家标志" prop="is_reveal">
          <a-radio-group
            v-model="formData.is_reveal"
            :options="revealOptions"
          ></a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="APP店员标志" prop="is_clerk_reveal">
          <a-radio-group
            v-model="formData.is_clerk_reveal"
            :options="revealOptions"
          ></a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="商家权限" prop="power">
          <a-checkbox-group
            v-model="formData.power"
            :options="powerOptions"
          ></a-checkbox-group>
          <div class="alert-text">
            勾起代表统一开启，未勾起代表统一关闭
          </div>
        </a-form-model-item>
        <a-form-model-item
          label="店员权限"
          prop="clerk_power"
          style="margin-bottom: 0;"
        >
          <a-checkbox-group
            v-model="formData.clerk_power"
            :options="staffPowerOptions"
          ></a-checkbox-group>
          <div class="alert-text">
            勾起代表统一开启，未勾起代表统一关闭
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

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
            :min="1"
            @focus="saveCopyValue('project_examine_day')"
            @blur="setNullValue('project_examine_day')"
          ></a-input-number
          ><span style="margin-left:8px;">个工作日内</span>
        </a-form-model-item>
        <a-form-model-item label="提现总部审核" prop="examine_day">
          <a-input-number
            v-model="formData.examine_day"
            :min="1"
            @focus="saveCopyValue('examine_day')"
            @blur="setNullValue('examine_day')"
          ></a-input-number
          ><span style="margin-left:8px;">个工作日内</span>
        </a-form-model-item>
        <a-form-model-item label="提现打款处理" prop="handle_day">
          <a-input-number
            v-model="formData.handle_day"
            :min="1"
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
            :precision="2"
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

    <a-card title="店铺优惠券" style="margin-top: 24px;">
      <a-form-model
        ref="couponForm"
        :model="formData"
        :rules="formRules"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="券类型" prop="coupon_type" required>
          <a-checkbox-group
            v-model="formData.coupon_type"
            :options="couponTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="使用场景" prop="coupon_scene" required>
          <a-checkbox-group
            v-model="formData.coupon_scene"
            :options="useTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="领取方式" prop="coupon_mode" required>
          <a-checkbox-group
            v-model="formData.coupon_mode"
            :options="pickupTypes"
          ></a-checkbox-group>
          <a-form-model-item
            v-if="formData.coupon_mode.includes('2')"
            prop="coupon_mode_type"
            style="margin-bottom: 0;"
            :rules="{ required: true, message: '请选择' }"
          >
            <a-radio-group
              v-model="formData.coupon_mode_type"
              :options="pickupMethods"
            ></a-radio-group>
          </a-form-model-item>
        </a-form-model-item>
        <a-form-model-item label="可领取用户" prop="receive_coupon" required>
          <a-checkbox-group
            v-model="formData.receive_coupon"
            :options="pickupUsers"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="可使用商品" prop="coupon_goods_type" required>
          <a-checkbox-group
            v-model="formData.coupon_goods_type"
            :options="useGoods"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="商家删除券" prop="is_coupon_del" required>
          <a-radio-group
            v-model="formData.is_coupon_del"
            :options="removeCouponPower"
          ></a-radio-group>
          <div class="alert-text">APP商家店铺券管理页面的删除按钮是否显示</div>
        </a-form-model-item>
        <a-form-model-item
          label="特别提醒"
          prop="remind"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 9 }"
          required
        >
          <a-textarea v-model="formData.remind" />
          <div class="alert-text">APP创建店铺券页面进行提示</div>
        </a-form-model-item>
        <a-form-model-item
          class="upload-item"
          label="领券banner"
          prop="banner"
          required
        >
          <upload-image v-model="formData.banner" maxLength="1"></upload-image>
        </a-form-model-item>
        <a-form-model-item
          class="no-required"
          prop="banner_text"
          label=" "
          :colon="false"
        >
          <a-input
            v-model="formData.banner_text"
            addon-before="文案"
            placeholder="可领$money$元优惠券"
          >
          </a-input>
          <div class="alert-text">APP幸福币页面展示</div>
        </a-form-model-item>
        <a-form-model-item
          label="店铺券使用说明"
          prop="coupon_instructions"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 9 }"
          required
          style="margin-bottom: 0;"
        >
          <a-textarea v-model="formData.coupon_instructions" :autoSize="true" />
          <div class="alert-text">APP店铺优惠券的使用说明展示</div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <div style="height: 80px;"></div>

    <footer-toolbar style="width: 100% !important;">
      <!-- <a-button @click="submit">
        取消
      </a-button> -->
      <a-button
        type="primary"
        :disabled="isChange"
        :loading="loading"
        @click="submit"
      >
        提交
      </a-button>
    </footer-toolbar>
  </page-header-view>
</template>

<script>
// /store/setting
import cloneDeep from 'lodash.clonedeep'
import { UploadImage, FooterToolbar } from '@/components'
import { validAForm } from '@/utils/util'
import {
  getBusinessSetting,
  setBusinessSetting
} from '@/api/userManage/business'

export default {
  name: 'storeSetting',
  components: {
    UploadImage,
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
        is_reveal: '',
        is_clerk_reveal: '',
        power: [],
        clerk_power: [],
        coupon_type: [],
        coupon_scene: [],
        coupon_mode: [],
        coupon_mode_type: '1',
        receive_coupon: [],
        coupon_goods_type: [],
        is_coupon_del: '',
        remind: '',
        banner: [],
        banner_text: '',
        coupon_instructions: '',
        project_examine_day: '',
        examine_day: '',
        handle_day: '',
        service_fee: '',
        procedure: '',
        min_credits: '',
        max_credits: ''
      },
      formRules: {
        coupon_type: { required: true, message: '请选择券类型' },
        coupon_scene: { required: true, message: '请选择使用场景' },
        coupon_mode: { required: true, message: '请选择领取方式' },
        receive_coupon: { required: true, message: '请选择可领取用户' },
        coupon_goods_type: { required: true, message: '请选择可使用商品' },
        remind: { required: true, message: '请输入特别提醒' },
        banner: { required: true, message: '请上传领券banner' },
        banner_text: { required: true, message: '请输入文案' },
        coupon_instructions: { required: true, message: '请输入店铺券使用说明' },
        min_credits: [{ validator: compareMinCredit }],
        max_credits: [{ validator: compareMaxCredit }]
      },
      revealOptions: [
        {
          label: '展示',
          value: '1'
        },
        {
          label: '不展示',
          value: '0'
        }
      ],
      powerOptions: [
        {
          label: '提现申请',
          value: '1'
        },
        {
          label: '店铺券管理',
          value: '2'
        },
        {
          label: '扫码核销券',
          value: '3'
        }
      ],
      staffPowerOptions: [
        {
          label: '店铺券管理',
          value: '1'
        },
        {
          label: '扫码核销券',
          value: '2'
        }
      ],
      couponTypes: [
        {
          label: '满减券',
          value: '1'
        },
        {
          label: '折扣券',
          value: '2'
        }
      ],
      useTypes: [
        {
          label: '线下使用',
          value: '1'
        }
      ],
      pickupTypes: [
        {
          label: '免费领取',
          value: '1'
        },
        {
          label: '付费领取',
          value: '2'
        }
      ],
      pickupMethods: [
        {
          label: '付费幸福币',
          value: '1'
        },
        {
          label: '付费人民币',
          value: '2'
        },
        {
          label: '付费幸福币或人民币',
          value: '3'
        }
      ],
      pickupUsers: [
        {
          label: '全部用户',
          value: '1'
        },
        {
          label: '指定社区',
          value: '2'
        },
        {
          label: '指定角色',
          value: '3'
        }
      ],
      useGoods: [
        {
          label: '全部商品',
          value: '1'
        },
        {
          label: '指定分类',
          value: '2'
        },
        {
          label: '指定专区',
          value: '3'
        }
      ],
      removeCouponPower: [
        {
          label: '可删除',
          value: '1'
        },
        {
          label: '不可删除',
          value: '0'
        }
      ],
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
  watch: {
    formData: {
      handler () {
        this.isChange = false
      },
      deep: true
    }
  },
  created () {
    this.getBusinessSetting()
  },
  methods: {
    async getBusinessSetting () {
      const { data } = await getBusinessSetting()
      data.power = data.power.split(',')
      data.clerk_power = data.clerk_power.split(',')
      data.coupon_type = data.coupon_type.split(',')
      data.coupon_mode = data.coupon_mode.split(',')
      data.coupon_scene = data.coupon_scene.split(',')
      data.receive_coupon = data.receive_coupon.split(',')
      data.coupon_goods_type = data.coupon_goods_type.split(',')
      data.banner = data.banner ? [data.banner] : []
      this.formData = data
      this.$nextTick(() => {
        this.isChange = true
      })
    },
    saveCopyValue (key) {
      this.copyNum = this.formData[key]
    },
    setNullValue (key) {
      const value = this.formData[key]
      if (value === '' || value === null) {
        this.formData[key] = this.copyNum
      }
    },
    submit () {
      const { basicForm, couponForm } = this.$refs
      Promise.all([validAForm(basicForm), validAForm(couponForm)]).then(() => {
        this.setBusinessSetting()
      })
    },
    async setBusinessSetting () {
      const params = cloneDeep(this.formData)
      params.power = params.power.join(',')
      params.clerk_power = params.clerk_power.join(',')
      params.coupon_type = params.coupon_type.join(',')
      params.coupon_mode = params.coupon_mode.join(',')
      params.coupon_scene = params.coupon_scene.join(',')
      params.receive_coupon = params.receive_coupon.join(',')
      params.coupon_goods_type = params.coupon_goods_type.join(',')
      params.banner = params.banner.length ? params.banner[0] : ''
      const { success, message } = await setBusinessSetting({
        ...params,
        type: 1
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
