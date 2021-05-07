<template>
  <div class="askCheckModel">
    <a-modal v-model="isShow" title="审核" @ok="submit">
      <a-form-model
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="任务标题">
          <div
            style="color:#1890FF;cursor: pointer;"
            @click="$router.push('/taskCentre/complete')"
          >
            {{ lookOverInfo.task_title }}
          </div>
        </a-form-model-item>
        <a-form-model-item label="发布用户">
          <span style="color:#1890FF;cursor: pointer;" @click="openNewPage">{{
            lookOverInfo.publish_user
          }}</span>
          {{ lookOverInfo.project_name }}
        </a-form-model-item>
        <a-form-model-item label="创建时间">{{
          lookOverInfo.ctime
        }}</a-form-model-item>
        <a-form-model-item label="提问编号">
          <span style="color:#1890FF;cursor: pointer;" @click="lookOver">{{
            lookOverInfo.id
          }}</span>
        </a-form-model-item>
        <a-form-model-item label="类型">{{
          lookOverInfo.type === 1 ? "提问" : "回复"
        }}</a-form-model-item>
        <a-form-model-item label="内容">
          {{ lookOverInfo.content }}
        </a-form-model-item>
        <div class="line"></div>
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
        <a-form-model-item label="审核说明">
          <a-textarea
            v-model="form.check_desc"
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
            <div v-if="fileList.length < 10">
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
    <askLookOverModel ref="askLookOverModel"></askLookOverModel>
  </div>
</template>

<script>
import askLookOverModel from './askLookOverModel'
import { toViewQuestion, toCheckQuestionReply } from '@/api/taskCentre'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  components: {
    askLookOverModel
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      isShow: false,
      form: {
        is_check: 1,
        check_desc: ''
      },
      rules: {
        is_check: [{ required: true, message: '必填', trigger: 'change' }]
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      info: {}, // 提问列表信息
      lookOverInfo: {}, // 审核信息
      violation_type: '', // 违规原因
      uploadUrl: '', // 上传图片接口
      uploadData: {
        field_name: 'file'
      },
      fileList2: []
    }
  },
  computed: {
    headers () {
      return {
        Authorization: '80639a9d9f29d181bdcaa70efd3b4e3117f77ff6'
      }
    }
  },
  watch: {
    info: {
      async handler () {
        // 提问-查看详情
        const res = await toViewQuestion({
          type: +this.info.type,
          id: this.info.id
        })
        this.lookOverInfo = res.data
      },
      deep: true
    }
  },
  methods: {
    // 确定
    async submit () {
      const idArr = []
      idArr.push(this.info.id)
       await toCheckQuestionReply({
        ids: idArr,
        is_check: this.form.is_check,
        check_desc: this.form.check_desc,
        check_image: this.fileList2,
        violation_type: this.violation_type
      })
      this.$message.success('审核成功')
      this.$parent.getData()
      // console.log('确定', res)
    },
    // 查看
    lookOver () {
      this.$refs.askLookOverModel.isShow = true
    },
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
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
/deep/ .ant-modal-body {
  padding: 42px;
}
.line {
  margin: 10px 0;
  border-bottom: 2px dashed #efefef;
}
/deep/ .ant-form-item {
  margin-bottom: 0;
}
</style>
