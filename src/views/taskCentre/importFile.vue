<template>
  <div class="importFile">
    <a-modal v-model="isShow" title="导入文件" @ok="submit">
      <div class="form">
        <div class="leftForm"><span style="color:red">*</span> 选择文件：</div>
        <div class="rightForm">
          <label for="filein">
            <div class="fileUpload">
              <div class="left">{{fileUrl.name}}</div>
              <div class="right">
              <span>{{fileSize}}/100MB</span>
              <a-icon type="folder-add" class="icon" />
              </div>
            </div>
          </label>
          <input id="filein" @change="uploadFile" type="file" v-show="false" />
        </div>
      </div>

      <a-button
class="btn"
        ><a-icon type="vertical-align-bottom" /> 下载模板</a-button
      >
    </a-modal>
    <a-modal class="modal" v-model="isShow2" :closable="false" :footer="null">
      <div class="content">
        <div class="left">
          <a-icon type="check-circle" style="color: #52c41a;" v-if="uploadFileInfo.failed_count===0" />
          <a-icon type="close-circle" style="color:red" v-else />
        </div>
        <div class="right" v-if="uploadFileInfo.failed_count===0">
          <div class="t1">导入成功</div>
          <div class="t2">共{{uploadFileInfo.count}}条信息，{{uploadFileInfo.success_count}}条成功</div>
        </div>
        <div class="right" v-else>
          <div class="t1">部分导入失败</div>
          <div class="t2">共{{uploadFileInfo.count}}条信息，{{uploadFileInfo.success_count}}条成功，{{uploadFileInfo.sfailed_count}}条失败</div>
        </div>
      </div>
      <div class="btn2">
        <a-button type="primary" @click="submit">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { toImportWhiteUser } from '@/api/taskCentre'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {},
      isShow: false,
      isShow2: false,
      fileSize: 0,
      fileUrl: '',
      uploadFileInfo: ''
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal === false) {
        this.fileUrl = ''
        this.fileSize = 0
      }
    }
  },
  methods: {
    uploadFile (e) {
      const _this = e.target.files[0]
      this.fileSize = (_this.size / 1024 / 1024).toFixed(3)
      this.fileUrl = _this
    },
    // 确定
  async  submit () {
      if (!this.fileUrl) {
          this.$message.error('请选择文件')
          return
      }
      const fd = new FormData()
      fd.append('whitelist_file', this.fileUrl)
     const res = await toImportWhiteUser(fd)
     this.uploadFileInfo = res
    //  console.log('上传文件', res)
      this.isShow2 = true
      this.isShow = false
      this.$parent.pagination.currentPage = 1
      this.$parent.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  display: flex;
  .leftForm {
    width: 80px;
  }
  .rightForm {
    flex: 1;
    .fileUpload {
      width: 354px;
      height: 32px;
      border: 1px solid rgba(216, 216, 216, 1);
      display: flex;
      align-items: center;
      .left{
        padding-left: 15px;
        flex: 1;
        color: #ccc;
      }
      .right{
        display: flex;
        align-items: center;
        text-align: right;
        span{
           color: rgba(0, 0, 0, 0.427450980392157);
        }
         .icon {
        margin: 0 5px;
        font-size: 22px;
      }
      }
      // .left {
      //   flex: 1;
      //   text-align: right;
      //   color: rgba(0, 0, 0, 0.427450980392157);
      // }
      // .icon {
      //   margin: 0 5px;
      //   font-size: 22px;
      // }
    }
  }
}
.btn {
  margin-top: 20px;
  margin-left: 80px;
}
.content {
  display: flex;
  .left {
    text-align: center;
    width: 40px;
    font-size: 20px;
  }
  .right {
    flex: 1;
    .t1 {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.647058823529412);
    }
    .t2 {
      margin-top: 10px;
    }
  }
}
.btn2 {
  margin-top: 20px;
  text-align: right;
}
.modal {
  /deep/ .ant-modal-content {
    width: 345px;
    height: 140px;
  }
}
</style>
