<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="店员用户">
              <a-input
                v-model="queryParam.user_text"
                placeholder="ID、昵称、姓名、手机号"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="添加时间">
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
            <a-form-item label="店铺权限">
              <a-select
                v-model="queryParam.clerk_power_data"
                mode="multiple"
                placeholder="请选择"
              >
                <a-select-option
                  v-for="item in powerOptions"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
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
      <span class="table-action" slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a
            ><a-popconfirm
              title="你确定要删除该员工吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleRemove(record.id)"
            >
              <a-icon
                slot="icon"
                type="close-circle"
                theme="filled"
                style="color: red"
              />
              <a>删除</a>
            </a-popconfirm></a
          >
        </template>
      </span>
    </s-table>
    <staff-form
      v-model="editFormVisible"
      ref="add-form"
      :power-options="powerOptions"
      :project-options="projectOptions"
      @submit="refreshTable"
    ></staff-form>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { AdvancedForm, STable } from '@/components'
import staffForm from '@/views/businessManage/components/staffForm'
import { getProjectList, getShopStaffList, delShopStaff } from '@/api/userManage/business'
export default {
  components: {
    AdvancedForm,
    staffForm,
    STable
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
      powerOptions: [
        {
          label: '店铺券管理',
          value: '1'
        },
        {
          label: '扫码核销券',
          value: '2'
        }
      ],
      projectOptions: [],
      queryParam: {
        clerk_power_data: []
      },
      columns: [
        {
          title: '用户昵称',
          dataIndex: 'nickname',
          customRender: (text, row) => {
            return (
              <a href={`${this.userUrl}?uid=${row.uid}`} target="_blank">
                {text}
              </a>
            )
          }
        },
        {
          title: '姓名/手机号',
          dataIndex: 'clerk_name',
          customRender: (text, row) => {
            return (
              <div>
                <div>{text}</div>
                <div>{row.mobile}</div>
              </div>
            )
          }
        },
        {
          title: '店铺权限',
          dataIndex: 'clerk_power_text'
        },
        {
          title: '添加时间',
          dataIndex: 'ctime',
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
        return getShopStaffList({ ...parameter, ...params, shops_id: this.info.shops_id })
      },
      editFormVisible: false
    }
  },
  created () {
    this.getProjectList()
  },
  methods: {
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data || []
      })
    },
    handleEdit (record) {
      const form = cloneDeep(record)
      form.staff_id = form.id
      form.clerk_power_data = form.clerk_power ? form.clerk_power.split(',') : []
      console.log(this.$refs['add-form'])
      this.$refs['add-form'].setFieldsValue(form)
      this.editFormVisible = true
    },
    handleRemove (id) {
      delShopStaff({
        shops_clerk_id_text: id
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

<style></style>
