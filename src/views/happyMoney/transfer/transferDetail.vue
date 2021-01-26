<template>
  <div class="transferDetail">
    <a-modal class="model"
             v-model="isShow"
             title="转账详情"
             :footer='false'>
      <a-form-model :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item>
          <div class="title1">申请信息</div>
        </a-form-model-item>
        <a-form-model-item label='时间'>
          <div>2020-09-09 00:00:00</div>
        </a-form-model-item>
        <a-form-model-item label='账户类型'>用户</a-form-model-item>
        <a-form-model-item label='账户'>15000000000 彭生生 (昵称昵称）</a-form-model-item>
        <a-form-model-item label='幸福币'><span class="happy">100</span></a-form-model-item>
        <a-form-model-item label='备注'>--</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item>
          <div class="title2">审核信息</div>
        </a-form-model-item>
        <a-form-model-item label='时间'>
          2020-09-09 00:00:00
        </a-form-model-item>
        <a-form-model-item label='状态'>
          已转账/已拒绝
        </a-form-model-item>
        <a-form-model-item label='审核说明'>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false
    }
  }
}
</script>

<style lang='less'>
.model {
  padding: 0 10px;
  .title1 {
    margin-left: 28px;
    font-weight: 600;
  }
  .happy {
    color: red;
  }
  .line {
    margin: 10px 0;
    height: 1px;
    background-color: #e9e9e9;
  }
  .title2 {
    margin-left: 28px;
    font-weight: 600;
  }
}
</style>
