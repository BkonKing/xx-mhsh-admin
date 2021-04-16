<template>
  <div class="complain">
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
            待处理
          </div>
          <div
            class="item"
            @click="currentIndex = 3"
            :class="{ active: currentIndex === 3 }"
          >
            已处理
          </div>
        </div>
      </template>
    </page-header-wrapper>
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="处理状态">
              <a-select style="width: 264px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled">
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="投诉类型">
              <a-select style="width: 264px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled">
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="内容类型" v-if="!cardBol">
              <a-select style="width: 264px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled">
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <div class="btns" v-else>
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
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="被投诉人">
              <a-select style="width: 82px;marginRight:10px">
                <a-select-option value="jack">
                  任务方
                </a-select-option>
                <a-select-option value="lucy">
                  接单方
                </a-select-option>
              </a-select>
              <a-input
                placeholder="手机号、用户昵称/ID"
                style="width: 174px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="投诉人">
              <a-input
                placeholder="手机号、用户昵称/ID"
                style="width: 264px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="投诉描述">
              <a-input placeholder="关键字" style="width: 264px"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="任务">
              <a-input placeholder="编号、标题" style="width: 264px"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="任务状态">
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
            <a-form-model-item label="投诉时间">
              <a-range-picker
                style="width: 264px"
                :ranges="{
                  Today: [moment(), moment()],
                  'This Month': [moment(), moment().endOf('month')]
                }"
                show-time
                format="YYYY/MM/DD HH:mm:ss"
                @change="onChange"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8"></a-col>
          <a-col :span="8"></a-col>
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
      <a-button type="primary" @click="batchDeal">处理</a-button>
      <div class="selected" v-if="selectedRowKeys.length>0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{selectedRowKeys.length}}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
     <div class="table">
        <a-table :columns="columns" :data-source="data" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :pagination='false'>
      <template #complaindContent>
        <div class="complaindContent" style="color:#1890FF">
                 内容内容内容内容内容内容
        </div>
      </template>
      <template #complaindPeople>
        <div class="complaindPeople">
          <div class="t1">昵称</div>
          <div class="t2" style="color: rgba(0, 0, 0, 0.349019607843137);">项目名称</div>
        </div>
      </template>
      <template #complainMan>
        <div class="complainMan">
          <div class="t1">昵称</div>
          <div class="t2" style="color: rgba(0, 0, 0, 0.349019607843137);">项目名称</div>
        </div>
      </template>
      <template #opera>
        <div class="opera">
          <a-button type="link" >查看</a-button>
          <a-button type="link" @click="deal">处理</a-button>
        </div>
      </template>
      </a-table>
     </div>
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
    </a-card>
    <complainDeal ref="complainDeal"></complainDeal>
    <complainBatchDeal ref="complainBatchDeal" :selectedRowKeys='selectedRowKeys'></complainBatchDeal>
  </div>
</template>

<script>
import moment from 'moment'
import complainDeal from './complainDeal'
import complainBatchDeal from './complainBatchDeal'
export default {
  components: {
    complainDeal,
    complainBatchDeal
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
      cardBol: false,
      data: [
        {
          id: '00000',
          dealTime: '剩余 20:00:00',
          status: '待审核',
          type: '提问',
          complainType: '投诉类型',
          complainTime: '2020-11-20  08:50:08'
        },
        {
          id: '00000',
          dealTime: '剩余 20:00:00',
          status: '待审核',
          type: '提问',
          complainType: '投诉类型',
          complainTime: '2020-11-20  08:50:08'
        },
        {
          id: '00000',
          dealTime: '剩余 20:00:00',
          status: '待审核',
          type: '提问',
          complainType: '投诉类型',
          complainTime: '2020-11-20  08:50:08'
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
          title: '处理时间',
          dataIndex: 'dealTime',
          key: 'dealTime',
          width: 150
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width: 100
        },
        {
          title: '内容类型',
          dataIndex: 'type',
          key: 'type',
           width: 150
        },
        {
          title: '被投诉内容',
          dataIndex: 'complaindContent',
          key: 'complaindContent',
          scopedSlots: { customRender: 'complaindContent' },
          width: 200
        },
        {
          title: '投诉类型',
          dataIndex: 'complainType',
          key: 'complainType',
          width: 150
        },
        {
          title: '被投诉人',
          dataIndex: 'complaindPeople',
          key: 'complaindPeople',
          scopedSlots: { customRender: 'complaindPeople' },
          width: 150
        },
        {
          title: '投诉人',
          dataIndex: 'complainMan',
          key: 'complainMan',
          scopedSlots: { customRender: 'complainMan' },
          width: 150
        },
        {
          title: '投诉时间',
          dataIndex: 'complainTime',
          key: 'complainTime',
          width: 200,
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
       selectedRowKeys: []
    }
  },
  mounted () {
    console.log(this.$refs.card.$el.offsetHeight) // 274
  },
  methods: {
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
      this.$refs.complainBatchDeal.isShow = true
    },
    // 处理
    deal () {
      this.$refs.complainDeal.isShow = true
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
    // 展开
    open () {
      setTimeout(() => {
        this.cardBol = false
      }, 200)
      this.$refs.card.$el.style.height = '274px'
    },
    // 收起
    close () {
      this.cardBol = true
      this.$refs.card.$el.style.height = '75px'
    },
    moment,
    onChange (dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    }
  }
}
</script>

<style lang="less" scoped>
.complain {
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
      margin-left: 198px;
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
    .table{
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
  }
}
</style>
