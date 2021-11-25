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
        <a-form-model-item label="商家权限" prop="power">
          <a-checkbox-group
            v-model="formData.power"
            :options="powerOptions"
          ></a-checkbox-group>
          <div class="alert-text">
            若员工符合多种签到奖励，则奖励其中最高的
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- <a-card title="幸福币提现" style="margin-top: 24px;">

    </a-card> -->

    <a-card title="店铺优惠券" style="margin-top: 24px;">
      <a-form-model
        ref="couponForm"
        :model="formData"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="券类型" prop="coupon_type">
          <a-checkbox-group
            v-model="formData.coupon_type"
            :options="couponTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="使用场景" prop="coupon_scene">
          <a-checkbox-group
            v-model="formData.coupon_scene"
            :options="useTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="领取方式" prop="coupon_mode">
          <a-checkbox-group
            v-model="formData.coupon_mode"
            :options="pickupTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="可领取用户" prop="receive_coupon">
          <a-checkbox-group
            v-model="formData.receive_coupon"
            :options="pickupUsers"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="可使用商品" prop="coupon_goods_type">
          <a-checkbox-group
            v-model="formData.coupon_goods_type"
            :options="useGoods"
          ></a-checkbox-group>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <footer-tool-bar style="width: 100% !important;">
      <a-button
        type="primary"
        :disabled="isChange"
        :loading="loading"
        @click="submit"
      >
        提交
      </a-button>
    </footer-tool-bar>
  </page-header-view>
</template>

<script>
// /store/setting
import cloneDeep from 'lodash.clonedeep'
import FooterToolBar from '@/components/FooterToolbar'
import { validAForm } from '@/utils/util'
import {
  getBusinessSetting,
  setBusinessSetting
} from '@/api/userManage/business'

export default {
  name: 'storeSetting',
  components: {
    FooterToolBar
  },
  data () {
    return {
      formData: {
        is_reveal: '',
        power: [],
        coupon_type: [],
        coupon_scene: [],
        coupon_mode: [],
        receive_coupon: [],
        coupon_goods_type: []
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
      dataBackup: {},
      isChange: false,
      loading: false
    }
  },
  created () {
    this.getBusinessSetting()
  },
  methods: {
    async getBusinessSetting () {
      const { data } = await getBusinessSetting()
      data.power = data.power.split(',')
      data.coupon_type = data.coupon_type.split(',')
      data.coupon_mode = data.coupon_mode.split(',')
      data.coupon_scene = data.coupon_scene.split(',')
      data.receive_coupon = data.receive_coupon.split(',')
      data.coupon_goods_type = data.coupon_goods_type.split(',')
      this.formData = data
    },
    submit () {
      const { basicForm, couponForm } = this.$refs
      Promise.all([
        validAForm(basicForm),
        validAForm(couponForm)
      ]).then(() => {
        this.setBusinessSetting()
      })
    },
    async setBusinessSetting () {
      const params = cloneDeep(this.formData)
      params.power = params.power.join(',')
      params.coupon_type = params.power.join(',')
      params.coupon_mode = params.power.join(',')
      params.coupon_scene = params.power.join(',')
      params.receive_coupon = params.power.join(',')
      params.coupon_goods_type = params.power.join(',')
      const { success } = await setBusinessSetting(params)
      if (success) {
        this.$message.success('提交成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.alert-text {
  color: #00000072;
  line-height: 1;
  padding-top: 7px;
}
</style>
