<template>
  <div class="stepInfo">
    <a-steps :current="current">
      <a-popover slot="progressDot"
                 slot-scope="{ index, status, prefixCls }">
        <template slot="content">
          <span>step {{ index }} status: {{ status }}</span>
        </template>
        <span :class="`${prefixCls}-icon-dot`" />
      </a-popover>
      <a-step title="创建消息"
              description="项目名称-操作者姓名 2017-10-01 12:00" />
      <a-step title="提交审核"
              description="新乡美好生活-曲丽丽 2017-10-01 12:00" />
      <a-step title="待审核"
              description="操作者姓名 2017-10-01 12:00" />
      <a-step title="待推送"
              description="" />
      <a-step title="成功"
              description="" />
    </a-steps>
  </div>
</template>

<script>
export default {
  props: ['current']

}
</script>

<style>
</style>
