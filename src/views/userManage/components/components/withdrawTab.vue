<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="提现状态">
              <a-select v-model="queryParam.cash_status" placeholder="请选择">
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
          <advanced-form
            :md="24"
            :isAdvanced="false"
            @reset="resetTable"
            @search="refreshTable(true)"
          ></advanced-form>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :showPagination="true"
    >
      <template v-slot:timeWait="text, row">
        <Timewait
          :time="(new Date(row.ctime).getTime() - new Date().getTime()) / 1000"
          :delay="1000"
          :showSecond="true"
          upClass="color-red"
        ></Timewait>
      </template>
      <span class="table-action" slot="action" slot-scope="text, record">
        <router-link :to="`/credit/withdraw/detail?id=${record.id}`"
          >查看</router-link
        >
      </span>
    </s-table>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { AdvancedForm, STable, Timewait } from '@/components'
import { getCashList } from '@/api/credit/withdraw'
export default {
  components: {
    AdvancedForm,
    STable,
    Timewait
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      cashStatus: [
        { key: '1', tab: '项目审核' },
        { key: '2', tab: '总部审核' },
        { key: '3', tab: '待打款' },
        { key: '4', tab: '已打款' },
        { key: '5', tab: '已拒绝' }
      ],
      queryParam: {},
      columns: [
        {
          title: '提现状态',
          dataIndex: 'cash_status_desc'
        },
        {
          title: '审核时间',
          dataIndex: 'shops_name',
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
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
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
          params.arrivalTime = `${arrivalTime[0]}~${arrivalTime[1]}`
        }
        if (!this.isParentProject) {
          params.project_id = this.projectId
        }
        return getCashList({ ...parameter, ...params, cash_user: this.info.uid })
      }
    }
  },
  methods: {
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

<style></style>
