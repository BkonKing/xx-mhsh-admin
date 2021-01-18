<template>
  <div class="pushInfo">
    <a-card class="card">
      <stepInfo :current='4'></stepInfo>
      <a-form-model class="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="标题">
          标题标题标题
        </a-form-model-item>
        <a-form-model-item label="内容">
          短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-badge color="#00a854"
                   text="已推送" />
        </a-form-model-item>
        <a-form-model-item label='消息模板'>模板名称名称 <a-button type='link'>查看</a-button>
        </a-form-model-item>
        <a-form-model-item label="消息类型">营销短信/通知短信</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label="推送方式">手动推送</a-form-model-item>
        <a-form-model-item label="推送量">
          <a-button type="link">
            2000</a-button>（成功发送量1000，发送失败量1000）
          <div class="txt">成功接收量1000，接收失败量1000，无状态量0，系统拦截量100</div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import stepInfo from './stepInfo'
export default {
  components: {
    stepInfo
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  }
}
</script>

<style lang="less">
.pushInfo {
  .card {
    margin-top: 20px;
    .form {
      width: 600px;
      margin: 30px auto;
      .line {
        height: 1px;
        background-color: #ebebeb;
      }
      .txt {
        font-size: 12px;
        color: #afafaf;
      }
    }
  }
}
</style>
