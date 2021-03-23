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
      <a-form-item label="充值金额">
        <a-input
          addonBefore="￥"
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
            'uid'
          ]" >
          <a-select-option v-for="(item, index) in infoData.user_data" :key="index" :value="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="充值凭证">
        <div class="clearfix">
          <a-upload
            action="/api/upload/uploads/uImages"
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
        // Authorization: Cookies.get('access_token'),
        Authorization: 'fc58d4dcb702624e2be057276f4a79a77f3a1a42',
        Projectid: Cookies.get('project_id')
      }
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    getData () {
      this.fileList = []
      this.form.resetFields()
      getInvest(this.params).then(res => {
        this.infoData = res
        for (const key in res.user_data) {
          this.defaultUser = res.user_data[key]
          this.userId = key
          // this.queryParam.uid = key
          break
        }
      })
    },
    // 选择余额种类
    selectType (val) {
      getInvest(Object.assign({ genre_type: val }, this.params)).then(res => {
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
            this.$message.success(res.message)
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

</style>
