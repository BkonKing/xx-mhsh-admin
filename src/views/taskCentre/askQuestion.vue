<template>
  <div class="askQuestion">
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
            已通过
          </div>
          <div
            class="item"
            @click="currentIndex = 4"
            :class="{ active: currentIndex === 4 }"
          >
            未通过
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="类型">
              <a-select style="width: 264px">
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
          <a-col :span="8">
            <a-form-model-item label="审核状态">
              <a-select style="width: 264px">
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
          <a-col :span="8">
            <a-form-model-item label="有无回复" v-if="!bol">
              <a-select style="width: 264px">
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
            <div class="btns" v-if="bol">
              <a-button type="primary">
                查询
              </a-button>
              <a-button>重置</a-button>
              <a-button
type="link"
@click="open"
                >展开 <a-icon
type="down"
              /></a-button>
            </div>
          </a-col>
        </a-row>
        <a-row v-if="!bol">
          <a-col :span="8">
            <a-form-model-item label="发布用户">
              <a-input
                placeholder="手机号、用户昵称/ID"
                style="width:264px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="发布内容">
              <a-input placeholder="内容、ID" style="width:264px"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="任务">
              <a-input placeholder="编号、标题" style="width:264px"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="!bol">
          <a-col :span="8">
            <a-form-model-item label="所属项目">
              <a-select style="width: 264px">
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
          <a-col :span="8">
            <a-form-model-item label="创建时间">
              <a-range-picker
                style="width: 264px"
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
          <a-col :span="8">
            <div class="btns">
              <a-button type="primary">
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
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-button type="primary" >审核</a-button>
      <div class="selected">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">2</span> 项
        <span class="span2">清空</span>
      </div>
      <div class="table">
        <a-table
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :data-source="data"
        >
          <template #issueUser>
            <div class="issueUser">
              <div class="t1">昵称</div>
              <div class="t2">项目名称</div>
            </div>
          </template>
          <template #task>
            <div style="color:#1890FF">任务标题标题标题标题标题标题标...</div>
          </template>
          <template #opera>
            <div>
              <a-button type="link" @click="check">审核</a-button>
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
                `共 ${total} 条记录 第${pagination.currentPage}/80页`
            "
            @change="onChangePage"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <askCheckModel ref="askCheckModel"></askCheckModel>
  </div>
</template>

<script>
import moment from 'moment'
import askCheckModel from './askCheckModel'
export default {
  components: {
    askCheckModel
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
      bol: false,
      data: [
        {
          id: '000000000',
          checkTime: '剩余 20:00:00',
          checkStatus: '待审核',
          type: '提问',
          content: '内容内容内容内容内容内容',
          complain: '0',
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '000000000',
          checkTime: '剩余 20:00:00',
          checkStatus: '待审核',
          type: '提问',
          content: '内容内容内容内容内容内容',
          complain: '0',
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '000000000',
          checkTime: '剩余 20:00:00',
          checkStatus: '待审核',
          type: '提问',
          content: '内容内容内容内容内容内容',
          complain: '0',
          createTime: '2020-11-20  08:50:08'
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
        },
        {
          title: '审核时间',
          dataIndex: 'checkTime',
          key: 'checkTime',
          width: 150
        },
        {
          title: '审核状态',
          dataIndex: 'checkStatus',
          key: 'checkStatus',
          width: 100
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          ellipsis: true,
          width: 200
        },
        {
          title: '发布用户',
          dataIndex: 'issueUser',
          key: 'issueUser',
          ellipsis: true,
          scopedSlots: { customRender: 'issueUser' },
          width: 100
        },
        {
          title: '投诉',
          dataIndex: 'complain',
          key: 'complain',
          sorter: true,
          width: 100
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          // ellipsis: true,
          width: 200,
          scopedSlots: { customRender: 'task' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      selectedRowKeys: [] // Check here to configure the default column
    }
  },
  mounted () {
    // console.log(this.$refs.card.$el.offsetHeight)
    // this.$refs.card.$el.style.height = '88px'
  },
  methods: {
    // 审核
    check () {
      this.$refs.askCheckModel.isShow = true
    },
    // 页码改变事件
    onChangePage (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
    },
    // 表格复选框 事件
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    // 展开
    open () {
      setTimeout(() => {
        this.bol = false
      }, 100)
      this.$refs.card.$el.style.height = '218px'
    },
    // 收起
    close () {
      this.bol = true
      this.$refs.card.$el.style.height = '88px'
    },
    moment,
    // 时间改变事件
    onChange (dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
  }
}
</script>

<style lang="less" scoped>
.askQuestion {
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
    margin-top: 20px;
    .btns {
      margin-left: 162px;
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
    }
  }
  /deep/ .ant-card-body {
    padding-bottom: 0 !important;
  }
}
</style>
