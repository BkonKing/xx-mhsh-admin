<template>
  <a-modal
    title="充值余额"
    :visible="modalShow"
    okText="充值"
    @ok="handleSubmit"
    @cancel="cancelModal"
  >
    <a-form
      :labelCol="{lg: {span: 5}, sm: {span: 5}}"
      :wrapperCol="{lg: {span: 18}, sm: {span: 18} }"
      @submit="handleSubmit"
      :form="form"
      >
      <a-form-item
        label="房产"
        >
        <span v-if="infoData && infoData.data">{{ infoData.data.house_property_name }}</span>
      </a-form-item>
      <a-form-item v-if="params.genre_type" label="余额种类">
        <a-select
          placeholder="请选择"
          @change="selectType"
          v-decorator="[
            'genre_type',
            {rules: [{ required: true, message: '请选择余额种类'}],initialValue: (params.genre_type|'')+''}
          ]" >
          <a-select-option v-for="(item, index) in infoData.genre_select_data" :key="index" :value="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-else label="余额种类">
        <a-select
          placeholder="请选择"
          @change="selectType"
          v-decorator="[
            'genre_type',
            {rules: [{ required: true, message: '请选择余额种类'}]}
          ]" >
          <a-select-option v-for="(item, index) in infoData.genre_select_data" :key="index" :value="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="当前余额">
        <span v-if="infoData.data">{{ infoData.data.balance | NumberFormat }}元</span>
      </a-form-item>
      <a-form-item class="money-item" label="充值金额">
        <span class="ant-input-group-addon">￥</span>
        <a-input-number
          addonBefore="￥"
          :min="0.01"
          v-decorator="[
            'money',
            {rules: [{ required: true, message: '请输入充值金额' }]}
          ]"
          name="name"
          placeholder="请输入" />
      </a-form-item>
      <a-form-item label="充值用户">
        <a-select
          :placeholder="defaultUser"
          v-decorator="[
            'uid',
            {initialValue: (defaultUser)+''}
          ]" >
          <a-select-option v-for="(item, index) in infoData.user_data" :key="index" :value="item.uid">{{ item.realname }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="充值凭证">
        <div class="clearfix">
          <a-upload
            :action="uploadUrl"
            :data="uploadData"
            list-type="picture-card"
            :file-list="fileList"
            :multiple="true"
            :headers="headers"
            @preview="handlePreview"
            @change="handleChange"
            v-decorator="[
              'fileList',
              {rules: [{ required: true, message: '请上传充值凭证' }]}
            ]"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                上传
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import Cookies from 'js-cookie'
import { getInvest, submitInvest } from '@/api/property'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'rechargeMoney',
  props: {
    modalShow: {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      infoData: {},
      defaultUser: '', // 默认充值用户
      userId: '',
      form: this.$form.createForm(this), // 表单
      previewVisible: false,
      previewImage: '',
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ],
      uploadData: {
        field_name: 'file'
      },
      headers: {
        Authorization: Cookies.get('access_token'),
        // Authorization: 'fc58d4dcb702624e2be057276f4a79a77f3a1a42',
        Projectid: Cookies.get('project_id')
      },
      uploadUrl: ''
    }
  },
  created () {
    this.uploadUrl = process.env.NODE_ENV === 'production' ? '/nsolid/spi/v1/upload/uploads/uImages' : '/api/upload/uploads/uImages'
    console.log(222, process.env.NODE_ENV)
    // this.getData()
  },
  methods: {
    getData () {
      this.fileList = []
      this.form.resetFields()
      getInvest(this.params).then(res => {
        this.infoData = res
        for (const key in res.user_data) {
          if (res.user_data[key].uid == res.data.uid) {
            this.defaultUser = res.user_data[key].uid
            this.userId = res.data.uid
            break
          }
          // this.queryParam.uid = key
        }
        console.log(this.defaultUser, this.userId)
      })
    },
    // 选择余额种类
    selectType (val) {
      console.log(val, this.params)
      getInvest(Object.assign(this.params, { genre_type: val })).then(res => {
        this.infoData.data.balance = res.data.balance
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
    handleChange ({ fileList }) {
      console.log(fileList)
      this.fileList = fileList.splice(0, 3)
    },
    // 表单提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!values.uid) {
            values.uid = this.userId
          }
          const imgArr = this.fileList.map((item) => {
            return item.response.data
          })
          console.log('imgArr', imgArr)
          values.proof = imgArr
          console.log('Received values of form: ', values)
          // Object.assign({}, this.params, values)
          submitInvest(Object.assign({}, this.params, values)).then(res => {
            if (res.code == '201') {
              this.$message.error(res.message)
            } else {
              this.$message.success(res.message)
            }
            this.$emit('update:modalShow', false)
            this.$emit('rechargeCall')
          })
        }
      })
    },
    cancelModal () {
      this.$emit('update:modalShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
.money-item {
  .ant-input-number {
    width: 100%;
  }
  /deep/ span.ant-form-item-children {
    display: flex;
    .ant-input-group-addon {
      width: 37px;
      height: 32px;
      line-height: 30px;
    }
  }
}
</style>
