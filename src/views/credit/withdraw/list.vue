<template>
  <page-header-view
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <template v-slot:extraContent>
      <div class="status-list">
        <div>
          <div class="text">待审核</div>
          <div class="heading">
            {{
              statisticsData.to_be_reviewed
                ? `￥${statisticsData.to_be_reviewed}`
                : "--"
            }}
          </div>
        </div>
        <div>
          <div class="text">待打款</div>
          <div class="heading">
            {{
              statisticsData.to_be_paid
                ? `￥${statisticsData.to_be_paid}`
                : "--"
            }}
          </div>
        </div>
        <div>
          <div class="text">已提现</div>
          <div class="heading">
            {{ statisticsData.paid ? `￥${statisticsData.paid}` : "--" }}
          </div>
        </div>
      </div>
    </template>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="提现状态">
                <a-select
                  v-model="queryParam.cash_status"
                  placeholder="请选择"
                  :disabled="!!tabActiveKey"
                >
                  <a-select-option
                    v-for="item in cashStatus"
                    :key="item.key"
                    :value="item.key"
                    >{{ item.tab }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="账户类型">
                <a-select
                  v-model="queryParam.account_type"
                  placeholder="请选择"
                >
                  <a-select-option value="2">商家用户</a-select-option>
                  <a-select-option value="1">项目账户</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="提现用户">
                <a-input
                  v-model="queryParam.cash_user"
                  placeholder="昵称、姓名、手机号、银行卡号"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="提现项目">
                <a-select
                  v-model="queryParam.cash_project"
                  show-search
                  :filter-option="filterOption"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in accountProjects"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.account }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-if="isParentProject" :md="8" :sm="24">
              <a-form-item label="店铺归属">
                <a-select
                  v-model="queryParam.shops_project"
                  show-search
                  :filter-option="filterOption"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="item in projectOptions"
                    :key="item.project_id"
                    :value="item.project_id"
                    >{{ item.project_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-if="advanced || !isParentProject" :md="8" :sm="24">
              <a-form-item label="店铺名称">
                <a-input
                  v-model="queryParam.shops_name"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="申请时间">
                  <a-range-picker
                    v-model="queryParam.applyTime"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="到账时间">
                  <a-range-picker
                    v-model="queryParam.arrivalTime"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
            </template>
            <advanced-form
              v-model="advanced"
              :md="isParentProject ? 8 : 16"
              @reset="resetTable"
              @search="refreshTable(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="addApplication">
          新增申请
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchCheck()">
              通过
            </a-menu-item>
            <a-menu-item key="3" @click="batchCheck(2)">
              拒绝
            </a-menu-item>
            <a-menu-item key="2" @click="batchOperation">
              已打款
            </a-menu-item>
          </a-menu>
          <a-button> 批量操作 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="{ clear: true }"
        :rowSelection="rowSelection"
        :rowSelectionPaging="true"
        :showPagination="true"
      >
        <template v-slot:timeWait="text, row">
          <Timewait
            v-if="+row.status < 4 && text"
            :time="
              (new Date(+text * 1000).getTime() - new Date().getTime()) / 1000
            "
            :delay="1000"
            :showSecond="true"
            :key="new Date().getTime()"
            upClass="color-red"
          ></Timewait>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <router-link :to="`/credit/withdraw/detail?id=${record.id}`"
            >查看</router-link
          >
          <a v-if="+record.check_button" @click="openCheck([record.id], 1)"
            >审核</a
          >
          <a v-if="+record.payment_button && isParentProject" @click="openCheck([record.id], 2)"
            >已打款</a
          >
        </span>
      </s-table>
    </a-card>
    <application-form-modal
      v-model="editVisible"
      ref="add-form"
      @submit="refreshTable"
    ></application-form-modal>
    <check-form-modal
      v-model="checkVisible"
      :data="selectIds"
      :info="checkData"
      :check-type="checkType"
      @success="submitSuccess"
    ></check-form-modal>
    <pay-form-modal
      v-model="payVisible"
      :data="selectIds"
      :info="checkData"
      @success="submitSuccess"
    ></pay-form-modal>
  </page-header-view>
</template>

<script>
// /credit/withdraw/list
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { STable, AdvancedForm, Timewait } from '@/components'
import CheckFormModal from './components/CheckFormModal'
import PayFormModal from './components/PayFormModal'
import ApplicationFormModal from './components/ApplicationFormModal'
import { getProjectList } from '@/api/userManage/business'
import {
  getAccount,
  getCashList,
  getCheckAndPayInfo
} from '@/api/credit/withdraw'

export default {
  name: 'withdrawList',
  components: {
    AdvancedForm,
    STable,
    Timewait,
    CheckFormModal,
    PayFormModal,
    ApplicationFormModal
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      editForm: false,
      advanced: false,
      // 查询参数
      queryParam: {
        cash_status: undefined
      },
      columns: [
        {
          title: '提现状态',
          dataIndex: 'cash_status_desc'
        },
        {
          title: '审核时间',
          dataIndex: 'process_time',
          scopedSlots: { customRender: 'timeWait' }
        },
        {
          title: '提现单号',
          dataIndex: 'cashout_numb'
        },
        {
          title: '提现幸福币',
          dataIndex: 'credits',
          sorter: true
        },
        {
          title: '提现人民币',
          dataIndex: 'credits_sub',
          sorter: true,
          customRender (text) {
            return `￥${text}`
          }
        },
        {
          title: '申请人',
          dataIndex: 'realname',
          customRender: (text, row) => {
            const { user_type: userType } = row
            if (+userType === 1) {
              return (<div><div>{text}</div>
                <div>{row.mobile}</div></div>)
            } else {
              return (
                <a
                  href={`${this.userUrl}?uid=${row.uid}&isShop=1`}
                  target="_blank"
                >
                  <div>{text}</div>
                  <div>{row.mobile}</div>
                </a>
              )
            }
          }
        },
        {
          title: '申请时间',
          dataIndex: 'ctime',
          sorter: true,
          customRender (text) {
            return text || '--'
          }
        },
        {
          title: '到账时间',
          dataIndex: 'payment_time',
          sorter: true,
          customRender (text) {
            return text || '--'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '116px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const sortText = {
          ascend: 'asc',
          descend: 'desc'
        }
        const params = cloneDeep(this.queryParam)
        params.order_field = parameter.sortField
        params.sort_value = sortText[parameter.sortOrder]
        const applyTime = params.applyTime
        if (applyTime && applyTime.length) {
          params.apply_time = `${applyTime[0]}~${applyTime[1]}`
        }
        const arrivalTime = params.arrivalTime
        if (arrivalTime && arrivalTime.length) {
          params.arrival_time = `${arrivalTime[0]}~${arrivalTime[1]}`
        }
        return getCashList({ ...parameter, ...params }).then(res => {
          const { list, ...statisticsData } = res.data
          this.statisticsData = statisticsData || {}
          return res
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      accountProjects: [],
      projectOptions: [],
      permissionVisible: false,
      powerForm: {
        power: []
      },
      cashStatus: [
        { key: '1', tab: '项目审核' },
        { key: '2', tab: '总部审核' },
        { key: '3', tab: '待打款' },
        { key: '4', tab: '已打款' },
        { key: '5', tab: '已拒绝' }
      ],
      statisticsData: {},
      tabActiveKey: '',
      editVisible: false,
      checkVisible: false,
      payVisible: false,
      checkData: {},
      checkType: 0,
      selectIds: [],
      remitVisible: false
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    userUrl () {
      return this.isParentProject
        ? '/zht/user/user/getUserList'
        : '/xmht/household/member/getMemberList'
    },
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    },
    tabList () {
      const {
        project_audit_count: projectCount,
        headquarters_audit_count: hCount,
        payment_tobepaid_count: unPaidCount
      } = this.statisticsData
      return [
        { key: '', tab: '全部' },
        { key: '1', tab: `项目审核${projectCount ? `(${projectCount})` : ''}` },
        { key: '2', tab: `总部审核${hCount ? `(${hCount})` : ''}` },
        { key: '3', tab: `待打款${unPaidCount ? `(${unPaidCount})` : ''}` },
        { key: '4', tab: '已打款' },
        { key: '5', tab: '已拒绝' }
      ]
    }
  },
  created () {
    this.initOptions()
  },
  methods: {
    initOptions () {
      this.getProjectList()
      this.getAccount()
    },
    handleTabChange (key) {
      if (['4', '5'].includes(key)) {
        if (this.columns[1].dataIndex === 'process_time') {
          this.columns.splice(1, 1)
        }
      } else if (this.columns[1].dataIndex !== 'process_time') {
        const tabInfo = {
          title: '审核时间',
          dataIndex: 'process_time',
          scopedSlots: { customRender: 'timeWait' }
        }
        this.columns.splice(1, 0, tabInfo)
      }
      this.tabActiveKey = key
      this.queryParam.cash_status = key || undefined
      this.refreshTable()
    },
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data || []
      })
    },
    // 获取对公账户
    async getAccount () {
      const { list } = await getAccount()
      this.accountProjects = list || []
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    refreshTable (bool = false) {
      this.$refs.table.refresh(bool)
    },
    resetTable () {
      this.queryParam = {
        cash_status: this.tabActiveKey || undefined
      }
      this.refreshTable(true)
    },
    addApplication () {
      this.$refs['add-form'].resetFields()
      this.editVisible = true
    },
    batchOperation () {
      if (this.selectedRowKeys.length) {
        if (this.selectedRows.every(obj => +obj.payment_button)) {
          this.openCheck(this.selectedRowKeys, 2)
        } else {
          this.$message.warning('已选择的项中包含不可操作')
        }
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    batchCheck (checkType) {
      if (this.selectedRowKeys.length) {
        if (this.selectedRows.every(obj => +obj.check_button)) {
          this.openCheck(this.selectedRowKeys, 1, checkType)
        } else {
          this.$message.warning('已选择的项中包含不可操作')
        }
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    // type 1：审核 2：打款
    async openCheck (ids, type, checkType = 0) {
      this.$loading.show()
      const { data } = await getCheckAndPayInfo({
        ids,
        type
      })
      this.selectIds = ids
      this.checkData = data
      this.$loading.hide()
      if (type === 1) {
        this.checkType = checkType
        this.checkVisible = true
      } else {
        this.payVisible = true
      }
    },
    submitSuccess () {
      this.refreshTable()
      const len = this.selectIds.length
      if (len > 1) {
        this.onSelectChange([], [])
      } else if (len === 1) {
        this.cancelSelect([this.selectIds[0]])
      }
    },
    // 取消选择
    cancelSelect (data) {
      this.selectedRowKeys = this.selectedRowKeys.filter(
        obj => obj === data
      )
      this.selectedRows = this.selectedRows.filter(
        obj => obj.id === data
      )
    },
    openShopPower () {
      if (this.selectedRowKeys.length) {
        this.powerForm.power = []
        this.permissionVisible = true
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-children-content {
  padding-bottom: 24px;
}
.table-page-search-wrapper
  /deep/
  .ant-form-inline
  .ant-form-item
  > .ant-form-item-label {
  min-width: 80px;
  flex-shrink: 0;
}
.alert-text {
  color: @error-color;
}
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
.table-action a + a {
  margin-left: 10px;
}
.permission-modal-row {
  margin-bottom: 18px;
}
.permission-modal-line {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background: #eee;
}
.permission-modal-span + .permission-modal-span::before {
  content: "、";
}
.status-list {
  display: flex;
  justify-content: flex-end;
  text-align: right;
  .text,
  .heading {
    padding-left: 40px;
  }
  .heading {
    font-size: 20px;
  }
}
</style>
