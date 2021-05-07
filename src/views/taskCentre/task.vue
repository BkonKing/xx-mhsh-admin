<template>
  <div class="task">
    <page-header-wrapper>
      <template #content>
        <div class="task-top">
          <div
            class="item"
            @click="currentIndex = ''"
            :class="{ active: currentIndex === '' }"
          >
            全部{{ tabInfo.total }}
          </div>
          <div
            class="item"
            @click="currentIndex = 0"
            :class="{ active: currentIndex === 0 }"
          >
            待审核{{ tabInfo.to_be_reviewed }}
          </div>
          <div
            class="item"
            @click="currentIndex = 2"
            :class="{ active: currentIndex === 2 }"
          >
            待接单{{ tabInfo.order_be_received }}
          </div>
          <div
            class="item"
            @click="currentIndex = 3"
            :class="{ active: currentIndex === 3 }"
          >
            待交付
          </div>
          <div
            class="item"
            @click="currentIndex = 4"
            :class="{ active: currentIndex === 4 }"
          >
            已完成{{ tabInfo.to_completed }}
          </div>
          <div
            class="item"
            @click="currentIndex = 6"
            :class="{ active: currentIndex === 6 }"
          >
            已终止{{ tabInfo.to_terminated }}
          </div>
          <div
            class="item"
            @click="currentIndex = 7"
            :class="{ active: currentIndex === 7 }"
          >
            已失效{{ tabInfo.to_invalid }}
          </div>
          <div
            class="item"
            @click="currentIndex = 5"
            :class="{ active: currentIndex === 5 }"
          >
            未通过{{ tabInfo.to_failed }}
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <a-card class="card" ref="card">
      <div class="table-page-search-wrapper">
        <a-form-model layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="任务类型">
                <a-select v-model="task_type" placeholder="请选择">
                  <a-select-option v-for="(item, index) in typeList" :key="index" :value="item.id">
                    {{item.type_name}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="任务状态">
                <a-select placeholder="请选择">
                  <a-select-option v-for="(item, index) in TaskStatusList" :key="index" :value="item.value">
                    {{item.text}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="cardBol">
              <a-form-model-item label="进度状态">
                <a-select placeholder="请选择">
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                  <a-select-option value="disabled" disabled>
                    Disabled
                  </a-select-option>
                  <a-select-option value="Yiminghe">
                    yiminghe
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="!cardBol">
              <div class="btns">
                <a-button class="btn1" type="primary">查询</a-button>
                <a-button>重置</a-button>
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
                    placeholder="手机号、用户昵称/ID、任务联系电话"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="接单方">
                  <a-input placeholder="手机号、用户昵称/ID"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="任务">
                  <a-input placeholder="编号、标题、内容"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="可见小区">
                  <a-select>
                    <a-select-option value="jack">
                      Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                      Lucy
                    </a-select-option>
                    <a-select-option value="disabled" disabled>
                      Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                      yiminghe
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="可见地区">
                  <a-cascader
                    :changeOnSelect="true"
                    :options="options"
                    placeholder="Please select"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="可见群">
                  <a-input placeholder="群名称/ID"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="所属项目">
                  <a-select>
                    <a-select-option value="jack">
                      Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                      Lucy
                    </a-select-option>
                    <a-select-option value="disabled" disabled>
                      Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                      yiminghe
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
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <div class="btns">
                  <a-button class="btn1" type="primary">查询</a-button>
                  <a-button>重置</a-button>
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
        <template #opera>
          <div class="btns">
            <a-button type="link">查看</a-button>
            <a-button type="link">审核</a-button>
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
    <batchCheck
      ref="batchCheck"
      :selectedRowKeys="selectedRowKeys"
    ></batchCheck>
  </div>
</template>

<script>
import moment from 'moment'
import batchCheck from './batchCheck'
import { toGetCommonTaskStatus, togetTaskList, toGetTaskType } from '@/api/taskCentre'
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
      options: [
        // 城市数据
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        }
      ],
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
      task_type: '', //	否	int	任务类型
      task_status: '', //	否	int	任务状态
      user_project: '', //	否	int	所属项目（任务方）
      group_search: '', //	否	string	任务群搜索
      area: '', //	否	string	区域搜索
      task_search: '', //	否	string	任务搜索
      progress_status: '', //	否	string	进度状态搜索
      order_field: '', //	否	string	排序字段 投诉：complaint_total，提问：ask_total，创建时间：ctime
      sort_value: '', //	否	string	排序值 降序desc 升序asc
      tabInfo: {}, // tab栏数据
      typeList: [], // 任务类型列表
      TaskStatusList: [] // 任务状态列表
    }
  },
  computed: {},
  mounted () {
    // console.log(this.$refs.card.$el.offsetHeight)
    // this.$refs.card.$el.style.height = '150px'
  },
  methods: {
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
        sort_value: this.sort_value
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
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
    },
    // 清空表格复选框数组
    clear () {
      this.selectedRowKeys = []
    },
    // 表格复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      console.log('selectedRows', selectedRows)
    },
    // 批量操作
    batchOpera () {
      this.$refs.batchCheck.isShow = true
    }
  },
  async created () {
    this.getData()
    // 任务-获取任务状态
    const res = await toGetCommonTaskStatus()
    this.TaskStatusList = res.list
    console.log('任务-获取任务状态', res)
    const res2 = await toGetTaskType()
    this.typeList = res2.list
    console.log('任务中心-获取任务类型(下拉)', res2)
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
      padding: 10px;
    }
    /deep/ .ant-pagination-total-text {
      margin-left: 20px;
      margin-right: 300px;
    }
    /deep/ .ant-pagination-item-active {
      background-color: #1890ff;
      a {
        color: white;
      }
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
