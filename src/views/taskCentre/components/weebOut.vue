<template>
  <a-modal v-model="isShow" title="淘汰" @ok="handleOk">
    <div class="selected" v-if="selectedRowKeys.length > 0">
      <a-icon class="icon" type="info-circle" />
      已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项

    </div>
    <div class="t1" v-if="selectedRowKeys.length === 0">
      <span style="marginLeft:20px">接单方：</span>
      <span>{{ info.user }}</span>
    </div>
    <div>
      <span><span style="color:red">*</span>淘汰原因：</span>

      <a-select
        default-value="lucy"
        style="width: 318px"
        placeholder="请选择"
        v-model="value"
      >
        <a-select-option
          v-for="item in weedList"
          :value="item.id"
          :key="item.id"
        >
          {{ item.reason }}
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
      if (!this.value) {
        this.$message.warning('请选择淘汰原因')
        return
      }
      let ids = []
      if (this.selectedRowKeys.length === 0) {
        ids.push(this.info.uid)
      } else {
        ids = this.selectedRowKeys
      }
      toEliminate({
        ids: ids,
        task_id: this.id,
        eliminate_id: this.value
      }).then(res => {
        this.$message.success('淘汰成功')
        this.$parent.getTaskSpeedData()
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

<style lang="less" scoped>
.t1 {
  margin-bottom: 24px;
}
/deep/ .ant-modal-body{
  padding: 16px 24px 24px 24px;
}
 .selected {
   margin-bottom: 10px;
      width: 100%;
      height: 40px;
      padding-left: 15px;
      line-height: 40px;
      background-color: rgba(230, 247, 255, 1);
      border-width: 1px;
      border-style: solid;
      border-color: rgba(186, 231, 255, 1);
      border-radius: 4px;
      .icon {
        color: #0e77d1;
        margin-right: 10px;
      }
      .span1 {
        color: #0e77d1;
      }
      .span2 {
        cursor: pointer;
        color: #0e77d1;
        margin-left: 10px;
      }
    }
</style>
