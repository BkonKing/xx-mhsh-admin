<template>
  <page-header-view>
    <a-card class="search-card" :bordered="false">
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
              <a-form-item label="店铺名称">
                <a-input
                  v-model="queryParam.shops_name"
                  placeholder="请输入"
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
              :isAdvanced="false"
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
        <a-button type="primary" @click="addShop">
          新增
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="openShopPower">
              员工权限
            </a-menu-item>
            <a-menu-item key="2" @click="batchRemove">
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
    </a-card>
    <staff-form
      v-model="editFormVisible"
      ref="add-form"
      :powers="powers"
      @submit="submitSuccess"
    ></staff-form>
    <a-modal
      v-model="permissionVisible"
      :title="`批量编辑店铺权限（${selectedRows.length}）`"
      :width="600"
      :destroyOnClose="true"
      @ok="setStaffPower"
    >
      <div>
        <a-form-model
          ref="form"
          :model="powerForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item
            label="店铺权限"
            prop="clerk_power_data"
            :rules="{ required: true, message: '请选择权限' }"
            required
            ><a-checkbox-group v-model="powerForm.clerk_power_data" :options="powers"
          /></a-form-model-item>
          <a-form-model-item label="操作" prop="type" style="margin-bottom: 0;"
            ><a-radio-group v-model="powerForm.type">
              <a-radio value="1">
                仅添加
              </a-radio>
              <a-radio value="2">
                全部替换
              </a-radio>
            </a-radio-group></a-form-model-item
          >
        </a-form-model>
      </div>
    </a-modal>
  </page-header-view>
</template>

<script>
// /store/staffList
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { STable, AdvancedForm } from '@/components'
import { validAForm } from '@/utils/util'
import {
  getShopStaffList,
  getProjectList,
  delShopStaff,
  setStaffPower,
  getClerkPrivilege
} from '@/api/userManage/business'
import staffForm from './components/staffForm'

export default {
  name: 'storeStaffList',
  components: {
    AdvancedForm,
    STable,
    staffForm
  },
  data () {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      advanced: false,
      // 查询参数
      queryParam: {
        clerk_power_data: []
      },
      columns: [
        {
          title: '店铺归属',
          dataIndex: 'project_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '店铺名称',
          dataIndex: 'shops_name',
          customRender: (text, row) => {
            return (
              <a
                href={`${this.userUrl}?uid=${row.shops_uid}&isShop=1`}
                target="_blank"
              >
                {text || '(暂无名称)'}
              </a>
            )
          }
        },
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
        return getShopStaffList({ ...parameter, ...params })
      },
      selectedRowKeys: [],
      selectedRows: [],
      projectOptions: [],
      permissionVisible: false,
      powerForm: {
        type: '1',
        clerk_power_data: []
      },
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
      powers: [],
      editFormVisible: false
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
      this.getClerkPrivilege()
    },
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data || []
      })
    },
    getClerkPrivilege () {
      getClerkPrivilege().then(({ data }) => {
        this.powers = data || []
      })
    },
    refreshTable (bool = false) {
      this.$refs.table.refresh(bool)
    },
    resetTable () {
      this.queryParam = {}
      this.refreshTable(true)
    },
    addShop () {
      this.$refs['add-form'].resetFields()
      this.editFormVisible = true
    },
    // 批量删除
    batchRemove () {
      if (this.selectedRowKeys.length) {
        const that = this
        this.$confirm({
          title: '删除店员',
          content: h => (
            <div>
              确定删除{this.selectedRowKeys.length}个店员吗？
              <span style="color:red;">删除后则失去店铺权限</span>
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
            that.handleRemove(that.selectedRowKeys.join(','))
          },
          onCancel () {}
        })
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    handleRemove (id) {
      delShopStaff({
        shops_clerk_id_text: id
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
      form.clerk_power_data = form.clerk_power ? form.clerk_power.split(',') : []
      this.$refs['add-form'].setFieldsValue(form)
      this.editFormVisible = true
    },
    submitSuccess () {
      this.refreshTable()
    },
    openShopPower () {
      if (this.selectedRowKeys.length) {
        this.powerForm.clerk_power_data = []
        this.powerForm.type = '1'
        this.permissionVisible = true
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    setStaffPower () {
      validAForm(this.$refs.form).then(async () => {
        const { success } = await setStaffPower({
          shops_clerk_id_text: this.selectedRowKeys.join(','),
          clerk_power_data: this.powerForm.clerk_power_data,
          type: this.powerForm.type
        })
        if (success) {
          this.$message.success('提交成功')
          this.refreshTable()
          this.permissionVisible = false
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
