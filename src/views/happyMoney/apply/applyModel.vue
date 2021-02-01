<template>
  <div class="applyModel">
    <a-modal v-model="isShow"
             title="发放申请"
             @ok="handleOk"
             @cancel="isShow=false"
             ok-text='申请'>
      <a-form-model ref="form"
                    :model='form'
                    :rules='rules'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='账户'>美好生活家园</a-form-model-item>
        <a-form-model-item prop='value'
                           label='幸福币'>
          <a-input v-model="form.value"></a-input>
        </a-form-model-item>
        <a-form-model-item label='上传凭证'
                           prop='fileList'>
          <div>最多5张</div>
          <div class="upload">
            <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      list-type="picture-card"
                      :file-list="form.fileList"
                      @preview="handlePreview"
                      @change="handleChange">
              <div v-if="form.fileList.length < 5">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible"
                     :footer="null"
                     @cancel="handleCancel">
              <img alt="example"
                   style="width: 100%"
                   :src="form.previewImage" />
            </a-modal>
          </div>
        </a-form-model-item>
        <a-form-model-item label='备注'>
          <div class="input">
            <a-input v-model="form.value2"
                     maxlength="20"></a-input>
            <div class="num">
              {{form.value2.length}} /20
            </div>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  data () {
    return {
      form: {
        value: '',
        value2: '',
        fileList: []
      },
      previewImage: '',
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }],
        fileList: [{ required: true, message: '必填', trigger: 'change' }]
      },
      previewVisible: false,

      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    handleOk () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('验证通过')
        } else {
          this.$message.error('验证失败')
        }
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.form.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.$refs.form.validateField(['fileList'])
      this.form.fileList = fileList
    }
  }
}
</script>

<style lang='less' scoped>
.upload {
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
.input {
  position: relative;
  .num {
    position: absolute;
    right: 6px;
    bottom: 0;
    color: #d7d7d7;
  }
}
.ant-modal-footer {
  border-top: none;
  text-align: center;
  margin-top: -10px;
  padding-bottom: 20px;
  button {
    margin: 0 20px;
  }
}
</style>
