<template>
  <div class="evaluate">
    <page-header-wrapper></page-header-wrapper>
    <div class="cardContent">
      <a-card class="card" ref="card">
        <div class="table-page-search-wrapper">
          <a-form-model layout="inline">
            <a-row :gutter="36">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="评星">
                  <a-select placeholder="请选择" v-model="evaluate_starts">
                    <a-select-option value="1">
                      一星
                    </a-select-option>
                    <a-select-option value="2">
                      二星
                    </a-select-option>
                    <a-select-option value="3">
                      三星
                    </a-select-option>
                    <a-select-option value="4">
                      四星
                    </a-select-option>
                    <a-select-option value="5">
                      五星
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="评价标签">
                  <a-select placeholder="请选择" v-model="evaluate_tag">
                    <a-select-option
                      v-for="(item, index) in tagList"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24" v-if="!cardBol">
                <div class="btns">
                  <a-button type="primary" @click="search">查询</a-button>
                  <a-button @click="reset">重置</a-button>
                  <a-button type="link" @click="open">
                    展开 <a-icon type="down" />
                  </a-button>
                </div>
              </a-col>
              <template v-if="cardBol">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="任务">
                    <a-input
                      v-model="task_search"
                      placeholder="编号、标题"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="评价用户">
                    <div class="evaUser">
                      <a-select
                        class="select"
                        v-model="user_type"
                        placeholder="请选择"
                      >
                        <a-select-option value="1">
                          用户
                        </a-select-option>
                        <a-select-option value="2">
                          系统
                        </a-select-option>
                      </a-select>
                      <a-input
                        v-model="user_search"
                        class="phoneInput"
                        placeholder="手机号、昵称/ID"
                      ></a-input>
                    </div>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="所属项目">
                    <a-select v-model="project_id" placeholder="评价用户">
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
                <a-col :md="8" :sm="24" v-if="cardBol">
                  <a-form-model-item>
                    <div class="btns">
                      <a-button type="primary" @click="search">查询</a-button>
                      <a-button @click="reset">重置</a-button>
                      <a-button type="link" @click="close">
                        收起 <a-icon type="up" />
                      </a-button>
                    </div>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="是否有效">
                    <a-select placeholder="请选择" v-model="is_valid">
                      <a-select-option value="1">
                        有效评价
                      </a-select-option>
                      <a-select-option value="0">
                        无效评价
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="评价时间">
                    <a-range-picker
                      v-model="evaluateTime"
                      class="piker-time"
                    :ranges="{
                        Today: [moment('00:00:00', 'HH:mm:ss'), moment().endOf('day')],
                        'This Month': [moment('00:00:00', 'HH:mm:ss'), moment().endOf('month')]
                      }"
                       :show-time="{
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('00:00:00', 'HH:mm:ss')
                        ]
                      }"
                      format="YYYY-MM-DD HH:mm:ss"
                      @change="onChange"
                    />
                  </a-form-model-item>
                </a-col>
              </template>
            </a-row>
          </a-form-model>
        </div>
      </a-card>
      <a-card class="card2">
        <a-table
          rowKey="id"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          @change="tableChange"
        >
          <template slot="task_title" slot-scope="task_title">
            <div class="task_title" style="color:#1890FF">
              {{ task_title }}
            </div>
          </template>
          <template slot="evaluate_supplement" slot-scope="evaluate_supplement">
            <div class="evaluate_supplement">
              {{evaluate_supplement}}
            </div>
          </template>
          <template slot="owner_name" slot-scope="text, record">
            <div class="appraiseUser">
              <div class="t1">{{ record.owner_name }}</div>
              <div class="t2" style="color: rgba(0, 0, 0, 0.349019607843137);">
                {{ record.project_name }}
              </div>
            </div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div>
              <a-button type="link" @click="lookOver(record)">查看</a-button>
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
      </a-card>
    </div>
    <appraiseModel ref="appraiseModel"></appraiseModel>
  </div>
</template>

