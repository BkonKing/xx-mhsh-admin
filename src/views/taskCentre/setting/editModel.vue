<template>
  <div class="editModel">
    <a-modal
      v-model="isShow"
      :title="mode === 'add' ? '新增' : '编辑'"
      @ok="submit"
    >
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="类型名称" prop="type_name">
          <a-input
            placeholder="请输入"
            v-model="form.type_name"
            style="width:326px"
            :maxLength="10"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="参考价" prop="start_price">
          <div class="input">
            <a-input
              placeholder="最低价"
              :maxLength="15"
              style="width:148px"
              v-model="form.start_price"
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            ></a-input>
            <span>~</span>
            <a-input
              style="width:148px"
              placeholder="最高价"
              :maxLength="15"
              v-model="form.end_price"
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            ></a-input>
          </div>
          <div class="txt">任务参考的幸福币价格，含最低最高价</div>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea
            v-model="form.remark"
            placeholder="请输入"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { toAddTaskType } from '@/api/taskCentre'
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        type_name: '', // 类型名称
        start_price: '', // 起始价
        end_price: '', // 结束价
        remark: '', // 备注
        id: '' // 修改的时候传
      },
      rules: {
        type_name: [{ required: true, message: '必填', trigger: 'change' }],
        start_price: [{ required: true, message: '必填', trigger: 'change' }],
        end_price: [{ required: true, message: '必填', trigger: 'change' }]
      },
      mode: 'add'
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.form = {
          type_name: '', // 类型名称
          start_price: '', // 起始价
          end_price: '', // 结束价
          remark: '', // 备注
          id: ''
        }
      }
    }
  },
  methods: {
    // 确定
    submit () {
      if (this.mode === 'add') {
        this.$refs.form.validate(async result => {
          if (result) {
            await toAddTaskType(this.form)
            this.$parent.getData()
            this.$message.success('新增成功')
            this.isShow = false
            // console.log('新增', res)
          }
        })
      } else {
        this.$refs.form.validate(async result => {
          if (result) {
            await toAddTaskType(this.form)
            this.$parent.getData()
            this.$message.success('编辑成功')
            this.isShow = false
            // console.log('编辑', res)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item-label{
  width: 80px;
}
/deep/ .ant-modal-content {
  width: 480px;
  height: 400px;
}
/deep/ .ant-modal-body {
  height: 290px;
}
.input {
  display: flex;
  align-items: center;
  span {
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
