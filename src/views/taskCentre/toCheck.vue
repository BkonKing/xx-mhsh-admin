<template>
  <div class="toCheck">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card">
      <div class="title">流程进度</div>
      <div class="steps">
        <a-steps progress-dot :current="1">
          <a-step title="创建任务" description="2021-01-01 00:00" />
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
                >标题标题标题</a-form-model-item
              >
              <a-form-model-item
label="任务奖励"
                >10000币（2000币/人）| 已奖励8000币</a-form-model-item
              >
              <a-form-model-item label="需要人数">4/5</a-form-model-item>
              <a-form-model-item
label="完成时间"
                >2021-03-01 08:50 ~ 2021-03-10 08:50</a-form-model-item
              >
            </a-col>
            <a-col :span="8">
              <a-form-model-item label="任务类型">类型</a-form-model-item>
              <a-form-model-item label="创建者">
                <span style="color:#1890FF">昵称(姓名) </span>
                项目名称</a-form-model-item
              >
              <a-form-model-item label="任务标签">
                标签 | 标签标签 | 标签
              </a-form-model-item>
              <a-form-model-item
label="完成地点"
                >不限/省市区详细地址</a-form-model-item
              >
            </a-col>
            <a-col :span="8">
              <a-form-model-item
label="任务编号"
                >0000000
                <img
                  style="marginLeft:10px"
                  @click="previewImg"
                  src="@/assets/imgs/task_ma.png"
                  alt=""
                />
              </a-form-model-item>
              <a-form-model-item label="手机号">
                15000000000
              </a-form-model-item>
              <a-form-model-item label="联系电话">
                150000000
              </a-form-model-item>
              <a-form-model-item
label="可见范围"
                >全部/福建省福州市/新乡美好生活家园/XXX群</a-form-model-item
              >
            </a-col>
          </a-row>
        </a-form-model>
        <div class="bottom">
          <div class="explain">
            <div class="left">任务说明：</div>
            <div class="right">
              内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </div>
          </div>
          <div class="imgcon">
            <div class="img" v-for="item in 3" :key="item">
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
    <a-card class="card3">
      <div class="title">审核</div>
      <a-form-model
        class="form"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
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
        <a-form-model-item
          v-if="form.value1 !== 1"
          label="违规原因"
          prop="value2"
        >
          <a-select v-model="form.value2" style="width: 379px">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="审核说明">
          <a-textarea
            style="width: 440px"
            v-model="form.value3"
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
    <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
  </div>
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
      previewVisible: false,
      previewImage: '',
      form: {
        value1: 1,
        value2: '',
        value3: ''
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }],
        value2: [{ required: true, message: '必填', trigger: 'change' }]
      },
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error'
        }
      ],
      bol: false
    }
  },
  mounted () {
    this.$previewRefresh()
  },
  watch: {
    form: {
      handler () {
        if (this.form.value1 == 2 && this.form.value2 === '') {
          this.bol = true
        } else if (this.form.value1 === 1) {
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
    submit () {
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
    handleChange ({ fileList }) {
      this.fileList = fileList
    }
    // // 预览图片
    // previewImg (e) {
    //   console.log(e.target.src)
    //   this.previewVisible = true
    //   this.previewImage = e.target.src
    // },
    // // 关闭预览图片
    // handleCancel () {
    //   this.previewVisible = false
    // }
  }
}
</script>

<style lang="less" scoped>
.toCheck {
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
      padding: 20px 0;
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