<script>
import moment from 'moment'
import appraiseModel from './appraiseModel'
import { toGetList, toEvaluateList, toGetProject } from '@/api/taskCentre'
export default {
  components: {
    appraiseModel
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      cardBol: false,
      tableData: [], // 评价列表
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 50
        },
        {
          title: '任务',
          dataIndex: 'task_title',
          key: 'task_title',
          width: '12%',
          scopedSlots: { customRender: 'task_title' }
        },
        {
          title: '评星',
          dataIndex: 'evaluate_stars',
          key: 'evaluate_stars',
          sorter: true,
          width: '12.555555555%',
          align: 'center'
        },
        {
          title: '标签',
          dataIndex: 'evaluate_tags',
          key: 'evaluate_tags',
          width: '15%'
        },
        {
          title: '评价用户',
          dataIndex: 'owner_name',
          key: 'owner_name',
          scopedSlots: { customRender: 'owner_name' },
          width: '13.555555555%'
        },
        {
          title: '补充内容',
          dataIndex: 'evaluate_supplement',
          key: 'evaluate_supplement',
          width: '12.555555555%',
          scopedSlots: { customRender: 'evaluate_supplement' }

        },
        {
          title: '评价时间',
          dataIndex: 'ctime',
          key: 'ctime',
          sorter: true,
          width: '12.555555555%'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' },
          width: '6%'
        }
      ],
      evaluate_starts: undefined, // 否int评价星星数
      evaluate_tag: undefined, // 否int评价标签
      task_search: '', // 否string任务搜索
      user_type: undefined, // 否int评价用户类型1用户2系统
      user_search: '', // 否string用户
      is_valid: undefined, // 否int,//是否有效 1有效 0无效
      project_id: undefined, // 否int评价用户所属项目ID
      ctime: '', // 否int评价时间
      selectedRowKeys: [],
      tagList: [], // 标签下拉列表
      projectList: [],
      evaluateTime: [],
      task_id: '', // 任务id
      order_field: '',
      sort_value: ''
    }
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
    // 重置
    reset () {
      this.evaluate_starts = undefined
      this.evaluate_tag = undefined
      this.task_search = ''
      this.user_type = undefined
      this.user_search = ''
      this.is_valid = undefined
      this.project_id = undefined
      this.ctime = ''
      this.evaluateTime = []
      this.pagination.currentPage = 1
      this.getData()
    },
    // 表格复选框 事件
    onSelectChange (selectedRowKeys, selectedRows) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      // console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 获取评价列表
    async getData () {
      const res = await toGetList({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        evaluate_starts: this.evaluate_starts,
        evaluate_tag: this.evaluate_tag,
        task_search: this.task_search,
        user_type: this.user_type,
        user_search: this.user_search,
        is_valid: this.is_valid,
        project_id: this.project_id,
        ctime: this.ctime,
        task_id: this.task_id,
        sort_value: this.sort_value,
        order_field: this.order_field
      })
      this.tableData = res.list
      this.pagination.total = +res.data.total
      console.log('获取评价列表', res)
    },
    // 查看
    lookOver (record) {
      console.log('record', record)
      this.$refs.appraiseModel.id = record.id
      this.$refs.appraiseModel.isShow = true
    },
    // 页码改变事件
    onChangePage (page, size) {
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
    // 展开
    open () {
      this.cardBol = true
    },
    // 收起
    close () {
      this.cardBol = false
    },
    moment,
    onChange (dates, dateStrings) {
      this.ctime = dateStrings[0] + '~' + dateStrings[1]
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
  },
  async created () {
    this.task_id = this.$route.query.task_id
    if (this.task_id != '') {
      this.getData()
    } else {
      this.getData()
    }
    // 评价-评价标签下拉列表
    const res = await toEvaluateList()
    this.tagList = res.list
    // console.log('评价标签列表', res)
    // 获取所有项目
    const res2 = await toGetProject()
    this.projectList = res2.data
    // console.log('获取所有项目', res2)
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form .ant-btn-link {
  padding: 0;
}
.evaluate {
  padding-bottom: 20px;
  .cardContent {
    padding: 0 20px;
  }
  .btns {
    padding-bottom: 20px;
    text-align: right;
    button + button {
      margin-left: 10px;
    }
  }
  .card {
    margin-top: 20px;
    /deep/ .ant-form-item-label {
      min-width: 88px;
    }
    .piker-time {
      width: 100% !important;
    }
    /deep/ .ant-card-body {
      padding-bottom: 0;
    }
    .evaUser {
      display: flex;
      .select {
        max-width: 82px;
        // width: 82px !important;
        margin-right: 10px;
      }
      // .phoneInput{
      //   flex: 1;
      // }
    }
  }
  .card2 {
    margin-top: 20px;
    .task_title {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .evaluate_supplement{
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .pagination {
      margin-top: 10px;
      /deep/ .ant-pagination {
        padding-top: 10px;
        // padding-bottom: 20px;
        text-align: right;
      }
      /deep/ .ant-pagination-total-text {
        float: left;
      }
    }
  }
}
</style>
