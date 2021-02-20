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
                  style="width: 390px">
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
                        style="width: 390px"
                        :show-time="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],}"
                        format="YYYY-MM-DD HH:mm:ss" />
      </a-form-model-item>
      <a-form-model-item label='幸福币'
                         v-if="false">

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
      <a-form-model-item label='奖励'>
        <a-radio-group v-model="form.value3">
          <a-radio :value="1">
            购房
          </a-radio>
          <a-radio :value="2">
            到访+购房
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="幸福币">
        <div class="happyItem"><span>业主</span>
          <a-input style="width:150px;marginRight:10px">
            <template #prefix>
              <div class="txt">
                到访
              </div>
            </template>
          </a-input>
          <a-input style="width:150px">
            <template #prefix>
              <div class="txt">
                购房
              </div>
            </template>
          </a-input>
        </div>
        <div class="happyItem"><span>业主成员</span>
          <a-input style="width:150px;marginRight:10px">
            <template #prefix>
              <div class="txt">
                到访
              </div>
            </template>
          </a-input>
          <a-input style="width:150px">
            <template #prefix>
              <div class="txt">
                购房
              </div>
            </template>
          </a-input>
        </div>
        <div class="happyItem"><span>租户</span>
          <a-input style="width:150px;marginRight:10px">
            <template #prefix>
              <div class="txt">
                到访
              </div>
            </template>
          </a-input>
          <a-input style="width:150px">
            <template #prefix>
              <div class="txt">
                购房
              </div>
            </template>
          </a-input>
        </div>
        <div class="happyItem"><span>租户成员</span>
          <a-input style="width:150px;marginRight:10px">
            <template #prefix>
              <div class="txt">
                到访
              </div>
            </template>
          </a-input>
          <a-input style="width:150px">
            <template #prefix>
              <div class="txt">
                购房
              </div>
            </template>
          </a-input>
        </div>
        <div class="happyItem"><span>游客</span>
          <a-input style="width:150px;marginRight:10px">
            <template #prefix>
              <div class="txt">
                到访
              </div>
            </template>
          </a-input>
          <a-input style="width:150px">
            <template #prefix>
              <div class="txt">
                购房
              </div>
            </template>
          </a-input>
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
        value2: [],
        value3: 1
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
  .happyItem {
    white-space: nowrap;
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 80px;
    }
    .txt {
      color: #d1d1d1;
    }
    /deep/ .ant-input-affix-wrapper .ant-input:not(:first-child) {
      padding-left: 52px;
    }
  }
}
</style>
