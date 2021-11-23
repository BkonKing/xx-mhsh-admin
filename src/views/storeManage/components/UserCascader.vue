<template>
  <a-cascader
    v-model="data"
    :options="options"
    change-on-select
    placeholder="请选择"
  />
</template>
<script>
export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    options () {
      return [
        {
          value: '1',
          label: '全部用户'
        },
        {
          value: '2',
          label: '指定社区',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ]
        },
        {
          value: '3',
          label: '指定类型',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>
