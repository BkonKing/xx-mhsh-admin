<template>
  <page-header-view>
    <a-card title="基础信息" :bordered="false">
      <a-form-model
        ref="BasicForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item required prop="thematic_name" label="专题名称">
          <a-input
            v-model="form.thematic_name"
            placeholder="请输入"
            :maxLength="25"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item required prop="is_limit" label="有效时间">
          <a-radio-group
            v-model="form.is_limit"
            @change="$refs.BasicForm.validateField('time')"
          >
            <a-radio value="1">有限</a-radio>
            <a-radio value="0">不限</a-radio>
          </a-radio-group>
          <template v-if="+form.is_limit === 1">
            <a-form-model-item
              prop="time"
              style="margin-top: 10px;margin-bottom: 0;"
            >
              <a-range-picker
                v-model="form.time"
                :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                :placeholder="['开始时间', '结束时间']"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
              />
            </a-form-model-item>
            <div style="color: #00000072;">
              到达设定时间将自动生效和失效，生效期间则在APP显示
            </div>
          </template>
        </a-form-model-item>
        <a-form-model-item label="内容形式">
          <a-radio-group value="1" :options="contRadioGroup" />
        </a-form-model-item>
        <a-form-model-item label="专题图" required>
          <div>支持扩展名：.png .jpg；</div>
          <a-row type="flex" :gutter="20">
            <a-col flex="1">
              <a-form-model-item
                class="upload-image-box"
                prop="thumb"
                style="margin-bottom: 0;"
              >
                <upload-image
                  v-model="form.thumb"
                  maxLength="1"
                  class="introduction-upload"
                  @change="changeThumb"
                ></upload-image>
              </a-form-model-item>
              <div class="upload-image-alert">
                <div>封面图</div>
                <div>(尺寸710*326)</div>
              </div>
            </a-col>
            <a-col flex="1">
              <a-form-model-item
                class="upload-image-box"
                prop="bj_thumb"
                style="margin-bottom: 0;"
              >
                <upload-image
                  v-model="form.bj_thumb"
                  maxLength="1"
                  class="introduction-upload"
                ></upload-image>
              </a-form-model-item>
              <div class="upload-image-alert">
                <div>背景图</div>
                <div>(尺寸710*326)</div>
              </div>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item
          label="微信分享链接"
          required
          style="margin-bottom: 0;"
        >
          <a-form-model-item
            required
            prop="wechat_title"
            style="margin-bottom: 24px;"
          >
            <a-input
              v-model="form.wechat_title"
              placeholder="请输入"
              prefix="标题"
              :maxLength="50"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item required prop="wechat_content">
            <a-input
              v-model="form.wechat_content"
              placeholder="请输入"
              prefix="内容"
              :maxLength="50"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item prop="wechat_img" style="margin-bottom: 0;">
            <upload-image
              v-model="form.wechat_img"
              maxLength="1"
            ></upload-image>
            <div style="margin-top: -11px;color: #00000072;">
              尺100*尺100；支持扩展名：.png .jpg；
            </div>
          </a-form-model-item>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <special-images
      ref="special-images"
      :title="form.thematic_name"
    ></special-images>
    <div style="height: 80px;"></div>
    <footer-tool-bar style="width: 100%;">
      <a-button @click="$router.go(-1)" style="margin-right: 15px;">
        取消
      </a-button>
      <a-button type="primary" @click="handleSubmit" :loading="loading"
        >提交</a-button
      >
    </footer-tool-bar>
  </page-header-view>
</template>

