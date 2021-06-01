<template>
  <div class="askCheckModel">
    <a-modal v-model="isShow" title="审核" @ok="submit">
      <a-form-model
      ref="form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="任务标题">
          <div
            style="color:#1890FF;cursor: pointer;"
            @click="openTaskDetail"
          >
            {{ lookOverInfo.task_title }}
          </div>
        </a-form-model-item>
        <a-form-model-item label="发布用户">
          <span style="color:#1890FF;cursor: pointer;" @click="openUserDetail">{{
            lookOverInfo.publish_user
          }}</span>
          {{ lookOverInfo.project_name }}
        </a-form-model-item>
        <a-form-model-item label="创建时间">{{
          lookOverInfo.ctime
        }}</a-form-model-item>
        <a-form-model-item label="提问编号" v-if="lookOverInfo.type !==1">
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
        <a-form-model-item
          v-if="form.is_check !== 1"
          label="违规原因"
          prop="violation_type"
        >
          <a-select
            v-model="form.violation_type"
            placeholder="请选择"
            style="width: 254px"
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
    <askLookOverModel ref="askLookOverModel"></askLookOverModel>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import askLookOverModel from './askLookOverModel'
import {
  toViewQuestion,
  toCheckQuestionReply,
  toViolationReason
} from '@/api/taskCentre'
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
        check_desc: '',
        violation_type: undefined
      },
      rules: {
        is_check: [{ required: true, message: '必填', trigger: 'change' }],
        violation_type: [{ required: true, message: '必填', trigger: 'change' }]
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
      fileList2: [],
      headers: {
        Authorization: Cookies.get('access_token')
        // Authorization: 'db11093e1a38961a662cc75fd378af20d265538c'
        // Projectid: Cookies.get('project_id')
      }
    }
  },

  watch: {
    isShow () {
      this.form.check_desc = ''
      this.form.violation_type = undefined
      this.form.is_check = 1
      this.fileList2 = []
      this.fileList = []
    },
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
    },
    'form.is_check' () {
      // console.log('改变了')
      this.form.check_desc = ''
      this.form.violation_type = undefined
      this.fileList2 = []
      this.fileList = []
    }
  },
  methods: {
    // 打开任务详情
    openTaskDetail () {
      // const { href } = this.$router.resolve({
      //   name: 'complete',
      //   query: { id: this.lookOverInfo.task_id }
      // })
      // window.open(href, '_blank')
      window.open(`/zht/task/task/getTaskInfo?url=%2Ffilm%2Findex.html%23%2FtaskCentre%2Fcomplete?id=${this.lookOverInfo.task_id}`, '_blank')
    },
    // 确定
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          const idArr = []
          idArr.push(this.info.id)
          await toCheckQuestionReply({
            ids: idArr,
            is_check: this.form.is_check,
            check_desc: this.form.check_desc,
            check_image: this.fileList2,
            violation_type: this.form.violation_type
          })
          this.$message.success('审核成功')
          this.$parent.getData()
          this.isShow = false
          // console.log('确定', res)
        }
      })
    },
    // 查看
    lookOver () {
      const obj = JSON.parse(JSON.stringify(this.lookOverInfo))
      obj.type = 1
      this.$refs.askLookOverModel.isShow = true
      this.$refs.askLookOverModel.info = obj
    },

    // 打开用户详情
    openUserDetail () {
      window.open(`/zht/user/user/getUserList?uid=${this.lookOverInfo.uid}`, '_blank')
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
  async created () {
    const res = await toViolationReason({ type: 2 })
    this.reasonList = res.list
    console.log('获取违规原因', res)
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
