<template>
  <div class="applyTotal">
    <div class="title">
      <div class="item"
           v-for="(item, index) in titleArr"
           :key="index"
           @click="currentIndex=index"
           :class="{active:currentIndex===index}">
        <div v-if="index===0">{{item}}(10)</div>
        <div v-else>{{item}}</div>
      </div>
    </div>
    <a-card class="card">
      <a-form-model layout="inline">
        <a-form-model-item label='账户类型'>
          <a-select style="width: 200px">
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
    <a-card class="card">
      <div class="btns">
        <a-button type='primary'
                  @click="apply">
          <a-icon type="plus" />申请
        </a-button>
      </div>
      <a-table :pagination='false'
               class="table"
               :columns="columns"
               :data-source="data">
        <div slot="voucher">
          <a-icon type="picture" />
        </div>
        <div slot="opera">
          <a-button type='link'
                    @click="openDetail">查看</a-button>
          <a-button type='link'
                    @click="remove">删除</a-button>
        </div>
      </a-table>
      <div class="pagination">
        <a-pagination show-quick-jumper
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
    <applyModel ref="applyModel"></applyModel>
    <detailModel ref="detailModel"></detailModel>
    <delModel ref="delModel"></delModel>
  </div>
</template>

<script>
import applyModel from './applyModel'
import detailModel from './detailModel'
import delModel from './delModel'
export default {
  components: {
    applyModel,
    detailModel,
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
      titleArr: ['待审核', '已发放', '已拒绝', '已取消'],
      currentIndex: 0,
      data: [
        {
          key: '1',
          applyTime: '2020-09-07 00:00:00',
          happyMoney: 10000,
          remark: '啊啊啊啊啊啊',
          checkTime: '2020-09-09 00:00:00'
        },
        {
          key: '2',
          applyTime: '2020-09-07 00:00:00',
          happyMoney: 10000,
          remark: '啊啊啊啊啊啊',
          checkTime: '2020-09-09 00:00:00'
        },
        {
          key: '3',
          applyTime: '2020-09-07 00:00:00',
          happyMoney: 10000,
          remark: '啊啊啊啊啊啊',
          checkTime: '2020-09-09 00:00:00'
        }
      ],
      columns: [
        {
          title: '申请时间',
          dataIndex: 'applyTime',
          key: 'applyTime',
          sorter: true,
          width: 200
        },
        {
          title: '幸福币',
          dataIndex: 'happyMoney',
          key: 'happyMoney',
          width: 80
        },
        {
          title: '凭证',
          dataIndex: 'voucher',
          key: 'voucher',
          scopedSlots: { customRender: 'voucher' },
          width: 80
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 120
        },
        {
          title: '审核时间',
          dataIndex: 'checkTime',
          key: 'checkTime'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ]
    }
  },
  methods: {
    // 删除
    remove () {
      this.$refs.delModel.isShow = true
    },
    // 打开发放详情
    openDetail () {
      this.$refs.detailModel.isShow = true
    },
    // 申请
    apply () {
      this.$refs.applyModel.isShow = true
    },
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

<style lang='less'>
.applyTotal {
  .title {
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
      background-color: #242a31;
    }
  }
  .card {
    margin-top: 20px;
    .table {
      margin-top: 15px;
    }
  }
  .pagination {
    margin-top: 10px;
    .ant-pagination {
      padding: 10px;
    }
    .ant-pagination-total-text {
      margin-left: 20px;
      margin-right: 300px;
    }
    .ant-pagination-item-active {
      background-color: #1890ff;
      a {
        color: white;
      }
    }
  }
}
</style>
