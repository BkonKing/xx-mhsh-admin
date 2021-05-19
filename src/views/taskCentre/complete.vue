<template>
  <div class="complete" v-if="taskDetailInfo != ''">
    <page-header-wrapper></page-header-wrapper>
    <div class="cardContent">
      <a-card class="card1">
        <div class="title">流程进度</div>
        <div class="steps" v-if="taskDetailInfo.process.process_result === 0">
          <a-steps progress-dot :current="1">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step title="待审核" description="" />
            <a-step title="待接单" description="" />
            <a-step title="待完成" description="" />
            <a-step title="完成" description="" />
          </a-steps>
        </div>
        <div
          class="steps"
          v-else-if="taskDetailInfo.process.process_result === 1"
        >
          <a-steps progress-dot :current="2">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_check"
              :description="taskDetailInfo.process.check_time"
            />
            <a-step title="接单" description="" />
            <a-step title="待完成" description="" />
            <a-step title="完成" description="" />
          </a-steps>
        </div>
        <div
          class="steps"
          v-else-if="taskDetailInfo.process.process_result === 2"
        >
          <a-steps progress-dot :current="3">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_check"
              :description="taskDetailInfo.process.check_time"
            />
            <a-step
              title="接单"
              :description="taskDetailInfo.process.receive_time"
            />
            <a-step title="待完成" description="" />
            <a-step title="完成" description="" />
          </a-steps>
        </div>
        <div
          class="steps"
          v-else-if="taskDetailInfo.process.process_result === 3"
        >
          <a-steps progress-dot :current="4">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_check"
              :description="taskDetailInfo.process.check_time"
            />
            <a-step
              title="接单"
              :description="taskDetailInfo.process.process_accept"
            />
            <a-step
              title="任务完成"
              :description="taskDetailInfo.process.complete_time"
            />
            <a-step title="完成" description="" />
          </a-steps>
        </div>
        <div
          class="steps"
          v-else-if="taskDetailInfo.process.process_result === 5"
        >
          <a-steps progress-dot :current="4">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_check"
              :description="taskDetailInfo.process.check_time"
            />
            <a-step
              title="接单"
              :description="taskDetailInfo.process.receive_time"
            />
            <a-step
              title="任务完成(终止)"
              :description="taskDetailInfo.process.complete_time"
            />
            <a-step title="完成" description="" />
          </a-steps>
        </div>
        <div
          class="steps"
          v-else-if="taskDetailInfo.process.process_result === 4"
        >
          <a-steps progress-dot :current="4">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_finish"
              :description="taskDetailInfo.process.check_time"
            />
            <a-step title="结束" description="" />
          </a-steps>
        </div>
        <div
          class="steps"
          v-else-if="taskDetailInfo.process.process_result === 6"
        >
          <a-steps progress-dot :current="4">
            <a-step
              :title="taskDetailInfo.process.create_start"
              :description="taskDetailInfo.process.create_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_check"
              :description="taskDetailInfo.process.check_time"
            />
            <a-step
              :title="taskDetailInfo.process.process_finish"
              :description="taskDetailInfo.process.complete_time"
            />
            <a-step title="结束" description="" />
          </a-steps>
        </div>
      </a-card>
      <a-card class="card2">
        <div class="table-page-search-wrapper">
        <div class="title">基础信息</div>
        <div class="content">
          <a-form-model :label-col="md" >
            <a-row>
              <a-col :span="8">
                <a-form-model-item label="任务标题">
                  {{ taskDetailInfo.task_title }}
                </a-form-model-item>
                <a-form-model-item label="任务奖励">
                  {{ taskDetailInfo.happy_reward }}币（{{
                    taskDetailInfo.every_reward
                  }}币/人）| 已奖励{{ taskDetailInfo.reward_happiness }}币
                </a-form-model-item>
                <a-form-model-item
