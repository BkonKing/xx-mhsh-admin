<template>
  <a-upload
    v-bind="$attrs"
    multiple
    name="imgFile"
    list-type="picture-card"
    :action="uploadUrl"
    :headers="headers"
    :file-list="fileList"
    :disabled="disabled"
    :openFileDialogOnClick="openFileDialogOnClick"
    :beforeUpload="beforeUpload"
    :data="
      file => ({
        type: noHost ? 1 : 0
      })
    "
    @preview="handlePreview"
    @change="handleChange"
  >
    <div v-if="fileList.length < maxLength">
      <a-icon type="plus" />
      <div class="ant-upload-text">
        {{ uploadText }}
      </div>
    </div>
  </a-upload>
</template>

<script>
import Cookies from 'js-cookie'
import { getBase64 } from '@/utils/util'
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: [Array, String],
      default: () => []
    },
    maxLength: {
      type: [Number, String],
      default: 9
    },
    uploadText: {
      type: String,
      default: '上传'
    },
    noHost: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    openFileDialogOnClick: {
      type: Boolean,
      default: true
    },
    showHttpFile: {
      type: Boolean,
      default: false
    },
    isOne: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: this.format(this.value),
      uploadList: [],
      headers: {
        Authorization: Cookies.get('access_token'),
        // Authorization: 'fc58d4dcb702624e2be057276f4a79a77f3a1a42',
        Projectid: Cookies.get('project_id')
      },
      uploadUrl:
        process.env.NODE_ENV === 'production'
          ? '/nsolid/spi/v1/upload/uploads/uImages'
          : '/api/upload/uploads/uImages'
    }
  },
  methods: {
    genId (length) {
      return Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36)
    },
    format (list) {
      if (!list) {
        return []
      }
      if (this.isOne && this.maxLength === 1) {
        list = [list]
      }
      return list.map(item => {
        const index = this.genId(5)
        return {
          uid: index,
          name: index,
          status: 'done',
          response: {
            data: item
          },
          url: item
        }
      })
    },
    async handlePreview (file) {
      // 不是完成状态点击无效
      if (file.status !== 'done') {
        return
      }
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      const url = file.response ? file.response.data : file.url
      const initialViewIndex = this.isOne ? 0 : this.value.findIndex(obj => url === obj)
      const images = this.isOne ? [this.value] : this.value
      this.$viewerApi({
        options: {
          toolbar: true,
          initialViewIndex
        },
        images
      })
    },
    beforeUpload (file, fileList) {
      // console.log(file)
      const index = parseInt(this.maxLength) - this.fileList.length
      if (index > 0) {
        const active = fileList.findIndex(obj => obj.name === file.name) + 1
        if (active <= index) {
          return file
        } else {
          return false
        }
      } else {
        return false
      }
    },
    handleChange ({ file, fileList, event }) {
      const max = parseInt(this.maxLength)
      const index = max - this.fileList.length
      const deleteCount = index < 0 ? Math.abs(index) : 0
      // 上传失败
      if (file.status === 'done' && !file.response.success) {
        this.$message.error(file.response.message)
        const errorIndex = this.fileList.findIndex(obj => obj.uid === file.uid)
        this.fileList[errorIndex].status = 'error'
        return
      }
      this.fileList = fileList
      if (deleteCount) {
        this.fileList.splice(this.fileList.length - 1, deleteCount)
      }
      if (file.status === 'done' || file.status === 'removed') {
        const uploadList = fileList
          .map(obj => {
            if (obj.response) {
              return obj.response.data
            }
          })
          .filter(item => {
            return item
          })
        if (this.isOne && this.maxLength === 1) {
          this.uploadList = uploadList[0] || ''
        } else {
          this.uploadList = uploadList
        }
        this.$emit('input', this.uploadList)
        this.$emit('change', this.uploadList)
      }
    }
  },
  watch: {
    value (val) {
      if (val !== this.uploadList || this.showHttpFile) {
        this.fileList = this.format(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-upload-list-picture-card .ant-upload-list-item {
  width: 100%;
  height: 100%;
}
</style>
