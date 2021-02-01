<template>
  <a-modal class="addTask"
           v-model="isShow"
           title="添加任务/修改任务"
           :footer='null'>
    <a-form-model ref="form"
                  :model='form'
                  :rules='rules'
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item prop='value1'
                         label='选择任务'>
        <a-select v-model="form.value1"
                  style="width: 300px">
          <a-select-option value="jack">
            Jack
          </a-select-option>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
          <a-select-option value="disabled">
            Disabled
          </a-select-option>
          <a-select-option value="Yiminghe">
            yiminghe
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item prop='value2'
                         label='任务时间'>
        <a-range-picker v-model="form.value2"
                        style="width: 300px"
                        :show-time="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],}"
                        format="YYYY-MM-DD HH:mm:ss" />
      </a-form-model-item>
      <a-form-model-item label='幸福币'>

        <div class="boxitem">
          <a-checkbox class="checkbox1">
            业主
          </a-checkbox>
          <a-input style="width: 208px"></a-input>
        </div>
        <div class="boxitem">
          <a-checkbox class="checkbox2">
            业主成员
          </a-checkbox>
          <a-input style="width: 208px"></a-input>
        </div>
        <div class="boxitem">
          <a-checkbox class="checkbox1">
            租户
          </a-checkbox>
          <a-input style="width: 208px"></a-input>
        </div>
        <div class="boxitem">
          <a-checkbox class="checkbox2">
            租户成员
          </a-checkbox>
          <a-input style="width: 208px"></a-input>
        </div>
        <div class="boxitem">
          <a-checkbox class="checkbox1">
            游客
          </a-checkbox>
          <a-input style="width: 208px"></a-input>
        </div>
      </a-form-model-item>
      <div class="btns">
        <a-button @click="isShow=false">取消</a-button>
        <a-button type='primary'
                  @click="submit">确定</a-button>
      </div>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      form: {
        value1: '',
        value2: []
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }],
        value2: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('验证通过')
        } else {
          this.$message.error('验证失败')
        }
      })
    },

    moment
  }
}
</script>

<style lang='less' scoped>
.addTask {
  .boxitem {
    white-space: nowrap;
    .checkbox1 {
      margin-right: 28px;
    }
  }
  .btns {
    margin-top: 20px;
    text-align: center;
    button {
      margin: 0 20px;
    }
  }
}
</style>
