<template>
  <div class="toCheck">
    <a-card class="card1">
      <stepInfo :current='2'></stepInfo>
      <div class="content">
        <a-form class="form"
                :label-col="labelCol"
                :wrapper-col="wrapperCol">
          <a-form-item label="标题">标题标题标题</a-form-item>
          <a-form-item label="内容">
            短信内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          </a-form-item>
          <a-form-item label="状态">
            <a-badge color="#ffbf00"
                     text="待审核" />
          </a-form-item>
          <a-form-item label="消息模板">
            模板名称名称 <a-button type="link">
              查看
            </a-button>
          </a-form-item>
          <a-form-item label="消息类型">系统类型</a-form-item>
          <div class="line"></div>
          <a-form-item label="推送方式">
            手动推送
          </a-form-item>
          <a-form-item label="推送量">预计2000</a-form-item>
          <a-form-item label="推送用户">2000</a-form-item>
          <a-form-item label="计划推送时间">
            {{'Mon Jan 18 2021 01:01:01 GMT+0800' | timeFormat}}
          </a-form-item>
          <div class="line"></div>
          <a-form-item label="审核说明">
            <a-textarea placeholder="请输入"
                        :rows="3" />
          </a-form-item>
          <a-form-item>
            <div class="btns">
              <a-button type="primary"
                        @click="submit">通过</a-button>
              <a-button>不通过</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
    <noteModal ref="noteModal"></noteModal>
  </div>
</template>

<script>
import stepInfo from './stepInfo'
import noteModal from './noteModal'
export default {
  components: {
    stepInfo,
    noteModal
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
  },
  methods: {
    // 通过
    submit () {
      this.$message.success('审核通过', 1.5)
      this.$refs.noteModal.isShow = true
    }
  }

}
</script>

<style lang="less" scoped>
.toCheck {
  .card1 {
    margin-top: 20px;
    .form {
      width: 600px;
      margin: 30px auto;
      .line {
        height: 1px;
        background-color: #ededed;
        margin-bottom: 20px;
      }
      .btns {
        margin-left: 125px;
        button:last-child {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
