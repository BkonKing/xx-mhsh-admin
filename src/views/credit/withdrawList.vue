<template>
  <page-header-view
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="提现状态">
                <a-select
                  v-model="queryParam.checkStatus"
                  placeholder="请选择"
                  :disabled="tabActiveKey !== '0'"
                >
                  <a-select-option
                    v-for="item in tabList"
                    :key="item.key"
                    :value="item.key"
                    >{{ item.tab }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="账户类型">
                <a-select v-model="queryParam.project_id" placeholder="请选择">
                  <a-select-option value="1">商家用户</a-select-option>
                  <a-select-option value="0">项目账户</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="提现用户">
                <a-input
                  v-model="queryParam.user_text"
                  placeholder="昵称、姓名、手机号、银行卡号"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="提现项目">
                <a-select v-model="queryParam.project_id" placeholder="请选择">
                  <a-select-option value="1">已认证</a-select-option>
                  <a-select-option value="0">未认证</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-if="isParentProject" :md="8" :sm="24">
              <a-form-item label="店铺归属">
                <a-select v-model="queryParam.project_id" placeholder="请选择">
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
                    v-model="queryParam.time"
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
                    v-model="queryParam.time"
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
            <a-menu-item key="1" @click="openShopPower">
              通过
            </a-menu-item>
            <a-menu-item key="3" @click="batchCheck">
              拒绝
            </a-menu-item>
            <a-menu-item key="2" @click="batchRemove">
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
            :time="
              (new Date(row.ctime).getTime() - new Date().getTime()) / 1000
            "
            :delay="1000"
            :showSecond="true"
            upClass="color-red"
          ></Timewait>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a :href="`${userUrl}?uid=${record.uid}&isShop=1`" target="_blank"
              >查看</a
            >
            <a @click="openCheck(record)">审核</a>
            <a @click="handleEdit(record)">已打款</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <application-form-modal
      v-model="editVisible"
      ref="add-form"
      @submit="submitSuccess"
    ></application-form-modal>
    <check-form-modal v-model="checkVisible"></check-form-modal>
  </page-header-view>
</template>

<script>
// /credit/withdrawList
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { STable, AdvancedForm, Timewait } from '@/components'
import CheckFormModal from './components/CheckFormModal'
import ApplicationFormModal from './components/ApplicationFormModal'
import {
  getShopList,
  getProjectList,
  delShops,
  getBusinessSetting
} from '@/api/userManage/business'

export default {
  name: 'withdrawList',
  components: {
    AdvancedForm,
    STable,
    Timewait,
    CheckFormModal,
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
        checkStatus: undefined
      },
      columns: [
        {
          title: '提现状态',
          dataIndex: 'project_name'
        },
        {
          title: '审核时间',
          dataIndex: 'shops_name',
          scopedSlots: { customRender: 'timeWait' }
        },
        {
          title: '提现单号',
          dataIndex: 'shops_name1'
        },
        {
          title: '提现幸福币',
          dataIndex: 'credits',
          sorter: true
        },
        {
          title: '提现人民币',
          dataIndex: 'coupon_count',
          sorter: true
        },
        {
          title: '申请人',
          dataIndex: 'realname',
          customRender: (text, row) => {
            return (
              <a>
                <div>{text}</div>
                <div>{row.mobile}</div>
              </a>
            )
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
          dataIndex: 'ctime1',
          sorter: true,
          customRender (text) {
            return text || '--'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
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
        params.sort_field = parameter.sortField
        params.sort_type = sortText[parameter.sortOrder]
        const time = params.time
        if (time && time.length) {
          params.start_time = time[0]
          params.end_time = time[1]
        }
        if (!this.isParentProject) {
          params.project_id = this.projectId
        }
        return getShopList({ ...parameter, ...params })
      },
      selectedRowKeys: [],
      selectedRows: [],
      projectOptions: [],
      permissionVisible: false,
      powerForm: {
        power: []
      },
      powerOptions: [
        // {
        //   label: '提现申请',
        //   value: '1'
        // },
        {
          label: '商铺券管理',
          value: '2'
        },
        {
          label: '扫码核销券',
          value: '3'
        }
      ],
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '项目审核' },
        { key: '2', tab: '总部审核' },
        { key: '3', tab: '待打款' },
        { key: '4', tab: '已打款' },
        { key: '5', tab: '已拒绝' }
      ],
      tabActiveKey: '0',
      editVisible: false,
      checkVisible: false
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
    }
  },
  created () {
    this.initOptions()
  },
  methods: {
    initOptions () {
      this.getProjectList()
      this.getBusinessSetting()
    },
    async getBusinessSetting () {
      const { power_name_data: power } = await getBusinessSetting()
      this.powerOptions = power.map(obj => ({
        label: obj.text,
        value: obj.key
      }))
    },
    handleTabChange (key) {
      this.tabActiveKey = key
      this.queryParam.checkStatus = key
    },
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data || []
      })
    },
    refreshTable (bool = false) {
      this.$refs.table.refresh(bool)
    },
    resetTable () {
      this.queryParam = {
        checkStatus: this.tabActiveKey
      }
      this.refreshTable(true)
    },
    addApplication () {
      this.$refs['add-form'].resetFields()
      this.editVisible = true
    },
    // 批量删除
    batchRemove () {
      if (this.selectedRowKeys.length) {
        const that = this
        this.$confirm({
          title: '删除商家',
          content: `确定删除${this.selectedRowKeys.length}个商家吗？`,
          icon: () => (
            <a-icon
              type="exclamation-circle"
              style="color: #faad14"
              theme="filled"
            />
          ),
          cancelText: '取消',
          okText: '确定',
          onOk () {
            that.handleRemove(that.selectedRowKeys.join(','))
          },
          onCancel () {}
        })
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    batchCheck () {
      if (this.selectedRowKeys.length) {
        this.openCheck()
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    openCheck (data = this.selectedRowKeys) {
      this.checkVisible = true
    },
    handleRemove (id) {
      delShops({
        shops_id_text: id
      }).then(({ success }) => {
        if (success) {
          const ids = id.split(',')
          // 选中selectedRowKeys去除删除的key
          this.selectedRowKeys = this.selectedRowKeys.filter(
            obj => !ids.includes(obj)
          )
          this.$message.success('删除成功')
          this.refreshTable()
        }
      })
    },
    handleEdit (record) {
      const form = cloneDeep(record)
      form.staff_id = form.id
      form.company_id = form.company_id || undefined
      form.division_id = form.division_id || undefined
      form.post_id = form.post_id || undefined
      form.power = form.power ? form.power.split(',') : []
      this.$refs['add-form'].setFieldsValue(form)
      this.editForm = true
    },
    submitSuccess () {
      this.refreshTable()
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
</style>
