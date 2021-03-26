<template>
  <div class="task">
    <a-card>
      <a-form-model layout="inline">
        <a-form-model-item label='开启/关闭'>
          <a-select style="width: 200px">
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
        <a-form-model-item label='搜索'>
          <a-input placeholder="任务名称"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="card">
      <div class="btns">
        <a-button
type='primary'
                  @click="add">
          <a-icon type="plus" />
          添加
        </a-button>
        <a-button>任务设置</a-button>
      </div>
      <a-table
:columns="columns"
               :data-source="data"
               :pagination='false'>
        <div slot="taskTime">
          起：2020-09-09 00:00:00<br>
          止：2020-00-00 00:00:00
        </div>
        <div slot="sort">
          <a-input class="input"></a-input>
        </div>
        <div slot="btn">
          <a-switch default-checked />
        </div>
        <div slot="opera">
          <div class="btns">
            <a-button type='link'>修改</a-button>
            <a-button
type='link'
                      @click="remove">删除</a-button>
          </div>
        </div>
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
    <addTask ref="addTask"></addTask>
    <delModel ref="delModel"></delModel>
  </div>
</template>

<script>
import addTask from './addTask'
import delModel from './delModel'
export default {
  components: {
    addTask,
    delModel
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50,
        pageSize: 1
      },
      data: [
        {
          key: '1',
          id: 10,
          task: '签到',
          happyMoney: 5
        },
        {
          key: '2',
          id: 10,
          task: '签到',
          happyMoney: 5
        },
        {
          key: '3',
          id: 10,
          task: '签到',
          happyMoney: 5
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          width: 100
        },
        {
          title: '幸福币',
          dataIndex: 'happyMoney',
          key: 'happyMoney',
          width: 80
        },
        {
          title: '任务时间',
          dataIndex: 'taskTime',
          key: 'taskTime',
          scopedSlots: { customRender: 'taskTime' },
          width: 200
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          scopedSlots: { customRender: 'sort' },
          width: 100
        },
        {
          title: '开启/关闭',
          dataIndex: 'button',
          key: 'button',
          scopedSlots: { customRender: 'btn' }
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
  methods: {
    // 删除
    remove () {
      this.$refs.delModel.isShow = true
    },
    // 添加
    add () {
      this.$refs.addTask.isShow = true
    },
    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log('size: ', size)
    }
  }
}
</script>

<style lang='less' scoped>
.task {
  .card {
    margin-top: 20px;
    .btns {
      margin-bottom: 10px;
      button {
        margin-right: 15px;
      }
    }
    .input {
      width: 100px;
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
}
</style>
