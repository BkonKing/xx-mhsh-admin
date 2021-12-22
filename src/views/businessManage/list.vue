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
                    :key="item.project_id"
                    :value="item.project_id"
                    >{{ item.project_name }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户">
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
        <a-button type="primary" @click="addShop">
          新增商家
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="openShopPower">
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
      :power-options="powerOptions"
      :project-options="projectOptions"
      @submit="submitSuccess"
    ></store-form>
    <a-modal
      v-model="permissionVisible"
      title="设置商家权限"
      :width="600"
      @ok="setShopsPower"
      :destroyOnClose="true"
    >
      <div class="permission-modal-row">给{{selectedRows.length}}个店铺设置权限：</div>
      <div class="permission-modal-row">
        <span
          v-for="item in selectedRows"
          :key="item.id"
          class="permission-modal-span"
          >{{ item.shops_name || '(暂无名称)' }}</span
        >
      </div>
      <div class="permission-modal-line"></div>
      <div style="margin-bottom: 10px;">商家权限</div>
      <div>
        <a-form-model ref="form" :model="powerForm">
          <a-form-model-item
            prop="power"
            :rules="{ required: true, message: '请选择权限' }"
            style="margin-bottom: 0;"
            ><a-checkbox-group v-model="powerForm.power" :options="powerOptions"
          /></a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </page-header-view>
</template>

<script>
// /store/list
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { STable, AdvancedForm } from '@/components'
import { validAForm } from '@/utils/util'
import storeForm from './components/storeForm'
import {
  getShopList,
  getProjectList,
  delShops,
  setShopsPower,
  getBusinessSetting
} from '@/api/userManage/business'

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
      editForm: false,
      // 查询参数
      queryParam: {},
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
          customRender: text => {
            return <div class="two-Multi">{text || '(暂无名称)'}</div>
          }
        },
        {
          title: '幸福币',
          dataIndex: 'credits',
          sorter: true,
          customRender: text => {
            return text || 0
          }
        },
        {
          title: '店铺券',
          dataIndex: 'coupon_count',
          sorter: true,
          customRender: text => {
            return text || '0'
          }
        },
        {
          title: '联系方式',
          dataIndex: 'phone'
        },
        {
          title: '用户昵称',
          dataIndex: 'nickname',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '姓名/手机号',
          dataIndex: 'realname',
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
          title: '添加时间',
          dataIndex: 'ctime',
          sorter: true,
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
        return getShopList(Object.assign(parameter, params))
      },
      selectedRowKeys: [],
      selectedRows: [],
      projectOptions: [],
      permissionVisible: false,
      powerForm: {
        power: []
      },
      powerOptions: [
        // {
        //   label: '提现申请',
        //   value: '1'
        // },
        {
          label: '商铺券管理',
          value: '2'
        },
        {
          label: '扫码核销券',
          value: '3'
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
    this.initOptions()
  },
  methods: {
    initOptions () {
      this.getProjectList()
      this.getBusinessSetting()
    },
    async getBusinessSetting () {
      const { power_name_data: power } = await getBusinessSetting()
      this.powerOptions = power.map(obj => ({
        label: obj.text,
        value: obj.key
      }))
    },
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
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
    addShop () {
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
      delShops({
        shops_id_text: id
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
      form.company_id = form.company_id || undefined
      form.division_id = form.division_id || undefined
      form.post_id = form.post_id || undefined
      form.power = form.power ? form.power.split(',') : []
      this.$refs['add-form'].setFieldsValue(form)
      this.editForm = true
    },
    submitSuccess () {
      this.refreshTable()
    },
    openShopPower () {
      if (this.selectedRowKeys.length) {
        this.powerForm.power = []
        this.permissionVisible = true
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    setShopsPower () {
      validAForm(this.$refs.form).then(async () => {
        const { success } = await setShopsPower({
          shops_id_text: this.selectedRowKeys.join(','),
          power: this.powerForm.power.join(',')
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
