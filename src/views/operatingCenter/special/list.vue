<template>
  <page-header-view>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="专题状态">
                <a-select v-model="queryParam.state" placeholder="请选择">
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
                  v-model="queryParam.thematic_text"
                  placeholder="ID、名称"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="商品">
                <a-input
                  v-model="queryParam.goods_text"
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
        <a-button @click="openSetting">设置</a-button>
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
          <a @click="goDetail(record)">查看</a>
          <template
            v-if="
              record.project_id == projectId ||
                (isParentProject && !+record.project_id)
            "
          >
            <a @click="goEdit(record)">编辑</a>
            <a v-if="+record.state1 === 1" @click="handleFinish([record])"
              >结束</a
            >
            <a v-if="+record.state1 === 3" @click="handleRemove([record])"
              >删除</a
            >
          </template>
        </span>
      </s-table>
    </a-card>
    <a-modal
      v-model="validTimeVisible"
      :title="validTimeTitle"
      :width="600"
      :destroyOnClose="true"
      @ok="setValidTime"
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
        <a-form-model-item required prop="is_limit" label="有效时间">
          <a-radio-group v-model="validTimeForm.is_limit">
            <a-radio value="1">有限</a-radio>
            <a-radio value="0">不限</a-radio>
          </a-radio-group>
          <template v-if="+validTimeForm.is_limit === 1">
            <a-form-model-item
              prop="time"
              :rules="{ required: true, message: '请选择有效时间' }"
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
    <a-modal
      v-model="wxHomeVisible"
      title="设置"
      :width="660"
      :destroyOnClose="true"
      @ok="setWxHome"
    >
      <a-form-model
        ref="wxHomeForm"
        :model="wxHomeForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="小程序首页专题" prop="thematic_id" required>
          <a-select
            v-model="wxHomeForm.thematic_id"
            show-search
            placeholder="请选择"
            :filter-option="filterSpecial"
          >
            <a-select-option
              v-for="item in specialOptions"
              :key="item.id"
              :value="item.id"
              >{{ item.thematic_name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </page-header-view>
</template>

<script>
import moment from 'moment'
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { AdvancedForm, STable } from '@/components'
import { validAForm } from '@/utils/util'
import PageHeaderView from '@/layouts/PageHeaderView'
import { getProjectList } from '@/api/userManage/business'
import {
  getSpecialList,
  delSpecial,
  finishSpecial,
  editLimitTime,
  getSpecialOptions,
  saveWxHomeSpecial
} from '@/api/operatingCenter/special'

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
        { value: '2', text: '未开始' },
        { value: '1', text: '进行中' },
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
          dataIndex: 'project_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '专题名称',
          dataIndex: 'thematic_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '专题状态',
          dataIndex: 'state',
          sorter: true
        },
        {
          title: '有效时间',
          dataIndex: 's_time',
          customRender: (text, row) => {
            const isLimit = +row.is_limit
            if (isLimit === 0) {
              return '不限'
            }
            const ele = (
              <div>
                <div>{text}</div>
                <div>{row.e_time}</div>
              </div>
            )
            return text || row.e_time ? ele : '--'
          }
        },
        {
          title: '展示形式',
          dataIndex: 'content_type_name'
        },
        {
          title: '商品',
          dataIndex: 'goods_num',
          sorter: true
        },
        {
          dataIndex: 'browse_num',
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
        const params = cloneDeep(this.queryParam)
        const time = params.time
        if (time && time.length) {
          params.show_stime = time[0]
          params.show_etime = time[1]
        }
        return getSpecialList(Object.assign(parameter, params))
      },
      validTimeVisible: false,
      validTimeForm: {
        is_limit: '1',
        time: []
      },
      wxHomeVisible: false,
      wxHomeForm: {
        thematic_id: undefined
      },
      specialOptions: []
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    validTimeTitle () {
      return `批量修改有效时间（${this.selectedRowKeys.length}）`
    },
    selectSpecialName () {
      return this.selectedRows.map(obj => obj.thematic_name).join('、')
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
        is_limit: '1',
        time: []
      }
      this.validTimeVisible = true
    },
    setValidTime () {
      validAForm(this.$refs.validTimeForm).then(async () => {
        const params = cloneDeep(this.validTimeForm)
        const time = params.time
        if (time && time.length) {
          params.s_time = time[0]
          params.e_time = time[1]
        }
        const { success } = await editLimitTime({
          ...params,
          thematic_id_data: this.selectedRowKeys
        })
        if (success) {
          this.validTimeVisible = false
          this.operateSuccess(this.selectedRowKeys)
        }
      })
    },
    batchFinish (value) {
      const status = value.some(record => {
        return +record.state1 !== 1
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
        ? `确定结束专题"${data[0].thematic_name}"吗？`
        : `确定结束${data.length}个专题吗？`
      const ids = isOnlyOne ? [data[0].id] : this.selectedRowKeys
      this.$confirm({
        title: '结束专题',
        content,
        icon: this.warningIcon,
        onOk () {
          that.finishSpecial(ids)
        },
        onCancel () {}
      })
    },
    async finishSpecial (ids) {
      const { success } = await finishSpecial({
        thematic_id_data: ids
      })
      if (success) {
        this.operateSuccess(ids)
      }
    },
    // 批量删除
    batchRemove (value) {
      const status = value.some(record => {
        return +record.state1 !== 3
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
      const oneContent = `确定删除专题"${data[0].thematic_name}"吗？`
      const mulContent = () => (
        <div>
          <span style="color: #f5222d;">相关专题信息都会被删除</span>
          ，确定删除{data.length}个专题吗？
        </div>
      )
      const ids = isOnlyOne ? [data[0].id] : this.selectedRowKeys
      this.$confirm({
        title: '删除专题',
        content: isOnlyOne ? oneContent : mulContent,
        icon: this.warningIcon,
        onOk () {
          that.delSpecial(ids)
        },
        onCancel () {}
      })
    },
    async delSpecial (ids) {
      const {
        success,
        no_num: disabledNum,
        no_thematic_text: name
      } = await delSpecial({
        thematic_id_data: ids
      })
      if (success) {
        this.operateSuccess(ids)
      }
      if (+disabledNum > 0) {
        this.$info({
          title: '无法删除活动',
          content: `专题"${name}"已关联专区，暂不能删除`,
          icon: this.infoIcon,
          onOk: () => {
            this.operateCallback(ids)
          }
        })
      }
    },
    operateSuccess (ids) {
      this.$message.success('操作成功')
      this.operateCallback(ids)
    },
    operateCallback (ids) {
      this.refresh()
      ids.length > 1 ? this.onSelectChange([], []) : this.cancelSelect(ids)
    },
    openSetting () {
      this.getSpecialOptions()
      this.wxHomeForm.thematic_id = undefined
      this.wxHomeVisible = true
    },
    getSpecialOptions () {
      getSpecialOptions().then(({ data }) => {
        this.specialOptions = data.list
      })
    },
    filterSpecial (input, option) {
      const value = input.toLowerCase()
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.indexOf(value) >= 0 || option.key == value
    },
    setWxHome () {
      validAForm(this.$refs.wxHomeForm).then(async () => {
        const { success } = await saveWxHomeSpecial({
          ...this.wxHomeForm
        })
        if (success) {
          this.$message.success('设置成功')
          this.wxHomeVisible = false
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 取消选择
    cancelSelect (data) {
      this.selectedRowKeys = this.selectedRowKeys.filter(
        obj => !data.includes(obj)
      )
      this.selectedRows = this.selectedRows.filter(obj => !data.includes(obj))
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

<style lang="less" scoped>
.table-action a + a {
  margin-left: 10px;
}
/deep/ .ant-pro-page-header-wrap-children-content {
  padding-bottom: 24px;
}
</style>
