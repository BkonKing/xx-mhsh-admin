<template>
  <div class="askQuestion">
    <page-header-wrapper>
      <template #content>
        <div class="task-top">
          <div
            class="item"
            @click="changeTab(1)"
            :class="{ active: currentIndex === 1 }"
          >
            全部{{ askQuestionInfo.total }}
          </div>
          <div
            class="item"
            @click="changeTab(2)"
            :class="{ active: currentIndex === 2 }"
          >
            待审核{{
              askQuestionInfo.reviewed_total === 0
                ? ""
                : askQuestionInfo.reviewed_total
            }}
          </div>
          <div
            class="item"
            @click="changeTab(3)"
            :class="{ active: currentIndex === 3 }"
          >
            已通过{{
              askQuestionInfo.passed_total === 0
                ? ""
                : askQuestionInfo.passed_total
            }}
          </div>
          <div
            class="item"
            @click="changeTab(4)"
            :class="{ active: currentIndex === 4 }"
          >
            未通过{{
              askQuestionInfo.failed_total === 0
                ? ""
                : askQuestionInfo.failed_total
            }}
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <a-card class="card" ref="card">
      <div class="table-page-search-wrapper">
      <a-form-model layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="类型">
              <a-select
                v-model="type"
                placeholder="请选择"

              >
                <a-select-option value="1">
                  提问
                </a-select-option>
                <a-select-option value="2">
                  回复
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="审核状态">
              <a-select
                v-model="check_type"
                placeholder="请选择"

              >
                <a-select-option value="0">
                  待审核
                </a-select-option>
                <a-select-option value="1">
                  通过
                </a-select-option>
                <a-select-option value="2">
                  未通过
                </a-select-option>
                <a-select-option value="3">
                  无审核
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <template v-if="bol">
                     <a-col :md="8" :sm="24">
            <a-form-model-item label="有无回复">
              <a-select
                v-model="is_reply"
                placeholder="请选择"

              >
                <a-select-option value="1">
                  有
                </a-select-option>
                <a-select-option value="0">
                  无
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="发布用户">
              <a-input
                v-model="user_search"
                placeholder="手机号、用户昵称/ID"

              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="发布内容">
              <a-input
                v-model="content"
                placeholder="内容、ID"

              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="任务">
              <a-input
                v-model="task_search"
                placeholder="编号、标题"

              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="所属项目">
              <a-select
                v-model="project_id"
                placeholder="请选择"

              >
                <a-select-option
                  v-for="(item, index) in projectList"
                  :key="index"
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
                class="piker-time"
                :ranges="{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')]
                }"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                @change="onChange"
              />
            </a-form-model-item>
          </a-col>
          </template>

          <a-col :md="8" :sm="24" v-if="bol">
            <div class="btns">
              <a-button type="primary" @click="search">
                查询
              </a-button>
              <a-button>重置</a-button>
              <a-button
type="link"
@click="close"
                >收起 <a-icon
type="up"
              /></a-button>
            </div>
          </a-col>
          <a-col :md="8" :sm="24" v-if="!bol">
                        <div class="btns" >
              <a-button type="primary" @click="search">
                查询
              </a-button>
              <a-button >重置</a-button>
              <a-button
type="link"
@click="open"
                >展开 <a-icon
type="down"
              /></a-button>
            </div>
          </a-col>
        </a-row>
      </a-form-model>
      </div>
    </a-card>
    <a-card class="card2">
      <a-button type="primary" @click="batchCheck">审核</a-button>
      <div class="selected" v-if="selectedRowKeys.length > 0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <div class="table">
        <a-table
        rowKey="id"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :data-source="tableData"
          @change='tableChange'
        >
        <template slot="check_time_desc" slot-scope="check_time_desc">
          <div :style="{color:check_time_desc.is_over===1?'red':''}">
            {{check_time_desc.check_time_desc}}
          </div>
        </template>
          <template slot="type" slot-scope="type">
            <div class="type">
              {{ +type === 1 ? "提问" : "回复" }}
            </div>
          </template>
          <template slot="owner_name" slot-scope="text, record">
            <div class="issueUser">
              <div class="t1">{{ record.owner_name }}</div>
              <div class="t2">{{ record.project_name }}</div>
            </div>
          </template>
          <template slot="task_title" slot-scope="task_title">
            <div style="color:#1890FF">{{ task_title }}</div>
          </template>
          <template  slot="opera" slot-scope="text,record">
            <div>
              <a-button type="link" @click="check(record)" v-if="record.is_check===0">审核</a-button>
              <a-button type="link" @click="lookOver(record)" v-else>查看</a-button>
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
            @change="onChangePage"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <askCheckModel ref="askCheckModel"></askCheckModel>
    <askLookOverModel ref="askLookOverModel"></askLookOverModel>
    <askBatchCheck
      ref="askBatchCheck"
      :selectedRowKeys="selectedRowKeys"
    ></askBatchCheck>
  </div>
</template>

