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
        <a-form-model-item
          label="商家权限"
          prop="power"
          style="margin-bottom: 0;"
        >
          <a-checkbox-group
            v-model="formData.power"
            :options="powerOptions"
          ></a-checkbox-group>
          <div class="alert-text">
            勾起代表统一开启，未勾起代表统一关闭
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
        <a-form-model-item class="upload-item" label="领券banner" prop="banner" required>
          <upload-image
            v-model="formData.banner"
            maxLength="1"
          ></upload-image>
        </a-form-model-item>
        <a-form-model-item
          class="no-required"
          prop="banner_text"
          label=" "
          :colon="false"
          style="margin-bottom: 0;"
        >
          <a-input
            v-model="formData.banner_text"
            addon-before="文案"
            placeholder="可领$money$元优惠券"
          >
          </a-input>
          <div class="alert-text">APP幸福币页面展示</div>
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
    return {
      formData: {
        is_reveal: '',
        power: [],
        coupon_type: [],
        coupon_scene: [],
        coupon_mode: [],
        coupon_mode_type: '1',
        receive_coupon: [],
        coupon_goods_type: [],
        remind: '',
        banner: [],
        banner_text: ''
      },
      formRules: {
        coupon_type: { required: true, message: '请选择券类型' },
        coupon_scene: { required: true, message: '请选择使用场景' },
        coupon_mode: { required: true, message: '请选择领取方式' },
        receive_coupon: { required: true, message: '请选择可领取用户' },
        coupon_goods_type: { required: true, message: '请选择可使用商品' },
        remind: { required: true, message: '请输入特别提醒' },
        banner: { required: true, message: '请上传领券banner' },
        banner_text: { required: true, message: '请输入文案' }
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
      data.banner = data.banner ? [data.banner] : []
      this.formData = data
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
      params.coupon_type = params.coupon_type.join(',')
      params.coupon_mode = params.coupon_mode.join(',')
      params.coupon_scene = params.coupon_scene.join(',')
      params.receive_coupon = params.receive_coupon.join(',')
      params.coupon_goods_type = params.coupon_goods_type.join(',')
      params.banner = params.banner.length ? params.banner[0] : ''
      const { success } = await setBusinessSetting({
        ...params,
        type: 1
      })
      if (success) {
        this.$message.success('提交成功')
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
.upload-item /deep/ .ant-form-item-control{
  line-height: 1;
}
/deep/ .ant-upload.ant-upload-select-picture-card,
/deep/ .ant-upload-list-picture-card-container {
  margin-bottom: 0;
}
</style>
