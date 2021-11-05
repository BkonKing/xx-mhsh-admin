<template>
  <div>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="服务状态">
                <a-select
                  v-model="queryParam.service_status"
                  placeholder="请选择"
                  :options="serviceStatus"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="服务类型">
                <a-select
                  v-model="queryParam.category_type"
                  placeholder="请选择"
                  :options="serviceTypes"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="服务项目">
                  <a-select v-model="queryParam.category" placeholder="请选择">
                    <a-select-option
                      v-for="item in serviceProjects"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.project_name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户">
                  <a-input
                    v-model="queryParam.user_search"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建时间">
                  <a-range-picker
                    v-model="queryParam.ctime"
                    valueFormat="YYYY-MM-DD"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="完成时间">
                  <a-range-picker
                    v-model="queryParam.etime"
                    valueFormat="YYYY-MM-DD"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
            </template>
            <advanced-form
              v-model="advanced"
              :md="24"
              @reset="resetTable"
              @search="$refs.table.refresh(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchOperate(1)">完成 </a-menu-item>
            <a-menu-item key="2" @click="batchOperate(2)">取消 </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
        :alert="{ clear: true }"
        :rowSelection="rowSelection"
      >
        <template slot="duration" slot-scope="text,row">
          <Timewait
            v-if="+row.status === 1 && +row.category_type === 2"
            :showSecond="true"
            :time="((new Date().getTime() - new Date(row.stime).getTime()) / 1000 - row.duration)"
            :delay="1000"
            upClass="color-red"
            type="2"
          ></Timewait>
          <Timewait
            v-if="+row.status === 1"
            :showSecond="true"
            :time="((new Date().getTime() - new Date(row.stime).getTime()) / 1000)"
            :delay="1000"
            :upText="+row.category_type === 1 ? '已排队' : '已借'"
            type="2"
          ></Timewait>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a style="margin-right: 10px;" @click="openRemark(record)">备注</a>
            <a
              v-if="[0, 1].includes(record.status)"
              style="margin-right: 10px;"
              @click="finishService([record.id])"
              >完成</a
            >
            <a
              v-if="[0, 1].includes(record.status)"
              @click="openCancelModal([record.id])"
              >取消</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
    <remark-modal
      v-model="remarkVisible"
      :id="activeRecord.id"
      @success="refresh"
    ></remark-modal>
    <cancel-reservation-modal
      v-model="cancelVisible"
      :selectKeys="cancelIds"
      @success="refresh"
    ></cancel-reservation-modal>
  </div>
</template>

<script>
import { STable, AdvancedForm, Timewait } from '@/components'
import cloneDeep from 'lodash.clonedeep'
import { getFreeServerList, optReservation } from '@/api/community'
import RemarkModal from './RemarkModal'
import CancelReservationModal from './CancelReservationModal.vue'
export default {
  name: 'ReservationList',
  components: {
    STable,
    AdvancedForm,
    RemarkModal,
    CancelReservationModal,
    Timewait
  },
  data () {
    const sortValue = {
      ascend: 'ASC',
      descend: 'DESC'
    }
    return {
      serviceStatus: [
        { label: '已预约', value: '1' },
        { label: '排队中', value: '2' },
        { label: '待归还', value: '3' },
        { label: '已服务', value: '4' },
        { label: '已取消', value: '5' }
      ],
      serviceTypes: [
        { label: '人工服务', value: '1' },
        { label: '借用服务', value: '2' }
      ],
      serviceProjects: [],
      queryParam: {},
      advanced: true,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 60
        },
        {
          title: '服务状态',
          dataIndex: 'service_status',
          width: 92
        },
        {
          title: '服务类型',
          dataIndex: 'category_type_desc',
          width: 92
        },
        {
          title: '服务项目',
          dataIndex: 'category',
          width: '12%'
        },
        {
          title: '预约人',
          dataIndex: 'nickname',
          customRender: (text, row) => {
            return (
              <a href={`/xmht/household/member/getMemberList?uid=${row.uid}`}>
                {text}
              </a>
            )
          },
          width: 110
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          width: 120
        },
        {
          title: '预约时间',
          orter: true,
          dataIndex: 'ctime',
          width: 110
        },
        {
          title: '开始时间',
          dataIndex: 'stime',
          sorter: true,
          width: 110
        },
        {
          title: () => {
            return (
              <div>
                时长
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>排队时长/借用时长</span>
                  </template>
                  <a-icon type="info-circle" style="margin-left: 5px;" />
                </a-tooltip>
              </div>
            )
          },
          dataIndex: 'duration',
          scopedSlots: { customRender: 'duration' },
          width: 160
        },
        {
          title: '结束时间',
          dataIndex: 'etime',
          sorter: true,
          width: 110
        },
        {
          title: '备注',
          dataIndex: 'remark',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: () => {
            return (
              <div>
                操作
                <a-tooltip placement="top">
                  <template slot="title">
                    <div>完成：完成服务</div>
                    <div>取消：取消预约</div>
                  </template>
                  <a-icon type="info-circle" style="margin-left: 5px;" />
                </a-tooltip>
              </div>
            )
          },
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 140
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        if (parameter.sortField) {
          parameter.sort_field = parameter.sortField
          parameter.sort_value = sortValue[parameter.sortOrder]
        }
        const params = cloneDeep(this.queryParam)
        const ctime = params.ctime
        const etime = params.etime
        if (ctime && ctime.length) {
          params.ctime = `${ctime[0]}~${ctime[1]}`
        }
        if (etime && etime.length) {
          params.etime = `${etime[0]}~${etime[1]}`
        }
        return getFreeServerList(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      remarkVisible: false,
      activeRecord: {},
      cancelIds: [],
      cancelVisible: false
    }
  },
  computed: {
    rowSelection () {
      return {
        fixed: true,
        selectedRowKeys: this.selectedRowKeys,
        getCheckboxProps: record => ({
          props: {
            disabled: ![1, 2, 3].includes(record.status)
          }
        }),
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    resetTable () {
      this.queryParam = {}
      this.refresh(true)
    },
    refresh (isReset) {
      this.$refs.table.refresh(isReset)
    },
    openRemark (record) {
      this.activeRecord = record
      this.remarkVisible = true
    },
    batchOperate (type) {
      const ids = this.selectedRowKeys
      if (ids && ids.length) {
        type === 1 ? this.finishService(ids) : this.openCancelModal(ids)
      } else {
        this.$message.warning('请勾选后进行批量操作')
      }
    },
    finishService (ids) {
      optReservation({
        type: 1, // 1设置完成 2取消
        ids
      }).then(({ success }) => {
        if (success) {
          this.$refs.table.refresh()
        }
      })
    },
    openCancelModal (id) {
      this.cancelIds = id
      this.cancelVisible = true
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  /deep/ .ant-form-inline .ant-form-item > .ant-form-item-label {
    min-width: 80px;
    flex-shrink: 0;
  }
}
</style>
