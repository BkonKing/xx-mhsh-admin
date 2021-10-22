<template>
  <span
    class="tag"
    :style="{
      background: `rgba(${color}, 0.06)`,
      borderColor: `rgba(${color}, 0.4)`,
      color: `rgba(${color}, 1)`
    }"
  >
    <slot></slot>
    <a-icon v-if="closable" type="close" @click.stop="$emit('close')" />
  </span>
</template>

<script>
export default {
  name: 'tag',
  props: {
    closable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-block;
  height: auto;
  margin: 0 8px 0 0;
  padding: 0 7px;
  font-size: 12px;
  line-height: 24px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: default;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  /deep/ .anticon-close {
    display: inline-block;
    font-size: 12px;
    transform: scale(0.83333333) rotate(0deg);
    margin-left: 3px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
}
</style>
