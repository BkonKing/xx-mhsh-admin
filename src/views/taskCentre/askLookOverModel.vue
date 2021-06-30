<template>
  <div class="askLookOverModel">
    <a-modal v-model="isShow" title="查看" :footer="null" v-if="lookOverInfo!=''" >
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="任务标题">
          <span style="color:#1d92ff;cursor: pointer;" @click="openTaskDetail">{{ lookOverInfo.task_title }}</span>
        </a-form-model-item>
        <a-form-model-item label="发布用户">
          <span style="color:#1d92ff;cursor: pointer;" @click="openUserDetail">{{ lookOverInfo.publish_user }} </span
          >{{ lookOverInfo.project_name }}
        </a-form-model-item>
        <a-form-model-item label="创建时间">{{
          lookOverInfo.ctime
        }}</a-form-model-item>
        <a-form-model-item label="提问编号" v-if="lookOverInfo.type !== 1">
          <span style="color:#1d92ff;cursor: pointer;" @click="lookOver">{{
            lookOverInfo.id
          }}</span>
        </a-form-model-item>
        <a-form-model-item label="类型">{{
          lookOverInfo.type === 1 ? "提问" : "回复"
        }}</a-form-model-item>
        <a-form-model-item label="内容">
          {{ lookOverInfo.content }}
        </a-form-model-item>
        <div class="line"></div>
        <a-form-model-item label="审核状态">
          {{ lookOverInfo.check_status }}
        </a-form-model-item>
        <a-form-model-item label="审核人">{{
          lookOverInfo.check_user
        }}</a-form-model-item>
        <a-form-model-item label="审核时间">{{
          lookOverInfo.check_time
        }}</a-form-model-item>
        <a-form-model-item
          label="违规原因"
          v-if="+lookOverInfo.is_check === 2"
          >{{ lookOverInfo.violation_reason }}</a-form-model-item
        >
        <a-form-model-item label="审核说明">
          <div style="lineHeight:22px;paddingTop:9px">
            {{ lookOverInfo.check_desc?lookOverInfo.check_desc:'--' }}
          </div>
        </a-form-model-item>
        <div class="imgcon">
          <div
            class="img"
            v-for="(item, index) in lookOverInfo.check_image"
            :key="index"
          >
            <img preview="0" :src="item" alt="" />
          </div>
        </div>
      </a-form-model>
    </a-modal>
    <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
    <lookOverReplyModel ref="lookOverReplyModel"></lookOverReplyModel>
  </div>
</template>

<script>
import { toViewQuestion } from '@/api/taskCentre'
import lookOverReplyModel from './lookOverReplyModel'
export default {
  components: {
    lookOverReplyModel
  },
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      previewVisible: false,
      previewImage: '',
      info: {},
      lookOverInfo: ''
    }
  },
  mounted () {},
  watch: {
    info: {
      async handler () {
        // 提问-查看详情
        const res = await toViewQuestion({
          type: +this.info.type,
          id: this.info.id
        })
        console.log('提问-查看详情', res)
        this.lookOverInfo = res.data
        this.$previewRefresh()
      },
      deep: true
    }
  },
  created () {},
  methods: {
    // 打开用户详情
    openUserDetail () {
      window.open(`/zht/user/user/getUserList?uid=${this.lookOverInfo.uid}`, '_blank')
    },
    // 打开任务详情
    openTaskDetail () {
      // const { href } = this.$router.resolve({
      //   name: 'complete',
      //   query: { id: this.lookOverInfo.task_id }
      // })
      // window.open(href, '_blank')
      window.open(`/zht/task/task/getTaskInfo?url=%2Ffilm%2Findex.html%23%2FtaskCentre%2Fcomplete?id=${this.lookOverInfo.task_id}`, '_blank')
    },
    // 查看 回复的提问
    async lookOver () {
      //  // 提问-查看详情
      this.$refs.lookOverReplyModel.id = this.lookOverInfo.id
      this.$refs.lookOverReplyModel.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  margin-bottom: 0px;
}
.line {
  margin: 10px 0;
  border-bottom: 2px dashed #efefef;
}
.imgcon {
  margin-top: 10px;
  display: flex;
  margin-left: 63px;
  // width: 400px;
  flex-wrap: wrap;
  .img {
    cursor: pointer;
    margin-left: 10px;
    margin-top: 10px;
    width: 104px;
    flex-shrink: 0;

    height: 104px;
    padding: 10px;
    border: 2px dashed #dedede;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
/deep/.ant-modal-body {
  padding: 16px 24px 24px 24px;
}
</style>