label="需要人数"
                  >{{ taskDetailInfo.assignment }}/{{
                    taskDetailInfo.need_people
                  }}</a-form-model-item
                >
                <a-form-model-item label="完成时间">{{
                  taskDetailInfo.complete_time
                }}</a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="任务类型">{{
                  taskDetailInfo.task_type
                }}</a-form-model-item>
                <a-form-model-item label="创建者">
                  <a
                    :href="
                      `/zht/user/user/getUserList?uid=${this.taskDetailInfo.uid}`
                    "
                    target="_parent"
                    >{{ taskDetailInfo.task_user }}</a
                  >
                  {{ taskDetailInfo.task_project }}
                </a-form-model-item>
                <a-form-model-item label="任务标签">
                  {{ taskDetailInfo.task_tag }}
                </a-form-model-item>
                <a-form-model-item label="完成地点">{{
                  taskDetailInfo.complete_address
                }}</a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="任务编号">
                  {{ taskDetailInfo.task_number }}
                  <img
                    style="marginLeft:10px;width:20px;height:20;"
                    preview="1"
                    :src="taskMa"
                    alt=""
                  />
                </a-form-model-item>
                <a-form-model-item label="手机号">{{
                  taskDetailInfo.mobile
                }}</a-form-model-item>
                <a-form-model-item label="联系电话">{{
                  taskDetailInfo.contact_number
                }}</a-form-model-item>
                <a-form-model-item label="可见范围">
                  <span @click="openGroupDetail" style="cursor: pointer;">
                    {{ taskDetailInfo.visible_range }}
                  </span>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
          <div class="explain">
            <div class="left">任务说明：</div>

            <div class="right" id="taskExplain" >
 {{ taskDetailInfo.task_desc }}
            </div>
          </div>
          <div class="otherBtn">
            <a-button
              type="link"
              v-if="!btnBol && lineNumber > 10"
              @click="open"
              >展开 <a-icon
type="down"
            /></a-button>
            <a-button
              type="link"
              v-else-if="btnBol && lineNumber > 10"
              @click="close"
              >收起 <a-icon
type="up"
            /></a-button>
          </div>
        </div>
        <div class="imgcon">
          <div
            class="img"
            v-for="(item,index) in taskDetailInfo.task_image"
            :key="index"
          >
            <img
              preview="0"
              :src="item"
              alt=""
            />
          </div>
        </div>
        <!-- 预览图片 -->
        <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal> -->
      </div>
      </a-card>
      <a-card class="card3">
        <a-row>
          <a-col :span="8">
            <div class="t1">提问</div>
            <div class="t2">{{ taskDetailInfo.question_total }}个</div>
            <div class="t3">
              <span>{{ taskDetailInfo.question_total }}个提问</span>
              <span>{{ taskDetailInfo.reply_total }}个回复</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="t1">投诉</div>
            <div class="t2">{{ taskDetailInfo.complaint_total }}个</div>
            <div class="t3">
              <span>任务方收到{{ taskDetailInfo.task_party }}个</span>
              <span>投诉接单方{{ taskDetailInfo.single_party }}个</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="t1">评价</div>
            <div class="t2">{{ taskDetailInfo.evaluate_total }}星</div>
            <div class="t3">已评{{ taskDetailInfo.evaluate_user }}人</div>
          </a-col>
        </a-row>
      </a-card>
      <a-card class="card4">
        <div class="top">
          <div
            class="item"
            :class="{ active: currentIndex === '' }"
            @click="selectCard4Title('')"
          >
            任务进度
          </div>
          <div
            class="item"
            :class="{ active: currentIndex === 1 }"
            @click="selectCard4Title(1)"
          >
            投诉
          </div>
          <div
            class="item"
            :class="{ active: currentIndex === 2 }"
            @click="selectCard4Title(2)"
          >
            评价
          </div>
          <div
            class="item"
            :class="{ active: currentIndex === 3 }"
            @click="selectCard4Title(3)"
          >
            提问
          </div>
        </div>
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
                    <a-button
type="link"
@click="open2"
                      >展开 <a-icon
type="down"
                    /></a-button>
                  </div>
                </a-col>
              </a-row>
              <div class="btns" v-if="!card4Bol">
                <a-button type="primary" @click="search1">查询</a-button>
                <a-button @click="reset1">重置</a-button>
                <a-button
type="link"
@click="close2"
                  >收起 <a-icon
type="up"
                /></a-button>
              </div>
            </a-form-model>
          </div>
        </div>
        <div class="content">
          <div class="btns" v-if="buttonStatus != ''">
            <a-button
v-if="buttonStatus.button_shelf === 1"
@click="soldOut(1)"
              >下架任务</a-button
            >
            <a-button
              v-if="buttonStatus.button_termination === 1"
              @click="terminate(2)"
              >终止任务</a-button
            >
            <a-button
