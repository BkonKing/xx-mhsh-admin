<template>
  <div class="toPush">
    <a-card class="card">
      <stepInfo :current="3"></stepInfo>
      <a-form-model class="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="标题">标题标题标题</a-form-model-item>
        <a-form-model-item label="标题">
          短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-badge color="#1890ff"
                   text="待推送" />
        </a-form-model-item>
        <a-form-model-item label="消息模板">
          模板名称名称 <a-button type="link">查看</a-button>
        </a-form-model-item>
        <a-form-model-item label="消息类型">系统消息</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label="推送方式">手动推送</a-form-model-item>
        <a-form-model-item label="推送量">预计2000</a-form-model-item>
        <a-form-model-item label="推送用户">2000</a-form-model-item>
        <a-form-model-item label="计划推送时间">2017-10-01 12:00:00</a-form-model-item>
        <a-form-model-item label="推送时间">
          <a-radio-group v-model="value">
            <a-radio :value="1">
              定时
            </a-radio>
            <a-radio :value="2">
              立即
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="">
          <a-locale-provider :locale="locale">
            <a-date-picker class="picker"
                           format="YYYY-MM-DD HH:mm:ss"
                           :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
          </a-locale-provider>
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label="审核结果">通过</a-form-model-item>
        <a-form-model-item label="审核说明">
          说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
        </a-form-model-item>
        <a-form-model-item>
          <div class="btns">
            <a-button type="primary"
                      @click="submit">推送</a-button>
            <a-button @click="cancelPush">取消推送</a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <cancelModal ref="cancelModal"></cancelModal>
  </div>
</template>

<script>
import stepInfo from './stepInfo'
import moment from 'moment'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import cancelModal from './cancelModal'
export default {
  components: {
    stepInfo,
    cancelModal
  },
  data () {
    return {
      locale: zhCN,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      value: 1
    }
  },
  methods: {
    // 推送
    submit () {
      this.$message.success('将在2017-10-01 12:00:00推送')
    },
    moment,
    // 取消推送
    cancelPush () {
      this.$refs.cancelModal.isShow = true
    }
  }
}
</script>

<style lang="less">
.toPush {
  .card {
    margin-top: 20px;
    .form {
      margin: 30px auto;
      width: 600px;
      .line {
        height: 1px;
        background-color: #ebebeb;
      }
      .picker {
        margin-left: 134px;
        width: 300px;
      }
      .btns {
        margin-left: 125px;
        button:last-child {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
