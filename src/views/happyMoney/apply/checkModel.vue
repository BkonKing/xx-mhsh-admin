<template>
  <div>
    <a-modal class="checkmodal"
             v-model="isShow"
             title="发放审核"
             @ok="handleOk"
             @cancel="isShow=false"
             ok-text="发放"
             cancel-text="拒绝">
      <a-form-model :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item>
          <div class="title">申请信息</div>
        </a-form-model-item>
        <a-form-model-item label='时间'>
          2020-09-09 00:00:00
        </a-form-model-item>
        <a-form-model-item label='账户'>美好生活家园</a-form-model-item>
        <a-form-model-item label='凭证'>
          <div class="imgs">
            <img v-for="(item, index) in 5"
                 :key="index"
                 src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2086430614,3322794183&fm=26&gp=0.jpg"
                 alt="">
          </div>
        </a-form-model-item>
        <a-form-model-item label='备注'>--</a-form-model-item>
        <div class="line"></div>
        <a-form-model-item>
          <div class="title">审核信息</div>
        </a-form-model-item>
        <a-form-model-item label='审核说明'>
          <div class="input">
            <a-textarea v-model="value"
                        maxlength="100"
                        :rows="3"
                        :auto-size="{ minRows: 4, maxRows: 4 }">

            </a-textarea>
            <div class="num">{{value.length}}/100</div>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    handleOk () { }
  }
}
</script>

<style lang='less' scoped>
.checkmodal {
  .title {
    margin-left: 28px;
    font-weight: 600;
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
  .ant-modal-content {
    width: 538px;
  }
  .line {
    height: 1px;
    background-color: #f2f2f2;
    margin: 20px 0;
  }
  /deep/ .ant-modal-footer {
    margin-top: -20px;
    padding-bottom: 20px;
    border-top: none;
    text-align: center;
    button {
      margin: 0 20px;
    }
  }
  .input {
    position: relative;
    .num {
      position: absolute;
      right: 6px;
      bottom: 0;
      color: #e6e6e6;
    }
  }
}
</style>
