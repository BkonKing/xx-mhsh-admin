<template>
  <div class="edit-table">
    <a-row class="edit-table-header" type="flex">
      <a-col
        v-for="item in columns"
        :flex="item.flex || 1"
        :key="item.dataIndex"
        style="width: 0"
        >{{ item.title }}</a-col
      >
    </a-row>
    <a-form-model ref="tableForm" :model="tableData" class="edit-table-body">
      <a-row v-for="(record, index) in tableData.form" :key="index" type="flex">
        <a-col flex="1" style="width: 0" class="two-Multi">{{
          record.task_name
        }}</a-col>
        <a-col flex="80px" style="width: 0">{{
          +record.is_enabled ? "已开启" : "未开启"
        }}</a-col>
        <a-col flex="1" style="width: 0">
          <template v-if="+record.ptype">
            <div v-if="record.stime">起：{{ record.stime }}</div>
            <div v-if="record.etime">止：{{ record.etime }}</div>
          </template>
          <template v-else>不限</template>
        </a-col>
        <a-col
          v-for="item in inputColumns"
          :key="item.dataIndex"
          flex="1"
          style="width: 0"
        >
          <a-form-model-item
            :prop="`form.${index}.${item.dataIndex}`"
            :rules="{
              required: !(item.dataIndex === 'yk_credits' && record.id === '2'),
              message: '必填'
            }"
          >
            <span v-if="item.dataIndex === 'yk_credits' && record.id === '2'"
              >———</span
            >
            <a-input
              v-else
              v-model="record[item.dataIndex]"
              v-number-input.int="{ min: 1 }"
              placeholder="请输入"
              :maxLength="50"
              style="width: 100%;"
              @change="$emit('input')"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    checked: {
      type: Array,
      default: () => []
    },
    taskData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    const textColumns = [
      {
        title: '任务名称',
        dataIndex: 'task_name'
      },
      {
        title: '是否开启',
        flex: '80px',
        dataIndex: 'is_enabled'
      },
      {
        title: '任务时间',
        dataIndex: 'task_type'
      }
    ]
    const inputColumns = [
      {
        title: '业主（币）',
        dataIndex: 'yz_credits',
        scopedSlots: { customRender: 'yz_credits' }
      },
      {
        title: '业主成员（币）',
        dataIndex: 'yzcy_credits',
        scopedSlots: { customRender: 'yzcy_credits' }
      },
      {
        title: '租户（币）',
        dataIndex: 'zh_credits',
        scopedSlots: { customRender: 'zh_credits' }
      },
      {
        title: '租户成员（币）',
        dataIndex: 'zhcy_credits',
        scopedSlots: { customRender: 'zhcy_credits' }
      },
      {
        title: '游客（币）',
        dataIndex: 'yk_credits',
        scopedSlots: { customRender: 'yk_credits' }
      }
    ]
    return {
      tableData: {
        form: this.data
      },
      textColumns,
      inputColumns,
      columns: [...textColumns, ...inputColumns]
    }
  },
  watch: {
    data (val) {
      this.tableData = {
        form: val
      }
    },
    checked (val) {
      if (val.length > this.tableData.form.length) {
        // 新增
        val.forEach(id => {
          if (!this.tableData.form.find(obj => obj.id === id)) {
            this.tableData.form.push(this.taskData[id])
          }
        })
      } else if (val.length < this.tableData.form.length) {
        // 删除
        this.tableData.form = this.tableData.form.filter(obj => {
          return val.includes(obj.id)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit-table {
  &-header {
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    > .ant-col {
      padding: 12px 4px 12px 8px;
    }
  }
  &-body {
    > .ant-row-flex {
      border-bottom: 1px solid #e8e8e8;
      > .ant-col {
        padding: 6px 4px 6px 8px;
      }
    }
  }

  .ant-form-item {
    margin-bottom: 0;
  }
}
</style>
