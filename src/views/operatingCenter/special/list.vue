<template>
  <page-header-view>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="专题状态">
                <a-select v-model="queryParam.isOpen" placeholder="请选择">
                  <a-select-option
                    v-for="option in statusOptions"
                    :value="option.value"
                    :key="option.value"
                  >
                    {{ option.text }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="专题名称">
                <a-input
                  v-model="queryParam.specialSearch"
                  placeholder="ID、名称"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="商品">
                <a-input
                  v-model="queryParam.goodsSearch"
                  placeholder="编号、名称"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col v-if="isParentProject" :md="8" :sm="24">
              <a-form-item label="所属项目">
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
              <a-form-item label="创建时间">
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
              :md="isParentProject ? 8 : 16"
              :isAdvanced="false"
              @reset="reset"
              @search="refresh"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <div class="table-operator">
        <a-button type="primary" @click="goEdit">新增</a-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchOperation('openEditValidTime')">
              有效时间
            </a-menu-item>
            <a-menu-item key="2" @click="batchOperation('batchFinish')">
              结束
            </a-menu-item>
            <a-menu-item key="3" @click="batchOperation('batchRemove')">
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
        :sortKey="{ ascend: 'asc', descend: 'desc' }"
        :data="loadData"
        :alert="{ clear: true }"
        :rowSelection="rowSelection"
        :rowSelectionPaging="true"
        :showPagination="true"
      >
        <span class="table-action" slot="action" slot-scope="text, record">
          <template>
            <a @click="goDetail(record)">查看</a>
            <a @click="goEdit(record)">编辑</a>
            <a @click="handleFinish([record])">结束</a>
            <a @click="handleRemove([record])">删除</a>
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal
      v-model="validTimeVisible"
      :title="validTimeTitle"
      :width="600"
      :destroyOnClose="true"
      @ok="openEditValidTime"
    >
      <a-form-model
        ref="validTimeForm"
        :model="validTimeForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="已选专题">
          {{ selectSpecialName }}
        </a-form-model-item>
        <a-form-model-item required prop="is_open" label="有效时间">
          <a-radio-group v-model="validTimeForm.is_open">
            <a-radio value="1">有限</a-radio>
            <a-radio value="2">不限</a-radio>
          </a-radio-group>
          <template v-if="+validTimeForm.is_open === 1">
            <a-form-model-item
              prop="time"
              :rules="{required: true, message: '请选择有效时间'}"
              style="margin-top: 10px;margin-bottom: 0;"
            >
              <a-range-picker
                v-model="validTimeForm.time"
                :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                :placeholder="['开始时间', '结束时间']"
                valueFormat="YYYY-MM-DD HH:mm:ss"
                style="width: 100%;"
              />
            </a-form-model-item>
            <div style="color: #00000072;">
              到达设定时间将自动生效和失效，生效期间则在APP显示
            </div>
          </template>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </page-header-view>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { AdvancedForm, STable } from '@/components'
import { validAForm } from '@/utils/util'
import PageHeaderView from '@/layouts/PageHeaderView'
import { getProjectList } from '@/api/userManage/business'
import { getList, delSpecial } from '@/api/operatingCenter/special'

export default {
  name: 'SpecialList',
  components: {
    AdvancedForm,
    PageHeaderView,
    STable
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 16 }, sm: { span: 16 } },
      statusOptions: [
        { value: '1', text: '未开始' },
        { value: '2', text: '进行中' },
        { value: '3', text: '已结束' }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      projectOptions: [],
      icon: h => (
        <a-icon theme="filled" type="close-circle" style="color: red" />
      ),
      warningIcon: h => (
        <a-icon
          type="exclamation-circle"
          style="color: #faad14"
          theme="filled"
        />
      ),
      infoIcon: h => (
        <a-icon type="info-circle" style="color: #1890ff" theme="filled" />
      ),
      // 查询参数
      queryParam: {},
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '所属项目',
          dataIndex: 'title1',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '专题名称',
          dataIndex: 'title',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '专题状态',
          dataIndex: 'open_desc',
          sorter: true
        },
        {
          title: '有效时间',
          dataIndex: 'stime',
          customRender: (text, row) => {
            const ele = (
              <div>
                {text ? <div>起 {text}</div> : ''}
                {row.etime ? <div>止 {row.etime}</div> : ''}
              </div>
            )
            return text || row.etime ? ele : '--'
          }
        },
        {
          title: '展示形式',
          dataIndex: 'type_desc'
        },
        {
          title: '商品',
          dataIndex: 'goods_num',
          sorter: true
        },
        {
          dataIndex: 'visit_num',
          sorter: true,
          title: () => {
            return (
              <div>
                浏览量
                <a-tooltip>
                  <template slot="title">一个用户仅算一次</template>
                  <a-icon
                    type="info-circle"
                    style="color: #797979;margin-top: 3px;margin-left: 3px;"
                  />
                </a-tooltip>
              </div>
            )
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          class: 'nowrap',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getList(Object.assign(parameter, this.queryParam))
      },
      validTimeVisible: false,
      validTimeForm: {
        is_open: '1',
        time: []
      }
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    validTimeTitle () {
      return `批量修改有效时间（${this.selectedRowKeys.length}）`
    },
    selectSpecialName () {
      return this.selectedRows.map(obj => obj.name).join('、')
    },
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  created () {
    this.isParentProject && this.getProjectList()
  },
  methods: {
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data || []
      })
    },
    refresh (bool) {
      this.$refs.table.refresh(bool)
    },
    reset () {
      this.queryParam = {}
      this.refresh(true)
    },
    batchOperation (key) {
      if (this.selectedRowKeys.length) {
        this[key](this.selectedRows)
      } else {
        this.$message.warning('请选择后再进行操作')
      }
    },
    openEditValidTime () {
      this.validTimeForm = {
        is_open: '1',
        time: []
      }
      this.validTimeVisible = true
    },
    setValidTime () {
      validAForm(this.$refs.validTimeForm).then(async () => {

      })
    },
    batchFinish (value) {
      const status = value.some(record => {
        return record.coupon_status !== '2'
      })
      if (status) {
        this.$message.warning('已选择的项中包含不可操作')
        return
      }
      this.handleFinish(value)
    },
    handleFinish (data) {
      const that = this
      const isOnlyOne = data.length === 1
      const content = isOnlyOne
        ? `确定结束专题"${data[0].name}"吗？`
        : `确定结束${data.length}个专题吗？`
      this.$confirm({
        title: '结束专题',
        content,
        icon: this.warningIcon,
        onOk () {
          that.finishSpecial(that.selectedRowKeys.join(','))
        },
        onCancel () {}
      })
    },
    async finishSpecial (id) {
      const { success } = await delSpecial({
        special_id: id
      })
      if (success) {
        this.$message.success('操作成功')
        this.refresh()
      }
    },
    // 批量删除
    batchRemove (value) {
      const status = value.some(record => {
        return record.coupon_status !== '2'
      })
      if (status) {
        this.$message.warning('已选择的项中包含不可操作')
        return
      }
      this.handleRemove(value)
    },
    handleRemove (data) {
      const that = this
      const isOnlyOne = data.length === 1
      const oneContent = `确定删除专题"${data[0].name}"吗？`
      const mulContent = () => (
        <div>
          <span style="color: #f5222d;">相关专题信息都会被删除</span>
          ，确定删除{data.length}个专题吗？
        </div>
      )
      this.$confirm({
        title: '删除专题',
        content: isOnlyOne ? oneContent : mulContent,
        icon: this.warningIcon,
        onOk () {
          that.handleFinish(that.selectedRowKeys.join(','))
        },
        onCancel () {}
      })
    },
    async delSpecial (id) {
      const { success, message } = await delSpecial({
        special_id: id
      })
      if (success) {
        this.$message.success('操作成功')
        this.refresh()
      } else {
        this.$info({
          title: '无法删除活动',
          content: message,
          icon: this.infoIcon
        })
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    goEdit ({ id }) {
      this.$router.push({
        name: 'specialEdit',
        query: {
          id
        }
      })
    },
    goDetail ({ id }) {
      this.$router.push({
        name: 'specialDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
