<template>
  <div class="complainTable">
    <div class="form">
      <div class="table-page-search-wrapper">
        <a-form-model layout="inline">
          <a-row :gutter="36">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="处理状态">
                <a-select placeholder="请选择" v-model="handle_status">
                  <a-select-option value="0">
                    待处理
                  </a-select-option>
                  <a-select-option value="1">
                    已处理
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="投诉类型">
                <a-select placeholder="请选择" v-model="complaint_type">
                  <a-select-option
                    v-for="item in typeList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.complaint_type }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="!cardBol">
              <div class="btns">
                <a-button type="primary" @click="search">
                  查询
                </a-button>
                <a-button @click="reset">重置</a-button>
                <a-button type="link" @click="open"
                  >展开 <a-icon type="down"
                /></a-button>
              </div>
            </a-col>
            <template v-if="cardBol">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="内容类型">
                  <a-select placeholder="请选择" v-model="content_type">
                    <a-select-option value="1">
                      任务
                    </a-select-option>
                    <a-select-option value="2">
                      提问
                    </a-select-option>
                    <a-select-option value="3">
                      提问回复
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="被投诉人">
                  <div class="complaintItem">
                    <a-select
                      placeholder="请选择"
                      v-model="user_type"
                      class="select"
                    >
                      <a-select-option value="2">
                        任务方
                      </a-select-option>
                      <a-select-option value="1">
                        接单方
                      </a-select-option>
                    </a-select>
                    <a-input
                      v-model="user_search"
                      class="input"
                      placeholder="手机号、用户昵称/ID"
                    ></a-input>
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="投诉人">
                  <a-input
                    v-model="complaint_user"
                    placeholder="手机号、用户昵称/ID"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="投诉描述">
                  <a-input
                    v-model="complaint_desc"
                    placeholder="关键字"
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
                <a-form-model-item label="任务状态">
                  <a-select v-model="task_status" placeholder="请选择">
                    <a-select-option
                      v-for="(item, index) in TaskStatusList"
                      :key="index"
                      :value="item.value"
                    >
                      {{ item.text }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="投诉时间">
                  <a-range-picker
                    v-model="timeTxt"
                    class="piker-time"
                    :ranges="{
                      Today: [
                        moment('00:00:00', 'HH:mm:ss'),
                        moment().endOf('day')
                      ],
                      'This Month': [
                        moment().startOf('month'),
                        moment().endOf('month')
                      ]
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
              <a-col :md="8" :sm="24"></a-col>
              <a-col :md="8" :sm="24"></a-col>
              <a-col :md="8" :sm="24" v-if="cardBol">
                <div class="btns">
                  <a-button type="primary" @click="search">
                    查询
                  </a-button>
                  <a-button @click="reset">重置</a-button>
                  <a-button type="link" @click="close"
                    >收起 <a-icon type="up"
                  /></a-button>
                </div>
              </a-col>
            </template>
          </a-row>
        </a-form-model>
      </div>
    </div>
    <div class="content">
      <a-button type="primary" @click="batchDeal">处理</a-button>
      <div class="selected" v-if="selectedRowKeys.length > 0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <div class="table">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="tableData"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :pagination="false"
          @change="tableChange"
        >
          <template slot="handle_desc" slot-scope="text, record">
            <div :style="{ color: record.is_over === 1 ? 'red' : '' }">
              {{ record.handle_desc }}
            </div>
          </template>
          <template slot="content" slot-scope="content">
            <div class="content" style="color:#1890FF">
              {{ content }}
            </div>
          </template>
          <template slot="complainted_user" slot-scope="text, record">
            <div class="complaindPeople">
              <div class="t1">{{ record.complainted_user }}</div>
              <div class="t2" style="color: rgba(0, 0, 0, 0.349019607843137);">
                {{
                  record.complainted_project ? record.complainted_project : ""
                }}
              </div>
            </div>
          </template>
          <template slot="complaint_user" slot-scope="text, record">
            <div class="complainMan">
              <div class="t1">{{ record.complaint_user }}</div>
              <div class="t2" style="color: rgba(0, 0, 0, 0.349019607843137);">
                {{ record.complaint_project ? record.complaint_project : "" }}
              </div>
            </div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div class="opera">
              <a-button
                type="link"
                @click="
                  $router.push('/taskCentre/complainDetail?id=' + record.id)
                "
                >查看</a-button
              >
              <a-button
                type="link"
                @click="deal(record)"
                v-if="record.is_handle === '待处理'"
                >处理</a-button
              >
            </div>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination
          v-model="pagination.currentPage"
          show-quick-jumper
          show-size-changer
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
    <complainDeal ref="complainDeal" @getData="getData"></complainDeal>
    <complainBatchDeal
      ref="complainBatchDeal"
      :selectedRowKeys="selectedRowKeys"
    ></complainBatchDeal>
  </div>
</template>

<script>
import {
  toGetCompalintType,
  toGetCommonTaskStatus,
  toGetButtonStatus,
  toGetComplaintList
} from '@/api/taskCentre'
import moment from 'moment'
import complainDeal from '../complainDeal'
import complainBatchDeal from '../complainBatchDeal'
import bus from '@/utils/bus'
export default {
  props: ['task_id'],
  components: {
    complainDeal,
    complainBatchDeal
  },
  data () {
    return {
      buttonStatus: '', // 按钮状态
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      currentIndex: '',
      cardBol: false,
      tableData: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: '6%'
        },
        {
          title: '处理时间',
          dataIndex: 'handle_desc',
          key: 'handle_desc',
          width: '10%',
          scopedSlots: { customRender: 'handle_desc' }
        },
        {
          title: '状态',
          dataIndex: 'is_handle',
          key: 'is_handle',
          width: '6%'
        },
        {
          title: '内容类型',
          dataIndex: 'info_type_desc',
          key: 'info_type_desc',
          width: '6%'
        },
        {
          title: '被投诉内容',
          dataIndex: 'content',
          key: 'content',
          scopedSlots: { customRender: 'content' },
          width: '20%'
        },
        {
          title: '投诉类型',
          dataIndex: 'complaint_type',
          key: 'complaint_type',
          width: '10%'
        },
        {
          title: '被投诉人',
          dataIndex: 'complainted_user',
          key: 'complainted_user',
          scopedSlots: { customRender: 'complainted_user' },
          width: '10%'
        },
        {
          title: '投诉人',
          dataIndex: 'complaint_user',
          key: 'complaint_user',
          scopedSlots: { customRender: 'complaint_user' },
          width: '10%'
        },
        {
          title: '投诉时间',
          dataIndex: 'ctime',
          key: 'ctime',
          width: '10%',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' },
          width: '6%'
        }
      ],
      selectedRowKeys: [],
      handle_status: undefined, // 否int投诉处理状态 0待处理 1已处理
      complaint_type: undefined, // 否int投诉类型
      content_type: undefined, // 否int1任务 2提问 3提问回复
      user_type: undefined, // 否int1接单方 2任务方
      user_search: '', // 否string用户搜索与user_type联合使用
      complaint_desc: '', // 否string投诉描述
      complaint_user: '', // 否string投诉人
      task_search: '', // 否string任务搜索
      task_status: undefined, // 否int任务状态搜索
      complaint_time: '', // 否string投诉时间
      timeTxt: [],
      typeList: [], // 投诉类型列表
      TaskStatusList: [], // 任务状态列表
      complaintInfo: '',
      jump_uid: '', // 用户id
      order_field: '',
      sort_value: ''
    }
  },
  mounted () {
    bus.$on('sendUid', value => {
      this.jump_uid = value
    })
  },
  methods: {
    // 获取按钮状态
    async getButtonInfo () {
      const res4 = await toGetButtonStatus({
        task_id: +this.id
      })
      this.buttonStatus = res4.data
      // console.log('任务详情-按钮状态控制', res4)
    },
    // 排序
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
    // 切换tab
    changeTab (type) {
      this.currentIndex = type
      this.pagination.currentPage = 1
      this.getData()
    },
    // 重置
    reset () {
      this.handle_status = undefined
      this.complaint_type = undefined
      this.content_type = undefined
      this.user_type = undefined
      this.user_search = ''
      this.complaint_desc = ''
      this.complaint_user = ''
      this.task_search = ''
      this.task_status = ''
      this.complaint_time = ''
      this.timeTxt = []
      this.pagination.currentPage = 1
      this.getData()
    },
    // 搜索
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 获取投诉列表
    async getData () {
      const res = await toGetComplaintList({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        handle_status: this.handle_status || this.currentIndex,
        complaint_type: this.complaint_type,
        content_type: this.content_type,
        user_type: this.user_type,
        user_search: this.user_search,
        complaint_desc: this.complaint_desc,
        complaint_user: this.complaint_user,
        task_search: this.task_search,
        task_status: this.task_status,
        complaint_time: this.complaint_time,
        task_id: this.task_id,
        jump_uid: this.jump_uid,
        sort_value: this.sort_value,
        order_field: this.order_field
      })
      this.tableData = res.list
      this.pagination.total = +res.data.total
      this.complaintInfo = res.data
      console.log('获取投诉列表', res)
    },
    // 清空表格复选框
    clear () {
      this.selectedRowKeys = []
    },
    // 表格复选框改变事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    // 批量处理
    batchDeal () {
      if (this.selectedRowKeys.length === 0) {
        return
      }
      this.$refs.complainBatchDeal.isShow = true
    },
    // 处理
    deal (record) {
      // console.log('record', record)
      this.$refs.complainDeal.id = record.id
      this.$refs.complainDeal.isShow = true
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
    // 展开
    open () {
      this.cardBol = true
    },
    // 收起
    close () {
      this.cardBol = false
    },
    moment,
    // 时间选择器改变事件
    onChange (dates, dateStrings) {
      this.complaint_time = dateStrings[0] + '~' + dateStrings[1]
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
  },
  async created () {
    if (this.task_id != '' || this.jump_uid != '') {
      this.getData()
    } else {
      this.getData()
    }
    this.getButtonInfo()
    // 投诉-获取投诉类型
    const res = await toGetCompalintType()
    this.typeList = res.list
    console.log('获取投诉类型', res)
    // 任务-获取任务状态
    const res2 = await toGetCommonTaskStatus()
    this.TaskStatusList = res2.list
    console.log('任务-获取任务状态', res2)
  }
}
</script>

<style lang="less" scoped>
.complainTable {
  margin-top: 20px;
  margin-top: 20px;
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
  .complaintItem {
    display: flex;
    .select {
      max-width: 82px;
    }
    .input {
      flex: 1;
      margin-left: 10px;
    }
  }
  .btns {
    padding-bottom: 20px;
    text-align: right;
    button + button {
      margin-left: 10px;
    }
  }
  .top {
    display: flex;
    height: 51px;
    line-height: 51px;
    padding: 0 15px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    .item {
      padding: 0 10px;
      margin: 0 15px;
      cursor: pointer;
    }
    .active {
      color: #1890ff;
      border-bottom: 2px solid #1890ff;
    }
  }
  .form {
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    .btns {
      text-align: right;
      button {
        margin-right: 10px;
      }
    }
  }
  .content {
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    .btns2 {
      button {
        margin-right: 10px;
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
    .table {
      margin-top: 20px;
      .takeOrderSide {
        .t2 {
          color: rgba(0, 0, 0, 0.349019607843137);
        }
      }
      .progress_content {
        .t1 {
          white-space: nowrap;
        }
      }
      .btns {
        white-space: nowrap;
      }
      /deep/ .ant-table-thead > tr > th.ant-table-selection-column {
        text-align: left;
      }
      /deep/ .ant-table-tbody > tr > td.ant-table-selection-column {
        text-align: left;
      }
      .opera {
        button {
          padding-left: 0;
        }
      }
      .content {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        padding: 0;
        -webkit-box-orient: vertical;
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
  }
}
</style>
