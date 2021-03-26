<template>
  <div class="transfer">
    <div class="top">
      <div
class="item"
           v-for="(item, index) in typeObj"
           :key="index"
           @click="currentIndex=index"
           :class="{active:currentIndex===index}">{{item}}</div>
    </div>
    <a-card class="card">
      <a-form-model layout="inline">
        <a-form-model-item label='账户类型'>
          <a-select
style="width: 200px"
                    placeholder="请选择">
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled">
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label='时间'>
          <a-date-picker />
          <a-button type='link'>7天</a-button>
          <a-button type='link'>30天</a-button>
        </a-form-model-item>
        <a-form-model-item label='搜索'>
          <a-input placeholder="手机号、姓名"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <div class="btns">
        <a-button
type='primary'
                  @click="apply">
          <a-icon type="plus" />
          申请
        </a-button>
        <a-dropdown>
          <a-menu
slot="overlay"
                  @click="handleMenuClick">
            <a-menu-item key="1">
              批量转账
            </a-menu-item>
            <a-menu-item key="2">
              批量拒绝
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 批量审核
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <a-table
class="table"
               :pagination='false'
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
               :columns="columns"
               :data-source="data">
        <div slot="opera">
          <a-button
type='link'
                    @click="opencheckShow">审核</a-button>
          <a-button
type='link'
                    @click="openDetail">查看</a-button>
          <a-button
type='link'
                    v-if="false"
                    @click="remove">删除</a-button>
        </div>
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
    <checkModel ref="checkModel"></checkModel>
    <transferDetail ref="transferDetail"></transferDetail>
    <transferApply ref="transferApply"></transferApply>
    <delModel ref="delModel"></delModel>
  </div>
</template>

<script>
import checkModel from './checkModel'
import transferDetail from './transferDetail'
import transferApply from './transferApply'
import delModel from './delModel'
export default {
  components: {
    checkModel,
    transferDetail,
    transferApply,
    delModel
  },
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
          applyTime: '2020-09-07 00:00:00',
          type: '用户',
          otheraccount: '5000000000彭生生 (昵称昵称)',
          happyMoney: 100,
          remark: '啊啊啊啊',
          checkTime: '2020-09-09 00:00:00'
        },
        {
          key: '2',
          applyTime: '2020-09-07 00:00:00',
          type: '用户',
          otheraccount: '5000000000彭生生 (昵称昵称)',
          happyMoney: 100,
          remark: '啊啊啊啊',
          checkTime: '2020-09-09 00:00:00'
        },
        {
          key: '3',
          applyTime: '2020-09-07 00:00:00',
          type: '用户',
          otheraccount: '5000000000彭生生 (昵称昵称)',
          happyMoney: 100,
          remark: '啊啊啊啊',
          checkTime: '2020-09-09 00:00:00'
        }
      ],
      columns: [
        {
          title: '申请时间',
          dataIndex: 'applyTime',
          key: 'applyTime',
          sorter: true,
          width: 180
        },
        {
          title: '账户类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '对方账户',
          dataIndex: 'otheraccount',
          key: 'otheraccount',
          width: 200
        },
        {
          title: '幸福币',
          dataIndex: 'happyMoney',
          key: 'happyMoney',
          width: 80
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 100
        },
        {
          title: '审核时间',
          dataIndex: 'checkTime',
          key: 'checkTime',
          width: 200
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      selectedRowKeys: [], // Check here to configure the default column
      typeObj: ['待审核', '已转账', '已拒绝'],
      currentIndex: 0

    }
  },
  methods: {
    // 删除
    remove () {
      this.$refs.delModel.isShow = true
    },
    // 申请
    apply () {
      this.$refs.transferApply.isShow = true
    },
    // 打开转账详情
    openDetail () {
      this.$refs.transferDetail.isShow = true
    },
    // 打开转账审核
    opencheckShow () {
      this.$refs.checkModel.isShow = true
    },
    handleMenuClick (e) {
      console.log('click', e)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log('size: ', size)
    }
  },
  created () {

  }
}
</script>

<style lang='less' scoped>
.transfer {
  .top {
    display: flex;
    align-items: center;
    background-color: #c7cace;
    color: white;
    .item {
      width: 120px;
      line-height: 40px;
      text-align: center;
    }
    .active {
      background-color: #000;
    }
  }
  .card {
    margin-top: 20px;
  }
  .card2 {
    margin-top: 20px;
    .btns {
      button:last-child {
        margin-left: 10px;
      }
    }
    .table {
      margin-top: 10px;
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
}
</style>
