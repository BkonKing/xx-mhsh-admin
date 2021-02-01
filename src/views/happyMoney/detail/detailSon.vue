<template>
  <div class="detailSon">
    <a-card class="card">
      <a-form-model :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span='9'>
            <a-form-model-item label='查询时间'>
              <a-range-picker :show-time="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
      }"
                              format="YYYY-MM-DD HH:mm:ss">
              </a-range-picker>
            </a-form-model-item>
          </a-col>
          <a-col :span='15'>
            <div class="otherTime">
              <span v-for="(item, index) in timeArr"
                    :key="index"
                    @click="currentIndex=index"
                    :class="{active:currentIndex===index}">{{item}}</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row2">
          <a-col :span='6'>
            <a-form-model-item label='财务类型'>
              <a-select placeholder="请选择"
                        style="width: 200px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled"
                                 disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='6'>
            <a-form-model-item label='搜索'>
              <a-input placeholder="手机号、姓名、流水号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span='6'></a-col>
          <a-col :span='1'
                 :offset='4'>
            <div class="btn">
              <a-button icon="download"
                        size="default">
                下载
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-row class="row3"
           :gutter="16">
      <a-col :span="8">
        <a-card>
          <a-row>
            <a-col :span='12'>
              <div class="data">
                <div class="txt">收入</div>
                <div class="num">+10000</div>
                <div class="sum">10笔 <span @click="openincome">详细</span></div>
              </div>
            </a-col>
            <a-col :span='12'>
              <div class="data">
                <div class="txt">支出</div>
                <div class="num">-10000</div>
                <div class="sum">10笔 <span @click="openexpend">详细</span></div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card>
          <a-col :span='8'>
            <div class="data">
              <div class="txt">购物</div>
              <div class="num">-10000</div>
              <div class="sum">10笔 <span @click="openconsume">详细</span></div>
            </div>
          </a-col>
          <a-col :span='8'>
            <div class="data">
              <div class="txt">退款</div>
              <div class="num">-10000</div>
              <div class="sum">10笔 <span>详细</span></div>
            </div>
          </a-col>
          <a-col :span='8'>
            <div class="data">
              <div class="txt">提现</div>
              <div class="num">-10000</div>
              <div class="sum">10笔 <span>详细</span></div>
            </div>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-card class="card2">
      <div class="type">
        <div class="item"
             v-for="(item, index) in tableArr"
             :key="index"
             :class="{active:currIndex===index}"
             @click="currIndex=index">
          {{item}}
        </div>
      </div>
      <a-table :columns="columns"
               :data-source="data"
               :pagination='false'>

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
    <detailModel ref="detailModel"></detailModel>
  </div>
</template>

<script>
import moment from 'moment'
import detailModel from './detailModel'
export default {
  components: {
    detailModel
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50,
        pageSize: 1
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      timeArr: ['今日', '昨日', '7天', '30天'],
      // 时间选项切换索引
      currentIndex: 0,
      tableArr: ['全部', '收入', '支出', '购物', '退出', '提现'],
      // 类型切换索引
      currIndex: 0,
      data: [
        {
          key: '1',
          paytime: '2020-09-09 00:00:00',
          swiftNumbe: 'T0000000100',
          orderNumber: '0000000000000',
          chargeOff: '新乡美好生活家园',
          chargeIn: '15000000000彭生生 (昵称昵称)',
          type: '购物',
          dealMoney: '+100',
          balance: 999,
          remark: '退运费'
        },
        {
          key: '2',
          paytime: '2020-09-09 00:00:00',
          swiftNumbe: 'T0000000100',
          orderNumber: '0000000000000',
          chargeOff: '新乡美好生活家园',
          chargeIn: '15000000000彭生生 (昵称昵称)',
          type: '购物',
          dealMoney: '+100',
          balance: 999,
          remark: '退运费'
        },
        {
          key: '3',
          paytime: '2020-09-09 00:00:00',
          swiftNumbe: 'T0000000100',
          orderNumber: '0000000000000',
          chargeOff: '新乡美好生活家园',
          chargeIn: '15000000000彭生生 (昵称昵称)',
          type: '购物',
          dealMoney: '+100',
          balance: 999,
          remark: '退运费'
        }
      ],
      columns: [
        {
          title: '入账时间',
          dataIndex: 'paytime',
          key: 'paytime',
          sorter: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '流水号',
          dataIndex: 'swiftNumbe',
          key: 'swiftNumbe',
          width: 120
        },
        {
          title: '订单号',
          dataIndex: 'orderNumber',
          key: 'orderNumber'
        },
        {
          title: '出账账户',
          dataIndex: 'chargeOff',
          key: 'chargeOff'
        },
        {
          title: '入账账户',
          dataIndex: 'chargeIn',
          key: 'chargeIn'
        },
        {
          title: '财务类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '交易金额(币)',
          dataIndex: 'dealMoney',
          key: 'dealMoney'
        },
        {
          title: '交易金额(币)',
          dataIndex: 'balance',
          key: 'balance'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ]
    }
  },
  methods: {
    moment,
    // 打开收入明细
    openincome () {
      this.$refs.detailModel.isShow = true
      this.$refs.detailModel.title = '收入分类明细'
    },
    // 打开支出明细
    openexpend () {
      this.$refs.detailModel.isShow = true
      this.$refs.detailModel.title = '支出分类明细'
    },
    // 打开消费明细
    openconsume () {
      this.$refs.detailModel.isShow = true
      this.$refs.detailModel.title = '消费账户明细'
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

<style lang='less' scoped>
.detailSon {
  /deep/ .ant-form-item-label {
    width: 74px;
  }
  .card {
    /deep/ .ant-card-body {
      padding-bottom: 0;
    }
  }
  .otherTime {
    line-height: 40px;
    span {
      margin-right: 20px;
      cursor: pointer;
    }
    .active {
      color: #348fe2;
    }
  }
  .btn {
    margin-top: 5px;
  }

  .row3 {
    margin-top: 10px;
    .txt {
      color: #c2bfbf;
    }
    .num {
      line-height: 40px;
    }
    span {
      text-decoration: underline;
    }
  }
  .card2 {
    margin-top: 10px;
    .type {
      display: flex;
      align-items: center;
      background-color: #d3d4d6;
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
    .ant-card-body {
      padding: 0;
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
