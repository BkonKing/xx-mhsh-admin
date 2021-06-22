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
            style="width:320px"
            :maxLength="10"
          ></a-input>
        </a-form-model-item>

        <a-form-model-item label="参考价" >
          <div class="boxPrice">
           <span class="point">*</span>
            <div class="minPrice" >
              <a-form-model-item prop="start_price">
                <a-input
                  placeholder="最低价"
                  :maxLength="15"

                  v-model="form.start_price"
                  oninput="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                ></a-input>
              </a-form-model-item>
            </div>
            <div  style="textAlign: center;padding:0 10px"><span>~</span></div>
            <div  class="maxPrice">
              <a-form-model-item prop="end_price">
                <a-input
                  placeholder="最高价"
                  :maxLength="15"

                  v-model="form.end_price"
                  oninput="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                ></a-input>
              </a-form-model-item>
            </div>
          </div>

          <div class="txt">任务参考的幸福币价格，含最低最高价</div>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-textarea
            class="textarea"
            v-model="form.remark"
            placeholder="请输入"

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
        this.$refs.form.clearValidate()
      }
    }
  },
  methods: {
    // 确定
    submit () {
      if (this.mode === 'add') {
        this.$refs.form.validate(async result => {
          if (result) {
            const res = await toAddTaskType(this.form)
            if (res.code === '201') {
              this.$message.error(res.message)
            } else {
              this.$parent.getData()
              this.$message.success('新增成功')
              this.isShow = false
              // console.log('新增', res)
            }
          }
        })
      } else {
        this.$refs.form.validate(async result => {
          if (result) {
            const res = await toAddTaskType(this.form)
            if (res.code === '201') {
              this.$message.error(res.message)
            } else {
              this.$parent.getData()
              this.$message.success('编辑成功')
              this.isShow = false
            }

            // console.log('编辑', res)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item-label {
  width: 80px;
}
/deep/ .ant-form-item {
  padding-bottom: 16px;
  margin-bottom: 0;
}
/deep/ .ant-modal-content {
  width: 480px;
  // height: 400px;
  min-height: 400px;
}
/deep/ .ant-modal-body {
  padding: 20px 20px 16px 20px;
}
// .input {
//   display: flex;
//   align-items: center;
//   span {
//     margin: 0 10px;
//   }
// }
/deep/ .ant-modal-footer {
  padding: 16px;
}
.txt {
  margin-top: -20px;
  font-family: "MicrosoftYaHei", "Microsoft YaHei";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.447058823529412);
}
.textarea {
  overflow-y: visible;
  min-height: 100px;
  width: 320px;
}
/deep/ .ant-input{
  max-width: none;
}
.boxPrice{
  display: flex;
  position: relative;
}
.minPrice{
  width: 146px;
  flex-shrink: 0;
}

.maxPrice{
  width: 146px;
  flex-shrink: 0;
}
.point{
  position: absolute;
  top: 0;
  left: -66px;
  color: red;
}
</style>
