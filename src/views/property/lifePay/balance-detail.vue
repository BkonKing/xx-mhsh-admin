<template>
  <page-header-wrapper>
    <div>
      <a-card style="margin-top: 24px" :bordered="false" title="基础信息">
        <a-descriptions v-if="infoData.data">
          <a-descriptions-item label="房产">{{ infoData.data.house_property_name }}</a-descriptions-item>
          <a-descriptions-item label="业主" span="2"><a :href="`/xmht/household/member/getMemberList?uid=${infoData.data.uid}`" target="_parent">{{ infoData.data.realname + ' ' + infoData.data.mobile }}</a></a-descriptions-item>
          <a-descriptions-item label="水费" v-if="infoData.data.w_account_numb || infoData.data.w_surface"><template v-if="infoData.data.w_account_numb">户号{{ infoData.data.w_account_numb }}</template> <template v-if="infoData.data.w_surface">表号{{ infoData.data.w_surface }}</template></a-descriptions-item>
          <a-descriptions-item label="电费" v-if="infoData.data.e_account_numb || infoData.data.e_surface"><template v-if="infoData.data.e_account_numb">户号{{ infoData.data.e_account_numb }}</template> <template v-if="infoData.data.e_surface">表号{{ infoData.data.e_surface }}</template></a-descriptions-item>
          <a-descriptions-item label="燃气费" v-if="infoData.data.g_account_numb || infoData.data.g_surface"><template v-if="infoData.data.g_account_numb">户号{{ infoData.data.g_account_numb }}</template> <template v-if="infoData.data.g_surface">表号{{ infoData.data.g_surface }}</template></a-descriptions-item>
        </a-descriptions>
        <a-card v-if="infoData.data" :bordered="true">
          <a-row>
            <a-col v-if="payStatu[0]" :sm="cloSm" :xs="12">
              <div class="header-info">
                <span>水费余额</span>
                <p>
                  <span :class="[infoData.data.w_money < 0 ? 'color-red' : '']">￥{{ infoData.data.w_money }}</span>
                  <template v-if="infoData.data.w_qf_money > 0">（<span class="color-red">-{{ infoData.data.w_qf_money }}</span>）</template>
                </p>
                <div>
                  <a @click="tzyeModal(1)">调整</a>
                  <a @click="investModal(1)">充值</a>
                </div>
              </div>
            </a-col>
            <a-col v-if="payStatu[1]" :sm="cloSm" :xs="12">
              <div class="header-info">
                <span>电费余额</span>
                <p>
                  <span :class="[infoData.data.e_money < 0 ? 'color-red' : '']">￥{{ infoData.data.e_money }}</span>
                  <template v-if="infoData.data.e_qf_money > 0">（<span class="color-red">-{{ infoData.data.e_qf_money }}</span>）</template>
                </p>
                <div>
                  <a @click="tzyeModal(2)">调整</a>
                  <a @click="investModal(2)">充值</a>
                </div>
              </div>
            </a-col>
            <a-col v-if="payStatu[2]" :sm="cloSm" :xs="12">
              <div class="header-info">
                <span>燃气费余额</span>
                <p>
                  <span :class="[infoData.data.g_money < 0 ? 'color-red' : '']">￥{{ infoData.data.g_money }}</span>
                  <template v-if="infoData.data.g_qf_money > 0">（<span class="color-red">-{{ infoData.data.g_qf_money }}</span>）</template>
                </p>
                <div>
                  <a @click="tzyeModal(3)">调整</a>
                  <a @click="investModal(3)">充值</a>
                </div>
              </div>
            </a-col>
            <a-col v-if="payStatu[3]" :sm="cloSm" :xs="12">
              <div class="header-info">
                <span>其他费用余额</span>
                <p>
                  <span :class="[infoData.data.o_money < 0 ? 'color-red' : '']">￥{{ infoData.data.o_money }}</span>
                  <template v-if="infoData.data.q_qf_money > 0">（<span class="color-red">-{{ infoData.data.q_qf_money }}</span>）</template>
                </p>
                <div>
                  <a @click="tzyeModal(4)">调整</a>
                  <a @click="investModal(4)">充值</a>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-card>
      <a-card :bordered="false" title="充缴明细">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="明细类型">
                  <a-select v-model="queryParam.bill_type" placeholder="请选择" default-value="0">
                    <a-select-option value="1">充值</a-select-option>
                    <a-select-option value="2">缴费</a-select-option>
                    <a-select-option value="3">调整</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="账单月份">
                  <a-select v-model="queryParam.project_month_id" placeholder="请选择">
                    <a-select-option v-for="(item, index) in infoData.month_list" :key="index" :value="item.id">{{ item.setmeal_days }}</a-select-option>
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
                  <a-form-model-item label="费用类型">
                    <a-select v-model="queryParam.genre_id" placeholder="请选择">
                      <a-select-option v-for="(item, index) in infoData.genre_data" :key="index" :value="index">{{ item }}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="时间" prop="releaseDate">
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
              </template>
              <a-col :md="!advanced && 8 || 8" :sm="24">
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
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          class="table-box"
          :columns="columns"
          :data="loadTableData"
        >
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="look(record)">查看</a>
            </template>
          </span>
        </s-table>
      </a-card>
      <a-card style="margin-top: 24px" :bordered="false" title="操作日志">
        <div slot="extra" class="extra-wrapper">
          <a-input-search v-model="search" @search="$refs.logtable.refresh(true)" style="margin-left: 16px; width: 272px;" />
        </div>
        <s-table
          ref="logtable"
          size="default"
          rowKey="id"
          class="table-box"
          :columns="operationColumns"
          :data="loadLogTableData"
        >
          <template
            slot="status"
            slot-scope="is_success, record">
            <a-badge :status="is_success | statusTypeFilter" :text="record.is_success_name"/>
          </template>
        </s-table>
      </a-card>
      <a-modal
        :title="`调整余额-${adjustmentInfo.genre_type_name}`"
        :visible="tzyeShow"
        okText="调整"
        @ok="tzyeSubmit"
        @cancel="tzyeShow = false"
      >
        <a-form
          :labelCol="{lg: {span: 5}, sm: {span: 5}}"
          :wrapperCol="{lg: {span: 18}, sm: {span: 18} }"
          @submit="tzyeSubmit"
          :form="tzyeform">
          <a-form-item
            label="房产"
            >
            <span>{{ adjustmentInfo.house_property_name + ' ' + adjustmentInfo.realname }}</span>
          </a-form-item>
          <a-form-item label="当前余额" >
            <span>{{ adjustmentInfo.balance | NumberFormat }}元</span>
          </a-form-item>
          <a-form-item class="money-item" label="调整余额" extra="最终余额">
            <span class="ant-input-group-addon">￥</span>
            <a-input-number
              addonBefore="￥"
              v-decorator="[
                'money',
                {rules: [{ required: true, message: '请输入调整余额' }]}
              ]"
              name="money"
              placeholder="请输入" />
          </a-form-item>
          <a-form-item class="reason-area" label="原因说明" :extra="((tzyeform.getFieldValue('adjust') && tzyeform.getFieldValue('adjust').length) || 0) + '/200'">
            <a-textarea
              rows="3"
              maxlength="200"
              placeholder="请输入"
              v-decorator="[
                'adjust',
                {rules: [{ required: true, message: '请输入原因说明' }]}
              ]" />
              <!-- <span>{{ tzyeform.getFieldValue('adjust') && tzyeform.getFieldValue('adjust').length || 0 }}</span> -->
          </a-form-item>
        </a-form>
      </a-modal>
      <recharge-money ref="recharge" :params="czparams" :modalShow.sync="rechargeShow" @rechargeCall="rechargeCall"></recharge-money>
      <detail-info ref="info" :params="ckparams" :modalShow.sync="infoShow"></detail-info>
    </div>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import { STable } from '@/components'
