<template>
  <a-select
    v-bind="$attrs"
    v-model="selectedValue"
    show-search
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    @search="handleSearch"
  >
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option
      v-for="item in couponOptions"
      :key="item[key]"
      :value="item[key]"
      >{{ item[label] }}</a-select-option
    >
  </a-select>
</template>

<script>
import { debounce } from '@/utils/util'
export default {
  name: 'SearchSelect',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    key: {
      type: String,
      default: ''
    },
    validator: Function,
    loadData: Function
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 500)
    return {
      selectedValue: this.value,
      childOptions: this.options,
      fetching: false
    }
  },
  watch: {
    value (newValue) {
      if (this.selectedValue !== newValue) {
        this.selectedValue = newValue
      }
    },
    selectedValue (newValue) {
      this.$emit('input', newValue)
    },
    options (newValue) {
      this.childOptions = newValue || []
    }
  },
  methods: {
    handleSearch (value) {
      if (!this.validator || this.validator(value)) {
        this.fetching = true
        this.loadData.then(({ data }) => {
          this.childOptions = data.list || []
          this.fetching = false
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
