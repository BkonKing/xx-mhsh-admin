<template>
  <div class="askLookOverModel">
    <a-modal v-model="isShow" title="查看" :footer='null'>
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="任务标题">
          <span style="color:#1d92ff">任务标题任务标题任务标题任务标题</span>
        </a-form-model-item>
        <a-form-model-item label="发布用户">
          <span style="color:#1d92ff">昵称(姓名) </span>项目名称
        </a-form-model-item>
        <a-form-model-item
                  label="创建时间"
          >2020-11-20 08:50:08</a-form-model-item
        >
        <a-form-model-item label="提问编号">
          <span style="color:#1d92ff">0000000000</span>
        </a-form-model-item>
        <a-form-model-item label="类型">回复</a-form-model-item>
        <a-form-model-item label="内容">
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label="审核状态">
          未通过
        </a-form-model-item>
        <a-form-model-item label="审核人">姓名</a-form-model-item>
        <a-form-model-item
                  label="审核时间"
          >2020-11-20 08:50:08</a-form-model-item
        >
        <a-form-model-item label="违规原因">原因原因</a-form-model-item>
        <a-form-model-item label="审核说明">
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </a-form-model-item>
        <div class="imgcon">
          <div class="img" v-for="item in 3" :key="item" @click="previewImg">
            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=380567600,1510886462&fm=26&gp=0.jpg"
              alt=""
            />
          </div>
        </div>
      </a-form-model>
    </a-modal>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    // 预览图片
    previewImg (e) {
      console.log(e.target.src)
      this.previewVisible = true
      this.previewImage = e.target.src
    },
    // 关闭预览图片
    handleCancel () {
      this.previewVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  margin-bottom: 0px;
}
.line {
  margin: 10px 0;
  border-bottom: 2px dashed #efefef;
}
.imgcon {
  display: flex;
  margin-left: 39px;
  .img {
    cursor: pointer;
    margin-left: 38px;
    margin-top: 10px;
    width: 104px;
    height: 104px;
    padding: 10px;
    border: 2px dashed #dedede;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
/deep/.ant-modal-body{
  padding: 42px;
}
</style>
