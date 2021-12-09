<template>
  <a-card :bordered="false" :title="title" style="margin-top: 24px;">
    <a-steps class="check-tab-steps" :current="current" progressDot>
      <a-step v-for="(step, index) in data" :key="index">
        <template v-slot:title>
          <span>{{ step[titleKey] }}</span>
        </template>
        <template v-slot:description>
          <div v-if="step[description]">
            {{ step[description] }}
          </div>
          <div v-if="step[remarkKey]">
            {{ step[remarkKey] }}
          </div>
        </template>
      </a-step>
    </a-steps>
  </a-card>
</template>

<script>
export default {
  name: 'StatusSteps',
  props: {
    title: [String],
    data: {
      type: Array,
      default: () => []
    },
    titleKey: {
      type: String,
      default: 'title'
    },
    description: {
      type: String,
      default: 'description'
    },
    remarkKey: {
      type: String,
      default: 'remarkKey'
    },
    current: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.check-tab-steps {
  justify-content: center;
  /deep/ .ant-steps-item:last-child {
    margin-right: 67px;
  }
  /deep/ .ant-steps-item-content,
  .ant-steps-dot.ant-steps-small .ant-steps-item-content {
    width: auto;
  }
  /deep/ .ant-steps-item-title {
    margin-bottom: 8px;
  }
  /deep/ .ant-steps-item-content {
    margin-left: 55px;
    text-align: left;
  }
  /deep/
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: rgba(0, 0, 0, 0.45);
  }
  /deep/
    .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description,
  /deep/
    .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description,
  /deep/
    .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description {
    color: rgba(0, 0, 0, 0.35);
  }
}
</style>
