<template>
  <div class="editModel">
    <a-modal v-model="isShow" title="新增/编辑">
      <a-form-model
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="类型名称" prop="value1">
          <a-input placeholder="请选择" v-model="form.value1"></a-input>
        </a-form-model-item>
        <a-form-model-item label="参考价" prop="value2">
          <div class="input">
            <a-input placeholder="最低价" style="width:148px" v-model="form.value2"></a-input>
            <span>~</span>
            <a-input style="width:148px" placeholder="最高价" v-model="form.value3"></a-input>
          </div>
          <div class="txt">任务参考的幸福币价格，含最低最高价</div>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea
          v-model="form.value4"
      placeholder="请输入"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
        </a-form-model-item>
      </a-form-model>
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
      form: {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }],
        value2: [{ required: true, message: '必填', trigger: 'change' }],
        value3: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.input{
  display: flex;
  align-items: center;
  span{
    margin: 0 10px;
  }
}
.txt {
  font-family: "MicrosoftYaHei", "Microsoft YaHei";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.447058823529412);
}
</style>
