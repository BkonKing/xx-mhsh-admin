<template>
  <div>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="券状态">
                <a-select
                  v-model="queryParam.coupon_status"
                  :options="couponStatus"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="券类型">
                <a-select
                  v-model="queryParam.coupon_type"
                  :options="couponTypes"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="券名称">
                <a-input
                  v-model="queryParam.coupon_name"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用场景">
                <a-select
                  v-model="queryParam.coupon_scene"
                  :options="useTypes"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="领取方式">
                <a-select
                  v-model="queryParam.coupon_mode"
                  :options="pickupTypes"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="可领用户">
                  <user-cascader v-model="queryParam.available_type">
                  </user-cascader>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="店铺归属">
                  <a-select
                    v-model="queryParam.project_id"
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
              <a-col :md="8" :sm="24">
                <a-form-item label="店铺名称">
                  <a-input
                    v-model="queryParam.shops_name"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建人">
                  <a-input
                    v-model="queryParam.user_text"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建时间">
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
              :md="16"
              @reset="resetTable"
              @search="refreshTable(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchOperate(1)">
              发布
            </a-menu-item>
            <a-menu-item key="2" @click="batchOperate(2)">
              结束
            </a-menu-item>
            <a-menu-item key="3" @click="batchOperate(3)">
              删除
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
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <router-link :to="`/store/couponDetail?id=${record.id}`"
              >查看</router-link
            >
            <a
              v-if="record.coupon_status === '2'"
              @click="batchPublish([record])"
              >发布</a
            >
            <a
              v-if="['2', '3'].includes(record.coupon_status)"
              @click="batchDelete([record])"
              >删除</a
            >
            <a
              v-if="record.coupon_status === '1'"
              @click="batchFinish([record])"
              >结束</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
    <publish-modal
      v-model="publishVisible"
      :active="activeCoupons"
      @success="publishSuccess"
    ></publish-modal>
  </div>
</template>

<script>
// /store/list
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { STable, AdvancedForm } from '@/components'
import UserCascader from './UserCascader'
import PublishModal from './PublishModal'
import {
  getShopCouponList,
  getProjectList,
  finishCoupon,
  deleteCoupon
} from '@/api/userManage/business'

