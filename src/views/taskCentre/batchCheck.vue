<template>
  <a-modal v-model="isShow" title="批量审核" @ok="submit">
    <div class="selected" v-if="selectedRowKeys.length > 0">
      <a-icon class="icon" type="info-circle" />
      已选择 {{ selectedRowKeys.length }} 项
    </div>
    <a-form-model
    ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="是否通过" prop="is_check">
        <a-radio-group v-model="form.is_check">
          <a-radio :value="1">
            通过
          </a-radio>
          <a-radio :value="2">
            不通过
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        v-if="form.is_check !== 1"
        label="违规原因"
        prop="violation_type"
      >
        <a-select
          v-model="form.violation_type"
          placeholder="请选择"
          style="width: 274px"
        >
          <a-select-option
            v-for="(item, index) in reasonList"
            :key="index"
            :value="item.id"
          >
            {{ item.violation }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="审核说明">
        <a-textarea
          v-model="form.check_desc"
          placeholder="请输入"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-model-item>
      <a-form-model-item label="图片">
        <div class="clearfix">
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
            <div v-if="fileList.length < 9">
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
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import Cookies from 'js-cookie'
import { toHandTask, toViolationReason } from '@/api/taskCentre'
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        is_check: 1,
        check_desc: '',
        violation_type: undefined
      },
      rules: {
        is_check: [{ required: true, message: '必填', trigger: 'change' }],
        violation_type: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      uploadUrl: '', // 上传图片接口
      uploadData: {
        field_name: 'file'
      },
      fileList2: [], // 处理图片
      reasonList: [], // 违规原因列表
      headers: {
        Authorization: Cookies.get('access_token')
        // Authorization: '3c38f83dec332332377a64be74a9936577fd1fca'
        // Projectid: Cookies.get('project_id')
      }
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.form.check_desc = ''
        this.form.is_check = 1
        this.form.violation_type = undefined
        this.fileList2 = []
        this.fileList = []
      }
    },
    'form.is_check' () {
      this.form.check_desc = ''
      this.form.violation_type = undefined
      this.fileList2 = []
      this.fileList = []
    }
  },
  methods: {
    // 批量审核
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          await toHandTask({
            ids: this.selectedRowKeys,
            is_check: this.form.is_check,
            check_desc: this.form.check_desc,
            check_image: this.fileList2,
            violation_type: this.form.violation_type
          })
          this.$message.success('处理成功')
          this.$parent.pagination.currentPage = 1
          this.$parent.selectedRowKeys = []
          this.$parent.getData()
          this.isShow = false
          // console.log('批量审核', res)
        }
      })
    },
    // 关闭大图弹窗
    handleCancel () {
      // console.log('handleCancel')
      this.previewVisible = false
    },
    // 查看大图
    async handlePreview (file) {
      // console.log('handlePreview')
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
      // console.log(fileList)
      const arr1 = this.fileList.map(item => {
        if (item.response) {
          return item.response.data
        }
      })
      const arr2 = arr1.filter(item => {
        return item
      })
      this.fileList2 = arr2
      // console.log('上传和删除图片时触发', arr2)
    }
  },
  async created () {
    const res = await toViolationReason({ type: 1 })
    this.reasonList = res.list
    this.uploadUrl =
      process.env.NODE_ENV === 'production'
        ? '/nsolid/spi/v1/upload/uploads/uImages'
        : '/api/upload/uploads/uImages'
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
.selected {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  line-height: 40px;
  color: #0e77d1;
  background-color: rgba(230, 247, 255, 1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(186, 231, 255, 1);
  border-radius: 4px;
  .icon {
    color: #0e77d1;
    margin-right: 10px;
  }
}
</style>
