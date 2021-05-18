<template>
  <div class="toCheck">
    <page-header-wrapper></page-header-wrapper>
    <div class="cardContent">
          <a-card class="card">
      <div class="title">流程进度</div>
      <div class="steps">
        <a-steps progress-dot :current="1">
          <a-step title="创建任务" :description="taskDetailInfo.process.create_time" />
          <a-step title="待审核" description="" />
          <a-step title="待接单" description="" />
          <a-step title="待完成" description="" />
          <a-step title="完成" description="" />
        </a-steps>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="title">基础信息</div>
      <div class="form">
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item
label="任务标题"
                >{{taskDetailInfo.task_title}}</a-form-model-item
              >
              <a-form-model-item
label="任务奖励"
                >{{taskDetailInfo.happy_reward}}币（{{taskDetailInfo.every_reward}}币/人）| 已奖励{{taskDetailInfo.reward_happiness}}币</a-form-model-item
              >
              <a-form-model-item label="需要人数">{{taskDetailInfo.assignment}}/{{taskDetailInfo.need_people}}</a-form-model-item>
              <a-form-model-item
label="完成时间"
                >{{taskDetailInfo.complete_time}}</a-form-model-item
              >
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="任务类型">{{taskDetailInfo.task_type}}</a-form-model-item>
              <a-form-model-item label="创建者">
                <span style="color:#1890FF">{{taskDetailInfo.task_user}} </span>
                {{taskDetailInfo.task_project}}</a-form-model-item
              >
              <a-form-model-item label="任务标签">
                {{taskDetailInfo.task_tag}}
              </a-form-model-item>
              <a-form-model-item
label="完成地点"
                >{{taskDetailInfo.complete_address}}</a-form-model-item
              >
            </a-col>
            <a-col :span="8">
              <a-form-model-item
label="任务编号"
                >{{taskDetailInfo.task_number}}
                <img
                  style="marginLeft:10px"
                  src="@/assets/imgs/task_ma.png"
                  alt=""
                />
              </a-form-model-item>
              <a-form-model-item label="手机号">
               {{taskDetailInfo.mobile}}
              </a-form-model-item>
              <a-form-model-item label="联系电话">
                {{taskDetailInfo.contact_number}}
              </a-form-model-item>
              <a-form-model-item
label="可见范围"
                >{{taskDetailInfo.visible_range}}</a-form-model-item
              >
            </a-col>
          </a-row>
        </a-form-model>
        <div class="bottom">
          <div class="explain">
            <div class="left">任务说明：</div>
            <div class="right">
                {{ taskDetailInfo.task_desc }}
            </div>
          </div>
          <div class="imgcon">
            <div class="img" v-for="item in taskDetailInfo.task_image" :key="item">
              <img
                preview="0"
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=380567600,1510886462&fm=26&gp=0.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </a-card>
    <a-card class="card3" v-if="taskDetailInfo.check_list.length>0">
      <div class="title">审核信息</div>
     <div class="content">
        <div class="form" v-for="(item,index) in taskDetailInfo.check_list" :key='index'>
        <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-row>
            <a-col :span="8">
              <a-form-model-item label="审核状态">{{item.check_status}}</a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="审核人">{{item.check_user}}</a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item
