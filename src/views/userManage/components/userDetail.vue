<template>
  <a-modal
    v-model="visible"
    :title="title"
    :width="640"
    :destroyOnClose="true"
    :footer="null"
    v-bind="$attrs"
  >
  </a-modal>
</template>

<script>
export default {
  name: 'user-detail',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.value
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style></style>
