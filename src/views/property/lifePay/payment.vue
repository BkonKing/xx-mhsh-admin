<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabIndex"
    :tab-change="tabSelect"
  >
    <template v-slot:extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="已充值(2000户)" :value="'￥10,000'" />
        </div>
        <div class="stat-item">
          <a-statistic title="已缴费(1000户)" :value="2223" />
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
                    :value="publishTime"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getTime"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="账单月份">
                  <a-select v-model="queryParam.saleflag" placeholder="请选择">
                    <!-- <a-select-option value="0">全部</a-select-option> -->
                    <a-select-option value="1">是</a-select-option>
                    <a-select-option value="2">否</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="充缴方式">
                    <a-select v-model="queryParam.saleflag" placeholder="请选择">
                      <!-- <a-select-option value="0">全部</a-select-option> -->
                      <a-select-option value="1">线上充缴--APP缴费、充值</a-select-option>
                      <a-select-option value="2">线下充缴--后台点“线下缴费”按钮、“线下充值”按钮</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="区域">
                    <div style="display: flex;">
                      <a-select v-model="queryParam.show" placeholder="楼栋" default-value="0" style="margin-right: 15px">
                        <a-select-option value="1">11</a-select-option>
                        <a-select-option value="2">22</a-select-option>
                      </a-select>
                      <a-select v-model="queryParam.show" placeholder="楼栋" default-value="0">
                        <a-select-option value="1">11</a-select-option>
                        <a-select-option value="2">22</a-select-option>
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
                    <a-select v-model="queryParam.show" placeholder="请选择" default-value="0">
                      <!-- <a-select-option value="0">全部</a-select-option> -->
                      <a-select-option value="1">充值</a-select-option>
                      <a-select-option value="2">缴费</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="费用类型">
                    <a-select v-model="queryParam.saleflag" placeholder="请选择">
                      <!-- <a-select-option value="0">全部</a-select-option> -->
                      <a-select-option value="1">水费</a-select-option>
                      <a-select-option value="2">电费</a-select-option>
                    </a-select>
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
      <a-card :bordered="false" title="充缴明细">
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          class="table-box"
          :columns="columns"
          :data="loadTableData"
        >
          <span slot="look">实际想看
            <a-popover overlayClassName="popover-toast">
              <template slot="content">
                APP用户的想看
              </template>
              <a-icon type="exclamation-circle" />
            </a-popover>
          </span>
          <span slot="sellNum">已售票数
            <a-popover overlayClassName="popover-toast">
              <template slot="content">
                已购买成功的座位票张数
              </template>
              <a-icon type="exclamation-circle" />
            </a-popover>
          </span>
          <template
            slot="hot"
            slot-scope="is_shown">
            {{ is_shown == 1 ? '热映' : '待映' }}
          </template>
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
          <span slot="action" slot-scope="record">
            <template>
              <a @click="look(record)">查看</a>
            </template>
          </span>
        </s-table>
      </a-card>
      <detail-info :modalShow.sync="infoShow"></detail-info>
    </div>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import { STable } from '@/components'
import { getFilmList } from '@/api/movie'
import detailInfo from './components/detailInfo'
const columns = [
  {
    title: '明细单号',
    dataIndex: 'film_id'
  },
  {
    title: '明细类型',
    dataIndex: 'film_name2'
  },
  {
    title: '费用类型',
    dataIndex: 'is_shown',
    scopedSlots: { customRender: 'hot' }
  },
  {
    title: '充缴金额',
    dataIndex: 'film_name3'
  },
  {
    title: '余额',
    dataIndex: 'film_name4'
  },
  {
    title: '充缴方式',
    dataIndex: 'film_name5'
  },
  {
    title: '充缴用户',
    dataIndex: 'film_name6'
  },
  {
    title: '账单月份',
    dataIndex: 'film_name7'
  },
  {
    title: '充缴时间',
    dataIndex: 'film_name8',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
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
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '水费' },
        { key: '2', tab: '电费' },
        { key: '3', tab: '燃气费' },
        { key: '4', tab: '其他费用' }
      ],
      tabIndex: '0',
      publishTime: [], // 时间
      advanced: false, // 查询参数
      queryParam: {},
      infoShow: false, // 查看
      tzyeform: this.$form.createForm(this)
    }
  },
  methods: {
    // tab切换
    tabSelect (key) {
      this.tabIndex = key
      this.queryParam = {}
      // this.queryParam.is_refund = key
      this.loadAllData()
    },
    getTime (dates, dateStrings) {
      this.publishTime = dates
      this.queryParam.publish_date = dateStrings[0] + '~' + dateStrings[1]
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.publishTime = []
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder && page.sortField) {
        if (page.sortField == 'score' && page.sortOrder == 'ascend') {
          // 升序
        } else {
          // 降序
        }
        if (page.sortField == 'actual_account' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'want_view' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'tickets_sold' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'ticket_price' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'publish_date' && page.sortOrder == 'ascend') {
        } else {}
      }
      const requestParameters = Object.assign({}, this.queryParam, page)
        console.log('loadData request parameters:', requestParameters)
        return getFilmList(requestParameters)
          .then(res => {
            console.log(res.data)
            return res
          })
    },
    // 表单提交-调整余额
    tzyeSubmit (e) {
      e.preventDefault()
      this.tzyeform.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    // 查看
    look () {
      this.infoShow = true
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
