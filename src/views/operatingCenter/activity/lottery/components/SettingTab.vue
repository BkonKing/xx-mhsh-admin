<template>
  <div>
    <a-card title="活动信息" :bordered="false">
      <a-form-model
        ref="BasicForm"
        :model="formData"
        :rules="formRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item required prop="title" label="活动标题">
          <a-input
            v-model="formData.title"
            placeholder="请输入"
            :maxLength="25"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item required prop="is_limit" label="有效时间">
          <a-radio-group v-model="formData.is_limit">
            <a-radio value="1">有限</a-radio>
            <a-radio value="0">不限</a-radio>
          </a-radio-group>
          <template v-if="+formData.is_limit === 1">
            <a-form-model-item
              prop="time"
              :rules="{ required: true, message: '请选择有效时间' }"
              style="margin-bottom: 0;"
            >
              <a-range-picker
                v-model="formData.time"
                :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                :placeholder="['开始时间', '结束时间']"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
              />
            </a-form-model-item>
            <div class="alert-text">
              到达设定时间将自动生效和失效，生效期间则可抽奖
            </div>
          </template>
        </a-form-model-item>
        <a-form-model-item label="每日抽奖机会" prop="chance_frequency">
          <a-input-number
            v-model="formData.chance_frequency"
            :min="1"
            :precision="0"
            @focus="handleFocus('chance_frequency')"
            @blur="handleBlur('chance_frequency')"
          ></a-input-number
          ><span style="margin-left:8px;margin-right: 8px;">次，其中前</span>
          <a-input-number
            v-model="formData.free_frequency"
            :min="0"
            :precision="0"
            @focus="handleFocus('free_frequency')"
            @blur="handleBlur('free_frequency')"
          ></a-input-number
          ><span style="margin-left:8px;">次免费抽奖</span>
          <div class="alert-text">每人每天最多可抽奖次数</div>
        </a-form-model-item>
        <a-form-model-item label="抽奖消耗" prop="consume">
          <a-input-number
            v-model="formData.consume"
            :min="0"
            :precision="0"
            @focus="handleFocus('consume')"
            @blur="handleBlur('consume')"
          ></a-input-number
          ><span style="margin-left:8px;">幸福币/次</span>
        </a-form-model-item>
        <a-form-model-item label="活动说明" prop="explain" required>
          <a-textarea v-model="formData.explain" autoSize></a-textarea>
          <div class="alert-text">前端活动页面的活动说明展示</div>
        </a-form-model-item>
        <a-form-model-item label="提示抽奖弹窗" prop="popup">
          <a-input-number
            v-model="formData.popup"
            :min="0"
            :precision="0"
          ></a-input-number
          ><span style="margin-left:8px;">次/天，当用户还有抽奖次数时</span>
          <div class="alert-text">首页弹窗提示每天最多次数</div>
        </a-form-model-item>
        <a-form-model-item label="兑奖工作人员" prop="power_uid_data">
          <a-select
            v-model="formData.power_uid_data"
            mode="multiple"
            show-search
            placeholder="搜索手机号/姓名"
            :filter-option="false"
            :not-found-content="fetching ? undefined : null"
            @search="fetchUser"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option
              v-for="item in userOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.mobile }} {{ item.realname }}</a-select-option
            >
          </a-select>
          <div class="alert-text">拥有前端扫一扫核销奖品兑换码的权限</div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <prize-setting
      ref="prizeSetting"
      :infoData="formData"
      :data="prizeList"
      @tableChange="submitDisabled = false"
    ></prize-setting>
    <div style="height: 56px;"></div>
    <footer-tool-bar style="width: 100%;">
      <a-button @click="getLotterySetting" style="margin-right: 15px;">
        取消
      </a-button>
      <a-button
        type="primary"
        :loading="loading"
        :disabled="submitDisabled"
        @click="handleSubmit"
        >提交</a-button
      >
    </footer-tool-bar>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { debounce, validAForm } from '@/utils/util'
import FooterToolBar from '@/components/FooterToolbar'
import PrizeSetting from './PrizeSetting'
import {
  getLotterySetting,
  saveLotterySetting
} from '@/api/operatingCenter/lottery'
import { getUserList } from '@/api/userManage/business'

export default {
  name: 'SettingTab',
  components: {
    FooterToolBar,
    PrizeSetting
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 500)
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 10 } },
      loading: false,
      formData: {
        title: '',
        is_limit: '1',
        time: [],
        chance_frequency: '',
        free_frequency: '',
        consume: '',
        explain: '',
        popup: '',
        power_uid_data: []
      },
      formRules: {
        title: [{ required: true, message: '请输入活动标题' }],
        explain: [{ required: true, message: '请输入活动说明' }]
      },
      fetching: false,
      userOptions: [],
      prizeList: [],
      copyNum: 0, // 抽奖一会和免费次数暂存拷贝数据
      submitDisabled: false
    }
  },
  watch: {
    formData: {
      handler () {
        this.submitDisabled = false
      },
      deep: true
    }
  },
  created () {
    this.getLotterySetting()
  },
  methods: {
    getLotterySetting () {
      getLotterySetting().then(
        ({
          setting_info: settingInfo,
          award_list: prizeList,
          power_list: uidList
        }) => {
          let uidData = uidList || []
          if (uidData.length) {
            uidData = uidList.map(obj => obj.uid)
            settingInfo.power_uid_data = uidData
            this.userOptions = uidList.map(obj => ({
              ...obj,
              id: obj.uid
            }))
          }
          if (settingInfo?.s_time) {
            settingInfo.time = [settingInfo.s_time, settingInfo.e_time]
          }
          this.formData = settingInfo || {}
          this.prizeList =
            prizeList.map(obj => ({
              goods_id: '',
              ...obj
            })) || []
          this.$nextTick(() => {
            this.submitDisabled = true
          })
        }
      )
    },
    handleFocus (key) {
      this.copyNum = this.formData[key]
    },
    handleBlur (key) {
      const value = this.formData[key]
      if (value === null || value === '') {
        this.formData[key] = this.copyNum
      }
    },
    handleSubmit () {
      Promise.all([
        validAForm(this.$refs.BasicForm),
        this.$refs.prizeSetting.validate()
      ]).then(() => {
        const awardData = this.$refs.prizeSetting.tableData || []
        if (awardData.length < 5) {
          this.$message.error('奖项需设置5~12个')
          return
        }
        const params = cloneDeep(this.formData)
        if (params.time?.length) {
          params.s_time = params.time[0]
          params.e_time = params.time[1]
        }
        saveLotterySetting({
          ...params,
          setting_id: params.id,
          award_data: awardData.map((data, index) => {
            const {
              i,
              couponOptions,
              ctime,
              is_del,
              project_id,
              ...params
            } = data
            return {
              ...params,
              sort: index
            }
          })
        }).then(success => {
          if (success) {
            this.$message.success('提交成功')
            this.getLotterySetting()
            this.$emit('success')
          }
        })
      })
    },
    fetchUser (value) {
      const isNumber = /^\d+$/.test(value) && value.length > 7
      const isChinese = /[\u4e00-\u9fa5]/gm.test(value)
      if (!isNumber && !isChinese) {
        return
      }
      this.fetching = true
      getUserList({
        user_text: value
      }).then(({ data }) => {
        this.userOptions = data.list
        this.fetching = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.alert-text {
  line-height: 1.6;
  color: #00000072;
}
</style>
