<template>
  <div class="complainDetail">
    <page-header-wrapper></page-header-wrapper>
    <div class="complainContent">
      <a-card class="card">
        <div class="title">流程进度</div>
        <div class="steps">
          <a-steps progress-dot :current="current">
            <a-step title="投诉时间">
              <template #description>
                <div class="description">
                  <div class="t1">
                    {{ detailInfo.complainted_project }}-{{
                      detailInfo.complaint_user
                    }}
                  </div>
                  <div class="t2">
                    {{ detailInfo.ctime }}
                  </div>
                </div>
              </template>
            </a-step>
            <a-step :title="detailInfo.is_handle==='1'?'处理回复':'待处理'">
              <template #description>
                <div class="description">
                  <div class="t1">
                    {{
                      detailInfo.handle_user
                    }}
                  </div>
                  <div class="t2">
                    {{ detailInfo.handle_time }}
                  </div>
                </div>
              </template>
            </a-step>
            <a-step title="完成" />
          </a-steps>
        </div>
      </a-card>
      <a-card class="card2">
        <div class="title">被投诉内容</div>
        <div class="content">
          <a-row>
            <a-col :span="8">
              <div class="item item1">
                <div class="t1" style="color: rgba(0, 0, 0, 0.847058823529412)">内容类型：</div>
                <div class="t2" style="color: rgba(0, 0, 0, 0.647058823529412)">{{ detailInfo.content_type }}</div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <div class="t1">内容ID：</div>
                <div class="t2">{{ detailInfo.content_id }}</div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <div class="t1">被投诉次数：</div>
                <div
                  class="t2"
                  style="color:#1890FF;cursor: pointer;"
                  @click="$router.push('/taskCentre/complain?task_id='+detailInfo.task_id)"
                >
                  {{ detailInfo.complaint_total }}
                </div>
              </div>
            </a-col>
          </a-row>
          <div class="bottom">
            <div class="t1">被投诉内容：</div>
            <div class="t2">
              <div
                class="item"
                @click="openDetail"
                v-if="detailInfo.content_type === '任务'"
                style="color:#1890FF;cursor: pointer;"
              >
                {{ detailInfo.content }}
              </div>
              <div class="item2" style="cursor: pointer;" v-else @click="lookOver">
                {{ detailInfo.content }}
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="card3">
        <div class="title">投诉信息</div>
        <div class="content">
          <a-row>
            <a-col :span="8">
              <div class="item item1">
                <div class="t1">投诉人：</div>
                <div class="t2">
                  <span style="color:#1890FF;cursor: pointer;" @click="openUserDetail(detailInfo.complaint_uid)">{{
                    detailInfo.complaint_user
                  }}</span>
                  {{ detailInfo.complaint_project }}
                </div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <div class="t1">被投诉人：</div>
                <div class="t2">
                  <span style="color:#1890FF;cursor: pointer;" @click="openUserDetail(detailInfo.complainted_uid)">{{
                    detailInfo.complainted_user
                  }}</span>
                  {{ detailInfo.complaint_project }}
                </div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <div class="t1">投诉时间：</div>
                <div class="t2">{{ detailInfo.ctime }}</div>
              </div>
            </a-col>
          </a-row>
          <div class="middle">
            <div class="t1">投诉类型：</div>
            <div class="t2">{{ detailInfo.complaint_type }}</div>
          </div>
          <div class="bottom">
            <div class="t1">投诉描述：</div>
            <div class="t2">
              {{ detailInfo.complaint_desc }}
            </div>
          </div>
          <div class="imgs">
            <div
              class="item"
              v-for="(item, index) in detailInfo.complaint_image"
              :key="index"
            >
              <img preview="0" :src="item" alt="" />
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="card4" v-if="detailInfo.is_handle !== '1'">
        <div class="title">投诉处理</div>
        <div class="form">
          <a-form-model
          ref="form"
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
              multiple
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
          <div class="btn">
            <a-button type="primary" @click="submit">确定</a-button>
          </div>
        </div>
      </a-card>
      <a-card class="card5" v-if="detailInfo.is_handle === '1'">
        <div class="title">投诉处理</div>
        <div class="top">
          <a-row>
            <a-col :span="8">
              <div class="item">
                <div class="t1">处理时间：</div>
                <div class="t2">
                 {{detailInfo.handle_time}}
                 <span v-if="detailInfo.over_content">
                   (<span
style="color: #F5222D;"
                    >
                    {{detailInfo.over_content}}
                    </span
                  >)
                 </span>
                </div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="item">
                <div class="t1">处理人：</div>
                <div class="t2">{{detailInfo.handle_user}}</div>
              </div>
            </a-col>
            <a-col :span="8"></a-col>
          </a-row>
        </div>
        <div class="mid">
          <div class="t1">处理回复：</div>
          <div class="t2">
            {{detailInfo.handle_content}}
          </div>
        </div>
        <div class="bottom">
          <div class="item" v-for="(item,index) in detailInfo.handle_image" :key="index">
            <img
              preview="1"
              :src="item"
              alt=""
            />
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getComplaintDetail, toHandComplaint } from '@/api/taskCentre'
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
        handle_reply: ''
      },
      rules: {
        handle_reply: [{ required: true, message: '必填', trigger: 'change' }]
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      id: '', // 投诉详情id
      detailInfo: {}, // 详情信箱
      current: 0, // 当前步骤条位置
      uploadUrl: '', // 上传图片接口
      uploadData: {
        field_name: 'file'
      },
      fileList2: [], // 处理图片
      headers: {
        Authorization: Cookies.get('access_token')
        // Authorization: '801ea07a89da8ee893176dbdd982627688960d80'
        // Projectid: Cookies.get('project_id')
      }
    }
  },
  mounted () {
    // this.$previewRefresh()
  },

  methods: {
    // 新窗口打开用户详情页面
    openUserDetail (uid) {
      window.open(`/zht/user/user/getUserList?uid=${uid}`, '_blank')
    },
    // 获取详情信息
    async getDetailInfo () {
      const res = await getComplaintDetail({ id: this.id })
      this.detailInfo = res.data
      this.current = +res.data.is_handle === 1 ? 2 : 1
      this.$previewRefresh()
      console.log('投诉详情', res)
    },
    // 查看 提问/回复详情
    lookOver () {
      this.$refs.askLookOverModel.isShow = true
    },
    // 新窗口打开任务详情
    openDetail () {
      // const { href } = this.$router.resolve({
      //   name: 'complete',
      //   query: { id: this.detailInfo.task_id }
      // })
      // window.open(href, '_blank')
      window.open(`/zht/task/task/getTaskInfo?url=%2Ffilm%2Findex.html%23%2FtaskCentre%2Fcomplete?id=${this.detailInfo.task_id}`, '_blank')
    },
    // 确定
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
          this.$message.success('处理成功')
          this.getDetailInfo()
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
  async created () {
    this.uploadUrl =
      process.env.NODE_ENV === 'production'
        ? '/nsolid/spi/v1/upload/uploads/uImages'
        : '/api/upload/uploads/uImages'
    this.id = this.$route.query.id
    if (this.id !== '') {
      this.getDetailInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.complainDetail {
  .complainContent {
    padding: 0 20px;
  }
  /deep/ .ant-card-body {
    padding: 0;
  }
  .card {
    margin-top: 20px;
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .steps {
      padding: 30px;
      .description {
        .t1 {
          white-space: nowrap;
        }
      }
    }
  }
  .card2 {
    margin-top: 20px;
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .content {
      padding: 30px 0;
      .item {
        display: flex;

      }
      .item1 {
        margin-left: 30px;
      }
      .bottom {
        margin-top: 15px;
        display: flex;
        margin-left: 16px;
        .t1 {
          width: 84px;
        }
        .t2 {
          flex: 1;
          .item2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
  .card3 {
    margin-top: 20px;
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .content {
      padding: 20px 0;
      .item {
        display: flex;
      }
      .item1 {
        margin-left: 30px;
      }
      .middle {
        margin-top: 10px;
        margin-left: 15px;
        display: flex;
      }
      .bottom {
        display: flex;
        margin-top: 10px;
        margin-left: 15px;
        .t1 {
          width: 70px;
        }
        .t2 {
          flex: 1;
        }
      }
      .imgs {
        margin-top: 10px;
        margin-left: 85px;
        display: flex;
        .item {
          margin-right: 10px;
          width: 104px;
          height: 104px;
          padding: 10px;
          border: 2px dashed rgba(233, 233, 233, 1);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  .card4 {
    margin-top: 20px;

    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .form {
      width: 650px;
      margin: 20px auto;
    }
    .btn {
      margin-left: 108px;
    }
    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }
  .card5 {
    margin-top: 20px;
    padding-bottom: 20px;
    .title {
      padding-left: 30px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      text-align: left;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .top {
      padding-top: 20px;
      padding-left: 30px;
      .item {
        display: flex;
      }
    }
    .mid {
      display: flex;
      padding-top: 20px;
      padding-left: 30px;
      .t1 {
        width: 70px;
      }
      .t2 {
        flex: 1;
      }
    }
    .bottom {
      margin-top: 10px;
      margin-left: 85px;
      display: flex;
      .item {
        margin-right: 10px;
        width: 104px;
        height: 104px;
        padding: 10px;
        border: 2px dashed rgba(233, 233, 233, 1);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
