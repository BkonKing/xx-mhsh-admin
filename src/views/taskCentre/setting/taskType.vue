<template>
  <div class="taskType">
    <a-card class="card">
      <div class="btn">
        <a-button type="primary" @click="add">新增类型</a-button>
      </div>
      <div class="table">
        <a-table :columns="columns" :data-source="taskData" :pagination="false" rowKey="id" @change="handleTableChange">
          <span
        slot="sortTitle"
            >排序
            <a-tooltip>
              <template slot="title">
                此列表及APP端显示顺序
              </template>
              <a-icon
                type="info-circle"
                style="fontSize:14px;marginLeft:10px"
              />
            </a-tooltip>
          </span>
          <!-- <template #sort>
            <div class="order_sort">
              <a-input style="width:128px"></a-input>
            </div>
          </template> -->
          <div class="order_sort" slot="order_sort" slot-scope="order_sort">
             <a-input style="width:128px" :value='order_sort'></a-input>
          </div>
          <span
         slot="is_openTitle"
            >是否开启
            <a-tooltip>
              <template slot="title">
                开启则展示在APP端并且可选
              </template>
              <a-icon
                type="info-circle"
                style="fontSize:14px;marginLeft:10px"
              />
            </a-tooltip>
          </span>
          <!-- <template #is_open>
            <div>
              <a-switch default-checked />
            </div>
          </template> -->
          <div slot="is_open" slot-scope="is_open">
             <a-switch default-checked :checked='is_open===1?true:false' />
          </div>
          <template slot="opera" slot-scope="text,record">
            <div class="opera">
              <a-button type="link" @click="edit(record)">编辑</a-button>
              <a-popconfirm
                title="你确定要删除这行内容吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm(record)"
              >
                <a-icon slot="icon" type="close-circle" style="color: red" />
                <a href="#">删除</a>
              </a-popconfirm>
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
                `共 ${total} 条记录 第${pagination.currentPage}/${total / pagination.pageSize}页`
            "
            @change="onChangePage"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <editModel ref="editModel"></editModel>
  </div>
</template>

<script>
import editModel from './editModel'
import { gainGetTaskTypeList, toUpdateTaskType } from '@/api/taskCentre'
export default {
  components: {
    editModel
  },
  data () {
    return {
      taskData: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '任务类型',
          dataIndex: 'type_name',
          key: 'type_name',
          width: 100
        },
        {
          title: '参考价(幸福币)',
          dataIndex: 'price',
          key: 'price',
          width: 150
        },
        {
          title: '任务',
          dataIndex: 'task_total',
          key: 'task_total',
          sorter: true,
          width: 100
        },
        {
          dataIndex: 'order_sort',
          key: 'order_sort',
          slots: { title: 'sortTitle' },
          scopedSlots: { customRender: 'order_sort' },
          width: 200
        },
        {
          dataIndex: 'is_open',
          key: 'is_open',
          slots: { title: 'is_openTitle' },
          scopedSlots: { customRender: 'is_open' },
          width: 150
        },
        {
          title: '创建人',
          dataIndex: 'admin_realname',
          key: 'admin_realname',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'ctime',
          key: 'ctime',
          sorter: true,
          width: 200
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],
       pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 1 // 默认页容量
      }
    }
  },
  methods: {
    // 排序
    handleTableChange (pagination, filters, sorter, { currentDataSource }) {
      console.log('pagination', pagination)
      console.log('filters', filters)
      console.log('sorter', sorter)
      console.log('currentDataSource', currentDataSource)
    },
    // 确定删除
   async confirm (record) {
    const res = await toUpdateTaskType({
      update_field: 'is_del',
      update_value: +record.start_price,
      id: record.id
    })
    this.getData()
    console.log('删除', res)
    this.$message.success('删除成功')
    },
    // 获取任务列表
    async getData () {
      const res = await gainGetTaskTypeList({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage
      })
      this.taskData = res.list
      this.pagination.total = res.data.total
      console.log('获取任务列表', res)
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
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getData()
    },
    add () {
      this.$refs.editModel.isShow = true
      this.$refs.editModel.mode = 'add'
    },
    edit (record) {
      console.log('record', record)
      const obj = {
        type_name: record.type_name,
        start_price: record.start_price,
        end_price: record.close_price,
        remark: record.remark,
        id: record.id
      }
      this.$refs.editModel.isShow = true
      this.$refs.editModel.mode = 'edit'
      this.$refs.editModel.form = JSON.parse(JSON.stringify(obj))
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.taskType {
  .card {
    margin-top: 20px;
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
</style>
