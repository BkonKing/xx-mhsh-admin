<template>
  <div class="taskProgress">
    <div class="form">
      <div class="table-page-search-wrapper">
        <a-form-model layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="进度状态">
                <a-select placeholder="请选择" v-model="status">
                  <a-select-option
                    v-for="(item, index) in processStatusList"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.text }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="接单方">
                <a-input
                  v-model="user_search"
                  placeholder="手机号、用户昵称/ID"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="所属项目" v-if="!card4Bol">
                <a-select placeholder="请选择" v-model="project_id">
                  <a-select-option
                    v-for="(item, index) in projectList"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.project_name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <div class="btns" v-else>
                <a-button type="primary" @click="search1">查询</a-button>
                <a-button @click="reset1">重置</a-button>
                <a-button type="link" @click="open2"
                  >展开 <a-icon type="down"
                /></a-button>
              </div>
            </a-col>
          </a-row>
          <div class="btns" v-if="!card4Bol">
            <a-button type="primary" @click="search1">查询</a-button>
            <a-button @click="reset1">重置</a-button>
            <a-button type="link" @click="close2"
              >收起 <a-icon type="up"
            /></a-button>
          </div>
        </a-form-model>
      </div>
    </div>
    <div class="content">
      <div class="btns" v-if="buttonStatus != ''">
        <a-button v-if="buttonStatus.button_shelf === 1" @click="soldOut(1)"
          >下架任务</a-button
        >
        <a-button
          v-if="buttonStatus.button_termination === 1"
          @click="terminate(2)"
          >终止任务</a-button
        >
        <a-button v-if="buttonStatus.button_stop === 1" @click="stop(3)"
          >停止接单</a-button
        >
        <!-- <a-button @click="award">批量操作 <a-icon type="down"/></a-button> -->
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              淘汰
            </a-menu-item>
            <a-menu-item key="2">
              强制奖励
            </a-menu-item>
          </a-menu>
          <a-button> 批量操作 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </div>
      <div class="selected" v-if="selectedRowKeys.length > 0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <div class="table">
        <a-table
          rowKey="uid"
          :rowSelection="rowSelection"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="columns"
          :data-source="taskSpeedList"
          :pagination="false"
          @change="tableChange1"
        >
          <template slot="progress_desc" slot-scope="progress_desc">
            <div :style="{ color: progress_desc === '暂停中' ? 'red' : '' }">
              {{ progress_desc }}
            </div>
          </template>
          <template slot="user" slot-scope="text, record">
            <div class="takeOrderSide">
              <div class="t1">{{ record.user }}</div>
              <div class="t2">{{ record.project }}</div>
            </div>
          </template>
          <template slot="complaint_total" slot-scope="text, record">
            <div
              :style="{
                cursor: 'pointer',
                color: record.complaint_total > 0 ? '#1890FF' : ''
              }"
              @click="openComplaint(record)"
            >
              {{ record.complaint_total }}
            </div>
          </template>
          <template slot="evaluate" slot-scope="text, record">
            <span
              v-if="record.evaluate != 0"
              style="color:#1890FF;cursor: pointer;"
              @click="openAppraise(record.evaluate_id)"
              >{{ record.evaluate }}星</span
            >
          </template>
          <template slot="progress_content" slot-scope="text, record">
            <div class="progress_content">
              <div class="t1">{{ record.progress_title }}</div>
              <div class="t2">
                {{ record.progress_content }}
              </div>
            </div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div class="btns">
              <a-button style="paddingLeft:0" type="link" @click="check(record.uid)">查看</a-button>
              <a-button
                type="link"
                @click="award(record)"
                v-if="record.button === 1"
                >奖励</a-button
              >
              <a-popconfirm
                v-if="record.button === 2"
                title="你确定要淘汰这个用户吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm(record.uid)"
                @cancel="cancel"
              >
                <a-button type="link">淘汰</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <!-- :default-current="pagination.currentPage" -->
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
          @change="onChange"
          @showSizeChange="sizeChange"
        />
      </div>
    </div>
    <awardModel
      v-on="$listeners"
      :selectedRowKeys="selectedRowKeys"
      :taskDetailInfo="taskDetailInfo"
      :id="id"
      ref="awardModel"
    ></awardModel>
    <checkModel :id="id" ref="checkModel"></checkModel>
    <appraiseModel ref="appraiseModel"></appraiseModel>
    <weedOutModel
      v-on="$listeners"
      ref="weedOutModel"
      :selectedRowKeys="selectedRowKeys"
      :id="id"
    ></weedOutModel>
  </div>
