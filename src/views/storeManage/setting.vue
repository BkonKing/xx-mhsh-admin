<template>
  <page-header-view>
    <a-card title="基础设置" style="margin-top: 24px;">
      <a-form-model
        ref="basicForm"
        :model="basicForm"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="APP商家标志" prop="aaa">
          <a-radio-group
            v-model="basicForm.aaa"
            :options="aaaOptions"
          ></a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="商家权限" prop="bbb">
          <a-checkbox-group
            v-model="basicForm.bbb"
            :options="bbbOptions"
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
        :model="couponForm"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="券类型" prop="ccc">
          <a-checkbox-group
            v-model="couponForm.ccc"
            :options="couponTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="使用场景" prop="ddd">
          <a-checkbox-group
            v-model="couponForm.ddd"
            :options="useTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="领取方式" prop="eee">
          <a-checkbox-group
            v-model="couponForm.eee"
            :options="pickupTypes"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="可领取用户" prop="fff">
          <a-checkbox-group
            v-model="couponForm.fff"
            :options="pickupUsers"
          ></a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="可使用商品" prop="ggg">
          <a-checkbox-group
            v-model="couponForm.ggg"
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
import { getStaff, setStaff } from '@/api/userManage'

export default {
  name: 'storeSetting',
  components: {
    FooterToolBar
  },
  data () {
    return {
      basicForm: {
        aaa: false,
        bbb: ''
      },
      aaaOptions: [
        {
          label: '展示',
          value: '1'
        },
        {
          label: '不展示',
          value: '0'
        }
      ],
      bbbOptions: [
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
      couponForm: {
        ccc: '',
        ddd: '',
        eee: '',
        fff: '',
        ggg: ''
      },
      couponTypes: [
        {
          label: '满减券',
          value: '1'
        },
        {
          label: '折扣券',
          value: '0'
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
      loading: false
    }
  },
  computed: {
    isChange () {
      return (
        this.basicForm.aaa === this.dataBackup.aaa &&
        parseFloat(this.basicForm.bbb) === parseFloat(this.dataBackup.bbb)
      )
    }
  },
  created () {
    this.getStaff()
  },
  methods: {
    getStaff () {
      getStaff().then(({ data }) => {
        data.aaa = !!+data.aaa
        this.basicForm = data
        this.dataBackup = cloneDeep(data)
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.setStaff()
        } else {
          return false
        }
      })
    },
    setStaff () {
      if (this.basicForm.aaa && !this.basicForm.bbb) {
        this.basicForm.bbb = 5
      }
      const params = cloneDeep(this.basicForm)
      params.aaa = params.aaa ? 1 : 0
      setStaff(params).then(({ success, code }) => {
        if (code === '202') {
          this.$info({
            title: '开启签到任务',
            content: '签到任务未开启，请先开启',
            icon: () => (
              <a-icon
                type="info-circle"
                style="color: #1890ff"
                theme="filled"
              />
            ),
            onOk () {}
          })
          return
        }
        if (success) {
          this.dataBackup = cloneDeep(this.basicForm)
          this.$message.success('提交成功')
        }
      })
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
