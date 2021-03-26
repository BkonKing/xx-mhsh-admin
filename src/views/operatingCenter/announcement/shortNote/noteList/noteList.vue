<template>
  <div class="noteList">
    <a-card class='card'>
      <a-form-model
:model='form'
                    layout="inline">
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label="短信状态">
              <a-select
placeholder="请选择"
                        style="width: 300px">
                <a-select-option value="1">
                  待提交
                </a-select-option>
                <a-select-option value="2">
                  待审核
                </a-select-option>
                <a-select-option value="3">
                  待推送
                </a-select-option>
                <a-select-option value="4">
                  已推送
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label="短信模板">
              <a-select
placeholder="请选择"
                        style="width: 300px">
                <a-select-option value="1">
                  待提交
                </a-select-option>
                <a-select-option value="2">
                  待审核
                </a-select-option>
                <a-select-option value="3">
                  待推送
                </a-select-option>
                <a-select-option value="4">
                  已推送
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label="搜索">
              <a-input
placeholder="标题、内容"
                       style="width: 300px"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

      </a-form-model>
    </a-card>
    <a-card class="card1">
      <a-button type="primary">新增短信</a-button>
      <a-table
:columns="columns"
               :data-source="data"
               :pagination='false'
               class="table">
        <a slot="status">
          <a-badge
color="#108ee9"
                   text="待推送" />
        </a>
        <div slot="opera">
          <a-button type="link">提交</a-button>
          <a-popconfirm
title="你确定要删除吗?"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="confirm"
                        @cancel="cancel">
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </div>
      </a-table>
      <div class="pagination">
        <a-pagination
show-quick-jumper
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        currentPage: 1,
        sizes: ['1', '5', '10', '15'],
        total: 100,
        pageSize: 1
      },
      data: [
        {
          key: '1',
          id: 1,
          status: '',
          project: '项目名称',
          noteTitle: '标题标题标题',
          type: '营销短信',
          pustType: '系统推送',
          pushNum: '预计1000',
          pushTime: '(实际)2020-11-20  08:50:08',
          opera: ''
        },
        {
          key: '2',
          id: 1,
          status: '',
          project: '项目名称',
          noteTitle: '标题标题标题',
          type: '通知短信',
          pustType: '系统推送',
          pushNum: '预计1000',
          pushTime: '(实际)2020-11-20  08:50:08',
          opera: ''
        },
        {
          key: '3',
          id: 1,
          status: '',
          project: '项目名称',
          noteTitle: '标题标题标题',
          type: '营销短信',
          pustType: '系统推送',
          pushNum: '预计1000',
          pushTime: '(实际)2020-11-20  08:50:08',
          opera: ''
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
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          ellipsis: true,
          width: 100
        },
        {
          title: '短信标题',
          dataIndex: 'noteTitle',
          key: 'noteTitle',
          ellipsis: true,
          width: 100
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          ellipsis: true,
          width: 100
        },
        {
          title: '推送方式',
          dataIndex: 'pustType',
          key: 'pustType',
          ellipsis: true,
          width: 100
        },
        {
          title: '推送量',
          dataIndex: 'pushNum',
          key: 'pushNum',
          ellipsis: true,
          width: 100
        },
        {
          title: '推送时间',
          dataIndex: 'pushTime',
          key: 'pushTime'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' }
        }
      ],

      form: {}
    }
  },
  methods: {
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
.noteList {
  .card {
    margin-top: 20px;
  }
  .card1 {
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
