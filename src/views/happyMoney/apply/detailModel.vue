<template>
  <a-modal class="detailModel"
           v-model="isShow"
           title="发放详情"
           :footer='null'>
    <a-form-model :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item>
        <div class="title">申请信息</div>
      </a-form-model-item>
      <a-form-model-item label='时间'>
        2020-09-09 00:00:00
      </a-form-model-item>
      <a-form-model-item label='账户'>15000000000 彭生生 (昵称昵称）</a-form-model-item>
      <a-form-model-item label='幸福币'>100</a-form-model-item>
      <a-form-model-item label='凭证'>
        <div class="imgs">
          <img v-for="(item, index) in 5"
               :key="index"
               src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2086430614,3322794183&fm=26&gp=0.jpg"
               alt="">
        </div>
      </a-form-model-item>
      <a-form-model-item label='备注'></a-form-model-item>
      <div class="line"></div>
      <a-form-model-item>
        <div class="title">审核信息</div>
      </a-form-model-item>
      <a-form-model-item label='时间'>2020-09-09 00:00:00</a-form-model-item>
      <a-form-model-item label='状态'>
        已发放/已拒绝</a-form-model-item>
      <a-form-model-item label='审核说明'>
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  }
}
</script>

<style lang='less' scoped>
.detailModel {
  .title {
    font-weight: 600;
    margin-left: 25px;
  }
  .imgs {
    display: flex;
    img {
      width: 70px;
      height: 70px;
      margin-right: 10px;
      object-fit: cover;
    }
  }
  .line {
    height: 1px;
    background-color: #ededed;
  }
  .ant-modal-content {
    width: 555px;
  }
}
</style>
