<template>
  <a-modal v-model="isShow" title="处理" @ok="submit">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="投诉类型">
        {{ info.complaint_type }}
      </a-form-model-item>
      <a-form-model-item label="投诉描述">
        {{ info.complaint_desc?info.complaint_desc:'--' }}
      </a-form-model-item>
      <div class="line"></div>
      <a-form-model-item label="处理回复" prop="handle_reply">
        <a-textarea
          v-model="form.handle_reply"
          placeholder="请输入"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-model-item>
      <a-form-model-item label="图片">
        <a-upload
        multiple
          :data="uploadData"
          :headers="headers"
          :action="uploadUrl"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 10">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传
            </div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import Cookies from 'js-cookie'
import { toViewComplaint, toHandComplaint } from '@/api/taskCentre'
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
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      id: '', // 投诉id
      info: {}, // 查看投诉信箱
      uploadUrl: '', // 上传图片接口
      uploadData: {
        field_name: 'file'
      },
      fileList2: [], // 处理图片
      form: {
        handle_reply: ''
      },
      headers: {
        Authorization: Cookies.get('access_token')
        // Authorization: 'a7656d54ab4272a07f786eef32237687ec120202'
        // Projectid: Cookies.get('project_id')
      },
      rules: {
        handle_reply: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  // computed: {
  //   headers () {
  //     return {
  //       Authorization: '14f6100a3efceafe5d8f841fe359230c39ee52fb'
  //     }
  //   }
  // },
  watch: {
    isShow () {
      this.form.handle_reply = ''
      this.fileList = []
      this.fileList2 = []
    },
    id () {
      toViewComplaint({
        id: this.id
      }).then(res => {
        console.log('查看投诉', res)
        this.info = res.data
      })
    }
  },
  methods: {
    // 处理
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          const idArr = []
          idArr.push(this.id)
          await toHandComplaint({
            ids: idArr,
            is_handle: 0,
            handle_reply: this.form.handle_reply,
            handle_image: this.fileList2
          })
          // console.log('处理', res)
          this.$message.success('处理成功')
          this.$emit('getData')
          this.isShow = false
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
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 上传和删除图片时触发
    handleChange ({ fileList }) {
      // console.log('上传和删除图片时触发')
      this.fileList = fileList
      console.log(fileList)
      const arr1 = this.fileList.map(item => {
        if (item.response) {
          return item.response.data
        }
      })
      const arr2 = arr1.filter(item => {
        return item
      })
      this.fileList2 = arr2
      console.log('上传和删除图片时触发', arr2)
    }
  },
  created () {
    this.uploadUrl =
      process.env.NODE_ENV === 'production'
        ? '/nsolid/spi/v1/upload/uploads/uImages'
        : '/api/upload/uploads/uImages'
  }
}
</script>

<style lang="less" scoped>
.line {
  margin-bottom: 15px;
  border-bottom: 2px dashed #efefef;
}
/deep/ .ant-form-item {
  margin-bottom: 0px;
}
/deep/ .ant-form-item-label {
  min-width: 88px;
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
