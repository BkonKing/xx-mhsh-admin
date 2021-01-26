<template>
  <a-modal class="model"
           v-model="isShow"
           title="转账审核"
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
      <div class="btns">
        <a-button @click="isShow=false">拒绝</a-button>
        <a-button type='primary'>转账</a-button>
      </div>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      value: ''
    }
  },
  methods: {
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
  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: center;
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
