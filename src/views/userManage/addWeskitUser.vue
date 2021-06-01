<template>
  <div class="addWeskitUser">
    <a-modal
v-model="isShow"
             ok-text="保存"
             cancel-text="关闭"
             @ok="handleOk">
      <template #title>
        <div>

        </div>
      </template>
      <a-form-model
ref="form"
                    :model='form'
                    :rules='rules'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='头像'>
          <div class="title">建议尺寸200*200;大小不超过2MB</div>
          <a-upload
          multiple
                  name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange">
            <img
v-if="imageUrl"
                 :src="imageUrl"
                 alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                添加图片
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item
prop='value'
                           label='昵称'>
          <a-input v-model="form.value"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading: false,
      imageUrl: '',
      form: {
        value: ''
      },
      rules: {
        value: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleOk () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('验证成功')
        } else {
          this.$message.error('验证失败')
        }
      })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .ant-modal-header {
  height: 50px !important;
}
/deep/ .ant-modal-footer {
  text-align: center;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