v-if="buttonStatus.button_stop === 1"
@click="stop(3)"
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
              :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
              }"
              :columns="columns"
              :data-source="taskSpeedList"
              :pagination="false"
              @change="tableChange1"
            >
              <template slot="progress_desc" slot-scope="progress_desc">
                <div
                  :style="{ color: progress_desc === '暂停中' ? 'red' : '' }"
                >
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
                 v-if="record.evaluate !=0"
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
                  <a-button
type="link"
@click="check(record.uid)"
                    >查看</a-button
                  >
                  <a-button
                    type="link"
                    @click="award(record.uid)"
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
      </a-card>
      <a-card class="card5" v-if="taskDetailInfo.check_list.length > 0">
        <div class="title">
          审核信息
        </div>
      <div class="content">
          <div
          class="card5Item"
          v-for="(item, index) in taskDetailInfo.check_list"
          :key="index"
        >
          <div class="c1">
            <div class="t1">审核状态：{{ item.check_status }}</div>
            <div class="t2">审核人：{{ item.check_user }}</div>
            <div class="t3">审核时间：{{ item.check_time }}</div>
          </div>
          <div class="c2" v-if="taskDetailInfo.task_status === 4">
            违规原因：{{ item.check_reason }}
          </div>
          <div class="c3">
            <div class="t1">处理回复：</div>
            <div class="t2">
              {{ item.check_desc }}
            </div>
          </div>
          <div class="imgcon">
            <div class="img" v-for="item in item.check_image" :key="item">
              <img preview="2" :src="item" alt="" />
            </div>
          </div>
        </div>
      </div>
      </a-card>
      <a-card class="card6">
        <div class="title">操作日志</div>
        <div class="table-page-search-wrapper">
          <div class="form">
            <a-form-model layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作员">
                    <a-input v-model="opt_user" placeholder="姓名"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-model-item label="操作时间">
                    <a-range-picker
                      v-model="logTime"
                      class="piker-time"
                      :ranges="{
                        Today: [moment(), moment()],
                        'This Month': [moment(), moment().endOf('month')]
                      }"
                      show-time
                      format="YYYY/MM/DD HH:mm:ss"
                      @change="onChange2"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :sm="24" v-if="!card6Bol">
                  <div class="btns">
                    <a-button type="primary" @click="logSearch">查询</a-button>
                    <a-button @click="logReset">重置</a-button>
                    <a-button
type="link"
@click="open3"
                      >展开 <a-icon
type="down"
                    /></a-button>
                  </div>
                </a-col>
                <template v-if="card6Bol">
                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="操作类型">
                      <a-input
                        v-model="opt_type"
                        placeholder="关键字"
                      ></a-input>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-model-item label="操作说明">
                      <a-input
                        v-model="opt_desc"
                        placeholder="关键字"
                      ></a-input>
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8" :sm="24"></a-col>
                  <a-col :md="8" :sm="24">
                    <div class="btns">
                      <a-button
type="primary"
@click="logSearch"
                        >查询</a-button
                      >
                      <a-button @click="logReset">重置</a-button>
                      <a-button
type="link"
@click="close3"
                        >收起 <a-icon
type="up"
                      /></a-button>
                    </div>
                  </a-col>
                </template>
              </a-row>
            </a-form-model>
          </div>
        </div>
        <div class="table">
          <a-table
            rowKey="id"
            :pagination="false"
            :columns="columns2"
            :data-source="logData"
          >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
          <div class="pagination">
            <a-pagination
              v-model="pagination2.currentPage"
              show-quick-jumper
              show-size-changer
              :page-size-options="pagination2.sizes"
              :total="pagination2.total"
              :page-size.sync="pagination2.pageSize"
              :show-total="
                (total, range) =>
                  `共 ${total} 条记录 第${pagination.currentPage}/${Math.ceil(
                    total / pagination.pageSize
                  )}页`
              "
              @change="onChange3"
              @showSizeChange="sizeChange3"
            />
          </div>
        </div>
      </a-card>
    </div>
    <checkModel :id="id" ref="checkModel"></checkModel>
    <awardModel
      :selectedRowKeys="selectedRowKeys"
      :taskDetailInfo="taskDetailInfo"
      :id="id"
      ref="awardModel"
    ></awardModel>
    <appraiseModel ref="appraiseModel"></appraiseModel>
    <weedOutModel
      ref="weedOutModel"
      :selectedRowKeys="selectedRowKeys"
      :id="id"
    ></weedOutModel>
  </div>
