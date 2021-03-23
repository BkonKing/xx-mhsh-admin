<template>
  <div>
    <a-card class="card"
            ref="card">
      <a-form-model :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label='充值类型'>
              <a-select placeholder="请选择"
                        v-model="recharge_type"
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
              <a-select placeholder="请选择"
                        v-model="project_id"
                        style="width: 300px">
                <a-select-option v-for="(item,index) in projectList"
                                 :value="item.id"
                                 :key='index'>
                  {{item.project_name}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='支付时间'
                               v-if="cardBol">
              <a-range-picker format="YYYY-MM"
                              :value="value"
                              :mode="mode2"
                              @panelChange="handlePanelChange2"
                              @change="handleChange" />
            </a-form-model-item>
            <div class="btns"
                 v-else>
              <a-button type='primary'
                        @click="search">查询</a-button>
              <a-button @click="reset">重置</a-button>
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
              <a-select placeholder="请选择"
                        v-model="pay_type"
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
              <a-button type='primary'
                        @click="search">查询</a-button>
              <a-button @click="reset">重置</a-button>
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
               :data-source="tableData"
               :pagination='false'
               class="table"
               @change="tableChange">
        <div slot="recharge_type"
             slot-scope="recharge_type">
          {{recharge_type==='1'?'短信':'支付通道'}}
        </div>
        <div slot="pay_type"
             slot-scope="pay_type">
          <span v-if="pay_type!=='0'">
            {{pay_type==='1'?'微信':'支付宝'}}
          </span>
        </div>
      </a-table>
      <div class="pagination">
        <a-pagination show-quick-jumper
                      show-size-changer
                      :default-current="pagination.currentPage"
                      :page-size-options="pagination.sizes"
                      :total="pagination.total"
                      :page-size.sync="pagination.pageSize"
                      :show-total="(total, range) => `共 ${total} 条记录 `"
                      @change="onChange"
                      @showSizeChange="sizeChange" />
      </div>
    </a-card>
    <rechargeModel ref="rechargeModel"></rechargeModel>
  </div>
</template>

<script>
import rechargeModel from './rechargeModel'
import { getRechargeList, getProjectList } from '@/api/financeCenter.js'
import moment from 'moment'
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
      recharge_type: '',
      value: [],
      pay_type: '',
      project_id: '',
      sort_type: '',
      sort_field: '',
      cardHeight: '',
      cardBol: true,
      tableData: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'uid',
          key: 'uid',
          width: 80
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '项目',
          dataIndex: 'project_name',
          key: 'project_name',
          width: 100
        },
        {
          title: '充值类型',
          dataIndex: 'recharge_type',
          key: 'recharge_type',
          width: 100,
          scopedSlots: { customRender: 'recharge_type' }
        },
        {
          title: '支付金额',
          dataIndex: 'payment_money',
          key: 'payment_money',
          sorter: true,
          width: 200
        },
        {
          title: '充值量',
          dataIndex: 'recharge_amount',
          key: 'recharge_amount',
          sorter: true,
          width: 200
        },
        {
          title: '剩余量',
          dataIndex: 'surplus_amount',
          key: 'surplus_amount',
          width: 200
        },
        {
          title: '支付方式',
          dataIndex: 'pay_type',
          key: 'pay_type',
          width: 200,
          scopedSlots: { customRender: 'pay_type' }
        },
        {
          title: '支付账号',
          dataIndex: 'account',
          key: 'account'
        },
        {
          title: '支付时间',
          dataIndex: 'pay_time',
          key: 'pay_time',
          sorter: true
        }
      ],
      projectList: [],
      rechargeType: {
        1: '短信',
        2: '支付通道'
      },
      payType: {
        1: '微信',
        2: '支付宝'
      }

    }
  },
  methods: {
    // 排序时触发
    tableChange (pagination, filters, sorter) {
      console.log(sorter)
      this.sort_field = sorter.field
      this.sort_type = sorter.order === 'ascend' ? 1 : 2
      this.getData()
    },
    // 重置
    reset () {
      this.value = []
      this.pay_type = ''
      this.recharge_type = ''
      this.project_id = ''
      this.getData()
    },
    // 搜索
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 获取充值记录列表
    async getData () {
      const timeStr = this.value.map(item => {
        return moment(item).format('YYYY-MM')
      })
      // console.log('timeStr', timeStr)
      const str = timeStr.join('~')
      const res = await getRechargeList({
        pageindex: this.pagination.currentPage,
        pagesize: this.pagination.pageSize,
        pay_type: this.pay_type,
        recharge_type: this.recharge_type,
        project_id: this.project_id,
        pay_time: str,
        sort_field: this.sort_field,
        sort_type: this.sort_type
      })
      this.tableData = res.data.list
      this.pagination.total = res.data.total
      console.log('充值记录列表', res)
      // console.log('currentPage', this.pagination.currentPage)
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
    // 页码改变事件
    onChange (page, size) {
      // console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getData()
    },
    // 页容量改变事件
    sizeChange (current, size) {
      // console.log('size: ', size)
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getData()
    },
    handleChange (value) {
      this.value = value
    },
    handlePanelChange2 (value) {
      this.value = value
    }
  },
  mounted () {
    // console.log(this.$refs.card.$el.offsetHeight)
    this.cardHeight = this.$refs.card.$el.offsetHeight
  },
  async created () {
    this.getData()
    const res = await getProjectList()
    this.projectList = res.data
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
