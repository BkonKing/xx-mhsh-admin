<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabIndex"
    :tab-change="tabSelect"
  >
    <template v-slot:extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic :title="`已充值(${dataObj.cz_count}户)`" :value="'￥'+dataObj.cz_money | NumberFormat" />
        </div>
        <div class="stat-item">
          <a-statistic :title="`已缴费(${dataObj.paid_count}户)`" :value="'￥'+dataObj.paid_money | NumberFormat" />
        </div>
      </div>
    </template>
    <div>
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="支付时间" prop="payDate">
                  <a-range-picker
                    showTime
                    class="piker-time"
                    :value="publishDate"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getTime"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="账单月份">
                  <a-select v-model="queryParam.project_month_id" placeholder="请选择">
                    <a-select-option v-for="item in monthList" :key="item.id" :value="item.id">
                      {{ item.setmeal_days }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="充缴方式">
                    <a-select v-model="queryParam.zf_type" placeholder="请选择">
                      <!-- <a-select-option value="0">全部</a-select-option> -->
                      <a-select-option value="2">线上充缴--APP缴费、充值</a-select-option>
                      <a-select-option value="1">线下充缴--后台点“线下缴费”按钮、“线下充值”按钮</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="区域">
                    <div style="display: flex;">
                      <a-select v-model="queryParam.building_id" placeholder="楼栋" default-value="0" @change="selectHouse" style="margin-right: 8px">
                        <a-select-option v-for="item in houseList" :key="item.id" :value="item.id">
                          {{ item.building_name }}
                        </a-select-option>
                      </a-select>
                      <a-select v-model="queryParam.unit_id" placeholder="单元" default-value="0">
                        <a-select-option v-for="item in unitList" :key="item.id" :value="item.id">
                          {{ item.unit_name }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="搜索">
                    <a-input v-model="queryParam.search" placeholder="业主姓名/电话" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="明细类型">
                    <a-select v-model="queryParam.bill_type" placeholder="请选择" default-value="0">
                      <!-- <a-select-option value="0">全部</a-select-option> -->
                      <a-select-option value="1">充值</a-select-option>
                      <a-select-option value="2">缴费</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col v-if="tabIndex==0 || tabIndex==4" :md="8" :sm="24">
                  <a-form-model-item label="费用类型">
                    <a-select v-model="queryParam.genre_id" placeholder="请选择">
                      <template v-if="tabIndex==0">
                        <a-select-option value="1">水费</a-select-option>
                        <a-select-option value="2">电费</a-select-option>
                        <a-select-option value="3">燃气费</a-select-option>
                      </template>
                      <a-select-option v-for="item in costList" :key="item.id" :value="item.id">
                        {{ item.genre_name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || ((tabIndex ==0 || tabIndex == 4) && 16 || 24)" :sm="24">
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
      <a-card :bordered="false">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          class="table-box"
          :columns="columns"
          :data="loadTableData"
        >
          <template
            slot="tickets_sold"
            slot-scope="tickets_sold, record">
            <a v-if="tickets_sold > 0" :href="'/zht/film/film/orderlist?tabIndex=1&film_name='+encodeURI(record.film_name)" target="_parent">{{ tickets_sold }}</a>
            <span v-else>{{ tickets_sold }}</span>
            <!-- <a @click="goOrder(record)">{{ tickets_sold }}</a> -->
          </template>
          <template
            slot="ticket_price"
            slot-scope="ticket_price">
            ￥{{ ticket_price }}
          </template>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="look(record)">查看</a>
            </template>
          </span>
        </s-table>
      </a-card>
      <detail-info ref="info" :params="params" :modalShow.sync="infoShow"></detail-info>
    </div>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import { STable } from '@/components'
import { getBuildList, getUnitList, getBillMonth, getCostType, getPaymentList } from '@/api/property'
import detailInfo from './components/detailInfo'
const columns = [
  {
    title: '明细单号',
    dataIndex: 'id_no'
  },
  {
    title: '明细类型',
    dataIndex: 'bill_type_name'
  },
  {
    title: '费用类型',
    dataIndex: 'genre_type_name'
  },
  {
    title: '充缴金额',
    dataIndex: 'money'
  },
  {
    title: '余额',
    dataIndex: 'balance'
  },
  {
    title: '充缴方式',
    dataIndex: 'zf_type_name'
  },
  {
    title: '房产',
    dataIndex: 'house_property_name'
  },
  {
    title: '账单月份',
    dataIndex: 'project_month_name'
  },
  {
    title: '充缴时间',
    dataIndex: 'pay_time',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'paymentRecord',
  components: {
    STable,
    detailInfo
  },
  data () {
    this.columns = columns
    return {
      dataObj: '',
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '水费' },
        { key: '2', tab: '电费' },
        { key: '3', tab: '燃气费' },
        { key: '4', tab: '其他费用' }
      ],
      tabIndex: '0',
      publishDate: [], // 时间
      advanced: false, // 查询参数
      queryParam: {},
      params: {},
      infoShow: false, // 查看
      tzyeform: this.$form.createForm(this),
      houseList: [], // 楼栋
      unitList: [], // 单元
      monthList: [], // 账单月份
      costList: [] // 缴费类型
    }
  },
  mounted () {
    this.getCostType()
    this.getBuildList()
    this.getUnitList()
    this.getBillMonth()
  },
  methods: {
    // 楼栋
    getBuildList () {
      getBuildList().then(res => {
        this.houseList = res.data.list
      })
    },
    // 单元
    getUnitList () {
      getUnitList({ building_id: this.queryParam.building_id }).then(res => {
        this.unitList = res.data.list
      })
    },
    // 账单月份
    getBillMonth () {
      getBillMonth().then(res => {
        this.monthList = res.data.list.reverse()
      })
    },
    // 费用类型
    getCostType () {
      getCostType().then(res => {
        this.costList = res.data.list
      })
    },
    // 选择楼栋
    selectHouse () {
      delete this.queryParam.unit_id
      this.getUnitList()
    },
    // tab切换
    tabSelect (key) {
      this.tabIndex = key
      this.queryParam = {}
      this.queryParam.genre_type = key
      // this.queryParam.is_refund = key
      this.loadAllData()
    },
    getTime (dates, dateStrings) {
      this.publishDate = dates
      this.queryParam.start_time = dateStrings[0]
      this.queryParam.end_time = dateStrings[1] + ' 23:59:59'
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 查看
    look (item) {
      this.params = {
        pay_log_id: item.id,
        bill_type: item.bill_type,
        genre_id: item.genre_id
      }
      this.$nextTick(() => {
        this.$refs.info.getData()
      })
      this.infoShow = true
    },
    // 重置
    reSet () {
      this.queryParam = {}
      if (this.tabIndex > 0 && this.tabIndex < 5) {
        this.queryParam.genre_type = this.tabIndex
      }
      this.publishDate = []
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder) {
        page.sortOrder = page.sortOrder == 'ascend' ? 'asc' : 'desc'
      }
      const obj = Object.assign({}, this.queryParam)
      if (obj.genre_id > 0 && obj.genre_id < 4) {
        obj.genre_type = obj.genre_id
        delete obj.genre_id
      }
      const requestParameters = Object.assign({}, obj, page)
      console.log('loadData request parameters:', requestParameters)
      return getPaymentList(requestParameters)
        .then(res => {
          this.dataObj = res.tab_data
          return res
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../styles/Workplace.less";
.table-page-search-wrapper {
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
}
.ant-card {
  margin-bottom: 24px;
}
.ant-modal {
  .ant-descriptions-title {
    /deep/ & + .ant-descriptions-view {
      padding-left: 50px;
    }
  }
}
</style>