<script>
import moment from 'moment'
import PageHeaderView from '@/layouts/PageHeaderView'
import FooterToolBar from '@/components/FooterToolbar'
import { UploadImage } from '@/components'
import SpecialImages from './components/SpecialImages'
import { validAForm } from '@/utils/util'
import { addSpecial, getSpecialDetail } from '@/api/operatingCenter/special'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'SpecialEdit',
  components: {
    PageHeaderView,
    FooterToolBar,
    UploadImage,
    SpecialImages
  },
  data () {
    const validateTime = (rule, value, callback) => {
      if (this.form.is_limit && !value[0]) {
        callback(new Error('请设定有效时间'))
      } else {
        callback()
      }
    }
    return {
      specialId: '',
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      loading: false,
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 10 } },
      form: {
        thematic_name: '',
        is_limit: '1',
        time: [],
        thumb: [],
        bj_thumb: []
      },
      rules: {
        thematic_name: [{ required: true, message: '请输入专题名称' }],
        thumb: [{ required: true, message: '请上传封面图' }],
        bj_thumb: [{ required: true, message: '请上传背景图' }],
        wechat_title: [{ required: true, message: '请输入标题' }],
        wechat_content: [{ required: true, message: '请输入内容' }],
        time: [
          {
            validator: validateTime
          }
        ]
      },
      // 内容形式
      contRadioGroup: [
        {
          value: '1',
          label: '图片内容'
        }
      ]
    }
  },
  created () {
    this.specialId = this.$route.query.id
  },
  mounted () {
    this.specialId && this.getSpecialDetail()
  },
  methods: {
    // 编辑获取专题内容
    getSpecialDetail () {
      getSpecialDetail({
        thematic_id: this.specialId
      }).then(({ data, child }) => {
        const formData = cloneDeep(data)
        formData.time = +formData.is_limit ? formData.limit_time.split(' ~ ') : []
        formData.thumb = formData.thumb ? [formData.thumb] : []
        formData.bj_thumb = formData.bj_thumb ? [formData.bj_thumb] : []
        formData.wechat_img = formData.wechat_img ? [formData.wechat_img] : []
        this.form = formData
        this.$nextTick(() => {
          this.$refs['special-images'].setData(child)
        })
      })
    },
    changeThumb () {
      if (this.form.bj_thumb.length === 0) {
        this.form.bj_thumb = cloneDeep(this.form.thumb)
      }
    },
    handleSubmit () {
      Promise.all([validAForm(this.$refs.BasicForm), this.$refs['special-images'].validate(), this.validImageData()]).then(() => {
        this.saveSpecial({
          ...this.form,
          child: this.formatImageData()
        })
      })
    },
    // 需至少上传一张图片
    validImageData () {
      return new Promise((resolve, reject) => {
        const status = this.$refs['special-images'].tableData.some(obj => {
          return obj.data.some(image => {
            return image.block_img
          })
        })
        if (status) {
          resolve()
        } else {
          this.$message.error('请至少上传一张专题图片')
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        }
      })
    },
    // 图片专题数据格式化
    formatImageData () {
      return this.$refs['special-images'].tableData.map(obj => {
        return {
          sort: obj.sort,
          data: obj.data.map(image => ({
            thematic_content_id: image.thematic_content_id,
            block_type: image.block_type,
            block_content: image.block_content,
            block_img: image.block_img ? image.block_img[0] : ''
          }))
        }
      })
    },
    // 新增/修改专题
    saveSpecial (params) {
      const { time } = params
      if (time && time.length) {
        params.s_time = time[0]
        params.e_time = time[1]
      }
      params.thumb = params.thumb ? params.thumb[0] : ''
      params.bj_thumb = params.bj_thumb ? params.bj_thumb[0] : ''
      params.wechat_img = params.wechat_img ? params.wechat_img[0] : ''
      this.specialId && (params.thematic_id = this.specialId)
      addSpecial(params).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
/deep/ .ant-upload-list-item-uploading-text {
  text-align: center;
}
/deep/ .ant-table-thead > tr > th {
  padding: 12px 8px;
}
/deep/ .ant-table-tbody > tr > td {
  padding: 12px 8px;
  vertical-align: top;
  line-height: 32px;
}
/deep/ .ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
.introduction-upload /deep/ .ant-upload-list-picture-card-container,
.introduction-upload /deep/ .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 163px;
  margin-bottom: 8px;
}
.upload-image-box /deep/ .ant-form-explain {
  margin-top: -14px;
  margin-bottom: 10px;
  text-align: center;
}
.upload-image-alert {
  margin-top: -11px;
  color: #00000072;
  text-align: center;
  line-height: 18px;
}
</style>
