<template>
  <a-modal v-model="isShow" :footer="null" title="查看">
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="任务标题">
        <div class="title">
          任务标题任务标题任务标题任务标题任务标题任务标题
        </div>
      </a-form-model-item>
      <a-form-model-item label="评价用户">
        <span style="color:#1890FF;">昵称(姓名) </span>项目名称
      </a-form-model-item>
      <a-form-model-item
           label="评价时间"
        >2020-11-20 08:50:08</a-form-model-item
      >
      <a-form-model-item label="标签">标签、 标签、标签</a-form-model-item>
      <a-form-model-item
                 label="补充内容"
        >补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容补充内容</a-form-model-item
      >
    </a-form-model>
    <div class="btn" v-if="!bol ">
      <a-button @click="mark">标记为无效评价</a-button>
    </div>
    <div class="bottom" v-if="bol && !showInfo ">
      <div class="left">标记说明：</div>
      <div class="right">
        <a-textarea
        style="width:300px"
          v-model="value"
          placeholder="请输入"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </div>
    </div>
    <div class="btn2" v-if="bol && !showInfo">
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
    <div class="info" v-if="showInfo">
      <div class="item">
        <div class="t1">标记评价：</div>
        <div class="t2">无效</div>
      </div>
      <div class="item">
        <div class="t1 markMan">标记人：</div>
        <div class="t2">姓名</div>
      </div>
      <div class="item">
        <div class="t1">标记时间：</div>
        <div class="t2">2020-11-20  08:50:08</div>
      </div>
      <div class="item">
        <div class="t1">标记说明：</div>
        <div class="t2">内容内容内容内容内容内容内容内容</div>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      bol: false,
      showInfo: false,
      value: ''
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.bol = false
        this.showInfo = false
      }
    }
  },
  methods: {
    // 确定
    submit () {
      this.showInfo = true
    },
    // 标记
    mark () {
      this.bol = true
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  color: #1890ff;
}
.btn {
  margin-left: 74px;
}
.bottom{
display: flex;
margin-left: 10px;
border-top: 2px dashed #999;
padding-top: 20px;
.left{
  width: 70px;
}
.right{
  flex: 1;
}
}
/deep/ .ant-form-item {
  margin-bottom: 15px;
}
.btn2{
  margin-left: 80px;
  margin-top: 20px;
}
.info{
  border-top: 2px dashed #999;
  .item{
    display: flex;
    margin: 10px 8px;
    .markMan{
      margin-left: 12px;
    }
    .t1{
      font-weight: 600;
    }
  }
}
</style>
