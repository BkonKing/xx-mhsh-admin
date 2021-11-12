<template>
  <div>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="服务类型">
                <a-select
                  v-model="queryParam.category_type"
                  :options="serviceTypes"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="运行状态">
                <a-select
                  v-model="queryParam.is_stop"
                  :options="runningStatus"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="是否启用">
                <a-select
                  v-model="queryParam.is_open"
                  :options="switchStatus"
                  :getPopupContainer="triggerNode => triggerNode.parentNode"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="服务项目">
                <a-input
                  v-model="queryParam.category_search"
                  placeholder="ID、名称"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="16" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)"
                  >查询</a-button
                >
                <a-button style="margin-left: 8px" @click="resetTable"
                  >重置</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="openEditService(null)">
          新增服务
        </a-button>
        <a-button style="margin-left: 8px" @click="goSetting">
          服务设置
        </a-button>
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
        <template slot="enable" slot-scope="text, record">
          <a-switch
            :checked="Boolean(+record.is_enabled)"
            @change="value => changeEnabled(record, value)"
          ></a-switch>
        </template>
        <template slot="listOrder" slot-scope="text, record">
          <a-input
            v-model="record.list_order"
            @blur="changeOrder(record)"
          ></a-input>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a style="margin-right: 10px;" @click="openEditService(record)"
              >编辑</a
            >
            <a-popconfirm
              title="你确定要删除这行内容吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteService(record)"
            >
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
    </a-card>
    <server-modal v-model="editVisible" :data="activeRecord" @success="$refs.table.refresh()"></server-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
import cloneDeep from 'lodash.clonedeep'
import {
  getFreeCategoryList,
  updateFieldCategory,
  deleteFreeCategory
} from '@/api/community'
import ServerModal from './ServerModal'
export default {
  name: 'ServiceList',
  components: {
    STable,
    ServerModal
  },
  data () {
    return {
      serviceTypes: [
        { label: '人工服务', value: '1' },
        { label: '借用服务', value: '2' }
      ],
      runningStatus: [
        { label: '正常', value: '0' },
        { label: '暂停', value: '1' }
      ],
      switchStatus: [
        { label: '开启', value: '1' },
        { label: '关闭', value: '0' }
      ],
      queryParam: {},
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          width: 80
        },
        {
          title: '服务类型',
          dataIndex: 'category_type_desc',
          width: 100
        },
        {
          title: '服务项目',
          dataIndex: 'category'
        },
        {
          title: '运行状态',
          dataIndex: 'is_stop_desc',
          width: 100
        },
        {
          title: '服务配置',
          dataIndex: 'service_config'
        },
        {
          title: '服务地点/时间',
          dataIndex: 'location',
          customRender: (text, row) => {
            return (
              <div>
                <div>{text}</div>
                <div>{row.service_time}</div>
              </div>
            )
          }
        },
        {
          title: () => {
            return (
              <div>
                是否启用
              <a-tooltip placement="top">
                <template slot="title">
                  <span>开启则APP显示服务</span>
                </template>
                <a-icon type="info-circle" style="margin-left: 5px;" />
              </a-tooltip>
              </div>
            )
          },
          dataIndex: 'is_enabled',
          scopedSlots: { customRender: 'enable' },
          width: 110
        },
        {
          title: '排序',
          dataIndex: 'list_order',
          scopedSlots: { customRender: 'listOrder' },
          width: 160
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 110
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
        return getFreeCategoryList(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      editVisible: false,
      activeRecord: null
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
    resetTable () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    openEditService (record) {
      this.activeRecord = record
      this.editVisible = true
    },
    changeEnabled (data, value) {
      const { id } = data
      updateFieldCategory({
        id,
        field_name: 'is_enabled',
        field_value: value ? '1' : '0'
      }).then(({ success }) => {
        if (success) {
          data.is_enabled = !+data.is_enabled
          this.$message.success('设置成功')
        }
      })
    },
    changeOrder ({ id, list_order: listOrder }) {
      updateFieldCategory({
        id,
        field_name: 'list_order',
        field_value: listOrder
      }).then(({ success }) => {
        if (success) {
          this.$message.success('设置成功')
          this.$refs.table.refresh()
        }
      })
    },
    deleteService ({ id }) {
      deleteFreeCategory({
        id
      }).then(({ success }) => {
        if (success) {
          this.$message.success('删除成功')
          this.$refs.table.refresh()
        }
      })
    },
    goSetting () {
      this.$router.push({
        name: 'freeServerSetting'
      })
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
.table-page-search-submitButtons {
  text-align: right;
}
</style>
