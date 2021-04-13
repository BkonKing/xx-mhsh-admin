<template>
  <a-modal v-model="isShow" title="进度">
    <a-steps progress-dot :current="1" direction="vertical">
      <a-step
        title="2021-03-01  00:00:00"
        description="进度内容(投诉、放弃、淘汰、停止任务、下架任务、停止接单)"
      />
      <a-step
        title="2021-03-01  00:00:00"
        description="进度内容"
      />
      <a-step
        title="In Progress"
        description="This is a description. This is a description."
      />
      <a-step title="Waiting" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .ant-steps-dot .ant-steps-item-content, .ant-steps-dot.ant-steps-small .ant-steps-item-content {
    width: 200px;
}
</style>
