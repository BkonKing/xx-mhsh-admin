<template>
  <div class="user-shops-info">
    <a-card title="店铺资料" style="margin-top: 24px;">
      <h3>店铺信息</h3>
      <a-descriptions size="small" :column="3">
        <a-descriptions-item label="店铺编号">
          {{ info.shops_id || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺归属">
          {{ info.project_name || "美好生活家园总部" }}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{ info.ctime || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="营业时间" :span="3">
          {{ info.business_hours || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺地址" :span="3">
          {{ info.address_detail || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺公告" :span="3">
          {{ info.shops_notice || "--" }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="店铺券" style="margin-top: 24px;">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="券状态">
                <a-select
                  v-model="queryParam.coupon_status"
                  :options="couponStatus"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
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
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
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
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
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
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
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
      <s-table
        v-if="info.shops_id"
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
      >
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a
              :href="`/zht/user/store/detail?id=${record.id}`"
              target="_blank"
              >查看</a
            >
            <a
              v-if="['1', '3'].includes(record.coupon_status)"
              @click="handleDelete(record.id)"
              >删除</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { AdvancedForm, STable } from '@/components'
import UserCascader from '@/views/businessManage/components/UserCascader'
import { getShopCouponList, deleteCoupon } from '@/api/userManage/business'

export default {
  components: {
    AdvancedForm,
    STable,
    UserCascader
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
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
      queryParam: {},
      columns: [
        {
          title: '券状态',
          width: 80,
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
            return `${text === '--' ? '-' : text}/${
              row.stock === '--' ? '-' : row.stock
            }`
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
        },
        {
          title: '创建时间',
          dataIndex: 'ctime',
          width: 165,
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
        const available = params.available_type
        if (available && available.length) {
          params.available_type = available[0]
          params.available_value = available[1]
        }
        return getShopCouponList(
          Object.assign(parameter, params, {
            shops_id: this.info.shops_id
          })
        )
      }
    }
  },
  methods: {
    handleDelete (id) {
      const that = this
      this.$confirm({
        title: '删除店铺券',
        content: () => (
          <div>
            <span style="color: #f5222d;">优惠券及其相关信息都会被删除</span>
            ，确定删除吗？
          </div>
        ),
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
          that.deleteCoupon(id)
        },
        onCancel () {}
      })
    },
    deleteCoupon (id) {
      deleteCoupon({
        shops_coupon_id_text: id
      }).then(({ success }) => {
        if (success) {
          this.$message.success('删除成功')
          this.refreshTable()
        }
      })
    },
    refreshTable (bool = false) {
      this.$refs.table && this.$refs.table.refresh(bool)
    },
    resetTable () {
      this.queryParam = {}
      this.refreshTable(true)
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
.table-action a + a {
  margin-left: 10px;
}
h3 {
  font-weight: bold;
}
</style>
