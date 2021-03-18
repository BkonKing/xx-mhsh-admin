<template>
  <page-header-wrapper>
    <div>
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="催缴时间" prop="releaseDate">
                  <a-range-picker
                    showTime
                    class="piker-time"
                    :value="publicTime"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getTime"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="缴费状态">
                  <a-select v-model="queryParam.order_status" placeholder="请选择">
                    <!-- <a-select-option value="0">全部</a-select-option> -->
                    <a-select-option value="1">是</a-select-option>
                    <a-select-option value="2">否</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="账单月份">
                    <a-select v-model="queryParam.month_id" placeholder="请选择">
                      <a-select-option v-for="item in monthList" :key="item.id" :value="item.id">
                        {{ item.setmeal_days }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="区域">
                    <div style="display: flex;">
                      <a-select @change="selectHouse" v-model="queryParam.building_id" placeholder="楼栋" default-value="0" style="margin-right: 15px">
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
                  <a-form-model-item label="房屋">
                    <a-input v-model="queryParam.house_name" placeholder="请输入" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="搜索">
                    <a-input v-model="queryParam.search" placeholder="户号、业主姓名/电话" style="width: 100%" />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="缴费次数">
                    <a-select v-model="queryParam.num_type" placeholder="请选择">
                      <!-- <a-select-option value="0">全部</a-select-option> -->
                      <a-select-option value="1">1</a-select-option>
                      <a-select-option value="2">2~4</a-select-option>
                      <a-select-option value="3">5~10</a-select-option>
                      <a-select-option value="4">>10</a-select-option>
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
      <a-card>
        <div class="table-operator">
          <a-button type="primary" :disabled="selectedRowKeys.length ? false : true" @click="pltkSure">再次催缴</a-button>
        </div>
        <s-table
          ref="table"
          size="default"
          rowKey="order_id"
          :columns="columns"
          :data="loadTableData"
          :alert="options.alert"
          :rowSelection="rowSelection"
          showPagination="auto"
        >
          <span slot="status" slot-scope="refund_status, record">
            <a-badge :status="refund_status | statusTypeFilter" :text="record.refund_desc"/>
          </span>
          <span slot="price" slot-scope="pay_price, record">
            {{ '￥' + pay_price +' (￥'+ record.rmb_price + ' + 币' + record.happiness + ')' }}
          </span>

          <span slot="operation" slot-scope="text, record">
            <template>
              <a v-if="record.refund_status == 0" @click="handleSub(record)">催缴</a>
              <a v-else disabled>催缴</a>
            </template>
          </span>
        </s-table>
      </a-card>
      <a-modal
        title="批量退款"
        :visible="pltkShow"
        @ok="pltkSure('')"
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
    </div>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getBuildList, getUnitList, getCallpayList, sendBatchRefund } from '@/api/property'
const columns = [
  {
    title: '催缴时间',
    dataIndex: 'returnfund_numb'
  },
  {
    title: '催缴次数',
    dataIndex: 'refund_status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '缴费状态',
    dataIndex: 'project_name'
  },
  {
    title: '账单月份',
    dataIndex: 'mobile'
  },
  {
    title: '房产',
    dataIndex: 'pay_price',
    scopedSlots: { customRender: 'price' }
  },
  {
    title: '类型',
    dataIndex: 'ctime',
    sorter: true
  },
  {
    title: '金额',
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
  name: 'callpayRecord',
  components: {
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
      monthList: [], // 账单月份
      houseList: [], // 楼栋
      unitList: [], // 单元
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      selectedRowKeys: [],
      selectedRows: [],
      // tipShow: true,
      // 批量退款
      pltkShow: false,
      pltkData: '',
      mobile: '', // 手机号
      publicTime: ['', ''],
      options: {
        alert: {
          show: true
        }
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        getCheckboxProps: record => ({
          props: {
            disabled: record.refund_status > 0
          }
        }),
        onChange: this.onSelectChange
      }
    }
  },
  mounted () {
    this.getBuildList()
    this.getUnitList()
  },
  created () {
    console.log(moment())
    // getCallpayList().then(res => {
    //   this.productList = res.data
    // })
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
    // 选择楼栋
    selectHouse () {
      delete this.queryParam.unit_id
      this.getUnitList()
    },
    // tab切换
    tabSelect (key) {
      this.queryParam = {}
      this.queryParam.is_refund = key
      this.loadAllData()
    },
    // 时间
    getTime (dates, dateStrings) {
      console.log(dates, dateStrings)
      this.publicTime = dates
      this.queryParam.start_time = dateStrings[0]
      this.queryParam.end_time = dateStrings[1]
    },
    // 搜索收起/展开
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.publicTime = []
    },
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

      }
      const requestParameters = Object.assign({}, this.queryParam, page)
        console.log('loadData request parameters:', requestParameters)
        return getCallpayList(requestParameters)
          .then(res => {
            this.monthList = res.month_list
            console.log('res.data', res.data)
            return res
          })
    },
    // 单个退款
    handleSub (item) {
      this.pltkSure(item.order_id)
    },
    // 批量退款提交
    pltkSure (orderId) {
      let paramId = this.selectedRowKeys.join(',')
      if (orderId) {
        paramId = orderId
      }
      sendBatchRefund({ order_id: paramId }).then(res => {
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