<script>
import moment from 'moment'
import askCheckModel from './askCheckModel'
import askLookOverModel from './askLookOverModel'
import askBatchCheck from './askBatchCheck'
import { toGetQuestionList, toGetProject } from '@/api/taskCentre'
export default {
  components: {
    askCheckModel,
    askLookOverModel,
    askBatchCheck
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      currentIndex: 1,
      bol: false, // 展开 收起
      tableData: [], // 提问列表
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: '10%'
        },
        {
          title: '审核时间',
          dataIndex: 'check_time_desc',
          key: 'check_time_desc',
          width: '10%',
          scopedSlots: { customRender: 'check_time_desc' }
        },
        {
          title: '审核状态',
          dataIndex: 'check_status',
          key: 'check_status',
          width: '10%'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: '10%',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          ellipsis: true,
          width: '10%'
        },
        {
          title: '发布用户',
          dataIndex: 'owner_name',
          key: 'owner_name',
          scopedSlots: { customRender: 'owner_name' },
          width: '10%'
        },
        {
          title: '投诉',
          dataIndex: 'complaint_total',
          key: 'complaint_total',
          sorter: true,
          width: '10%'
        },
        {
          title: '任务',
          dataIndex: 'task_title',
          key: 'task_title',
          // ellipsis: true,
          width: '10%',
          scopedSlots: { customRender: 'task_title' }
        },
        {
          title: '创建时间',
          dataIndex: 'ctime',
          key: 'ctime',
          sorter: true,
           width: '10%'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
           width: '10%',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      selectedRowKeys: [], // 表格复选框数组
      askQuestionInfo: {}, // 提问列表信息
      tab_type: '', //	否	int	标签切换值 0待审核 1通过 2未通过
      type: undefined, //	否	int	类型1提问 2回复
      check_type: undefined, //	否	int	审核状态 审核状态 0待审核 1通过 2未通过 3无需审核
      is_reply: undefined, //	否	int	有无回复
      user_search: '', //	否	string	用户搜索
      project_id: undefined, //	否	int	项目ID
      order_field: '', //	否	string	排序字段
      sort_value: '', //	否	string	排序值
      status: '', //	否	int	0待审核 1已通过 2未通过
      content: '', //	否	string	发布内容
      task_search: '', //	否	string	任务搜索
      ctime: '', //	否	string	发布时间
      projectList: [] // 项目列表
    }
  },
  mounted () {
    // console.log(this.$refs.card.$el.offsetHeight)
    // this.$refs.card.$el.style.height = '88px'
  },
  methods: {
    // 排序
    tableChange (pagination, filters, sorter, { currentDataSource }) {
      console.log('sorter', sorter)
      this.order_field = sorter.field
      if (sorter.order === 'ascend') {
        this.sort_value = 'asc'
      } else {
        this.sort_value = 'desc'
      }
      this.getData()
    },
    // 切换标签
    changeTab (index) {
      this.currentIndex = index
      if (index === 1) {
        this.tab_type = ''
      } else if (index === 2) {
        this.tab_type = 0
      } else if (index === 3) {
        this.tab_type = 1
      } else {
        this.tab_type = 2
      }
      this.getData()
    },
    // 查询
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 获取提问列表
    async getData () {
      const res = await toGetQuestionList({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        tab_type: this.tab_type,
        type: this.type,
        check_type: this.check_type,
        is_reply: this.is_reply,
        user_search: this.user_search.trim(),
        project_id: this.project_id,
        order_field: this.order_field,
        sort_value: this.sort_value,
        status: this.status,
        content: this.content,
        task_search: this.task_search,
        ctime: this.ctime
      })
      this.askQuestionInfo = res.data || {}
      this.tableData = res.list
      this.pagination.total = res.data.total
      console.log('获取提问列表', res)
    },
    // 批量审核
    batchCheck () {
      this.$refs.askBatchCheck.isShow = true
    },
    // 清空
    clear () {
      this.selectedRowKeys = []
    },
    // 查看
    lookOver (record) {
      this.$refs.askLookOverModel.isShow = true
      this.$refs.askLookOverModel.info = JSON.parse(JSON.stringify(record))
    },
    // 审核
    check (record) {
      console.log(record)
      this.$refs.askCheckModel.isShow = true
      this.$refs.askCheckModel.info = JSON.parse(JSON.stringify(record))
    },
    // 页码改变事件
    onChangePage (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getData()
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
      this.pagination.currentPage = 1
      this.pagination.pageSize = size
      this.getData()
    },
    // 表格复选框 事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    // 展开
    open () {
        this.bol = true
    },
    // 收起
    close () {
      this.bol = false
    },
    moment,
    // 时间改变事件
    onChange (dates, dateStrings) {
      this.ctime = dateStrings[0] + '~' + dateStrings[1]
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
  },
  async created () {
    this.getData()
    const res = await toGetProject()
    this.projectList = res.data
    console.log('所有项目', res)
  }
}
</script>

<style lang="less" scoped>
.askQuestion {
  padding: 0 20px;
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
  .card {
    /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
    margin-top: 20px;
    .btns {
     text-align: right;
      button {
        margin-right: 10px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
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
    .table {
      margin-top: 20px;
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
    }
  }
  /deep/ .ant-card-body {
    padding-bottom: 0 !important;
  }
}
</style>
