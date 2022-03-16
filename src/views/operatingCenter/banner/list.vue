<template>
  <page-header-view>
    <a-card class="search-card" style="margin-top: 24px" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="位置">
                <a-select
                  v-model="queryParam.state1"
                  placeholder="请选择"
                  :options="placeOptions"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态">
                <a-select
                  v-model="queryParam.state"
                  placeholder="请选择"
                  :options="statusOptions"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="跳转类型">
                <a-select
                  v-model="queryParam.state2"
                  placeholder="请选择"
                  :options="typeOptions"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="标题">
                <a-input
                  v-model="queryParam.goods_text"
                  placeholder="请输入"
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
              轮播时间
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
        <template slot="switch" slot-scope="text, record">
          <a-switch
            :checked="Boolean(+record.is_enabled)"
            @click="value => changeEnabled(record, value)"
          ></a-switch>
        </template>
        <template slot="listOrder" slot-scope="text, record">
          <a-input
            v-model="record.listOrder"
            @change.native="changeOrder(record)"
            style="text-align:center;"
          ></a-input>
        </template>
        <span class="table-action" slot="action" slot-scope="text, record">
          <a @click="goEdit(record)">编辑</a>
          <a-popconfirm
            v-if="+record.state1 === 1"
            title="你确定要删除这行内容吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="delSpecial([record])"
          >
            <a-icon
              slot="icon"
              type="close-circle"
              theme="filled"
              style="color: red"
            />
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
    </a-card>
    <a-modal
      v-model="openTimeVisible"
      :title="validTimeTitle"
      :width="600"
      :destroyOnClose="true"
      @ok="setValidTime"
    >
      <a-form-model
        ref="openTimeForm"
        :model="openTimeForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="标题">
          {{ selectSpecialName }}
        </a-form-model-item>
        <a-form-model-item required prop="is_limit" label="轮播时间">
          <a-switch v-model="openTimeForm.is_limit"></a-switch>
          <template v-if="+openTimeForm.is_limit === 1">
            <a-form-model-item
              prop="time"
              :rules="{ required: true, message: '请选择轮播时间' }"
              style="margin-top: 10px;margin-bottom: 0;"
            >
              <a-range-picker
                v-model="openTimeForm.time"
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
import cloneDeep from 'lodash.clonedeep'
import { mapGetters } from 'vuex'
import { AdvancedForm, STable } from '@/components'
import { validAForm } from '@/utils/util'
import PageHeaderView from '@/layouts/PageHeaderView'
import { getProjectList } from '@/api/userManage/business'
import {
  getSpecialList,
  delSpecial,
  updateFieldCategory,
  editLimitTime
} from '@/api/operatingCenter/banner'

export default {
  name: 'Banner',
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
      placeOptions: [
        { value: '1', label: '首页' },
        { value: '2', label: '生活' },
        { value: '3', label: '电影' }
      ],
      statusOptions: [
        { value: '2', label: '开启' },
        { value: '1', label: '关闭' }
      ],
      typeOptions: [
        { value: '1', label: '跳转商品' },
        { value: '2', label: '跳转活动' },
        { value: '3', label: '跳转任务' },
        { value: '4', label: '跳转资讯' },
        { value: '5', label: '跳转外链' },
        { value: '6', label: '跳转其它' }
      ],
      projectOptions: [],
      selectedRowKeys: [],
      selectedRows: [],
      warningIcon: h => (
        <a-icon
          type="exclamation-circle"
          style="color: #faad14"
          theme="filled"
        />
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
          title: '位置',
          dataIndex: 'project_name2'
        },
        {
          title: '标题',
          dataIndex: 'thematic_name',
          customRender: text => {
            return <div class="two-Multi">{text}</div>
          }
        },
        {
          title: '轮播图',
          dataIndex: 'img',
          align: 'center',
          customRender: text => {
            const openBigImg = () => {
              this.openImg([text])
            }
            return <img class="table-img" src={text} onClick={openBigImg} />
          }
        },
        {
          title: '背景色',
          dataIndex: 'bgColor',
          align: 'center',
          width: 80,
          customRender: text => {
            const style = {
              backgroundColor: text
            }
            return <div class="table-bg-tag" style={style}></div>
          }
        },
        {
          title: '链接',
          dataIndex: 'content_type_name3'
        },
        {
          title: '状态',
          align: 'center',
          width: 80,
          dataIndex: 'content_type_name',
          scopedSlots: { customRender: 'switch' }
        },
        {
          title: '轮播时间',
          dataIndex: 'stime',
          customRender: (text, row) => {
            const isLimit = +row.is_limit
            if (isLimit === 0) {
              return '不限'
            }
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
          title: '排序',
          dataIndex: 'listOrder',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'listOrder' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getSpecialList(Object.assign(parameter, this.queryParam))
      },
      activeData: {},
      openTimeVisible: false,
      openTimeForm: {
        is_limit: '1',
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
    if (this.isParentProject) {
      this.getProjectList()
    } else {
      this.columns.splice(1, 1)
    }
  },
  methods: {
    // 获取项目列表
    getProjectList () {
      getProjectList().then(({ data }) => {
        this.projectOptions = data || []
      })
    },
    openImg (arr) {
      this.$viewerApi({
        images: arr
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
      this.openTimeForm = {
        is_limit: false,
        time: []
      }
      this.openTimeVisible = true
    },
    setValidTime () {
      validAForm(this.$refs.openTimeForm).then(async () => {
        const params = cloneDeep(this.openTimeForm)
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
          this.$message.success('操作成功')
          this.refresh()
        }
      })
    },
    // 批量删除
    batchRemove (value) {
      const status = value.some(record => {
        return +record.state1 !== 1
      })
      if (status) {
        this.$message.warning('已选择的项中包含不可操作')
        return
      }
      this.handleRemove(value)
    },
    handleRemove (data) {
      const that = this
      this.$confirm({
        title: '删除专题',
        content: `确定要删除${data.length}张轮播图吗？`,
        icon: this.warningIcon,
        onOk () {
          that.delSpecial(that.selectedRowKeys)
        },
        onCancel () {}
      })
    },
    async delSpecial (id) {
      const { success } = await delSpecial({
        thematic_id_data: id
      })
      if (success) {
        this.$message.success('操作成功')
        this.refresh()
      }
    },
    changeEnabled (data, value) {
      this.activeData = data
      if (value) {
        this.openEditValidTime()
      } else {
        this.setSwitch(value)
      }
    },
    setSwitch (value) {
      const { id } = this.activeData
      updateFieldCategory({
        id,
        field_name: 'is_enabled',
        field_value: value ? '1' : '0'
      }).then(({ success }) => {
        if (success) {
          this.activeData.is_enabled = !+this.activeData.is_enabled
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
          this.refreshTable()
        }
      })
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
.table-action a + a {
  margin-left: 10px;
}
.table-img {
  width: 70px;
}
.table-bg-tag {
  display: inline-block;
  width: 21px;
  height: 21px;
}
</style>
