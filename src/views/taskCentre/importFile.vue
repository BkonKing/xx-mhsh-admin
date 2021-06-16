<template>
  <div class="importFile">
    <a-modal v-model="isShow" title="导入文件" @ok="submit" :destroyOnClose='true'>
      <div class="form">
        <div class="leftForm"><span style="color:red">*</span> 选择文件：</div>
        <div class="rightForm">
          <label for="filein">
            <div class="fileUpload">
              <div class="left">{{ fileUrl.name }}</div>
              <div class="right">
                <span>{{ fileSize }}/100MB</span>
                <a-icon type="folder-add" class="icon" />
              </div>
            </div>
          </label>
          <input id="filein" @change="uploadFile" type="file" v-show="false" />
        </div>
      </div>

      <a-button class="btn"
        ><a-icon type="vertical-align-bottom" />
        <a
          :href="
            mode === 'whiteUser'
              ? 'https://test.tosolomo.com/library/mb/mb_whitelist.xlsx'
              : 'https://test.tosolomo.com/library/mb/mb_group.xlsx'
          "
          style="color:rgba(0, 0, 0, 0.647058823529412)"
          >下载模板</a
        >
      </a-button>
    </a-modal>
    <a-modal class="modal" v-model="isShow2" :closable="false" :footer="null">
      <div class="content">
        <div class="left">
          <a-icon
            type="check-circle"
            style="color: #52c41a;"
            v-if="uploadFileInfo.failed_count === 0 && isSuccess"
          />
          <a-icon type="close-circle" style="color:red" v-else-if="isFail202" />
        </div>
        <div class="right" v-if="uploadFileInfo.failed_count === 0 && isSuccess">
          <div class="t1">{{uploadFileInfo.message}}</div>
          <div class="t2">
            共{{ uploadFileInfo.count }}条信息，{{
              uploadFileInfo.success_count
            }}条成功
          </div>
        </div>
        <div class="right" v-else-if="isFail202">
          <div class="t1">部分导入失败</div>
          <div class="t2">
            共{{ uploadFileInfo.count }}条信息，{{
              uploadFileInfo.success_count
            }}条成功，{{ uploadFileInfo.sfailed_count }}条失败
          </div>
        </div>
      </div>
      <div class="btn2">
        <a-button type="primary" @click="submit2">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { toImportWhiteUser, toImportGroupUser } from '@/api/taskCentre'
export default {
  props: ['mode', 'id'],
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {},
      isShow: false,
      isShow2: false,
      fileSize: 0,
      fileUrl: '',
      uploadFileInfo: '',
      isFail201: false,
      isFail202: false,
      isSuccess: true
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
      console.log(e.target.files[0])
      const _this = e.target.files[0]
      this.fileSize = (_this.size / 1024 / 1024).toFixed(3)
      this.fileUrl = _this
      // console.log('this.fileUrl', this.fileUrl)
    },
    // 确定
    async submit () {
      if (!this.fileUrl) {
        this.$message.error('请选择文件')
        return
      }
      const fd = new FormData()
      // 上传白名单
      if (this.mode === 'whiteUser') {
        fd.append('whitelist_file', this.fileUrl)
        const res = await toImportWhiteUser(fd)
        this.uploadFileInfo = res
        if (res.code === '201') {
          this.isSuccess = false
          this.isShow = false
          this.$message.error(res.message)
        } else if (res.code === '202') {
          this.isSuccess = false
          this.isFail202 = true
          this.isShow2 = true
          this.isShow = false
          this.$message.error(res.message)
        } else if (res.code === '200') {
          this.isSuccess = true
          this.isFail201 = false
          this.isFail202 = false
          this.isShow2 = true
          this.isShow = false
        }
        // console.log('上传文件', this.uploadFileInfo)
      } else {
        // 上传群文件
        console.log('this.fileUrl', this.fileUrl)
        fd.append('group_file', this.fileUrl)
        console.log(fd)
        fd.append('group_id', this.id)
        const res2 = await toImportGroupUser(fd)
        // console.log('上传群成员文件', res2)
        this.uploadFileInfo = res2
        if (res2.code === '201') {
          this.isSuccess = false
          this.isShow = false
          this.$message.error(res2.message)
        } else if (res2.code === '202') {
          this.isSuccess = false
          this.isFail202 = true
          this.isShow2 = true
          this.isShow = false
          this.$message.error(res2.message)
        } else if (res2.code === '200') {
          this.isSuccess = true
          this.isFail201 = false
          this.isFail202 = false
          this.isShow2 = true
          this.isShow = false
        }
        this.$parent.getRegister()
      }

      this.$parent.pagination.currentPage = 1
      this.$parent.getData()
    },
    submit2 () {
      this.isShow2 = false
    }
  }
  // beforeRouteLeave (to, from, next) {
  //   // 参数（马上去的页面，现在的页面，跳转）
  //   from.meta.keepAlive = false // 将要去的那个页面的缓存清空
  //   next()
  // }
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
      .left {
        padding-left: 15px;
        flex: 1;
        color: #ccc;
      }
      .right {
        display: flex;
        align-items: center;
        text-align: right;
        span {
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
