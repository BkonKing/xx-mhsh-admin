<template>
  <div class="task">
    <page-header-wrapper>
      <template #content>
        <div class="task-top">
          <div
            class="item"
            @click="currentIndex = 1"
            :class="{ active: currentIndex === 1 }"
          >
            全部
          </div>
          <div
            class="item"
            @click="currentIndex = 2"
            :class="{ active: currentIndex === 2 }"
          >
            待审核
          </div>
          <div
            class="item"
            @click="currentIndex = 3"
            :class="{ active: currentIndex === 3 }"
          >
            待接单
          </div>
          <div
            class="item"
            @click="currentIndex = 4"
            :class="{ active: currentIndex === 4 }"
          >
            待交付
          </div>
          <div
            class="item"
            @click="currentIndex = 5"
            :class="{ active: currentIndex === 5 }"
          >
            已完成
          </div>
          <div
            class="item"
            @click="currentIndex = 6"
            :class="{ active: currentIndex === 6 }"
          >
            已终止
          </div>
          <div
            class="item"
            @click="currentIndex = 7"
            :class="{ active: currentIndex === 7 }"
          >
            已失效
          </div>
          <div
            class="item"
            @click="currentIndex = 8"
            :class="{ active: currentIndex === 8 }"
          >
            未通过
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col span="8">
            <a-form-model-item label="任务类型">
              <a-select placeholder="请选择" style="width: 400px">
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
          <a-col :span="7" :offset="1">
            <a-form-model-item label="任务状态">
              <a-select placeholder="请选择" style="width: 400px">
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
          <a-col :span="7" :offset="1">
            <a-form-model-item label="任务状态">
              <a-select placeholder="请选择" style="width: 400px">
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
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="任务方">
              <a-input
                placeholder="手机号、用户昵称/ID、任务联系电话"
                style="width: 400px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="7" :offset="1">
            <a-form-model-item label="接单方">
              <a-input
                placeholder="手机号、用户昵称/ID"
                style="width: 400px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="7" :offset="1" v-if="!cardBol">
            <a-form-model-item label="任务">
              <a-input
                placeholder="编号、标题、内容"
                style="width: 400px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="7" :offset="1" v-if="cardBol">
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
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="可见小区">
              <a-select style="width: 400px">
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
          <a-col :span="7" :offset="1">
            <a-form-model-item label="可见地区">
              <a-cascader
                style="width:400px"
                :changeOnSelect="true"
                :options="options"
                placeholder="Please select"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="7" :offset="1">
            <a-form-model-item label="可见群">
              <a-input placeholder="群名称/ID" style="width:400px"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="所属项目">
              <a-select style="width: 400px">
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
          <a-col :span="7" :offset="1">
            <a-form-model-item label="创建时间">
              <a-range-picker
                style="width:400px"
                :ranges="{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')]
                }"
                show-time
                format="YYYY/MM/DD HH:mm:ss"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="7" :offset="1">
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
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <div class="top">
        <a-button type="primary">新建任务</a-button>
        <a-button @click="batchOpera">批量操作 <a-icon type="down"/></a-button>
      </div>
      <div class="selected" v-if="selectedRowKeys.length>0">
       <a-icon class="icon" type="info-circle"  />
        已选择 <span class="span1">{{selectedRowKeys.length}}</span> 项  <span class="span2" @click="clear">清空</span>
      </div>
      <a-table
        class="table"
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template slot="taskSide">
          <div>
            <div class="t1">昵称(姓名)</div>
            <div class="t2">项目名称</div>
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
        <template #takeOrderNumber>
          <div>
            -/10
          </div>
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
                      :show-total="(total, range) => `共 ${total} 条记录 第${pagination.currentPage}/80页`"
                      @change="onChange"
                      @showSizeChange="sizeChange" />
      </div>
    </a-card>
    <batchCheck ref="batchCheck" :selectedRowKeys='selectedRowKeys'></batchCheck>
  </div>
</template>

<script>
import moment from 'moment'
import batchCheck from './batchCheck'
import { toGetTaskStatus } from '@/api/taskCentre'
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
        pageSize: 1 // 默认页容量
      },
      currentIndex: 1,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      options: [ // 城市数据
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
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '审核时间',
          dataIndex: 'checkTime',
          key: 'checkTime',
          width: 150
        },
        {
          title: '任务状态',
          dataIndex: 'taskStatus',
          key: 'taskStatus',
          width: 150
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 150
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          width: 150
        },
        {
          title: '奖励(币)',
          dataIndex: 'award',
          key: 'award',
          sorter: true,
          width: 150
        },
        {
          title: '任务方',
          dataIndex: 'taskSide',
          key: 'taskSide',
          width: 150,
          scopedSlots: { customRender: 'taskSide' }
        },
        {
          dataIndex: 'takeOrderNumber',
          key: 'takeOrderNumber',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'takeOrderNumber' },
          width: 150
        },
        {
          title: '投诉',
          dataIndex: 'complain',
          key: 'complain',
          sorter: true,
          width: 150
        },
        {
          title: '提问',
          dataIndex: 'ask',
          key: 'ask',
          sorter: true,
          width: 150
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: true,
          width: 150
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      data: [
        {
          id: '000000',
          checkTime: '剩余 20:00:00',
          taskStatus: '待审核',
          type: '任务类型',
          task: '任务标题标题标题',
          award: '1000',
          complain: 0,
          ask: 0,
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '000000',
          checkTime: '剩余 20:00:00',
          taskStatus: '待审核',
          type: '任务类型',
          task: '任务标题标题标题',
          award: '1000',
          complain: 0,
          ask: 0,
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '000000',
          checkTime: '剩余 20:00:00',
          taskStatus: '待审核',
          type: '任务类型',
          task: '任务标题标题标题',
          award: '1000',
          complain: 0,
          ask: 0,
          createTime: '2020-11-20  08:50:08'
        }
      ],
     selectedRowKeys: [] // 表格复选框数组
    }
  },
  computed: {

  },
  mounted () {
    // console.log(this.$refs.card.$el.offsetHeight)
    // this.$refs.card.$el.style.height = '150px'
  },
  methods: {
    moment,
    // 收起
    close () {
      this.cardBol = true
      this.$refs.card.$el.style.height = '150px'
    },
    // 展开
    open () {
      setTimeout(() => {
        this.cardBol = false
      }, 20)
      this.$refs.card.$el.style.height = '300px'
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
    // 任务-获取任务状态
    const res = await toGetTaskStatus()
    console.log('任务-获取任务状态', res)
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
  .btn1 {
    margin-left: 150px;
  }
  button {
    margin-right: 10px;
  }
}
.card {
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
  .selected{
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
    .icon{
      color:#0E77D1;
      margin-right: 10px;
    }
    .span1{
      color: #0E77D1;
    }
    .span2{
      cursor: pointer;
      color: #0E77D1;
      margin-left: 10px;
    }
  }
}
</style>