import { getBasisInfo, getDetailList, getBalanceLogsList, getAdjustmentInfo, submitAdjustment, getPayType } from '@/api/property'
import rechargeMoney from './components/rechargeMoney'
import detailInfo from './components/detailInfo'
const columns = [
  {
    title: '明细单号',
    dataIndex: 'id'
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
    title: '充缴用户',
    dataIndex: 'cj_name'
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
const operationColumns = [
  {
    title: '操作类型',
    dataIndex: 'type_name',
    key: 'type_desc'
  },
  {
    title: '操作员',
    dataIndex: 'admin_name'
  },
  {
    title: '执行结果',
    dataIndex: 'is_success',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作时间',
    dataIndex: 'ctime'
  },
  // {
  //   title: '耗时',
  //   dataIndex: 'end_time',
  //   scopedSlots: { customRender: 'opt_usetime' }
  // },
  {
    title: '操作说明',
    dataIndex: 'explain_text'
  }
]
export default {
  name: 'balanceDetail',
  components: {
    STable,
    rechargeMoney,
    detailInfo
  },
  data () {
    this.columns = columns
    this.operationColumns = operationColumns
    return {
      houseId: '',
      payStatu: '',
      cloSm: 6,
      infoData: '',
      search: '',
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {}, // 查询参数
      publishDate: [], // 时间
      czparams: {},
      ckparams: {},
      rechargeShow: false, // 充值余额弹窗
      infoShow: false, // 查看
      tzyeShow: false, // 调整余额
      nowType: '',
      adjustmentInfo: '', // 调整余额数据
      tzyeform: this.$form.createForm(this)
    }
  },
  created () {
    this.houseId = this.$route.query.houseId
  },
  mounted () {
    this.getData()
    this.getPayType()
  },
  methods: {
    getData () {
      getBasisInfo({ expenses_house_id: this.houseId }).then(res => {
        this.infoData = res
      })
    },
    // 缴费状态
    getPayType () {
      getPayType().then(res => {
        const arr = []
        let showLength = 0
        for (const key in res.data) {
          arr.push(res.data[key])
          if (res.data[key]) {
            showLength++
          }
        }
        switch (showLength) {
          case 0:
            this.cloSm = 0
            break
          case 1:
            this.cloSm = 24
            break
          case 2:
            this.cloSm = 12
            break
          case 3:
            this.cloSm = 8
            break
          case 4:
            this.cloSm = 6
            break
        }
        this.payStatu = arr
      })
    },
    // 充值成功回调
    rechargeCall () {
      this.getData()
      this.$refs.table.refresh(true)
      this.$refs.logtable.refresh(true)
    },
    // 日志
    // getLogList () {
    //   getLogList({ expenses_house_id: this.houseId, search: this.search }).then(res => {
    //     console.log(res)
    //     this.logData = res.data.list
    //   })
    // },
    getTime (dates, dateStrings) {
      this.publishDate = dates
      this.queryParam.start_time = dateStrings[0]
      this.queryParam.end_time = dateStrings[1] + ' 23:59:59'
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 调整
    tzyeModal (type) {
      this.nowType = type
      this.tzyeform.resetFields()
      getAdjustmentInfo({ genre_type: type, expenses_house_id: this.houseId }).then(res => {
        this.adjustmentInfo = res.data
        this.tzyeShow = true
      })
    },
    // 充值
    investModal (id) {
      this.czparams = {
        genre_type: id,
        expenses_house_id: this.houseId
      }
      this.$nextTick(() => {
        this.$refs.recharge.getData()
      })
      this.rechargeShow = true
    },
    // 表单提交-调整余额
    tzyeSubmit (e) {
      e.preventDefault()
      this.tzyeform.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          submitAdjustment(Object.assign({ expenses_house_id: this.houseId, genre_type: this.nowType }, values)).then(res => {
            this.$message.success(res.message)
            this.tzyeShow = false
            this.getData()
            this.$refs.table.refresh(true)
          })
        }
      })
    },
    // 查看
    look (item) {
      this.ckparams = {
        pay_log_id: item.id,
        bill_type: item.bill_type
      }
      this.$nextTick(() => {
        this.$refs.info.getData()
      })
      this.infoShow = true
    },
    // 重置
    reSet () {
      this.queryParam = {}
      this.publishDate = []
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder) {
        page.sortOrder = page.sortOrder == 'ascend' ? 'asc' : 'desc'
      }
      const requestParameters = Object.assign({}, { expenses_house_id: this.houseId }, this.queryParam, page)
        console.log('loadData request parameters:', requestParameters)
        return getDetailList(requestParameters)
          .then(res => {
            return res
          })
    },
    loadLogTableData (page) {
      const requestParameters = Object.assign({}, { expenses_house_id: this.houseId, search: this.search }, page)
        console.log('loadData request parameters:', requestParameters)
        return getBalanceLogsList(requestParameters)
          .then(res => {
            return res
          })
    }
  },
  filters: {
    statusTypeFilter (type) {
      const statusTypeMap = {
        1: 'success',
        0: 'error'
      }
      return statusTypeMap[type]
    }
  }
}
</script>

<style lang="less" scoped>
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

.header-info {
  position: relative;
  text-align: center;
  & > span {
    display: inline-block;
    margin-bottom: 8px;
    color: @text-color-secondary;
    font-size: @font-size-base;
    line-height: 22px;
  }
  & > p {
    margin: 0;
    color: @heading-color;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 8px;
  }
  & > div {
    line-height: 22px;
    a:first-child {
      margin-right: 10px;
    }
  }
  & > em {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 56px;
    background-color: #e8e8e8;
  }
}
.reason-area {
  /deep/ .ant-form-extra {
    text-align: right;
  }
}
.money-item {
  .ant-input-number {
    width: 100%;
  }
  /deep/ span.ant-form-item-children {
    display: flex;
    .ant-input-group-addon {
      width: 37px;
      height: 32px;
      line-height: 30px;
    }
  }
}
</style>
