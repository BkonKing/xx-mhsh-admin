<template>
  <a-modal
    v-model="modalShow"
    :title="title"
    :width="650"
    :destroyOnClose="true"
    @ok="handleSubmit"
  >
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="位置" prop="aaaa" required>
        <a-select
          v-model="form.aaaa"
          placeholder="请选择"
          :options="placeOptions"
        >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="标题" prop="bbbb" required>
        <a-input v-model="form.bbbb" placeholder="请输入"></a-input>
      </a-form-model-item>
      <a-form-model-item
        class="upload-image-box"
        label="轮播图"
        prop="cccc"
        required
      >
        <upload-image
          v-model="form.cccc"
          maxLength="1"
          class="introduction-upload"
        ></upload-image>
        <div style="line-height: 1;margin-top: -12px;">
          尺寸建议(尺寸750*600)；支持扩展名：.png .jpg；
        </div>
      </a-form-model-item>
      <a-form-model-item label="背景色" prop="dddd">
        <a-input v-model="form.dddd" placeholder="请输入">
          <template #suffix>
            <div
              class="bg-tag"
              :style="{ 'background-color': form.bbbb }"
            ></div>
          </template>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="链接">
        <a-row type="flex">
          <a-col flex="100px">
            <a-form-model-item prop="eeee" style="margin-bottom: 0;">
              <a-select
                v-model="form.eeee"
                placeholder="请选择"
                :options="typeOptions"
                @change="changeType"
              >
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col flex="1">
            <a-form-model-item prop="ffff" style="margin-bottom: 0;">
              <a-input
                v-if="+form.eeee > 8"
                v-model="form.ffff"
                placeholder="请输入"
              ></a-input>
              <a-select
                v-else
                v-model="form.ffff"
                placeholder="请选择"
                :options="linkOptions"
              >
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model-item>
      <a-form-model-item required prop="gggg" label="是否开启">
        <a-switch v-model="form.gggg"></a-switch>
        <template v-if="+form.gggg === 1">
          <a-form-model-item
            prop="time"
            :rules="{ required: true, message: '请选择轮播时间' }"
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
      <a-form-model-item label="排序" prop="hhhh">
        <a-input
          v-model="form.hhhh"
          v-number-input
          placeholder="请输入"
        ></a-input>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { UploadImage } from '@/components'
import { editShops, getUserList } from '@/api/userManage/business'

const initialForm = {
  aaaa: undefined,
  bbbb: undefined,
  cccc: [],
  dddd: '',
  eeee: undefined,
  ffff: undefined,
  gggg: false,
  hhhh: '',
  time: []
}
export default {
  name: 'AddFormModal',
  components: {
    UploadImage
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      title: '新增轮播图',
      modalShow: this.value,
      placeOptions: [
        { value: '1', label: '首页' },
        { value: '2', label: '生活' },
        { value: '3', label: '电影' }
      ],
      typeOptions: [
        { value: '1', label: '商品' },
        { value: '2', label: '活动' },
        { value: '3', label: '任务' },
        { value: '4', label: '资讯' },
        { value: '5', label: '公告' },
        { value: '6', label: '帖子' },
        { value: '7', label: '电影' },
        { value: '8', label: '专题' },
        { value: '9', label: '外链' },
        { value: '10', label: '其它' }
      ],
      linkOptions: [],
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: clonedeep(initialForm),
      rules: {
        aaaa: [{ required: true, message: '请选择位置' }],
        bbbb: [{ required: true, message: '请输入标题' }],
        cccc: [{ required: true, message: '请上传轮播图' }]
      }
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    isEdit () {
      return !!this.form.id
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.title = this.isEdit ? '编辑轮播图' : '新增轮播图'
      }
      this.modalShow = val
    },
    modalShow (val) {
      this.$emit('input', val)
    }
  },
  created () {
    if (!this.isParentProject) {
      this.columns.splice(6, 1)
    }
  },
  methods: {
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0 ||
        option.key == input.toLowerCase()
      )
    },
    changeType () {
      this.form.ffff = undefined
      if (+this.form.eeee < 8) {
        this.getOptions()
      }
    },
    async getOptions () {
      const methods = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: ''
      }
      const key = this.form.eeee
      const api = this[methods[key]]
      const { data } = await api()
      this.linkOptions = data || []
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveBanner()
        } else {
          return false
        }
      })
    },
    saveBanner () {
      const params = clonedeep(this.form)
      if (!this.isEdit) {
        params.uid_text = params.uid_text.map(obj => obj.key).join(',')
      } else {
        params.uid && (params.uid_text = params.uid)
      }
      editShops(params).then(({ success, message }) => {
        if (success) {
          this.$message.success('保存成功')
          this.modalShow = false
          this.$emit('submit')
        } else {
          this.$message.error(message)
        }
      })
    },
    setFieldsValue (data) {
      this.form = data
    },
    resetFields () {
      this.$refs.form && this.$refs.form.resetFields()
      this.form = clonedeep(initialForm)
    }
  }
}
</script>

<style lang="less" scoped>
.bg-tag {
  width: 15px;
  height: 15px;
}
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.introduction-upload {
  width: 200px;
  /deep/ .ant-upload-list-picture-card-container,
  /deep/ .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 126px;
    margin-bottom: 8px;
  }
}
</style>
