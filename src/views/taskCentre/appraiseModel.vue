<template>
  <a-modal v-model="isShow" :footer="null" title="查看">
    <a-form-model
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    <a-form-model-item label='任务标题'>
      <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题</div>
    </a-form-model-item>
    <a-form-model-item label="评价用户">
      <span style="color:#1890FF;">昵称(姓名) </span>项目名称
    </a-form-model-item>
    <a-form-model-item label="评价时间">2020-11-20 08:50:08</a-form-model-item>
    <a-form-model-item label="标签">标签、 标签、标签</a-form-model-item>
    <a-form-model-item label='补充内容'>补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容</a-form-model-item>
    </a-form-model>
    <div class="btn">
      <a-button>标记为无效评价</a-button>
    </div>
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
.title{
  color:#1890FF ;
}
.btn{
  margin-left: 74px;
}
</style>
