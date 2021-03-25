<template>
  <div class="stepInfo">
    <a-steps :current="1"
             class="steps">
      <a-popover slot="progressDot"
                 slot-scope="{ index, status, prefixCls }">
        <template slot="content">
          <span>step {{ index }} status: {{ status }}</span>
        </template>
        <span :class="`${prefixCls}-icon-dot`" />
      </a-popover>
      <a-step title="创建短信"
              description="项目名称-操作者姓名
                          2017-10-01 12:00" />
      <a-step title="提交审核"
              description="" />
      <a-step title="待审核"
              description="" />
      <a-step title="待推送"
              description="" />
      <a-step title="成功"
              description="" />
    </a-steps>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.stepInfo {
  .steps {
    margin-top: 20px;
  }
}
</style>
