<template>
  <div>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="服务状态">
                <a-select
                  v-model="queryParam.build_id"
                  placeholder="请选择"
                  :options="serviceStatus"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="服务类型">
                <a-select
                  v-model="queryParam.build_id"
                  placeholder="请选择"
                  :options="serviceStatus"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="服务项目">
                  <a-select
                    v-model="queryParam.project_id"
                    placeholder="请选择"
                  >
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
                    v-model="queryParam.sSearch"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建时间">
                  <a-range-picker
                    v-model="queryParam.service_time"
                    valueFormat="YYYY-MM-DD"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="完成时间">
                  <a-range-picker
                    v-model="queryParam.service_time"
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
            <a-menu-item key="1">完成 </a-menu-item>
            <a-menu-item key="2">取消 </a-menu-item>
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
        <template slot="duration" slot-scope="text">
          <Timewait :time="text" upClass="error-text" :delay="60000"></Timewait>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a style="margin-right: 10px;" @click="openRemark(record)">备注</a>
            <a style="margin-right: 10px;" @click="finishService(record)"
              >完成</a
            >
            <a @click="openCancelModal(record)">取消</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <remark-modal v-model="remarkVisible" :data="activeRecord"></remark-modal>
    <cancel-reservation-modal
      v-model="cancelVisible"
      :selectKeys="selectedRowKeys"
    ></cancel-reservation-modal>
  </div>
</template>

<script>
import { STable, AdvancedForm, Timewait } from '@/components'
import cloneDeep from 'lodash.clonedeep'
import { getServiceRecord } from '@/api/community'
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
    return {
      serviceStatus: [
        { label: '已预约', value: '1' },
        { label: '排队中', value: '1' },
        { label: '待归还', value: '1' },
        { label: '已服务', value: '1' },
        { label: '已取消', value: '1' }
      ],
      serviceTypes: [
        { label: '人工服务', value: '1' },
        { label: '借用服务', value: '1' }
      ],
      serviceProjects: [],
      queryParam: {},
      advanced: true,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 80
        },
        {
          title: '服务状态',
          dataIndex: 'user_type',
          width: 100
        },
        {
          title: '服务类型',
          dataIndex: 'project_name',
          width: 100
        },
        {
          title: '服务项目',
          dataIndex: 'avatar',
          width: 100
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
          width: 120
        },
        {
          title: '手机号',
          dataIndex: 'realname'
        },
        {
          title: '预约时间',
          orter: true,
          dataIndex: 'user_tag_data'
        },
        {
          title: '开始时间',
          dataIndex: 'ctime4',
          sorter: true,
          width: 160
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
          dataIndex: 'ctime3',
          scopedSlots: { customRender: 'duration' },
          width: 160
        },
        {
          title: '结束时间',
          dataIndex: 'ctime2',
          sorter: true,
          width: 160
        },
        {
          title: '备注',
          dataIndex: 'ctime1',
          width: 160,
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
        const params = cloneDeep(this.queryParam)
        if (params.user_tag && params.user_tag.length) {
          params.user_tag = this.setTagTreeData(params.user_tag)
          params.tag_id_text = params.user_tag.join(',')
        }
        const time = params.service_time
        // const ctime = params.ctime
        if (time && time.length) {
          params.service_stime = time[0]
          params.service_etime = time[1]
        }
        // if (ctime && ctime.length) {
        //   params.ctime = `${ctime[0]}~${ctime[1]}`
        // }
        return getServiceRecord(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      remarkVisible: false,
      activeRecord: {},
      cancelVisible: false
    }
  },
  computed: {
    rowSelection () {
      return {
        fixed: true,
        selectedRowKeys: this.selectedRowKeys,
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: +record.status !== 0 || record.auditPermission === 0
        //   }
        // }),
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    resetTable () {},
    openRemark (record) {
      this.activeRecord = record
      this.remarkVisible = true
    },
    finishService ({ id }) {
      // setEnabledHouse({
      //   id
      // }).then(({ success }) => {
      //   if (success) {
      //      this.$refs.table.refresh()
      //   }
      // })
    },
    openCancelModal () {
      this.cancelVisible = true
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
