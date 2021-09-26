<template>
  <div>
    <page-header :routes="routes"></page-header>
    <div style="padding: 24px;">
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <!-- <a-col :md="8" :sm="24">
                <a-form-item label="公司">
                  <a-select
                    v-model="queryParam.company_id"
                    placeholder="请选择"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="部门">
                  <a-select
                    v-model="queryParam.division_id"
                    placeholder="请选择"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="职务">
                  <a-select
                    v-model="queryParam.post_id"
                    placeholder="请选择"
                  ></a-select>
                </a-form-item>
              </a-col> -->
              <a-col :md="8" :sm="24">
                <a-form-item label="员工">
                  <a-input
                    v-model="queryParam.staff_text"
                    placeholder="编号、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="入职时间">
                  <a-range-picker
                    v-model="queryParam.time"
                    valueFormat="YYYY-MM-DD"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="添加时间">
                    <a-range-picker
                      v-model="queryParam.addTime"
                      valueFormat="YYYY-MM-DD"
                      :placeholder="['开始时间', '结束时间']"
                      style="width: 100%;"
                    />
                  </a-form-item>
                </a-col>
                <!-- <a-col :md="8" :sm="24">
                  <a-form-item label="工作项目">
                    <a-select
                      v-model="queryParam.item_id"
                      placeholder="请选择"
                    ></a-select>
                  </a-form-item>
                </a-col> -->
                <a-col :md="8" :sm="24">
                  <a-form-item label="是否注册">
                    <a-select
                      v-model="queryParam.is_logon"
                      placeholder="请选择"
                    >
                      <a-select-option key="1" value="1"
                        >已注册</a-select-option
                      >
                      <a-select-option key="0" value="0"
                        >未注册</a-select-option
                      >
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="用户类型">
                    <a-select
                      v-model="queryParam.user_type"
                      :options="userTypeOptions"
                      placeholder="请选择"
                    ></a-select>
                  </a-form-item>
                </a-col>
              </template>
              <advanced-form
                v-model="advanced"
                :md="8"
                @reset="
                  queryParam = {};
                  $refs.table.refresh(true);
                "
                @search="$refs.table.refresh(true)"
              ></advanced-form>
            </a-row>
          </a-form>
        </div>
      </a-card>
      <a-card style="margin-top: 24px" :bordered="false">
        <div class="table-operator">
          <a-button type="primary" @click="addEmployee">
            新增员工
          </a-button>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="handleImport">
                导入员工
              </a-menu-item>
              <a-menu-item key="2" @click="openTransfer">
                转账幸福币
              </a-menu-item>
              <a-menu-item key="3" @click="batchRemove">
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
              <!-- <a @click="goDetail(record)">查看</a> -->
              <a @click="handleEdit(record)">编辑</a>
              <a
                ><a-popconfirm
                  title="你确定要删除这行内容吗？"
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
    </div>
    <a-modal
      v-model="transferShow"
      title="幸福币转账申请"
      :width="640"
      @ok="awardCredits"
      :destroyOnClose="true"
    >
      <a-form-model
        ref="transferForm"
        :model="transferForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="转账人数">
          <div class="alert-text">{{ selectedRowKeys.length }}人</div>
        </a-form-model-item>
        <a-form-model-item
          label="转账数量"
          prop="credits"
          :rules="[{ required: true, message: '请输入转账数量' }]"
        >
          <a-input-number
            v-model="transferForm.credits"
            :min="1"
          ></a-input-number
          ><span style="margin-left: 7px;">幸福币/人</span>
          <div
            v-if="transferForm.credits"
            class="alert-text"
            style="line-height: 1;padding-top: 7px;"
          >
            {{ selectedRowKeys.length * transferForm.credits || 0 }}幸福币
          </div>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark" style="margin-bottom: 0;">
          <a-textarea
            v-model="transferForm.remark"
            rows="4"
            :maxLength="300"
            placeholder="请输入"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <add-form
      v-model="addVisible"
      ref="add-form"
      @submit="submitSuccess"
    ></add-form>
    <import-file
      v-model="importVisible"
      templateUrl=""
      name="staff_file"
      :request="importStaff"
      @submit="submitSuccess"
    ></import-file>
  </div>
</template>

<script>
import { STable, AdvancedForm, PageHeader } from '@/components'
import AddForm from '@/views/userManage/employee/AddForm'
import importFile from '@/views/userManage/employee/importFile'
import {
  getStaffList,
  delStaff,
  importStaff,
  getItemList,
  awardCredits
} from '@/api/userManage'
import clonedeep from 'lodash.clonedeep'

