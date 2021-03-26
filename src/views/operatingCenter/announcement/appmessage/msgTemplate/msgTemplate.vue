<template>
  <div class="msgTemplate">
    <a-card class="card">
      <a-form-model
:model="form"
                    layout="inline">
        <a-form-model-item label="是否启用">
          <a-select style="width: 200px">
            <a-select-option value="1">
              开启
            </a-select-option>
            <a-select-option value="0">
              关闭
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="消息类型">
          <a-select style="width: 200px">
            <a-select-option value="1">
              系统消息
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="搜索">
          <a-input placeholder="标题、内容"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-button
type='primary'
                @click="add">新增模板</a-button>
      <a-table
class="table"
               :columns="columns"
               :data-source="data"
               :pagination='false'>
        <span
slot="name"
              slot-scope="text">{{ text }}</span>
        <div slot="isStart">
          <a-switch default-checked />
        </div>
        <div slot="opera">
          <a-button type="link">编辑</a-button>
          <a-popconfirm
title="你确定要删除吗?"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="confirm"
                        @cancel="cancel">
            <a-icon
slot="icon"
                    type="close-circle"
                    style="color: red" />
            <a href="#">删除</a>
          </a-popconfirm>
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
    <createTemplate ref="createTemplate"></createTemplate>
  </div>
</template>

<script>
import createTemplate from './createTemplate'
export default {
  components: {
    createTemplate
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50,
        pageSize: 1
      },
      form: {},
      data: [
        {
          key: '1',
          id: '1',
          type: '系统消息',
          msgTitle: '标题标题标题',
          msgContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          pushTime: 10,
          createdTime: '2020-11-20  08:50:08',
          isStart: ''
        },
        {
          key: '2',
          id: '2',
          type: '系统消息',
          msgTitle: '标题标题标题',
          msgContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          pushTime: 10,
          createdTime: '2020-11-20  08:50:08',
          isStart: ''
        },
        {
          key: '3',
          id: '3',
          type: '系统消息',
          msgTitle: '标题标题标题',
          msgContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          pushTime: 10,
          createdTime: '2020-11-20  08:50:08',
          isStart: ''
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'name',
          scopedSlots: { customRender: 'name' },
          width: 80
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'age',
          width: 100
        },
        {
          title: '消息标题',
          dataIndex: 'msgTitle',
          key: 'address 1',
          ellipsis: true
        },
        {
          title: '消息内容',
          dataIndex: 'msgContent',
          key: 'address 2',
          ellipsis: true
        },
        {
          title: '推送次数',
          dataIndex: 'pushTime',
          key: 'address 3'
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          key: 'address 4',
          ellipsis: true
        },
        {
          title: '是否启用',
          dataIndex: 'isStart',
          key: 'address 5',
          scopedSlots: { customRender: 'isStart' }
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
    // 新增
    add () {
      this.$refs.createTemplate.isShow = true
    },
    confirm () { },
    cancel () { },
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

<style lang="less" scoped>
.msgTemplate {
  .card {
    margin-top: 20px;
  }
  .card2 {
    margin-top: 20px;
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
  }
}
</style>
