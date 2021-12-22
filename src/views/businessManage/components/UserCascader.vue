<template>
  <a-cascader
    v-model="data"
    :options="options"
    :getPopupContainer="triggerNode => triggerNode.parentNode"
    change-on-select
    @change="handleChange"
    placeholder="请选择"
  />
</template>
<script>
import { getProjectList } from '@/api/userManage/business'
export default {
  name: 'UserCascader',
  props: {
    value: {
      type: Array,
      default: () => []
    }
    // projectOptions: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data () {
    return {
      data: this.value,
      projectOptions: []
    }
  },
  computed: {
    projectChildren () {
      return this.projectOptions.map(obj => ({
        value: obj.project_id,
        label: obj.project_name
      }))
    },
    options () {
      return [
        {
          value: '0',
          label: '全部用户'
        },
        {
          value: '1',
          label: '指定社区',
          children: this.projectChildren
        },
        {
          value: '2',
          label: '指定类型',
          children: [
            {
              label: '业主',
              value: '1'
            },
            {
              label: '业主成员',
              value: '2'
            },
            {
              label: '租户',
              value: '3'
            },
            {
              label: '租户成员',
              value: '4'
            },
            {
              label: '游客',
              value: '0'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.getProjectList()
  },
  watch: {
    data (newValue) {
      this.$emit('input', newValue)
    },
    value (newValue) {
      this.data = newValue
    }
  },
  methods: {
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          data.shift()
        }
        this.projectOptions = data || []
      })
    },
    handleChange (value) {}
  }
}
</script>
