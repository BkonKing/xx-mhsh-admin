<template>
  <div class="evaluate">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="评星">
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
            <a-form-model-item label="评价标签">
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
            <a-form-model-item label="任务" v-if="!cardBol">
              <a-input placeholder="编号、标题"></a-input>
            </a-form-model-item>
            <div class="btns" v-else>
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
              <a-button type="link" @click="open">
                展开 <a-icon type="down" />
              </a-button>
            </div>
          </a-col>
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="评价用户">
              <a-select style="width: 82px;marginRight:10px">
                <a-select-option value="jack">
                  用户
                </a-select-option>
                <a-select-option value="lucy">
                  系统
                </a-select-option>
              </a-select>
              <a-input
                placeholder="手机号、昵称/ID"
                style="width:174px"
              ></a-input>
            </a-form-model-item>
          </a-col>
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
            <div class="btns">
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
              <a-button type="link" @click="close">
                收起 <a-icon type="up" />
              </a-button>
            </div>
          </a-col>
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="是否有效">
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
            <a-form-model-item label="评价时间">
              <a-range-picker
                style="width:264px"
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
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-table :columns="columns" :data-source="data" :pagination='false'>
        <template #task>
          <div class="task" style="color:#1890FF">
            任务标题标题标题标题标题标题标...
          </div>
        </template>
        <template #appraiseUser>
          <div class="appraiseUser">
            <div class="t1">昵称</div>
            <div class="t2" style="color: rgba(0, 0, 0, 0.349019607843137);">项目名称</div>
          </div>
        </template>
        <template #opera>
          <div>
            <a-button type="link" @click="lookOver">查看</a-button>
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
    </a-card>
    <appraiseModel ref="appraiseModel"></appraiseModel>
  </div>
</template>

<script>
import moment from 'moment'
import appraiseModel from './appraiseModel'
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
        pageSize: 1 // 默认页容量
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      cardBol: false,
      data: [
        {
          id: '00000',
          rating: '1',
          tag: '标签、标签',
          supple: '内容内容内容',
          appraiseTime: '2020-11-20  08:50:08'
        },
        {
          id: '00000',
          rating: '1',
          tag: '标签、标签',
          supple: '内容内容内容',
          appraiseTime: '2020-11-20  08:50:08'
        },
        {
          id: '00000',
          rating: '1',
          tag: '标签、标签',
          supple: '内容内容内容',
          appraiseTime: '2020-11-20  08:50:08'
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
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          width: 150,
          scopedSlots: { customRender: 'task' }
        },
        {
          title: '评星',
          dataIndex: 'rating',
          key: 'rating',
          sorter: true,
           width: 100
        },
        {
          title: '标签',
          dataIndex: 'tag',
          key: 'tag',
          width: 150
        },
        {
          title: '评价用户',
          dataIndex: 'appraiseUser',
          key: 'appraiseUser',
           scopedSlots: { customRender: 'appraiseUser' },
           width: 150
        },
        {
          title: '补充内容',
          dataIndex: 'supple',
          key: 'supple',
          width: 200
        },
        {
          title: '评价时间',
          dataIndex: 'appraiseTime',
          key: 'appraiseTime',
          sorter: true,
           width: 200
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ]
    }
  },
  mounted () {
    console.log(this.$refs.card.$el.offsetHeight) // 218
  },
  methods: {
    // 查看
    lookOver () {
      this.$refs.appraiseModel.isShow = true
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
      }, 100)
      this.$refs.card.$el.style.height = '218px'
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
.evaluate {
  .btns {
    margin-left: 180px;
    button {
      margin-right: 10px;
    }
  }
  .card {
    margin-top: 20px;
    /deep/ .ant-card-body {
      padding-bottom: 0;
    }
  }
  .card2 {
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
</style>
