<template>
  <div class="setModel">
    <a-modal
v-model="isShow"
             title="添加任务/修改任务">
      <a-form-model
:label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label='任务名称'>
          <a-input></a-input>
        </a-form-model-item>
        <a-form-model-item label='介绍'>
          <div class="input">
            <a-input
v-model="value"
                     maxlength="20"></a-input>
            <div class="num">
              {{value.length}} /20
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item label='图标'>
          <a-upload
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
      loading: false,
      imageUrl: '',
      value: '',
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {

    handleChange (info) {
      console.log('info', info)
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
        this.$message.error('只能上传jpg或者png格式!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('请上传小于2M的图片!')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style lang='less' scoped>
.input {
  position: relative;
  .num {
    position: absolute;
    right: 6px;
    bottom: 0;
    color: #d7d7d7;
  }
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
