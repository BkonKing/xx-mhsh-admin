<template>
  <div class="importFile">
    <a-modal v-model="isShow" title="导入文件" @ok="submit">
      <div class="form">
        <div class="left"><span style="color:red">*</span> 选择文件：</div>
        <div class="right">
          <label for="filein">
            <div class="fileUpload">
              <div class="left">0/100MB</div>
              <a-icon type="folder-add" class="icon" />
            </div>
          </label>
          <input id="filein" type="file" v-show="false" />
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
          <a-icon type="check-circle" style="color: #52c41a;" v-if="false" />
          <a-icon type="close-circle" style="color:red" v-else />
        </div>
        <div class="right" v-if="false">
          <div class="t1">导入成功</div>
          <div class="t2">共5条信息，5条成功</div>
        </div>
        <div class="right" v-else>
          <div class="t1">部分导入失败</div>
          <div class="t2">共5条信息，2条成功，3条失败</div>
        </div>
      </div>
      <div class="btn2">
        <a-button type="primary">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {},
      isShow: false,
      isShow2: false
    }
  },
  methods: {
    submit () {
      this.isShow2 = true
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  display: flex;
  .left {
    width: 80px;
  }
  .right {
    flex: 1;
    .fileUpload {
      width: 320px;
      height: 32px;
      border: 1px solid rgba(216, 216, 216, 1);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .left {
        color: rgba(0, 0, 0, 0.427450980392157);
      }
      .icon {
        margin: 0 5px;
        font-size: 22px;
      }
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
