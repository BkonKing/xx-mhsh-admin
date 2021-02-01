<template>
  <div class="toPush">
    <a-card class="card">
      <stepInfo></stepInfo>
      <a-form-model class="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='标题'>标题标题标题</a-form-model-item>
        <a-form-model-item label='内容'>短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</a-form-model-item>
        <a-form-model-item label='状态'>
          <a-badge color="#108ee9"
                   text="待推送" />
        </a-form-model-item>
        <a-form-model-item label='短信模板'>模板名称名称 <a-button type='link'>查看</a-button>
        </a-form-model-item>
        <a-form-model-item label='短信类型'>营销短信/通知短信</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label='推送方式'>手动推送</a-form-model-item>
        <a-form-model-item label='推送量'>预计2000</a-form-model-item>
        <a-form-model-item label='推送用户'>2000</a-form-model-item>
        <a-form-model-item label='计划推送时间'>2017-10-01 12:00:00</a-form-model-item>
        <a-form-model-item label='推送时间'>
          <a-radio-group>
            <a-radio :value="1">
              定时
            </a-radio>
            <a-radio :value="2">
              立即
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker class="picker"
                         format="YYYY-MM-DD HH:mm:ss"
                         :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label='审核结果'>
          通过
        </a-form-model-item>
        <a-form-model-item label='审核说明'>
          说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明</a-form-model-item>
        <a-form-model-item>
          <div class="btns">
            <a-button type='primary'
                      @click="submit">推送</a-button>
            <a-button @click="noPush">取消推送</a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <cancelModel ref="cancelModel"></cancelModel>
  </div>
</template>

<script>
import stepInfo from './stepInfo'
import moment from 'moment'
import cancelModel from './cancelModel'
export default {
  components: {
    stepInfo,
    cancelModel
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    moment,
    // 推送
    submit () {
      this.$message.success('将在2017-10-01  12:00:00推送')
    },
    // 取消推送
    noPush () {
      this.$refs.cancelPush.isShow = true
    }
  }
}
</script>

<style lang='less' scoped>
.toPush {
  .card {
    margin-top: 20px;
    .form {
      width: 600px;
      margin: 0 auto;
      .line {
        height: 1px;
        background-color: #ebebeb;
        margin: 20px 0;
      }
      .picker {
        margin-left: 100px !important;
        width: 400px;
      }
      .btns {
        margin-left: 100px;
        button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
