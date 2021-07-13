<template>
  <a-modal v-model="isShow" title="淘汰" @ok="handleOk">
    <div class="t1" v-if="selectedRowKeys.length===0">
      <span>接单方：</span>
      <span>{{info.user}}</span>
    </div>
    <div>
      <span>淘汰原因：</span>
      <a-select
        default-value="lucy"
        style="width: 318px"
        placeholder="请选择"
        v-model="value"
      >
        <a-select-option v-for="(item) in weedList" :value="item.reason" :key='item.id'>
          {{item.reason}}
        </a-select-option>
      </a-select>
    </div>
  </a-modal>
</template>

<script>
import { gainGetReason, toEliminate } from '@/api/taskCentre'
export default {
  props: ['selectedRowKeys', 'id'],
  data () {
    return {
      isShow: false,
      info: '',
      weedList: [],
      value: undefined
    }
  },
  methods: {
    handleOk () {
      let ids = []
      if (this.selectedRowKeys.length === 0) {
        ids.push(this.info.id)
      } else {
        ids = this.selectedRowKeys
      }
      toEliminate({
        ids: ids,
        task_id: this.id,
        eliminate_id: this.value
      }).then((res) => {
        this.$message.success(res.message)
        this.isShow = false
      })
    }
  },
  created () {
    gainGetReason({ type: 1 }).then(({ list }) => {
      this.weedList = list
      console.log('淘汰原因', list)
    })
  }
}
</script>

<style lang='less' scoped>
.t1{
  margin-bottom: 24px;
}
</style>
