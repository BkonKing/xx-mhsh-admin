<template>
  <div>
    <headerTabs
    @tabCall="tabSelect"
    :tabIndex="tabIndex"
    :tabList="tabList">
    </headerTabs>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="项目">
                <a-select v-model="queryParam.project_id" placeholder="请选择" default-value="0">
                  <a-select-option v-for="item in productList" :key="item.id" :value="item.id">
                    {{ item.project_name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="订单状态">
                <a-select v-model="queryParam.order_status" placeholder="请选择">
                  <a-select-option v-for="item in statusList" :key="item.value" :value="item.value">
                      {{ item.text }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="搜索">
                  <a-input v-model="queryParam.search" placeholder="手机号、订单编号、取票号、影片" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="是否取票">
                  <a-select v-model="queryParam.is_get" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="2">已取票</a-select-option>
                    <a-select-option value="1">未取票</a-select-option>
                  </a-select>
                  <!-- <a-select v-model="queryParam.is_get" placeholder="请选择">
                    <a-select-option v-for="item in statusList" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select> -->
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="是否退款">
                  <a-select v-model="queryParam.is_refund" placeholder="请选择">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="2">已退款</a-select-option>
                    <a-select-option value="1">未退款</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="下单时间">
                  <a-range-picker
                    showTime
                    class="piker-time"
                    :value="createTime"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getCreateTime"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="支付时间" prop="payDate">
                  <a-range-picker
                    showTime
                    class="piker-time"
                    :value="payTime"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getPayTime"
                  />
                </a-form-model-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 16" :sm="24">
              <span class="table-page-search-submitButtons" style="float: right; overflow: hidden">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="reSet">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card>
      <s-table
        ref="table"
        size="default"
        rowKey="name"
        :columns="columns"
        :data="loadTableData"
        showPagination="auto"
      >
        <span slot="price" slot-scope="pay_price, record">
          {{ '￥' + pay_price +' (￥'+ record.rmb_price + ' + 币' + record.happiness + ')' }}
        </span>
        <a slot="operation" slot-scope="text, record" @click="goDetail(record.order_id)">查看</a>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import headerTabs from './components/headerTabs'
import { STable } from '@/components'
import { getOrderStatus, getProductList, getOrderList } from '@/api/movie'
const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_no'
    // scopedSlots: { customRender: 'serial' }
  },
  {
    title: '订单状态',
    dataIndex: 'order_status_desc'
  },
  {
    title: '项目',
    dataIndex: 'project_name'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '影片',
    dataIndex: 'film_name'
  },
  {
    title: '支付金额',
    dataIndex: 'pay_price',
    sorter: true,
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '下单时间',
    dataIndex: 'ctime',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'movieOrder',
  components: {
    headerTabs,
    STable
  },
  data () {
    this.columns = columns
    return {
      tabIndex: '0',
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '已成功' },
        { key: '2', tab: '已取消' },
        { key: '3', tab: '取消付款' }
      ],
      productList: [],
      statusList: [],
      payTime: [], // 支付时间
      createTime: [], // 创建时间
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: { search: '' }
    }
  },
  created () {
    if (this.$route.query.tabIndex) {
      console.log(this.$route.query)
      this.tabIndex = this.$route.query.tabIndex
      this.queryParam.search = decodeURI(this.$route.query.film_name)
      this.queryParam.type = this.tabIndex
    }
    getOrderStatus().then(res => {
      this.statusList = res.data.list
      console.log(this.statusList)
    })
    getProductList().then(res => {
      this.productList = res.data
    })
  },
  methods: {
    tabSelect (key) {
      this.queryParam = {}
      this.queryParam.type = key == 0 ? '' : key
      this.loadAllData()
    },
    getCreateTime (dates, dateStrings) {
      this.createTime = dates
      this.queryParam.order_time = dateStrings[0] + '~' + dateStrings[1]
    },
    getPayTime (dates, dateStrings) {
      this.payTime = dates
      this.queryParam.pay_time = dateStrings[0] + '~' + dateStrings[1]
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.payTime = []
      this.createTime = []
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder && page.sortField) {
        const startTime = moment().month(moment().month()).startOf('month').format('YYYY-MM-DD')
        const endTime = moment().month(moment().month()).endOf('month').format('YYYY-MM-DD')
        if (page.sortField == 'pay_price') {
          if (!this.queryParam.pay_time) {
            this.payTime = [moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')]
            this.queryParam.pay_time = startTime + '~' + endTime
          }
          page.pay_sort = page.sortOrder == 'ascend' ? 1 : 2
          page.order_sort = ''
        }
        if (page.sortField == 'ctime') {
          console.log(this.queryParam.order_time)
          if (!this.queryParam.order_time) {
            this.createTime = [moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')]
            console.log(this.createTime)
            this.queryParam.order_time = startTime + '~' + endTime
          }
          page.order_sort = page.sortOrder == 'ascend' ? 1 : 2
          page.pay_sort = ''
        }
      }
      console.log('page', page)
      const requestParameters = Object.assign({}, this.queryParam, page)
      return getOrderList(requestParameters)
    },
    goDetail (id) {
      this.$router.push({
        path: '/movie/detail',
        query: {
          order_id: id
        }
      })
    }
  }
}
</script>

<style less lang="less">
.table-page-search-wrapper {
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  // /deep/ .ant-form-item-control-wrapper {
  //   width: 264px;
  // }
  .piker-time {
    width: 100% !important;
  }
  // .search-bth {
  //   width: 352px;
  //   /deep/ .ant-form-item-control {
  //     width: 352px;
  //     text-align: right;
  //   }
  // }
}
.ant-card {
  margin-bottom: 24px;
}
</style>