</template>

<script>
import {
  toGetProcessStatus,
  toGetProject,
  toGetTaskSpeed,
  toOptTask,
  toEliminate,
  toGetButtonStatus
} from '@/api/taskCentre'
import awardModel from '../awardModel'
import checkModel from '../checkModel'
import weedOutModel from '../weedOutModel'
import appraiseModel from '../appraiseModel'
import bus from '@/utils/bus'
export default {
  props: ['id', 'taskDetailInfo'],
  components: {
    awardModel,
    checkModel,
    weedOutModel,
    appraiseModel
  },
  data () {
    return {
      pagination: {
        // 任务流水列表页码
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      card4Bol: false,
      order_field: '', // 否string排序的字段 评价evaluate 接单时间ctime 奖励幸福币reward_happiness
      sort_value: '', // 否string排序的值
      status: undefined, // 否int任务状态
      user_search: '', // 否string接单方搜索
      project_id: undefined, // 否int所属项目
      processStatusList: [], // 状态列表
      projectList: [], // 项目列表
      buttonStatus: '', // 按钮状态
      lineNumber: '', // 任务说明行数
      taskMa: '',
      opt_user: '', // 否string操作员
      opt_time: '', // 否string操作时间
      opt_type: '', // 否string操作类型
      opt_desc: '', // 否string操作描述
      logTime: [],
      selectedRowKeys: [],
      selectedRows: [], // 复选框选择的当前行的数据
      taskSpeedList: [], // 任务流水列表
      columns: [
        // 表格一数据
        {
          title: '进度ID',
          dataIndex: 'id',
          key: 'id',
          width: '6%'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '进度状态',
          dataIndex: 'progress_desc',
          key: 'progress_desc',
          scopedSlots: { customRender: 'progress_desc' },
          width: '10%'
        },
        {
          title: '接单方',
          dataIndex: 'user',
          key: 'user',
          scopedSlots: { customRender: 'user' },
          width: '10%'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: '10%'
        },
        {
          title: '奖励(币)',
          dataIndex: 'reward_happiness',
          key: 'reward_happiness',
          width: '10%',
          sorter: true
        },
        {
          title: '投诉',
          dataIndex: 'complaint_total',
          key: 'complaint_total',
          width: '6%',
          scopedSlots: { customRender: 'complaint_total' }
        },
        {
          title: '评价',
          dataIndex: 'evaluate ',
          key: 'evaluate ',
          width: '10%',
          sorter: true,
          scopedSlots: { customRender: 'evaluate' }
        },
        {
          title: '最新进度',
          dataIndex: 'progress_content',
          key: 'progress_content',
          width: '14%',
          scopedSlots: { customRender: 'progress_content' },
          ellipsis: true
        },
        {
          title: '接单时间',
          dataIndex: 'ctime',
          key: 'ctime',
          width: '14%',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          width: '10%',
          scopedSlots: { customRender: 'opera' }
        }
      ]
    }
  },
  computed: {
    rowSelection () {
      return {
        getCheckboxProps: record => ({
          props: {
            disabled: ['已终止', '已放弃'].includes(record.progress_desc) // Column configuration not to be checked
          }

        })

      }
    }
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
    // 用户流水表格复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 任务流水页码改变事件
    onChange (page, size) {
      // console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getTaskSpeedData()
    },
    // 任务流水页容量改变事件
    sizeChange (current, size) {
      // console.log('size: ', size)
      this.pagination.currentPage = 1
      this.pagination.pageSize = size
      this.getTaskSpeedData()
    },
    // 淘汰 确定
    async confirm (uid) {
      const arr = []
      arr.push(uid)
      await toEliminate({
        ids: arr,
        task_id: this.id
      })
      this.getTaskSpeedData()
      this.$parent.getTaskLog()
      this.$message.success('处理成功')
    },
    // 淘汰 取消
    cancel (e) {
      console.log(e)
      // this.$message.error('Click on No')
    },
    // 奖励
    award (record) {
      console.log('record', record)
      if (typeof record.uid === 'number') {
        this.$refs.awardModel.uid = record.uid
        this.$refs.awardModel.reward_happiness = record.reward_happiness

        this.selectedRowKeys = []
        this.$refs.awardModel.isShow = true
      }
    },
    // 查看
    check (uid) {
      this.$refs.checkModel.uid = uid
      this.$refs.checkModel.isShow = true
    },
    // 打开评价
    openAppraise (id) {
      this.$refs.appraiseModel.isShow = true
      this.$refs.appraiseModel.id = id
      this.currentIndex = 2
    },
    // 跳转到投诉列表
    openComplaint (record) {
      if (record.complaint_total > 0) {
        // console.log('record.complaint_total', record.uid)
        this.$emit('changeTab', 1)
        bus.$emit('sendUid', record.uid)
      }
    },
    // 清空表格复选框数组
    clear () {
      this.selectedRowKeys = []
    },
    // 批量淘汰 / 奖励
    handleMenuClick (e) {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请先选择后再操作')
        return
      }
      // console.log(e.key)
      if (+e.key === 1) {
        this.$refs.weedOutModel.isShow = true
      } else {
        this.$refs.awardModel.isShow = true
        if (this.selectedRows.length === 1) {
          this.$refs.awardModel.selectedRows = JSON.parse(
            JSON.stringify(this.selectedRows)
          )
        }
      }
    },
    // 下架任务
    async soldOut (type) {
      const res = await toOptTask({
        task_id: +this.id,
        opt_type: type
      })
      if (res.code === '201') {
        this.$message.error(res.message)
      } else {
        this.$message.success('下架成功')
      }

      this.getButtonInfo()
      // console.log('下架任务', res)
    },
    // 终止任务
    async terminate (type) {
      const res = await toOptTask({
        task_id: +this.id,
        opt_type: type
      })
      if (res.code === '201') {
        this.$message.error(res.message)
      } else {
        this.$message.success('终止成功')
      }

      this.getButtonInfo()
    },
    // 停止接单
    async stop (type) {
      const res = await toOptTask({
        task_id: +this.id,
        opt_type: type
      })
      if (res.code === '201') {
        this.$message.error(res.message)
      } else {
        this.$message.success('停止成功')
      }

      this.getButtonInfo()
      // console.log('停止接单', res)
    },
    // 展开2
    open2 () {
      document.querySelector('.card4 .form').style.height = '116px'
      this.card4Bol = false
    },
    // 收起2
    close2 () {
      document.querySelector('.card4 .form').style.height = '60px'
      this.card4Bol = true
    },
    // 任务流水排序
    tableChange1 (pagination, filters, sorter, { currentDataSource }) {
      // console.log('sorter', sorter)
      this.order_field = sorter.field
      if (sorter.order === 'ascend') {
        this.sort_value = 'asc'
      } else {
        this.sort_value = 'desc'
      }
      this.getTaskSpeedData()
    },
    // 任务流水重置
    reset1 () {
      this.order_field = ''
      this.sort_value = ''
      this.status = undefined
      this.user_search = ''
      this.project_id = undefined
      this.pagination.currentPage = 1
      this.getTaskSpeedData()
    },
    // 任务流水搜索
    search1 () {
      this.pagination.currentPage = 1
      this.getTaskSpeedData()
    },
    // 获取任务流水列表
    async getTaskSpeedData () {
      const res = await toGetTaskSpeed({
        task_id: +this.id,
        pageindex: this.pagination.currentPage,
        pagesize: this.pagination.pageSize,
        order_field: this.order_field,
        sort_value: this.sort_value,
        status: this.status,
        user_search: this.user_search,
        project_id: this.project_id
      })
      this.taskSpeedList = res.list
      this.pagination.total = res.data.total
      this.close2()
      // console.log('获取任务流水列表', res)
    }
  },
  async created () {
    this.getTaskSpeedData()
    if (this.id !== '') {
      this.getButtonInfo()
    }
    const res2 = await toGetProcessStatus()
    this.processStatusList = res2.list
    const res3 = await toGetProject()
    this.projectList = res3.data
  }
}
</script>

<style lang="less" scoped>
.taskProgress {
  margin-top: 20px;
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
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    .btns {
      button {
        margin-right: 10px;
      }
    }
    .selected {
      margin-top: 16px;
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
      margin-top: 16px;
      .takeOrderSide {
        .t2 {
          color: rgba(0, 0, 0, 0.349019607843137);
        }
      }
      .progress_content {
        .t1 {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .t2 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .btns {
        white-space: nowrap;
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
