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
          ></a-input-number
          ><span style="margin-left:8px;margin-right: 8px;">次，其中前</span>
          <a-input-number
            v-model="formData.free_frequency"
            :min="1"
            :precision="0"
          ></a-input-number
          ><span style="margin-left:8px;">次免费抽奖</span>
          <div class="alert-text">每人每天最多可抽奖次数</div>
        </a-form-model-item>
        <a-form-model-item label="抽奖消耗" prop="consume">
          <a-input-number
            v-model="formData.consume"
            :min="1"
            :precision="0"
          ></a-input-number
          ><span style="margin-left:8px;">幸福币/次</span>
        </a-form-model-item>
        <a-form-model-item label="活动说明" prop="explain" required>
          <a-input v-model="formData.explain" type="textarea"></a-input>
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
        <a-form-model-item label="兑奖工作人员" prop="eeee">
          <a-select
            v-model="formData.eeee"
            type="multiple"
            show-search
            placeholder="输入姓名/手机号/ID进行搜索"
            :filter-option="filterUser"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option
              v-for="item in userOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.nickname }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <prize-setting :data="prizeList"></prize-setting>
    <div style="height: 56px;"></div>
    <footer-tool-bar style="width: 100%;">
      <a-button @click="$router.go(-1)" style="margin-right: 15px;">
        取消
      </a-button>
      <a-button type="primary" @click="handleSubmit" :loading="loading"
        >提交</a-button
      >
    </footer-tool-bar>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import FooterToolBar from '@/components/FooterToolbar'
import PrizeSetting from './PrizeSetting'
import { getLotterySetting } from '@/api/operatingCenter/lottery'

export default {
  name: 'SettingTab',
  components: {
    FooterToolBar,
    PrizeSetting
  },
  data () {
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
        popup: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入活动标题' }],
        explain: [{ required: true, message: '请输入活动说明' }]
      },
      fetching: false,
      userOptions: [],
      prizeList: []
    }
  },
  created () {
    this.getLotterySetting()
  },
  methods: {
    getLotterySetting () {
      getLotterySetting().then(({ setting_info: settingInfo, award_list: prizeList }) => {
        console.log(settingInfo)
        this.formData = settingInfo || {}
        this.prizeList = prizeList || []
      })
    },
    handleSubmit () {},
    filterUser (input, option) {
      const value = input.toLowerCase()
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.indexOf(value) >= 0 || option.key == value
    }
  }
}
</script>

<style lang="less" scoped>
.alert-text {
  line-height: 1.4;
  color: #00000072;
}
</style>
