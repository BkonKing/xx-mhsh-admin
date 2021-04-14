<template>
  <a-modal v-model="isShow" title="审核">
    <a-form-model :model='form' :rules='rules' :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="任务标题">
        <div style="color:#1890FF;cursor: pointer;" @click="$router.push('/taskCentre/complete')">
          任务标题任务标题任务标题任务标题任务标题
        </div>
      </a-form-model-item>
      <a-form-model-item label="发布用户">
        <span style="color:#1890FF;cursor: pointer;" @click="openNewPage">昵称(姓名)</span> 项目名称
      </a-form-model-item>
      <a-form-model-item
            label="创建时间"
        >2020-11-20 08:50:08</a-form-model-item
      >
      <a-form-model-item label="提问编号">
        <span style="color:#1890FF">000000000</span>
      </a-form-model-item>
      <a-form-model-item label="类型">回复</a-form-model-item>
      <a-form-model-item label="内容">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
      </a-form-model-item>
      <a-form-model-item label="是否通过" prop="value1">
        <a-radio-group v-model="form.value1">
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
         placeholder="请输入"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
      </a-form-model-item>
      <a-form-model-item label="图片">
         <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 10">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
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
      isShow: false,
      form: {
        value1: 1
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }]
      },
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
    // 点击新窗口打开用户详情页面
    openNewPage () {
      window.open('http://develop.mhshjy.com/zht/user/user/getUserList')
    },
    // 关闭预览
    handleCancel () {
      this.previewVisible = false
    },
    // 查看大图
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
     // 上传和删除图片时触发
    handleChange ({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang='less' scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
/deep/ .ant-modal-body{
  padding: 42px;
}
</style>
