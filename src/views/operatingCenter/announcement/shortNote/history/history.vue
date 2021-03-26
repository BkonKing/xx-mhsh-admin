<template>
  <div class="history">
    <a-card
class="card"
            ref="card">
      <a-form-model
:model="form"
                    layout="inline">
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label="推送状态">
              <a-select
style="width: 250px"
                        placeholder="请选择">
                <a-select-option value="1">
                  待推送
                </a-select-option>
                <a-select-option value="2">
                  已推送
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="用户">
              <a-input
style="width: 250px"
                       placeholder="用户ID、昵称、姓名、手机号"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item
label='短信'
                               v-if="cardBol">
              <a-input
style="width: 250px"
                       placeholder="标题、内容"></a-input>
            </a-form-model-item>
            <div v-else>
              <a-button type='primary'>查询</a-button>
              <a-button>重置</a-button>
              <a-button
type='link'
                        @click="open">展开</a-button>
              <a-icon
class="icon"
                      type="down" />
            </div>
          </a-col>
        </a-row>
        <a-row class="row2">
          <a-col :span='8'>
            <a-form-model-item
label='接收状态'
                               v-if="cardBol">
              <a-select
style="width: 250px"
                        placeholder="请选择">
                <a-select-option value="1">
                  待推送
                </a-select-option>
                <a-select-option value="2">
                  已推送
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item
label='短信类型'
                               v-if="cardBol">
              <a-select
style="width: 250px"
                        placeholder="请选择">
                <a-select-option value="1">
                  待推送
                </a-select-option>
                <a-select-option value="2">
                  已推送
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col
:span='6'
                 :offset='2'
                 v-if="cardBol">
            <a-button type='primary'>查询</a-button>
            <a-button>重置</a-button>
            <a-button
type='link'
                      @click="close">收起</a-button>
            <a-icon
class="icon"
                    type="up" />
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card1">
      <a-table
:columns="columns"
               :data-source="data"
               :pagination='false'>
        <div slot="status">
          <a-badge
color="#108ee9"
                   text="待推送" />
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
      form: {},
      data: [
        {
          key: '1',
          id: 1,
          status: '',
          project: '项目名称',
          phone: 15000000000,
          user: '昵称(姓名)',
          noteTitle: '标题标题标题',
          noteContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          accaptStatus: '成功',
          pushTime: '2020-11-20 08:50:08'
        },
        {
          key: '2',
          id: 2,
          status: '',
          project: '项目名称',
          phone: 15000000000,
          user: '昵称(姓名)',
          noteTitle: '标题标题标题',
          noteContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          accaptStatus: '成功',
          pushTime: '2020-11-20 08:50:08'
        },
        {
          key: '3',
          id: 3,
          status: '',
          project: '项目名称',
          phone: 15000000000,
          user: '昵称(姓名)',
          noteTitle: '标题标题标题',
          noteContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内',
          accaptStatus: '成功',
          pushTime: '2020-11-20 08:50:08'
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
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 120
        },
        {
          title: '用户',
          dataIndex: 'user',
          key: 'user',
          ellipsis: true,
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
          title: '接收状态',
          dataIndex: 'accaptStatus',
          key: 'accaptStatus',
          ellipsis: true,
          width: 100
        },
        {
          title: '推送时间',
          dataIndex: 'pushTime',
          key: 'pushTime'
        }
      ],
      oHeight: '',
      cardBol: true
    }
  },
  methods: {
    // 展开
    open () {
      this.$refs.card.$el.style.height = this.oHeight + 'px'
      this.cardBol = true
    },
    // 收起
    close () {
      this.$refs.card.$el.style.height = '80px'
      this.cardBol = false
    },
    currentChange (page, paseSize) {
      console.log(page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log(size)
    }
  },
  mounted () {
    console.log('this.$refs.card.offsetHeight', this.$refs.card.$el.offsetHeight)
    this.oHeight = this.$refs.card.$el.offsetHeight
  }
}
</script>

<style lang='less' scoped>
.history {
  .card {
    margin-top: 20px;
  }
  .row2 {
    margin-top: 20px;
  }
  button:nth-child(2) {
    margin-left: 10px;
  }
  .icon {
    color: #1890ff;
  }
  .card1 {
    margin-top: 20px;
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
