<template>
  <div class="complainBatchDeal">
    <a-modal v-model="isShow" title="批量处理" @ok='submit'>
      <div class="selected" v-if="selectedRowKeys.length>0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{selectedRowKeys.length}}</span> 项
      </div>
      <a-form-model
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="处理回复" prop="handle_reply">
          <a-textarea
            v-model="form.handle_reply"
            placeholder="请输入"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>
        <a-form-model-item label="图片">
          <a-upload
            :data="uploadData"
          :headers="headers"
          :action="uploadUrl"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
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
  </div>
</template>

<script>
import { toHandComplaint } from '@/api/taskCentre'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  props: ['selectedRowKeys'],
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        handle_reply: ''
      },
      rules: {
        handle_reply: [{ required: true, message: '必填', trigger: 'change' }]
      },
       previewVisible: false,
      previewImage: '',
      fileList: [],
       uploadUrl: '', // 上传图片接口
      uploadData: {
        field_name: 'file'
      },
      fileList2: [] // 处理图片
    }
  },
  computed: {
    headers () {
      return {
        Authorization: '14f6100a3efceafe5d8f841fe359230c39ee52fb'
      }
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.form.handle_reply = ''
      }
    }
  },
  methods: {
    // 批量处理
   async submit () {
      await toHandComplaint({
       ids: this.selectedRowKeys,
       is_handle: 1,
       handle_reply: this.form.handle_reply,
       handle_image: this.fileList2
     })
     this.$parent.getData()
     this.$message.success('处理成功')
     this.isShow = false
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
.selected {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  line-height: 40px;
  background-color: rgba(230, 247, 255, 1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(186, 231, 255, 1);
  border-radius: 4px;
  .icon {
    color: #0e77d1;
    margin-right: 10px;
  }
  .span1 {
    color: #0e77d1;
  }
  .span2 {
    cursor: pointer;
    color: #0e77d1;
    margin-left: 10px;
  }
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