export default {
  name: 'reportMaterial',
  components: {
    STable,
    AdvancedForm,
    AddForm,
    importFile,
    PageHeader
  },
  data () {
    return {
      addVisible: false,
      importVisible: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      columns: [
        // {
        //   title: '公司',
        //   dataIndex: 'company_name',
        //   width: '10%',
        //   customRender: text => {
        //     return <div class="two-Multi">{text}</div>
        //   }
        // },
        // {
        //   title: '部门',
        //   dataIndex: 'division_name'
        // },
        {
          title: '员工编号',
          dataIndex: 'staff_numb',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '姓名',
          dataIndex: 'realname',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        // {
        //   title: '职务',
        //   dataIndex: 'post_name',
        //   customRender: text => {
        //     return <div class="two-Multi">{text}</div>
        //   }
        // },
        {
          title: '入职日期',
          dataIndex: 'entry_time',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '手机号',
          dataIndex: 'mobile'
        },
        // {
        //   title: '工作项目',
        //   dataIndex: 'item_name_text',
        //   customRender (text) {
        //     return text || '--'
        //   }
        // },
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
                    <span>删除即解除员工身份</span>
                  </template>
                  <a-icon type="info-circle" style="margin-left: 5px;" />
                </a-tooltip>
              </div>
            )
          },
          dataIndex: 'action',
          // width: '140px',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = clonedeep(this.queryParam)
        const time = params.time
        const addTime = params.addTime
        let startDate = ''
        let endDate = ''
        let csDate = ''
        let ceDate = ''
        if (time && time.length) {
          startDate = time[0]
          endDate = time[1]
        }
        if (addTime && addTime.length) {
          csDate = addTime[0]
          ceDate = addTime[1]
        }
        delete params.time
        delete params.addTime
        params.entry_stime = startDate
        params.entry_etime = endDate
        params.c_stime = csDate
        params.c_etime = ceDate
        return getStaffList(Object.assign(parameter, params))
      },
      // 用户类型
      userTypeOptions: [
        {
          value: 1,
          label: '业主'
        },
        {
          value: 2,
          label: '业主成员'
        },
        {
          value: 3,
          label: '租户'
        },
        {
          value: 4,
          label: '租户成员'
        },
        {
          value: 0,
          label: '访客'
        },
        {
          value: 10,
          label: '全部游客'
        },
        {
          value: 11,
          label: '游客未认证'
        },
        {
          value: 12,
          label: '游客定位'
        },
        {
          value: 13,
          label: '游客未定位'
        }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      transferShow: false, // 转账弹窗
      transferForm: {
        credits: '',
        remark: ''
      },
      projectList: [],
      importStaff,
      routes: [
        {
          path: '/zht/user/user/getUserList',
          isTop: true,
          breadcrumbName: '用户管理'
        },
        {
          path: '/employee/list',
          breadcrumbName: '员工管理'
        },
        {
          breadcrumbName: '员工列表'
        }
      ]
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
    this.getItemList()
  },
  methods: {
    getItemList () {
      getItemList().then(({ data }) => {
        this.projectList = data
      })
    },
    addEmployee () {
      this.$refs['add-form'].resetFields()
      this.addVisible = true
    },
    handleImport () {
      this.importVisible = true
    },
    // 批量删除
    batchRemove () {
      if (this.selectedRowKeys.length) {
        console.log('批量删除')
        const that = this
        this.$confirm({
          title: '删除员工',
          content: `确定删除${this.selectedRowKeys.length}个员工吗？`,
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
            that.selectedRowKeys = []
            that.selectedRows = []
          },
          onCancel () {}
        })
      } else {
        this.$message.warning('请选择员工')
      }
    },
    handleRemove (id) {
      delStaff({
        staff_ids: id
      }).then(({ success }) => {
        this.$message.success('删除成功')
        this.$refs.table.refresh()
      })
    },
    handleEdit (record) {
      const form = clonedeep(record)
      form.staff_id = form.id
      form.item_ids = form.item_ids ? form.item_ids.split(',') : []
      console.log(form.item_ids)
      this.$refs['add-form'].setFieldsValue(form)
      this.addVisible = true
    },
    openTransfer () {
      if (this.selectedRowKeys.length) {
        console.log(this.$refs, this.$refs.transferForm)
        this.transferForm = {
          credits: '',
          remark: ''
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
              this.$message.success('转账成功')
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
    goDetail ({ orderId: id }) {
      this.$router.push({
        name: 'OrderDetail',
        query: {
          id
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
</style>
