<template>
  <div>
    <a-card class="card"
            ref="card">
      <a-form-model :model='form'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label='充值类型'>
              <a-select v-model="form.recharge_type"
                        style="width: 300px">
                <a-select-option value="1">
                  短信
                </a-select-option>
                <a-select-option value="2">
                  支付通道
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='项目'>
              <a-select style="width: 300px">
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
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='支付时间'
                               v-if="cardBol">
              <a-range-picker format="YYYY-MM"
                              :value="form.pay_time"
                              :mode="mode2"
                              @panelChange="handlePanelChange2"
                              @change="handleChange" />
            </a-form-model-item>
            <div class="btns"
                 v-else>
              <a-button type='primary'>查询</a-button>
              <a-button>重置</a-button>
              <a-button type='link'
                        @click="open">展开
                <a-icon type="down" />
              </a-button>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label='支付方式'
                               v-if="cardBol">
              <a-select v-model="form.pay_type"
                        style="width: 300px">
                <a-select-option value="1">
                  微信
                </a-select-option>
                <a-select-option value="2">
                  支付宝
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'></a-col>
          <a-col :span='8'>
            <div class="btns"
                 v-if="cardBol">
              <a-button type='primary'>查询</a-button>
              <a-button>重置</a-button>
              <a-button type='link'
                        @click="close">收起
                <a-icon type="up" />
              </a-button>
            </div>

          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-button type='primary'
                @click="recharge">充值</a-button>
      <a-table :columns="columns"
               :data-source="data"
               :pagination='false'
               class="table">

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
    <rechargeModel ref="rechargeModel"></rechargeModel>
  </div>
</template>

<script>
import rechargeModel from './rechargeModel'
import { getRechargeList } from '@/api/financeCenter.js'
export default {
  components: {
    rechargeModel
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50,
        pageSize: 10
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      mode2: ['month', 'month'],
      // value: [],
      form: {
        recharge_type: '',
        pay_time: []
      },
      cardHeight: '',
      cardBol: true,
      data: [
        {
          key: '1',
          id: 10,
          project: '项目名称',
          type: '短信',
          money: '￥100.00',
          rechargeAmount: '1000',
          residueAmount: '2000',
          payMode: '微信',
          payAccount: '账户号',
          payTime: '2020-11-20  08:50:08'
        },
        {
          key: '2',
          id: 10,
          project: '项目名称',
          type: '短信',
          money: '￥100.00',
          rechargeAmount: '1000',
          residueAmount: '2000',
          payMode: '微信',
          payAccount: '账户号',
          payTime: '2020-11-20  08:50:08'
        },
        {
          key: '3',
          id: 10,
          project: '项目名称',
          type: '短信',
          money: '￥100.00',
          rechargeAmount: '1000',
          residueAmount: '2000',
          payMode: '微信',
          payAccount: '账户号',
          payTime: '2020-11-20  08:50:08'
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
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          width: 100
        },
        {
          title: '充值类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '支付金额',
          dataIndex: 'money',
          key: 'money',
          sorter: true,
          width: 200
        },
        {
          title: '充值量',
          dataIndex: 'rechargeAmount',
          key: 'rechargeAmount',
          sorter: true,
          width: 200
        },
        {
          title: '剩余量',
          dataIndex: 'residueAmount',
          key: 'residueAmount',
          width: 200
        },
        {
          title: '支付方式',
          dataIndex: 'payMode',
          key: 'payMode',
          width: 200
        },
        {
          title: '支付账号',
          dataIndex: 'payAccount',
          key: 'payAccount'
        },
        {
          title: '支付时间',
          dataIndex: 'payTime',
          key: 'payTime',
          sorter: true
        }
      ]
    }
  },
  methods: {
    // 获取充值列表
    async getData () {
      const res = await getRechargeList({
        pageindex: this.pagination.currentPage,
        pagesize: this.pagination.pageSize
      })
      console.log('充值记录列表', res)
    },
    // 充值
    recharge () {
      this.$refs.rechargeModel.isShow = true
    },
    // 展开
    open () {
      this.$refs.card.$el.style.height = this.cardHeight + 'px'
      setTimeout(() => {
        this.cardBol = true
      }, 100)
    },
    // 收起
    close () {
      this.$refs.card.$el.style.height = '75px'
      this.cardBol = false
    },
    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log('size: ', size)
    },
    handleChange (value) {
      this.value = value
    },
    handlePanelChange2 (value) {
      this.value = value
    }
  },
  mounted () {
    console.log(this.$refs.card.$el.offsetHeight)
    this.cardHeight = this.$refs.card.$el.offsetHeight
  },
  created () {
    this.getData()
  }
}
</script>

<style lang='less' scoped>
.btns {
  margin-left: 190px;
  button {
    margin-right: 10px;
  }
}

.card {
  margin-top: 20px;
  /deep/ .ant-card-body {
    padding-bottom: 0;
  }
}
.card2 {
  margin-top: 20px;
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
.table {
  margin-top: 20px;
}
</style>
