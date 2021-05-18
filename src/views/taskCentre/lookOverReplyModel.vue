<template>

     <a-modal v-model="isShow" title="查看" :footer="null" v-if="lookOverInfo!=''">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="任务标题">
          <span style="color:#1d92ff">{{ lookOverInfo.task_title }}</span>
        </a-form-model-item>
        <a-form-model-item label="发布用户">
          <span style="color:#1d92ff">{{ lookOverInfo.publish_user }} </span
          >{{ lookOverInfo.project_name }}
        </a-form-model-item>
        <a-form-model-item label="创建时间">{{
          lookOverInfo.ctime
        }}</a-form-model-item>
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
          {{ lookOverInfo.check_desc }}
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

</template>

<script>
import { toViewQuestion } from '@/api/taskCentre'
export default {
  data () {
    return {
      isShow: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      id: '',
      lookOverInfo: ''
    }
  },
  watch: {
    id () {
    toViewQuestion({
          type: 1,
          id: this.id
        }).then(res => {
         console.log('提问-查看详情', res)
        this.lookOverInfo = res.data
        this.$previewRefresh()
        })
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
  display: flex;
  margin-left: 39px;
  .img {
    cursor: pointer;
    margin-left: 38px;
    margin-top: 10px;
    width: 104px;
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
  padding: 42px;
}
</style>
