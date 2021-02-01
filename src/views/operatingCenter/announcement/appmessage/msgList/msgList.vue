<template>
  <div class="msgList">
    <a-card class="card1">

      <a-form-model :model="form"
                    layout="inline">
        <a-form-model-item label="消息状态">
          <a-select class="w150"
                    style="width: 120px"
                    v-model="form.selectValue"
                    placeholder="请选择">
            <a-select-option value="jack">
              待提交
            </a-select-option>
            <a-select-option value="lucy">
              待审核
            </a-select-option>
            <a-select-option value="disabled">
              待推送
            </a-select-option>
            <a-select-option value="Yiminghe">
              已推送
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="消息模板">
          <a-select class="w150"
                    style="width: 120px"
                    v-model="form.selectValue"
                    placeholder="请选择">
            <a-select-option value="jack">
              待提交
            </a-select-option>
            <a-select-option value="lucy">
              待审核
            </a-select-option>
            <a-select-option value="disabled">
              待推送
            </a-select-option>
            <a-select-option value="Yiminghe">
              已推送
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="搜索">
          <a-input class="w150"
                   placeholder="标题、内容"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <div class="btn">
        <a-button type="primary"
                  @click="$router.push('/operatingCenter/addmsg')">
          新增推送
        </a-button>
      </div>
      <a-table class="table"
               :columns="columns"
               :data-source="data"
               :pagination="false">
        <span slot="customTitle">
          ID
        </span>
        <span slot="status">
          <a-badge color="#108ee9"
                   text="已提交" />
        </span>
        <span slot="artTitle"
              slot-scope="artTitle">
          {{artTitle}}
        </span>
        <span slot="operate"
              class="operate">
          <a-button type="link">提交</a-button>
          <a-button type="link">删除</a-button>

        </span>
      </a-table>
      <a-pagination show-quick-jumper
                    show-size-changer
                    :default-current="pagination.currentPage"
                    :page-size-options="pagination.sizes"
                    :total="pagination.total"
                    :page-size.sync="pagination.pageSize"
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
      pagination: {
        sizes: ['1', '5', '10', '15'],
        currentPage: 1,
        total: 50,
        pageSize: 1
      },
      data: [
        {
          key: '1',
          name: '小米',
          status: '',
          address: 'New York No. 1 Lake Park',
          artTitle: '标题标题标题',
          action: '哈哈哈哈',
          push: '系统推送',
          pushmass: '预计10000',
          pushtime: '(计划)立即'
        },
        {
          key: '2',
          name: '夏明',
          status: '',
          address: 'London No. 1 Lake Park',
          artTitle: '标题标题标题',
          action: '哈哈哈哈',
          push: '系统推送',
          pushmass: '预计10000',
          pushtime: '(计划)立即'
        },
        {
          key: '3',
          name: '王五',
          status: '',
          address: 'Sidney No. 1 Lake Park',
          artTitle: '标题标题标题',
          action: '哈哈哈哈',
          push: '系统推送',
          pushmass: '预计10000',
          pushtime: '(计划)立即'
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
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '项目',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '消息标题',
          key: 'title',
          dataIndex: 'artTitle',
          scopedSlots: { customRender: 'artTitle' }
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

<style lang="less" scoped>
.msgList {
  margin-top: 20px;
  .w150 {
    width: 200px !important;
  }
  .card1 {
    margin-top: 20px;
  }
  .card2 {
    margin-top: 20px;
    .btn {
      text-align: left;
    }
  }
  .table {
    margin-top: 20px;
  }
  .ant-pagination {
    margin-top: 20px;
  }
  .ant-pagination-total-text {
    margin-right: 100px;
  }
  .ant-pagination-total-text {
    color: #a4a4a4;
  }
  .operate {
    display: flex;
    align-items: center;
  }
}
</style>
