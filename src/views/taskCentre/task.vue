<template>
  <div class="task">
    <page-header-wrapper>
      <template #content>
        <div class="task-top">
          <div
            class="item"
            @click="changeTab('')"
            :class="{ active: currentIndex === '' }"
          >
            全部{{ tabInfo.total }}
          </div>
          <div
            class="item"
            @click="changeTab(0)"
            :class="{ active: currentIndex === 0 }"
          >
            待审核{{ tabInfo.to_be_check }}
          </div>
          <div
            class="item"
            @click="changeTab(1)"
            :class="{ active: currentIndex === 1 }"
          >
            待接单{{ tabInfo.order_be_received }}
          </div>
          <div
            class="item"
            @click="changeTab(2)"
            :class="{ active: currentIndex === 2 }"
          >
            待交付{{tabInfo.to_be_reviewed}}
          </div>
          <div
            class="item"
            @click="changeTab(3)"
            :class="{ active: currentIndex === 3 }"
          >
            已完成{{ tabInfo.to_completed }}
          </div>
          <div
            class="item"
            @click="changeTab(5)"
            :class="{ active: currentIndex === 5 }"
          >
            已终止{{ tabInfo.to_terminated }}
          </div>
          <div
            class="item"
            @click="changeTab(6)"
            :class="{ active: currentIndex === 6 }"
          >
            已失效{{ tabInfo.to_invalid }}
          </div>
          <div
            class="item"
            @click="changeTab(4)"
            :class="{ active: currentIndex === 4 }"
          >
            未通过{{ tabInfo.to_failed }}
          </div>
        </div>
      </template>
    </page-header-wrapper>
  <div class="bodyContent">
      <a-card class="card" ref="card">
      <div class="table-page-search-wrapper">
        <a-form-model layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="任务类型">
                <a-select v-model="task_type" placeholder="请选择">
                  <a-select-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.type_name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="任务状态">
                <a-select v-model="task_status" placeholder="请选择">
                  <a-select-option
                    v-for="(item, index) in taskStatusList"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="cardBol">
              <a-form-model-item label="进度状态">
                <a-select v-model="progress_status" placeholder="请选择">
                  <a-select-option
                    v-for="(item, index) in processStatus"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="!cardBol">
              <div class="btns">
                <a-button
class="btn1"
type="primary"
@click="search"
                  >查询</a-button
                >
                <a-button @click="reset">重置</a-button>
                <a-button
type="link"
@click="open"
                  >展开 <a-icon type="down" />
                </a-button>
              </div>
            </a-col>
            <template v-if="cardBol">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="任务方">
                  <a-input
                    v-model="task_user_search"
                    placeholder="手机号、用户昵称/ID、任务联系电话"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="接单方">
                  <a-input
                    v-model="accept_search"
                    placeholder="手机号、用户昵称/ID"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="任务">
                  <a-input
                    v-model="task_search"
                    placeholder="编号、标题、内容"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="可见小区">
                  <a-select placeholder="请选择" v-model="project_id">
                    <a-select-option
                      v-for="item in projectList"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.project_name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="可见地区">
                  <a-cascader
                    :changeOnSelect="true"
                    :options="options"
                    placeholder="请选择"
                    @change="onChangeCity"
                    :fieldNames="{
                      label: 'label',
                      value: 'label',
                      children: 'children'
                    }"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="可见群">
                  <a-input
                    v-model="group_search"
                    placeholder="群名称/ID"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="所属项目">
                  <a-select v-model="user_project" placeholder="请选择">
                    <a-select-option
                      v-for="item in projectList"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.project_name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="创建时间">
                  <a-range-picker
                  v-model="createTime"
                    class="piker-time"
                    :ranges="{
                      Today: [moment(), moment()],
                      'This Month': [moment(), moment().endOf('month')]
                    }"
                    show-time
                    @change="onChangeTime"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <div class="btns">
                  <a-button
class="btn1"
type="primary"
@click="search"
                    >查询</a-button
                  >
                  <a-button @click="reset">重置</a-button>
                  <a-button
type="link"
@click="close"
                    >收起 <a-icon
type="up"
                  /></a-button>
                </div>
              </a-col>
            </template>
          </a-row>
        </a-form-model>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="top">
        <a-button type="primary">新建任务</a-button>
        <a-button @click="batchOpera">批量操作 <a-icon type="down"/></a-button>
      </div>
      <div class="selected" v-if="selectedRowKeys.length > 0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <a-table
        rowKey="id"
        class="table"
        :columns="columns"
        :data-source="tableData"
        :pagination="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        @change="tableChange"
      >
        <template slot="task_user" slot-scope="text, record">
          <div>
            <div class="t1">{{ record.task_user }}</div>
            <div class="t2">{{ record.task_project }}</div>
          </div>
        </template>
        <div slot="customTitle">
          接单人数
          <a-tooltip>
            <template slot="title">
              接单人数/需求人数
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <template slot="accept_people" slot-scope="text, record">
          <span> {{ record.accept_people }}</span
          ><span>/</span>
          <span>{{ record.need_people }}</span>
        </template>
        <template slot="opera" slot-scope="text, record">
          <div class="btns">
            <a-button type="link" @click="lookOver(record)">查看</a-button>
            <a-button
