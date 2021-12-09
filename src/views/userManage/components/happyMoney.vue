<template>
  <div class="happyMoney">
    <a-card class="card">
      <s-table
        ref="table"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :pagination="true"
      >
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getClogList } from '@/api/userManage'
export default {
  components: {
    STable
  },
  props: {
    uid: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 80
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: 100,
          customRender: (text, row) => {
            var value = ''
            if (row.type == '1') {
              value = '转入'
            }
            if (row.type == '2') {
              if (row.sub_type == '1') {
                value = '奖励转出'
              } else {
                value = '奖励转入'
              }
            }
            if (row.type == '3') {
              if (row.sub_type == '1') {
                value = '转账支出'
              } else {
                value = '转账收入'
              }
            }
            if (row.type == '4') {
              if (row.sub_type == '1') {
                value = '交易支出'
              } else {
                value = '交易收入'
              }
            }
            if (row.type == '5') {
              value = '提现'
            }
            return value
          }
        },
        {
          title: '流水号',
          dataIndex: 'log_no'
        },
        {
          title: '时间',
          dataIndex: 'ctime'
        },
        {
          title: '币额',
          dataIndex: 'money',
          width: 100
        },
        {
          title: '余额',
          dataIndex: 'money_u'
        },
        {
          title: '备注',
          dataIndex: 'source_var'
        }
      ],
      loadData: parameter => {
        return getClogList(Object.assign(parameter, { uid: this.uid }))
      }
    }
  },
  methods: {
    refresh () {
      this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less" scoped>
.happyMoney {
  .card {
    margin-top: 24px;
  }
}
</style>
