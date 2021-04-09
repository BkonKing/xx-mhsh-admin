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
        <a-button>批量操作 <a-icon type="down"/></a-button>
      </div>
      <a-table
        class="table"
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :row-selection="rowSelection"
      >
    <template slot="taskSide">
      <div>
        <div class="t1">昵称(姓名)</div>
        <div class="t2">项目名称</div>
      </div>
    </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      currentIndex: 1,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      options: [
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
          scopedSlots: { customRender: 'taskSide' }
        },
         {
          title: '接单人数',
          dataIndex: 'takeOrderNumber',
          key: 'takeOrderNumber',
          width: 150
        }
      ],
      data: [
        {
          id: '000000',
          checkTime: '剩余 20:00:00',
          taskStatus: '待审核',
          type: '任务类型',
          task: '任务标题标题标题',
          award: '1000'
        },
        {
          id: '000000',
          checkTime: '剩余 20:00:00',
          taskStatus: '待审核',
          type: '任务类型',
          task: '任务标题标题标题',
          award: '1000'
        },
        {
          id: '000000',
          checkTime: '剩余 20:00:00',
          taskStatus: '待审核',
          type: '任务类型',
          task: '任务标题标题标题',
          award: '1000'
        }
      ]
    }
  },
  computed: {
    // 表格复选框选择事件
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
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
    }
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
}
</style>
