<template>
  <page-header-view>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="店铺归属">
                <a-select v-model="queryParam.project_id" placeholder="请选择">
                  <a-select-option
                    v-for="item in projectOptions"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.item_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户">
                <a-input
                  v-model="queryParam.staff_text"
                  placeholder="ID、昵称、姓名、手机号"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="店铺名称">
                <a-input
                  v-model="queryParam.staff_text"
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
            <advanced-form
              :md="16"
              :isAdvanced="false"
              @reset="resetTable"
              @search="refreshTable(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="addEmployee">
          新增商家
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="handleImport">
              商家权限
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
            <a
              :href="`/zht/user/user/getUserList?uid=${record.uid}`"
              target="_blank"
              >查看</a
            >
            <a @click="handleEdit(record)">编辑</a>
            <a
              ><a-popconfirm
                title="你确定要删除该商家吗？"
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
    <store-form
      v-model="editForm"
      ref="add-form"
      :company-options="companyOptions"
      :project-options="projectOptions"
      @submit="submitSuccess"
    ></store-form>
  </page-header-view>
</template>

<script>
// /store/list
import moment from 'moment'
import clonedeep from 'lodash.clonedeep'
import { STable, AdvancedForm } from '@/components'
import storeForm from './components/storeForm'
import {
  getStaffList,
  delStaff,
  getItemList,
  awardCredits
} from '@/api/userManage'

export default {
  name: 'storeList',
  components: {
    STable,
    AdvancedForm,
    storeForm
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      editForm: true,
      // 查询参数
      queryParam: {},
      columns: [
        {
          title: '店铺归属',
          dataIndex: 'company_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '店铺名称',
          dataIndex: 'division_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '幸福币',
          dataIndex: 'staff_numb',
          sorter: true,
          customRender: text => {
            return text || 0
          }
        },
        {
          title: '店铺券',
          dataIndex: 'realname',
          sorter: true,
          customRender: text => {
            return text || '0'
          }
        },
        {
          title: '联系方式',
          dataIndex: 'post_name'
        },
        {
          title: '用户昵称',
          dataIndex: 'entry_time',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
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
          title: '添加时间',
          dataIndex: 'ctime',
          customRender (text) {
            return text || '--'
          }
        },
        {
          title: () => {
            return (
              <div>
                操作
              <a-tooltip placement="top">
                <template slot="title">
                  <span>删除即解除商家身份</span>
                </template>
                <a-icon type="info-circle" style="margin-left: 5px;" />
              </a-tooltip>
              </div>
            )
          },
          dataIndex: 'action',
          width: '140px',
          scopedSlots: { customRender: 'action' }
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
      },
      selectedRowKeys: [],
      companyOptions: [],
      projectOptions: []
    }
  },
  computed: {
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
      this.getItemList()
    },
    // 获取项目列表
    getItemList () {
      getItemList().then(({ data }) => {
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
    addEmployee () {
      this.$refs['add-form'].resetFields()
      this.editForm = true
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
    handleRemove (id) {
      delStaff({
        staff_ids: id
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
      const form = clonedeep(record)
      form.staff_id = form.id
      form.company_id = form.company_id || undefined
      form.division_id = form.division_id || undefined
      form.post_id = form.post_id || undefined
      form.item_ids = form.item_ids ? form.item_ids.split(',') : []
      this.$refs['add-form'].setFieldsValue(form)
      this.editForm = true
    },
    openTransfer () {
      if (this.selectedRowKeys.length) {
        this.transferForm = {
          credits: '',
          remark: '员工福利'
        }
        this.transferShow = true
      } else {
        this.$message.warning('请选择员工')
      }
    },
    // 申请转账
    awardCredits () {
      this.$refs.transferForm.validate(valid => {
        if (valid) {
          awardCredits({
            staff_ids: this.selectedRowKeys.join(','),
            ...this.transferForm
          }).then(({ success, message }) => {
            if (success) {
              this.$message.success(message)
              this.transferShow = false
            } else {
              this.$message.error(message)
            }
          })
        } else {
          return false
        }
      })
    },
    submitSuccess () {
      this.$refs.table.refresh()
    },
    importSuccess () {
      this.$refs.table.refresh(true)
      this.initOptions()
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
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
</style>
