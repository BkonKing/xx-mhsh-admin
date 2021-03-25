<template>
  <a-modal v-model="isShow"
           title="编辑"
           @ok="handleOk">
    <a-alert type='error'
             message="请填写完整"
             banner
             v-if="closeBol"
             closable
             class="top" />
    <a-form-model :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  ref="form"
                  :model='form'
                  :rules='rules'>
      <a-form-model-item label='头像/logo'>
        <a-upload name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :before-upload="beforeUpload"
                  @change="handleChange">
          <img v-if="imageUrl"
               :src="imageUrl"
               alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item prop='value2'
                         label='项目名称'>
        <a-input v-model="form.value1"
                 placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item prop='value2'
                         label='地址'>
        <a-cascader v-model="form.value2"
                    :options="area"
                    placeholder="Please select" />
        <a-textarea class="textarea"
                    placeholder="详细地址"
                    :auto-size="{ minRows: 3, maxRows: 3 }" />
      </a-form-model-item>
      <a-form-model-item label='项目负责人'>
        <a-row>
          <a-col :span='12'>
            <a-input class="name"
                     placeholder="姓名"></a-input>
          </a-col>
          <a-col :span='12'>
            <a-input class="phone"
                     placeholder="手机号"></a-input>
          </a-col>
        </a-row>
      </a-form-model-item>
      <div class="line"></div>
      <a-form-model-item prop='value3'
                         class="super"
                         label='超管账户'>
        <a-input v-model="form.value3"
                 placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item label='超管密码'>
        <a-input type="password"></a-input>
        <div class="txt">不设置密码，则默认为888888</div>
        <a-row>
          <a-col :span='12'>
            <a-input class="name"
                     placeholder="姓名"></a-input>
          </a-col>
          <a-col :span='12'>
            <a-input class="phone"
                     placeholder="手机号"></a-input>
          </a-col>
        </a-row>
      </a-form-model-item>
      <div class="line"></div>
      <a-form-model-item label='短信条数剩余'>
        <div>10000条 <a-button type='link'
                    @click="noteBol=true">充值</a-button>
        </div>
        <div class="noteNum"
             v-if="noteBol">
          <a-input addon-before="增加"
                   default-value="1000">
            <template #suffix>
              <div class="num">
                0.1/条
              </div>
            </template>
          </a-input>
          <a-button type='link'
                    @click="noteBol=false"> <span>取消</span> </a-button>
        </div>
      </a-form-model-item>
      <a-form-model-item label='支付通道额度剩余'>
        <div>1000000元 <a-button type='link'
                    @click="limitBol=true">充值</a-button>
          <div class="noteNum"
               v-if="limitBol">
            <a-input addon-before="增加"
                     default-value="10000">
              <template #suffix>
                <div class="num">
                  3.5%
                </div>
              </template>
            </a-input>
            <a-button type='link'
                      @click="limitBol=false"> <span>取消</span> </a-button>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="好客通后台ID">
        <a-input placeholder="请输入"></a-input>
      </a-form-model-item>
    </a-form-model>

  </a-modal>
</template>

<script>
import chinaArea from '@/utils/chinaArea.js'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      form: {
        value1: '',
        value2: [],
        value3: ''
      },
      rules: {
        value1: [{ required: true, message: '必填', trigger: 'change' }],
        value2: [{ required: true, message: '必填', trigger: 'change' }],
        value3: [{ required: true, message: '必填', trigger: 'change' }]
      },
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      loading: false,
      imageUrl: '',
      area: chinaArea,
      noteBol: false,
      limitBol: false,
      closeBol: true
    }
  },
  methods: {
    // 确定
    handleOk () {
      this.$refs.form.validate(result => {
        if (result) {
          this.closeBol = false
          this.$message.success('验证成功')
        } else {
          this.$message.error('验证失败')
        }
      })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.top {
  margin-bottom: 20px;
}
.textarea {
  margin-top: 20px;
}
.phone {
  margin-left: 10px;
  width: 130px;
}
.name {
  width: 130px;
}
.line {
  border-bottom: 1px dashed #ccc;
  margin-bottom: 20px !important;
}
/deep/ .ant-input-group-addon {
  background-color: #ebebeb;
}
.txt {
  color: #a9a9a9;
}
/deep/ .ant-form-item-label {
  width: 120px;
}
.noteNum {
  display: flex;
  align-items: center;
  .num {
    color: #a9a9a9;
  }
  span {
    color: #a9a9a9;
  }
}
</style>
