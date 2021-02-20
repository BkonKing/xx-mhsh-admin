<template>
  <div>
    <headerTabs
    @tabCall="tabSelect"
    :tabList="tabList">
    </headerTabs>
    <a-card :bordered="false">
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
              <a-form-model-item label="退款时间">
                <a-range-picker
                  showTime
                  class="piker-time"
                  :placeholder="['开始时间', '结束时间']"
                  format="YYYY-MM-DD"
                  @change="getRefundTime"
                />
              </a-form-model-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="搜索">
                  <a-input v-model="queryParam.search" placeholder="手机号、订单编号、取票号、影片" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="申请时间">
                  <a-range-picker
                    showTime
                    class="piker-time"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getApplyTime"
                  />
                </a-form-model-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 16" :sm="24">
              <span class="table-page-search-submitButtons" style="float: right; overflow: hidden">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
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
      <div class="table-operator">
        <a-button type="default" @click="pltkClick">批量退款</a-button>
        <a-button type="default" @click="cztxClick">充值提醒</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="order_id"
        :columns="columns"
        :data="loadTableData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="status" slot-scope="refund_status, record">
          <a-badge :status="refund_status | statusTypeFilter" :text="record.refund_desc"/>
        </span>
        <!-- <span slot="description" slot-scope="text">
          {{ text }}
        </span> -->

        <span slot="operation" slot-scope="text, record">
          <template>
            <a @click="goDetail(record)">查看</a>
            <a-divider type="vertical" />
            <a v-if="record.refund_status == 0" @click="handleSub(record)">退款</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal
      title="批量退款"
      :visible="pltkShow"
      @ok="pltkSure"
      @cancel="pltkShow = false"
    >
      <div class="ant-alert ant-alert-info" style="margin-bottom: 20px">
        <a-icon class="ant-alert-icon" type="exclamation-circle" />
        <span>已选择 <span class="color-1890FF">{{ pltkData.count }}</span> 项</span>
      </div>
      <div>
        <p>申请金额： <span>￥{{ pltkData.sum_price }}（￥{{ pltkData.rmb_price }} + 幸福币{{ pltkData.hapiness }}）</span></p>
        <p>退款金额： <span class="color-F5222D">￥{{ pltkData.refund_price }}（￥{{ pltkData.refund_rmbprice }} + 幸福币{{ pltkData.refund_hapiness }}）</span></p>
      </div>
    </a-modal>
    <a-modal
      title="充值提醒"
      :visible="cztxShow"
      class="cztx-modal"
      @ok="czSure"
      @cancel="cztxShow = false"
    >
      <a-form layout="inline">
        <a-row :gutter="48">
            <a-col :md="24" :sm="24">
              <a-col :md="24" :sm="24">
                <a-form-model-item class="flex" label="手机号" help="通知人手机号">
                  <a-input type="Number" v-model.trim="mobile" max="11" style="width: 100%" />
                </a-form-model-item>
              </a-col>
            </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import headerTabs from './components/headerTabs'
import { STable } from '@/components'
import { getProductList, getRefundList, sendRemindTel, getRefundTotal, sendBatchRefund } from '@/api/movie'
const columns = [
  {
    title: '退款编号',
    dataIndex: 'returnfund_numb'
  },
  {
    title: '退款状态',
    dataIndex: 'refund_status',
    scopedSlots: { customRender: 'status' }
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
    title: '支付金额',
    dataIndex: 'pay_price'
  },
  {
    title: '申请时间',
    dataIndex: 'ctime',
    sorter: true
  },
  {
    title: '退款时间',
    dataIndex: 'htime',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
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
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '退款中' },
        { key: '2', tab: '已退款' }
      ],
      productList: [],
      // 高级搜索 展开/关闭
      advanced: true,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      selectedRows: [],
      // tipShow: true,
      // 充值提醒
      cztxShow: false,
      // 批量退款
      pltkShow: false,
      pltkData: '',
      mobile: '' // 手机号
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   const requestParameters = Object.assign({}, parameter, this.queryParam)
      //   console.log('loadData request parameters:', requestParameters)
      //   return getRefundList(requestParameters)
      //     .then(res => {
      //       console.log(res.result)
      //       return res.result
      //     })
      // }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  created () {
    console.log(moment())
    getProductList().then(res => {
      this.productList = res.data
    })
  },
  methods: {
    // tab切换
    tabSelect (key) {
      this.queryParam = {}
      this.queryParam.is_refund = key
      this.loadAllData()
    },
    // 时间
    getRefundTime (dates, dateStrings) {
      this.queryParam.refund_time = dateStrings[0] + '~' + dateStrings[1]
    },
    // 时间
    getApplyTime (dates, dateStrings) {
      this.queryParam.apply_time = dateStrings[0] + '~' + dateStrings[1]
    },
    // 搜索收起/展开
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 充值提醒
    czSure () {
      if (!this.mobile) {
        this.$message.warning('请输入正确的手机号')
        return
      }
      sendRemindTel({ mobile: this.mobile }).then(res => {
        this.cztxShow = false
      })
    },
    onSubmit () {},
    // 表格选中行
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder && page.sortField) {
        if (page.sortField == 'ctime') {
          page.pay_sort = page.sortOrder == 'ascend' ? 1 : 2
          page.order_sort = ''
        }
        if (page.sortField == 'htime') {
          page.order_sort = page.sortOrder == 'ascend' ? 1 : 2
          page.pay_sort = ''
        }
      }
      const requestParameters = Object.assign({}, this.queryParam, page)
        console.log('loadData request parameters:', requestParameters)
        return getRefundList(requestParameters)
          .then(res => {
            console.log(res.data)
            return res
          })
    },
    // 充值提醒
    cztxClick () {
      this.cztxShow = true
    },
    // 批量退款
    pltkClick () {
      console.log(111, this.selectedRowKeys)
      if (this.selectedRowKeys.length < 1) {
        this.$message.warning('请先选择要退款的申请')
      } else {
        getRefundTotal({ order_id: this.selectedRowKeys.join(',') }).then(res => {
          console.log(res)
          this.pltkData = res.data
          this.pltkShow = true
        })
      }
    },
    // 批量退款提交
    pltkSure () {
      sendBatchRefund({ order_id: this.selectedRowKeys.join(',') }).then(res => {
        if (res.success) {
            this.pltkShow = false
            this.loadAllData()
            if (this.selectedRowKeys.length == 1) {
              this.$message.success(res.message)
            } else {
              this.modalSuccess('退款成功', res.message)
            }
        } else {
          if (res.type == 1) {
            if (this.selectedRowKeys.length == 1) {
              this.modalError('退款失败', '请重试')
            } else {
              this.modalError('退款失败', res.message)
            }
          } else if (res.type == 3) {
            this.modalWarning('余额不足', '账户余额不足，请先充值')
          }
        }
      }).catch(res => {
      })
    },
    modalSuccess (title, content) {
      this.$success({
        okText: '确定',
        title: title,
        content: content
      })
    },
    modalError (title, content) {
      this.$error({
        title: title,
        content: content
      })
    },
    modalWarning (title, content) {
      this.$warning({
        title: title,
        content: content
      })
    },
    goDetail (item) {
      this.$router.push({
        path: '/movie/refundDetail',
        query: {
          order_id: item.order_id
        }
      })
    }
  },
  filters: {
    statusTypeFilter (type) {
      return type === 0 ? 'processing' : 'success'
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
.cztx-modal {
  .ant-form-item.flex {
    display: flex;
    .ant-form-item-control-wrapper {
      flex-grow: 1;
    }
  }
}
</style>
