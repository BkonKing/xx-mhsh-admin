<template>
  <div>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select
                  v-model="queryParam.item_id"
                  :options="useStatus"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="券名称">
                <a-input
                  v-model="queryParam.staff_text"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="券编号">
                  <a-input
                    v-model="queryParam.staff_text"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="领取用户">
                  <a-input
                    v-model="queryParam.staff_text"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="券状态">
                  <a-select
                    v-model="queryParam.item_id"
                    :options="couponStatus"
                    placeholder="请选择"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="支付订单">
                  <a-input
                    v-model="queryParam.staff_text"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="领取方式">
                  <a-select
                    v-model="queryParam.item_id"
                    :options="pickupTypes"
                    placeholder="请选择"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="领取时间">
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
              :md="8"
              @reset="resetTable"
              @search="refreshTable(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
      >
      </s-table>
    </a-card>
  </div>
</template>

<script>
// /store/list
import moment from 'moment'
import clonedeep from 'lodash.clonedeep'
import { STable, AdvancedForm } from '@/components'
import { getStaffList } from '@/api/userManage'

export default {
  name: 'CouponRecords',
  components: {
    STable,
    AdvancedForm
  },
  data () {
    return {
      advanced: false,
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      useStatus: [
        {
          label: '未使用',
          value: '1'
        },
        {
          label: '已使用',
          value: '2'
        },
        {
          label: '已过期',
          value: '3'
        }
      ],
      couponStatus: [
        {
          label: '未发布',
          value: '1'
        },
        {
          label: '领取中',
          value: '2'
        },
        {
          label: '已结束',
          value: '3'
        }
      ],
      pickupTypes: [
        {
          label: '免费领取',
          value: '1'
        },
        {
          label: '付费领取',
          value: '2'
        },
        {
          label: '系统发放',
          value: '3'
        }
      ],
      queryParam: {},
      columns: [
        {
          title: '券名称',
          dataIndex: 'company_name',
          customRender: text => {
            return <a class="two-Multi">{text}</a>
          }
        },
        {
          title: '券编号',
          dataIndex: 'division_name'
        },
        {
          title: '使用状态',
          dataIndex: 'staff_numb'
        },
        {
          title: '领取方式',
          dataIndex: 'post_name'
        },
        {
          title: '领取用户',
          dataIndex: 'entry_time',
          customRender: text => {
            return <a class="two-Multi">{text}</a>
          }
        },
        {
          title: '姓名/手机号',
          dataIndex: 'mobile',
          customRender: text => {
            return (
              <div>
                <div>{text}</div>
                <div>{text}</div>
              </div>
            )
          }
        },
        {
          title: '支付金额',
          dataIndex: 'post_name',
          customRender (text) {
            return text || '--'
          }
        },
        {
          title: '支付订单',
          dataIndex: 'post_name',
          customRender (text) {
            return <a>{text}</a> || '--'
          }
        },
        {
          title: '领取时间',
          dataIndex: 'ctime',
          sorter: true
        },
        {
          title: '使用/过期时间',
          dataIndex: 'ctime',
          sorter: true
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = clonedeep(this.queryParam)
        const time = params.time
        let startDate = ''
        let endDate = ''
        if (time && time.length) {
          startDate = time[0]
          endDate = time[1]
        }
        params.entry_stime = startDate
        params.entry_etime = endDate
        return getStaffList(Object.assign(parameter, params))
      }
    }
  },
  created () {},
  methods: {
    refreshTable (bool = false) {
      this.$refs.table.refresh(bool)
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
/deep/ .ant-form-item-control,
/deep/ .ant-form-item-label {
  line-height: 32px;
}
</style>