type="link"
v-if="record.task_status === '待审核'"
@click="$router.push('/taskCentre/toCheck?id='+record.id)"
              >审核</a-button
            >
          </div>
        </template>
      </a-table>
      <div class="pagination">
        <a-pagination
          show-quick-jumper
          show-size-changer
          :default-current="pagination.currentPage"
          :page-size-options="pagination.sizes"
          :total="pagination.total"
          :page-size.sync="pagination.pageSize"
          :show-total="
            (total, range) =>
              `共 ${total} 条记录 第${pagination.currentPage}/${Math.ceil(
                total / pagination.pageSize
              )}页`
          "
          @change="onChange"
          @showSizeChange="sizeChange"
        />
      </div>
    </a-card>
  </div>
    <batchCheck
      ref="batchCheck"
      :selectedRowKeys="selectedRowKeys"
    ></batchCheck>
  </div>
</template>

<script>
import moment from 'moment'
import batchCheck from './batchCheck'
import { cityOpction } from '@/const/city'
import {
  toGetCommonTaskStatus,
  togetTaskList,
  toGetTaskType,
  toGetProcessStatus,
  toGetProject
} from '@/api/taskCentre'
export default {
  components: {
    batchCheck
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      currentIndex: '',
      options: cityOpction,
      cardBol: false,
      columns: [
        {
          title: '任务编号',
          dataIndex: 'id',
          key: 'id',
          width: '8.333333333%'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '审核时间',
          dataIndex: 'check_time_desc',
          key: 'check_time_desc',
          width: '8.333333333%'
        },
        {
          title: '任务状态',
          dataIndex: 'task_status',
          key: 'task_status',
          width: '8.333333333%'
        },
        {
          title: '类型',
          dataIndex: 'task_type',
          key: 'task_type',
          width: '8.333333333%'
        },
        {
          title: '任务',
          dataIndex: 'task_title',
          key: 'task_title',
          width: '8.333333333%'
        },
        {
          title: '奖励(币)',
          dataIndex: 'reward_happiness',
          key: 'reward_happiness',
          sorter: true,
          width: '8.333333333%'
        },
        {
          title: '任务方',
          dataIndex: 'task_user',
          key: 'task_user',
          width: '8.333333333%',
          scopedSlots: { customRender: 'task_user' }
        },
        {
          dataIndex: 'accept_people',
          key: 'accept_people',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'accept_people' },
          width: '8.333333333%'
        },
        {
          title: '投诉',
          dataIndex: 'complaint_total',
          key: 'complaint_total',
          sorter: true,
          width: '8.333333333%'
        },
        {
          title: '提问',
          dataIndex: 'ask_total',
          key: 'ask_total',
          sorter: true,
          width: '8.333333333%'
        },
        {
          title: '创建时间',
          dataIndex: 'ctime',
          key: 'ctime',
          sorter: true,
          width: '8.333333333%'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' },
          width: '8.333333333%'
        }
      ],
      tableData: [], // 任务列表
      selectedRowKeys: [], // 表格复选框数组
      // tab_status: '', //	是	int	tab切换 待审核（0）待接单（2）待交付（3）已完成（4）已终止（6）已失效（7） 未通过（5）
      pagesize: '', //	是	string	每页显示的条数
      pageindex: '', //	是	string	页码
      task_type: undefined, //	否	int	任务类型
      task_status: undefined, //	否	int	任务状态
      user_project: undefined, //	否	int	所属项目（任务方）
      group_search: '', //	否	string	任务群搜索
      area: [], //	否	string	区域搜索
      task_search: '', //	否	string	任务搜索
      progress_status: undefined, //	否	string	进度状态搜索
      order_field: '', //	否	string	排序字段 投诉：complaint_total，提问：ask_total，创建时间：ctime
      sort_value: '', //	否	string	排序值 降序desc 升序asc
      accept_search: '', // 接单方
      ctime: '', // 创建时间
      project_id: undefined, // 	可见小区
      task_user_search: '', // 任务方搜索
      createTime: '',
      tabInfo: {}, // tab栏数据
      typeList: [], // 任务类型列表
      taskStatusList: [], // 任务状态列表
      processStatus: [], // 任务进度状态列表
      projectList: [] // 项目列表
    }
  },

  methods: {
    // 切换tab栏
    changeTab (type) {
      this.currentIndex = type
      this.getData()
    },
    // 重置
    reset () {
      this.task_type = undefined
      this.task_status = undefined
      this.user_project = ''
      this.group_search = ''
      this.area = []
      this.task_search = ''
      this.progress_status = undefined
      this.order_field = ''
      this.sort_value = ''
      this.accept_search = ''
      this.ctime = ''
      this.project_id = undefined
      this.task_user_search = ''
      this.createTime = ''
      this.pagination.currentPage = 1
      this.getData()
    },
    // 查看
    lookOver (record) {
      if (record.task_status === '待审核') {
        this.$router.push('/taskCentre/toCheck?id=' + record.id)
      } else {
        this.$router.push('/taskCentre/complete?id=' + record.id)
      }
    },
    tableChange (pagination, filters, sorter, { currentDataSource }) {
      // console.log('sorter', sorter)
      this.order_field = sorter.field
      if (sorter.order === 'ascend') {
        this.sort_value = 'asc'
      } else {
        this.sort_value = 'desc'
      }
      this.getData()
    },
    // 搜索
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 时间改变事件
    onChangeTime (dates, dateStrings) {
      this.ctime = dateStrings[0] + '~' + dateStrings[1]
    },
    // 城市选择器改变事件
    onChangeCity (value, selectedOptions) {
      this.area = value[value.length - 1]
    },
    // 获取任务列表数据
    async getData () {
      const res = await togetTaskList({
        tab_status: this.currentIndex,
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        task_type: this.task_type,
        task_status: this.task_status,
        user_project: this.user_project,
        group_search: this.group_search,
        area: this.area,
        task_search: this.task_search,
        progress_status: this.progress_status,
        order_field: this.order_field,
        sort_value: this.sort_value,
        accept_search: this.accept_search,
        ctime: this.ctime,
        project_id: this.project_id,
        task_user_search: this.task_user_search
      })
      this.tableData = res.list
      this.pagination.total = res.data.total
      this.tabInfo = res.data
      console.log('获取任务列表数据', res)
    },
    moment,
    // 收起
    close () {
      this.cardBol = false
    },
    // 展开
    open () {
      this.cardBol = true
    },
    // 页码改变事件
    onChange (page, size) {
      // console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getData()
    },
    // 页容量改变事件
    sizeChange (current, size) {
      // console.log('size: ', size)
      this.pagination.currentPage = 1
      this.pagination.pageSize = size
      this.getData()
    },
    // 清空表格复选框数组
    clear () {
      this.selectedRowKeys = []
    },
    // 表格复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // console.log('selectedRows', selectedRows)
    },
    // 批量操作
    batchOpera () {
      this.$refs.batchCheck.isShow = true
    }
  },
  async created () {
    // console.log('this.options', this.options)
    this.getData()
    // 任务-获取任务状态
    const res = await toGetCommonTaskStatus()
    this.taskStatusList = res.list
    console.log('任务-获取任务状态', res)
    const res2 = await toGetTaskType()
    this.typeList = res2.list
    // console.log('任务中心-获取任务类型(下拉)', res2)
    const res3 = await toGetProcessStatus()
    this.processStatus = res3.list
    // console.log('获取进度状态', res3)
    const res4 = await toGetProject()
    this.projectList = res4.data
    // console.log('获取所有项目', res4)
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-page-header {
  padding-bottom: 0px !important;
}
.task-top {
  display: flex;
  align-items: center;

  .item {
    padding: 0 20px;
    cursor: pointer;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    font-family: "MicrosoftYaHei", "Microsoft YaHei";
    line-height: 50px;
    border-bottom: 2px solid transparent;
  }
  .active {
    color: #1890ff;
    border-bottom: 2px solid #1890ff;
  }
}
.bodyContent{
  padding: 0 20px;
}
.btns {
  text-align: right;
  // .btn1 {
  //   margin-left: 150px;
  // }
  button {
    margin-right: 10px;
  }
}
.card {
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
  margin-top: 20px;
}
.card2 {
  margin-top: 20px;
  .top {
    button {
      margin-right: 10px;
    }
  }
  .table {
    margin-top: 20px;
    /deep/ .ant-table-row-cell-break-word {
      white-space: nowrap !important;
    }
  }
  .pagination {
    margin-top: 10px;
    /deep/ .ant-pagination {
      padding-top: 10px;
      padding-bottom: 20px;
      text-align: right;
    }
    /deep/ .ant-pagination-total-text {
      float: left;
      // margin-left: 20px;
      // margin-right: 300px;
    }
  }
  .selected {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    padding-left: 15px;
    line-height: 40px;
    background-color: rgba(230, 247, 255, 1);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(186, 231, 255, 1);
    border-radius: 4px;
    .icon {
      color: #0e77d1;
      margin-right: 10px;
    }
    .span1 {
      color: #0e77d1;
    }
    .span2 {
      cursor: pointer;
      color: #0e77d1;
      margin-left: 10px;
    }
  }
}
</style>
