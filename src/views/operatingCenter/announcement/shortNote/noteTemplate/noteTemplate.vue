<template>
  <div class="noteTemplate">
    <a-card class="card">
      <a-form-model layout="inline"
                    :model='form'>
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label='是否启用'>
              <a-select style="width: 250px">
                <a-select-option value="1">
                  开启
                </a-select-option>
                <a-select-option value="2">
                  关闭
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='短信类型'>
              <a-select style="width: 250px">
                <a-select-option value="1">
                  营销短信
                </a-select-option>
                <a-select-option value="2">
                  通知短信
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='搜索'>
              <a-input style="width: 250px"
                       placeholder="标题、内容"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-button type='primary'
                @click="add">新增模板</a-button>
      <a-table :columns="columns"
               :data-source="data"
               :pagination='false'
               class='table'>
        <div slot="isStart">
          <a-switch default-checked />
        </div>
        <div slot="opera">
          <a-button type='link'>编辑</a-button>
          <a-popconfirm title="你确定要删除吗"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="confirm"
                        @cancel="cancel">
            <a-button type='link'>删除</a-button>
          </a-popconfirm>
        </div>
      </a-table>
      <div class="pagination">
        <a-pagination show-quick-jumper
                      show-size-changer
                      :default-current="pagination.currentPage"
                      :page-size-options="pagination.sizes"
                      :page-size.sync="pagination.pageSize"
                      :total="pagination.total"
                      :show-total="(total, range) => `共 ${total} 条记录 第${pagination.currentPage}页`"
                      @change="currentChange"
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
        currentPage: 1,
        sizes: ['1', '5', '10', '15'],
        total: 100,
        pageSize: 1
      },
      form: {},
      data: [
        {
          key: '1',
          id: 10,
          type: '营销短信',
          noteTitle: '标题标题标题',
          noteContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          pushTime: 1,
          createTime: '2020-11-20  08:50:08',
          isStart: '',
          opera: ''
        },
        {
          key: '2',
          id: 10,
          type: '营销短信',
          noteTitle: '标题标题标题',
          noteContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          pushTime: 1,
          createTime: '2020-11-20  08:50:08',
          isStart: '',
          opera: ''
        },
        {
          key: '3',
          id: 10,
          type: '营销短信',
          noteTitle: '标题标题标题',
          noteContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          pushTime: 1,
          createTime: '2020-11-20  08:50:08',
          isStart: '',
          opera: ''
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 120
        },
        {
          title: '短信标题',
          dataIndex: 'noteTitle',
          key: 'noteTitle',
          ellipsis: true,
          width: 120
        },
        {
          title: '短信内容',
          dataIndex: 'noteContent',
          key: 'noteContent',
          ellipsis: true
        },
        {
          title: '推送次数',
          dataIndex: 'pushTime',
          key: 'pushTime',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          ellipsis: true
        },
        {
          title: '是否启用',
          dataIndex: 'isStart',
          key: 'isStart',
          ellipsis: true,
          scopedSlots: { customRender: 'isStart' },
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          ellipsis: true,
          scopedSlots: { customRender: 'opera' }
        }
      ]
    }
  },
  methods: {
    // 新增模板
    add () {
      this.$refs.createTemplate.isShow = true
    },
    confirm () { },
    cancel () { },
    currentChange (page, paseSize) {
      console.log(page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log(size)
    }
  }
}
</script>

<style lang='less' scoped>
.noteTemplate {
  .card {
    margin-top: 20px;
  }
  .card2 {
    margin-top: 20px;
    .table {
      margin-top: 20px;
    }
    .pagination {
      margin-top: 20px;
      /deep/ .ant-pagination-total-text {
        margin-right: 400px;
        color: #929293;
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