label="审核时间"
                >{{item.check_time}}</a-form-model-item
              >
            </a-col>
          </a-row>
          <div class="cause">
            <div class="t1">违规原因：</div>
            <div class="t2">{{item.check_reason}}</div>
          </div>
          <div class="reply">
            <div class="t1">处理回复：</div>
            <div class="t2">
              {{item.check_desc}}
            </div>
          </div>
          <div class="imgcon">
            <div class="img" v-for="(item2,index2) in item.check_image" :key="index2">
              <img
                preview="0"
                :src="item2"
                alt=""
              />
            </div>
          </div>
        </a-form-model>
      </div>
     </div>
    </a-card>
    <a-card class="card4">
      <div class="title">审核</div>
      <a-form-model
        class="form"
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
          <a-select v-model="form.violation_type" placeholder="请选择" style="width: 379px">
            <a-select-option v-for="(item, index) in reasonList" :key="index" :value="item.id">
              {{item.violation}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="审核说明">
          <a-textarea

            style="width: 440px"
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
        </a-form-model-item>
        <a-form-model-item>
          <a-button
type="primary"
class="btn"
:disabled="bol"
@click="submit"
            >确定</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </a-card>
    </div>
    <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getTaskDetail, toViolationReason, toHandTask } from '@/api/taskCentre'
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
      previewVisible: false,
      previewImage: '',
      form: {
        is_check: 1,
        violation_type: undefined,
        check_desc: ''
      },
      rules: {
        is_check: [{ required: true, message: '必填', trigger: 'change' }],
        violation_type: [{ required: true, message: '必填', trigger: 'change' }]
      },
      fileList: [],
      bol: false,
      id: '', // 任务id
      taskDetailInfo: '', // 任务详情
      uploadUrl: '', // 上传图片接口
      uploadData: {
        field_name: 'file'
      },
      fileList2: [], // 处理图片
      reasonList: [], // 违规原因列表
      headers: {
        Authorization: Cookies.get('access_token')
        // Authorization: '62a06a999f077310fea01466e3eb9686dd183f98'
        // Projectid: Cookies.get('project_id')
      }
    }
  },

  mounted () {
    this.$previewRefresh()
  },
  watch: {
    form: {
      handler () {
        if (this.form.is_check === 2 && this.form.violation_type === undefined) {
          this.bol = true
        } else if (this.form.is_check === 1) {
          this.bol = false
        } else {
          this.bol = false
        }
      },
      deep: true
    }
  },
  methods: {
    // 确定
   async submit () {
     const arr = []
     arr.push(this.id)
     const res = await toHandTask({
       ids: arr,
       is_check: this.form.is_check,
       check_desc: this.form.check_desc,
       check_image: this.fileList2,
       violation_type: this.form.violation_type
     })
    console.log('审核', res)
      this.$message.success('提交成功')
    },
    // handleCancel () {
    //   this.previewVisible = false
    // },
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
   async created () {
    this.id = this.$route.query.id
    if (this.id != '') {
      getTaskDetail({ id: +this.id }).then(res => {
        this.taskDetailInfo = res.data
        console.log('任务详情', res)
      })
    }
    const res = await toViolationReason({ type: 1 })
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
.toCheck {
  .cardContent{
    padding: 0 20px;
  }
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .steps {
      padding: 20px;
    }
  }
  .card2 {
    margin-top: 20px;
    padding-bottom: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    /deep/ .ant-form-item {
      margin-bottom: 0;
    }
    .bottom {
      .explain {
        margin-left: 36px;
        display: flex;
        .left {
          width: 70px;
        }
        .right {
          flex: 1;
        }
      }
      .imgcon {
        display: flex;
        .img {
          cursor: pointer;
          margin-left: 38px;
          margin-top: 10px;
          width: 104px;
          height: 104px;
          padding: 10px;
          border: 2px dashed #dedede;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  .card3 {
    margin-top: 20px;
    /deep/ .ant-form-item-label{
      width: 70px;
    }
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    /deep/ .ant-form-item {
      margin-bottom: 0;
    }
    .content{
      padding: 0 30px;
      .form {
      border-bottom: 1px solid #E8E8E8;

      .cause {
        display: flex;
        // margin-left: 36px;
      }
      .reply {
        margin-top: 12px;
        display: flex;
        // margin-left: 36px;
        .t1 {
          width: 70px;
        }
        .t2 {
          flex: 1;
        }
      }
      .imgcon {
        display: flex;
        padding-bottom: 20px;
        .img {
          cursor: pointer;
          margin-left: 38px;
          margin-top: 10px;
          width: 104px;
          height: 104px;
          padding: 10px;
          border: 2px dashed #dedede;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    }
  }
  .card4 {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding: 0;
    }
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .form {
      width: 650px;
      margin: 20px auto;
    }
    /* you can make up upload button and sample style by using stylesheets */
    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
    .btn {
      margin-left: 108px;
    }
  }
}
/deep/ .ant-modal-body {
  padding: 44px !important;
}
</style>
