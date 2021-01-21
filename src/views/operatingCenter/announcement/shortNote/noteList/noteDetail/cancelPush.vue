<template>
  <div class="cancelPush">
    <a-card class="card">
      <stepInfo></stepInfo>
      <a-form-model class="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='标题'>标题标题标题</a-form-model-item>
        <a-form-model-item label='内容'>
          短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
        <a-form-model-item label='状态'>
          <a-badge color="#108ee9"
                   text="已取消" />
        </a-form-model-item>
        <a-form-model-item label='短信模板'>短信名称名称 <a-button type='link'>查看</a-button>
        </a-form-model-item>
        <a-form-model-item label='短信类型'>营销短信/通知短信</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label='推送方式'>手动推送</a-form-model-item>
        <a-form-model-item label='推送量'>预计2000</a-form-model-item>
        <a-form-model-item label='推送用户'>2000</a-form-model-item>
        <a-form-model-item label='计划推送时间'>2017-10-01 12:00:00</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label='审核结果'>通过</a-form-model-item>
        <a-form-model-item label='审核说明'>说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label='取消推送说明'>说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明</a-form-model-item>
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

<style lang='less'>
.cancelPush {
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
    }
  }
}
</style>