export default {
  name: 'CouponList',
  components: {
    AdvancedForm,
    STable,
    PublishModal,
    UserCascader
  },
  data () {
    return {
      advanced: false,
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      couponStatus: [
        {
          label: '未发布',
          value: '2'
        },
        {
          label: '领取中',
          value: '1'
        },
        {
          label: '已结束',
          value: '3'
        }
      ],
      couponTypes: [
        {
          label: '满减券',
          value: '1'
        },
        {
          label: '折扣券',
          value: '2'
        }
      ],
      useTypes: [
        // {
        //   label: 'APP使用',
        //   value: '0'
        // },
        {
          label: '线下使用',
          value: '1'
        }
        // {
        //   label: 'APP及线下',
        //   value: '2'
        // }
      ],
      pickupTypes: [
        {
          label: '免费领取',
          value: '1'
        },
        {
          label: '付费领取',
          value: '2'
        }
        // {
        //   label: '系统发放',
        //   value: '3'
        // }
      ],
      // 查询参数
      queryParam: {},
      columns: [
        {
          title: '券状态',
          width: 64,
          dataIndex: 'coupon_status_name'
        },
        {
          title: '券名称',
          dataIndex: 'coupon_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '领取方式',
          dataIndex: 'coupon_mode_name'
        },
        {
          title: '使用场景',
          dataIndex: 'coupon_scene_name'
        },
        {
          title: '面额',
          dataIndex: 'denomination',
          sorter: true
        },
        {
          title: '门槛',
          dataIndex: 'threshold_price',
          sorter: true
        },
        {
          title: '每人限领',
          dataIndex: 'is_limit',
          sorter: true,
          customRender: (text, row) => {
            const num = +text ? row.limit_num : '无限'
            return num
          }
        },
        {
          title: '领取/发行',
          dataIndex: 'receive',
          sorter: true,
          customRender: (text, row) => {
            return `${text === '--' ? '-' : text}/${row.stock === '--' ? '-' : row.stock}`
          }
        },
        {
          title: '使用',
          dataIndex: 'employ',
          sorter: true,
          customRender: text => {
            return text || '-'
          }
        },
        {
          title: '使用率',
          dataIndex: 'employ_rate',
          sorter: true
          // customRender: (text, row) => {
          //   return text ? `${text}%` : '-'
          // }
        },
        {
          title: '用户/店铺',
          dataIndex: 'realname',
          customRender: (text, row) => {
            return (
              <div>
                <div>{text}</div>
                <div class="two-Multi">{row.shops_name}</div>
              </div>
            )
          }
        },
        {
          title: '创建时间',
          dataIndex: 'ctime',
          width: 149,
          customRender (text) {
            return text || '--'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '124px',
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
        const available = params.available_type
        if (available && available.length) {
          params.available_type = available[0]
          params.available_value = available[1]
        }
        return getShopCouponList(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      projectOptions: [],
      activeCoupons: [],
      publishVisible: false
    }
  },
  computed: {
    rowSelection () {
      return {
        columnWidth: 40,
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
      this.queryParam = {}
      this.refreshTable(true)
    },
    confirm ({ title, content, fn }) {
      this.$confirm({
        title,
        content,
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
          fn()
        },
        onCancel () {}
      })
    },
    // 批量操作
    batchOperate (key) {
      if (this.selectedRowKeys.length) {
        const methodName = {
          1: 'batchPublish',
          2: 'batchFinish',
          3: 'batchDelete'
        }
        this[methodName[key]]()
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    batchPublish (value = this.selectedRows) {
      if (value.length > 1) {
        const status = value.some(record => {
          return record.coupon_status !== '2'
        })
        if (status) {
          this.$message.warning('已选择的项中包含不可操作')
          return
        }
      }
      this.activeCoupons = value
      this.publishVisible = true
    },
    publishSuccess () {
      // 选中selectedRowKeys去除删除的key
      this.selectedRowKeys = this.selectedRowKeys.filter(
        obj => this.activeCoupons.findIndex(coupon => coupon.id === obj) === -1
      )
      this.selectedRows = this.selectedRows.filter(
        obj => this.activeCoupons.findIndex(coupon => coupon.id === obj) === -1
      )
      this.refreshTable()
    },
    // 结束操作
    batchFinish (value = this.selectedRows) {
      if (value.length > 1) {
        const status = value.some(record => {
          return record.coupon_status !== '1'
        })
        if (status) {
          this.$message.warning('已选择的项中包含不可操作')
          return
        }
      }
      const content =
        value.length > 1
          ? `，确定结束${value.length}个店铺券吗？`
          : '，确定结束吗？'
      this.confirm({
        title: '结束店铺券',
        content: () => (
          <div>
            <span style="color: #f5222d;">结束后将停止领取该券</span>
            {content}
          </div>
        ),
        fn: () => {
          this.finishCoupon(value.map(obj => obj.id).join(','))
        }
      })
    },
    finishCoupon (id) {
      finishCoupon({
        shops_coupon_id_text: id
      }).then(({ success, message }) => {
        if (success) {
          const ids = id.split(',')
          // 选中selectedRowKeys去除删除的key
          this.selectedRowKeys = this.selectedRowKeys.filter(
            obj => !ids.includes(obj)
          )
          this.selectedRows = this.selectedRows.filter(
            obj => !ids.includes(obj)
          )
          this.$message.success('提交成功')
          this.refreshTable()
        } else {
          this.$message.error(message)
        }
      })
    },
    // 删除操作
    batchDelete (value = this.selectedRows) {
      if (value.length > 1) {
        const status = value.some(record => {
          return !['2', '3'].includes(record.coupon_status)
        })
        if (status) {
          this.$message.warning('已选择的项中包含不可操作')
          return
        }
      }
      const content =
        value.length > 1
          ? `，确定删除${value.length}个店铺券吗？`
          : '，确定删除吗？'
      this.confirm({
        title: '删除店铺券',
        content: () => (
          <div>
            <span style="color: #f5222d;">优惠券及其相关信息都会被删除</span>
            {content}
          </div>
        ),
        fn: () => {
          this.deleteCoupon(value.map(obj => obj.id).join(','))
        }
      })
    },
    deleteCoupon (id) {
      deleteCoupon({
        shops_coupon_id_text: id
      }).then(({ success, message }) => {
        if (success) {
          const ids = id.split(',')
          // 选中selectedRowKeys去除删除的key
          this.selectedRowKeys = this.selectedRowKeys.filter(
            obj => !ids.includes(obj)
          )
          this.selectedRows = this.selectedRows.filter(
            obj => !ids.includes(obj)
          )
          this.$message.success('删除成功')
          this.refreshTable()
        } else {
          this.$message.error(message)
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less" scoped>
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
/deep/ .ant-table-thead > tr > th,
/deep/ .ant-table-tbody > tr > td {
  padding:  16px 8px;
}
</style>
