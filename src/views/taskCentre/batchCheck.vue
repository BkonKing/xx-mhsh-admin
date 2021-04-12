<template>
  <a-modal  v-model="isShow" title="批量审核">
      <div class="selected" >
       <a-icon class="icon" type="info-circle"  />
        已选择 2 项
      </div>
    <a-form-model :model='form' :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="是否通过" prop="value">
        <a-radio-group v-model="form.value" >
          <a-radio :value="1">
            通过
          </a-radio>
          <a-radio :value="2">
            不通过
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="审核说明">
        <a-textarea
      v-model="form.value2"
      placeholder="请输入"
     :auto-size="{ minRows: 3, maxRows: 5 }"
    />
      </a-form-model-item>
      <a-form-model-item label="图片">
       <div class="clearfix">
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 9">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
     form: {
        value: 1,
      value2: ''
     },
     rules: {
       value: [{ required: true, message: '必填', trigger: 'change' }]
     },
      isShow: false,
       previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error'
        }
      ]
    }
  },
  methods: {
    // 关闭大图弹窗
    handleCancel () {
      console.log('handleCancel')
      this.previewVisible = false
    },
    // 查看大图
    async handlePreview (file) {
      console.log('handlePreview')
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 上传和删除图片时触发
    handleChange ({ fileList }) {
      console.log('handleChange')
      this.fileList = fileList
    }
  }
}
</script>

<style lang="less" scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
 .selected{
    margin-top: 10px;
    width: 100%;
    height: 40px;
    padding-left: 15px;
    line-height: 40px;
     color: #0E77D1;
    background-color: rgba(230, 247, 255, 1);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(186, 231, 255, 1);
    border-radius: 4px;
    .icon{
      color:#0E77D1;
      margin-right: 10px;
    }

  }
</style>
