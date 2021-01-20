<template>
  <div class="history">
    <a-card class="card">
      <a-form-model :model='form'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="推送状态">
              <a-select style="width: 200px"
                        placeholder="请选择">
                <a-select-option value="1">
                  待推送
                </a-select-option>
                <a-select-option value="2">
                  推送成功
                </a-select-option>
                <a-select-option value="3">
                  推送失败
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label="用户">
              <a-input placeholder="用户ID、昵称、姓名、手机号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="消息">
              <a-input placeholder="标题、内容"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span='8'>
            <a-form-model-item label="消息类型">
              <a-select style="width: 200px"
                        placeholder="请选择">
                <a-select-option value="1">
                  系统消息
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6"
                 :offset='10'>
            <a-form-model-item>
              <div class="btns">
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button type="link">收起</a-button>
                <a-icon class="icon"
                        type="up" />
              </div>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-table class="table"
               :columns="columns"
               :data-source="data"
               :pagination="false">
        <span slot="customTitle">
          ID
        </span>
        <span slot="tags"
              slot-scope="tags">
          <a-tag v-for="(item, index) in tags"
                 :key="index"
                 color="gray">
            {{ item }}
          </a-tag>
        </span>
        <span slot="operate"
              slot-scope="operate"
              class="operate">
          <a-button type="link"
                    v-for="(item, index) in operate"
                    :key="index">{{item}}</a-button>

        </span>
      </a-table>
      <a-pagination show-quick-jumper
                    show-size-changer
                    :default-current="pagination.currentPage"
                    :page-size-options="pagination.sizes"
                    :total="pagination.total"
                    :show-total="(total, range) => `共 ${total} 条记录 第1/80页`"
                    @change="onChange"
                    @showSizeChange="sizeChange" />
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50
      },
      data: [
        {
          key: '1',
          name: '小米',
          aaa: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['标题', '哈哈'],
          action: '哈哈哈哈',
          push: '系统推送',
          pushmass: '预计10000',
          pushtime: '(计划)立即',
          operate: ['提交', '删除']
        },
        {
          key: '2',
          name: '夏明',
          aaa: 42,
          address: 'London No. 1 Lake Park',
          tags: ['标题', '哈哈'],
          action: '哈哈哈哈',
          push: '系统推送',
          pushmass: '预计10000',
          pushtime: '(计划)立即',
          operate: ['提交', '删除']
        },
        {
          key: '3',
          name: '王五',
          aaa: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['标题', '哈哈'],
          action: '哈哈哈哈',
          push: '系统推送',
          pushmass: '预计10000',
          pushtime: '(计划)立即',
          operate: ['提交', '删除']
        }
      ],
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'ID',
          // slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '状态',
          dataIndex: 'aaa',
          key: 'age'
        },
        {
          title: '项目',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '消息标题',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: '类型',
          dataIndex: 'action'
        },
        {
          title: '推送方式',
          dataIndex: 'push',
          key: 'push'
        },
        {
          title: '推送量',
          dataIndex: 'pushmass',
          key: 'pushmass'
        },
        {
          title: '推送时间',
          dataIndex: 'pushtime',
          key: 'pushtime'
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      form: {
        selectValue: undefined
      }
    }
  },
  methods: {
    onChange (page, size) {
      console.log('Page: ', page)
      // this.paginationrouter.currentPage = page
      // console.log('size: ', size)
    },
    sizeChange (current, size) {
      // console.log('current: ', current)
      console.log('size: ', size)
      // this.pagination.currentPage = 1
      // this.pagination.pageSize = size
    }
  }
}
</script>

<style lang="less">
.history {
  .card {
    margin-top: 20px;
    .row {
      margin-top: 10px;
      .btns {
        .icon {
          color: #1890ff;
        }
        display: flex;
        align-items: center;
        button:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
  .card2 {
    margin-top: 20px;
    .ant-pagination {
      margin-top: 20px;
    }
    .ant-pagination-total-text {
      margin-right: 100px;
    }
    .ant-pagination-total-text {
      color: #a4a4a4;
    }
  }
  .ant-form-item-label {
    width: 100px !important;
  }
}
</style>
