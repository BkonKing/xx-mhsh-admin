<template>
  <div class="happyMoney">
    <a-card class="card">
      <a-table
:columns="columns"
               :data-source="data"
               :pagination='false'>

      </a-table>
      <div class="pagination">
        <a-pagination
show-quick-jumper
                      show-size-changer
                      :default-current="pagination.currentPage"
                      :page-size-options="pagination.sizes"
                      :total="pagination.total"
                      :page-size.sync="pagination.pageSize"
                      :show-total="(total, range) => `共 ${total} 条记录 第${pagination.currentPage}/80页`"
                      @change="onChange"
                      @showSizeChange="sizeChange" />
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50,
        pageSize: 1
      },
      data: [
        {
          key: '1',
          id: 483,
          type: '奖励转入',
          waterNum: 'T0000003',
          time: '2021-01-14 14:52:52',
          moneyBalance: 6,
          balance: 6,
          remask: '【奖励支出】对方：美好生活家园运营中心'
        },
        {
          key: '2',
          id: 483,
          type: '奖励转入',
          waterNum: 'T0000003',
          time: '2021-01-14 14:52:52',
          moneyBalance: 6,
          balance: 6,
          remask: '【奖励支出】对方：美好生活家园运营中心'
        },
        {
          key: '3',
          id: 483,
          type: '奖励转入',
          waterNum: 'T0000003',
          time: '2021-01-14 14:52:52',
          moneyBalance: 6,
          balance: 6,
          remask: '【奖励支出】对方：美好生活家园运营中心'
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '流水号',
          dataIndex: 'waterNum',
          key: 'waterNum'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '币额',
          dataIndex: 'moneyBalance',
          key: 'moneyBalance',
          width: 100
        },
        {
          title: '余额',
          dataIndex: 'balance',
          key: 'balance'
        },
        {
          title: '备注',
          dataIndex: 'remask',
          key: 'remask'
        }
      ]
    }
  },
  methods: {

    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log('size: ', size)
    }
  }
}
</script>

<style lang='less' scoped>
.happyMoney {
  .card {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 10px;
    /deep/ .ant-pagination {
      padding: 10px;
    }
    /deep/ .ant-pagination-total-text {
      margin-left: 20px;
      margin-right: 300px;
    }
    /deep/ .ant-pagination-item-active {
      background-color: #1890ff;
      a {
        color: white;
      }
    }
  }
}
</style>