</template>

<script>
import moment from 'moment'
import checkModel from './checkModel'
import awardModel from './awardModel'
import appraiseModel from './appraiseModel'
import weedOutModel from './weedOutModel'
import {
  getTaskDetail,
  toGetTaskSpeed,
  toGetProcessStatus,
  toGetProject,
  toGetButtonStatus,
  toTaskCode,
  toOptTask,
  toGetLog,
  toEliminate
} from '@/api/taskCentre'
export default {
  components: {
    checkModel,
    awardModel,
    appraiseModel,
    weedOutModel
  },
  data () {
    return {
      current: 2, // 当前进度条位置
      md: { span: 4 },
      // wrapperCol: { span: 10 },
      // previewVisible: false, // 是否预览图片
      // previewImage: '', // 预览图片链接
      btnBol: false, // 控制任务说明行数显示
      // titleArr: ['任务进度', '投诉', '评价', '提问'],
      currentIndex: '',
      card4Bol: false,
      taskSpeedList: [], // 任务流水列表
      columns: [
        // 表格一数据
        {
          title: '进度ID',
          dataIndex: 'id',
          key: 'id',
          width: '10%'
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
          width: '10%',
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
          width: '10%',
          scopedSlots: { customRender: 'progress_content' }
        },
        {
          title: '接单时间',
          dataIndex: 'ctime',
          key: 'ctime',
          width: '10%',
          sorter: true
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
      pagination: {
        // 任务流水列表页码
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      card6Bol: false,
      columns2: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: '16.666666%'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '操作时间',
          dataIndex: 'ctime',
          key: 'ctime',
          width: '16.666666%'
        },
        {
          title: '模块',
          dataIndex: 'module_type',
          key: 'module_type',
          width: '16.666666%'
        },
        {
          title: '操作员',
          dataIndex: 'username',
          key: 'username',
          width: '16.666666%'
        },
        {
          title: '操作类型',
          dataIndex: 'opt_type',
          key: 'opt_type',
          width: '16.666666%'
        },
        {
          title: '操作说明',
          dataIndex: 'content',
          key: 'content',
          width: '16.666666%'
        }
      ],
      logData: [],
      pagination2: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      id: '', // 任务详情id
      taskDetailInfo: '', // 任务详情信息
      order_field: '', //	否	string	排序的字段 评价evaluate 接单时间ctime 奖励幸福币reward_happiness
      sort_value: '', //	否	string	排序的值
      status: undefined, //	否	int	任务状态
      user_search: '', //	否	string	接单方搜索
      project_id: undefined, //	否	int	所属项目
      processStatusList: [], // 状态列表
      projectList: [], // 项目列表
      buttonStatus: '', // 按钮状态
      lineNumber: '', // 任务说明行数
      taskMa: '',
      opt_user: '', //	否	string	操作员
      opt_time: '', //	否	string	操作时间
      opt_type: '', //	否	string	操作类型
      opt_desc: '', //	否	string	操作描述
      logTime: []
    }
  },
  mounted () {
    this.$previewRefresh()
    // 设置文本超出隐藏
    document.querySelector('#taskExplain').style.display = '-webkit-box'
    document.querySelector('#taskExplain').style.webkitBoxOrient = 'vertical'
    document.querySelector('#taskExplain').style.webkitLineClamp = '10'
    document.querySelector('#taskExplain').style.overflow = 'hidden'
  },
  methods: {
    // 新窗口打开用户详情页面
    // openUserDetail () {
    //    window.open(`/zht/household/member/getMemberList?uid=${this.taskDetailInfo.uid}`, '_parent')
    // },
    // 新窗口打开群详情
    openGroupDetail () {
      if (this.taskDetailInfo.group_id) {
        const routeData = this.$router.resolve({
          name: 'groupDetail',
          query: { id: this.taskDetailInfo.group_id }
        })
        window.open(routeData.href, '_blank')
      }
    },
    // 跳转到投诉列表
    openComplaint (record) {
      if (record.complaint_total > 0) {
        this.currentIndex = 1
        this.$router.push(
          `/taskCentre/complain?task_id=${this.id}&uid=${record.uid}`
        )
      }
    },
    // 批量淘汰 / 奖励
    handleMenuClick (e) {
      if (this.selectedRowKeys.length == 0) {
        return
      }
      // console.log(e.key)
      if (+e.key === 1) {
        this.$refs.weedOutModel.isShow = true
      } else {
        this.$refs.awardModel.isShow = true
      }
    },
    // 日志重置
    logReset () {
      this.opt_user = ''
      this.opt_time = ''
      this.opt_type = ''
      this.opt_desc = ''
      this.logTime = ''
      this.getTaskLog()
    },
    // 日志搜索
    logSearch () {
      this.pagination2.currentPage = 1
      this.getTaskLog()
    },
    // 获取任务日志列表
    async getTaskLog () {
      const res = await toGetLog({
        pagesize: this.pagination2.pageSize,
        pageindex: this.pagination2.currentPage,
        type: 1,
        task_id: +this.id,
        opt_user: this.opt_user,
        opt_time: this.opt_time,
        opt_type: this.opt_type,
        opt_desc: this.opt_desc
      })
      this.logData = res.data.list
      this.pagination2.total = res.data.total
      // console.log('任务日志', res)
    },
    // 下架任务
    async soldOut (type) {
      const res = await toOptTask({
        task_id: +this.id,
        opt_type: type
      })
      console.log('下架任务', res)
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
    },
    // 停止接单
    async stop (type) {
      const res = await toOptTask({
        task_id: +this.id,
        opt_type: type
      })
      console.log('停止接单', res)
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
      // console.log('获取任务流水列表', res)
    },
    // 打开评价
    openAppraise (id) {
      this.$refs.appraiseModel.isShow = true
      this.$refs.appraiseModel.id = id
      this.currentIndex = 2
    },
    // 奖励
    award (uid) {
      if (typeof uid === 'number') {
        this.$refs.awardModel.uid = uid
        this.selectedRowKeys = []
      }
      this.$refs.awardModel.isShow = true
    },
    // 查看
    check (uid) {
      this.$refs.checkModel.uid = uid
      this.$refs.checkModel.isShow = true
    },
    // 日志操作页码改变事件
    onChange3 (page, size) {
      // console.log('Page: ', page)
      this.pagination2.currentPage = page
      this.getTaskLog()
    },
    // 日志操作页容量改变事件
    sizeChange3 (current, size) {
      console.log('size: ', size)
      this.pagination2.currentPage = 1
      this.pagination2.pageSize = size
      this.getTaskLog()
    },
    // 展开3
    open3 () {
      this.card6Bol = true
    },
    // 收起3
    close3 () {
      this.card6Bol = false
    },
    moment,
    // 操作时间改变
    onChange2 (dates, dateStrings) {
      this.opt_time = dateStrings[0] + '~' + dateStrings[1]
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    },
    // 清空表格复选框数组
    clear () {
      this.selectedRowKeys = []
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
      this.getTaskLog()
      this.$message.success('处理成功')
    },
    // 淘汰 取消
    cancel (e) {
      console.log(e)
      // this.$message.error('Click on No')
    },
    // 用户流水表格复选框选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
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
    // 切换标题
    selectCard4Title (type) {
      this.currentIndex = type
      if (type === 1) {
        this.$router.push('/taskCentre/complain?task_id=' + this.id)
      } else if (type === 2) {
        this.$router.push('/taskCentre/evaluate?task_id=' + this.id)
      } else if (type === 3) {
        this.$router.push('/taskCentre/askQuestion?task_id=' + this.id)
      }
    },
    // 任务说明收起
    close () {
      this.btnBol = false
      document.querySelector('#taskExplain').setAttribute('class', 'hasHidden')
    },
    // 任务说明展开
    open () {
      this.btnBol = true
      document.querySelector('#taskExplain').removeAttribute('class')
    }
  },
  async created () {
    this.id = this.$route.query.id
    this.getTaskSpeedData()
    if (this.id !== '') {
      getTaskDetail({ id: +this.id }).then(res => {
        this.taskDetailInfo = res.data
        console.log('任务详情', res)
        this.$nextTick(() => {
          this.lineNumber = Math.round(
            document.querySelector('#taskExplain').clientHeight / 20
          )
          this.close()
          this.close2()
        })
      })

      const res4 = await toGetButtonStatus({
        id: +this.id
      })
      this.buttonStatus = res4.data
      // console.log('任务详情-按钮状态控制', res4)
      const res5 = await toTaskCode({
        task_id: this.id
      })
      this.taskMa = res5.data.img_url
      // console.log('任务二维码', res5)
      this.getTaskLog()
    }
    const res2 = await toGetProcessStatus()
    this.processStatusList = res2.list
    // console.log('获取任务进度', res2)
    const res3 = await toGetProject()
    this.projectList = res3.data

    // console.log('获取所有项目', res3)
  }
}
</script>

<style lang="less" scoped>
.complete {
  /deep/ .ant-card-body {
    padding: 0;
  }
  .cardContent {
    padding: 0 20px;
  }
  .card1 {
    margin-top: 20px;
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .steps {
      padding: 30px;
    }
  }
  .card2 {
    .hasHidden{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
      overflow: hidden;
    }
      /deep/ .ant-form-item-label {
      min-width: 88px;
    }
    /deep/ .ant-card-body {
      padding-bottom: 20px;
    }

    margin-top: 20px;
    .title {
      padding-left: 30px;
      height: 55px;
      line-height: 55px;
      font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
      font-weight: 650;
      font-style: normal;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.847058823529412);
      border-bottom: 1px solid rgba(233, 233, 233, 1);
    }
    .explain {
      padding: 0 38px;
      display: flex;
      .left {
        width: 70px;
        white-space: nowrap;
      }
      .right {
        flex: 1;
        line-height: 20px;

      }
    }
    .otherBtn {
      padding: 0 38px;
      text-align: right;
    }
    .imgcon {
      display: flex;
      .img {
        cursor: pointer;
        margin-left: 38px;
        margin-top: 10px;
        width: 104px;
        height: 104px;
        padding: 10px;
        border: 2px dashed #dedede;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .card3 {
    /deep/ .ant-card-body {
      padding-left: 30px;
      padding-right: 30px;
    }
    margin-top: 20px;
    .ant-col {
      height: 144px;
      text-align: center;
      &:nth-child(2) {
        border-left: 1px solid rgba(233, 233, 233, 1);
        border-right: 1px solid rgba(233, 233, 233, 1);
      }
      .t1 {
        margin-top: 30px;
      }
      .t2 {
        font-size: 24px;
        font-family: "MicrosoftYaHei", "Microsoft YaHei";
        font-weight: 600;
        font-style: normal;
        line-height: 32px;
        margin: 10px 0;
      }
      .t3 {
        span {
          padding: 0 10px;
        }
      }
    }
  }
  .card4 {
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
      padding-top: 20px;
      padding-left: 30px;
      padding-right: 30px;
      .btns {
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
}
.card5 {
  margin-top: 20px;
  padding-bottom: 20px;
 .content{
   padding: 0 30px;
    .card5Item{
     border-bottom: 1px solid #E8E8E8;
     padding-bottom: 30px;
     &:last-child{
       border-bottom: none;
     }
  }
 }
  .title {
    padding-left: 30px;
    height: 55px;
    line-height: 55px;
    font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.847058823529412);
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .c1 {
    margin-top: 20px;
    // padding: 0 30px;
    display: flex;
    .t1,
    .t2,
    .t3 {
      flex: 1;
    }
  }
  .c2 {
    margin-top: 20px;
    // padding: 0 30px;
  }
  .c3 {
    margin-top: 20px;
    // padding: 0 30px;
    display: flex;
    .t1 {
      width: 70px;
    }
    .t2 {
      flex: 1;
    }
  }
  .imgcon {
    display: flex;
    .img {
      cursor: pointer;
      margin-left: 38px;
      margin-top: 10px;
      width: 104px;
      height: 104px;
      padding: 10px;
      border: 2px dashed #dedede;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.card6 {
  margin-top: 20px;
  .title {
    padding-left: 30px;
    height: 55px;
    line-height: 55px;
    font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.847058823529412);
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
  .form {
    padding: 0 20px;
    margin-top: 20px;
    .btns {
      text-align: right;
      button {
        margin-right: 10px;
      }
    }
  }
  .table {
    padding: 0 30px;
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

/deep/ .ant-modal-body {
  padding: 44px !important;
}
</style>
