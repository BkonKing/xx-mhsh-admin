<template>
  <div class="history">
    <a-card
ref="card"
            class="card">
      <a-form-model
:model='form'
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="推送状态">
              <a-select
style="width: 200px"
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
            <a-form-model-item
label="消息"
                               v-if="cardBol">
              <a-input placeholder="标题、内容"></a-input>
            </a-form-model-item>
            <div
v-else
                 class="btns">
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
              <a-button
type="link"
                        @click="open">展开</a-button>
              <a-icon
class="icon"
                      type="down" />
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col :span='8'>
            <a-form-model-item
label="消息类型"
                               v-if="cardBol">
              <a-select
style="width: 200px"
                        placeholder="请选择">
                <a-select-option value="1">
                  系统消息
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col
:span="6"
                 :offset='10'>
            <a-form-model-item v-if="cardBol">
              <div class="btns">
                <a-button type="primary">查询</a-button>
                <a-button>重置</a-button>
                <a-button
type="link"
                          @click="close">收起</a-button>
                <a-icon
class="icon"
                        type="up" />
              </div>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-table
class="table"
               :columns="columns"
               :data-source="data"
               :pagination="false">
        <div slot="status">
          <a-badge
color="#108ee9"
                   text="成功" />
        </div>
        <span
slot="operate"
              slot-scope="operate"
              class="operate">
          <a-button
type="link"
                    v-for="(item, index) in operate"
                    :key="index">{{item}}</a-button>

        </span>
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
        total: 50,
        pageSize: 1
      },
      data: [
        {
          key: '1',
          id: 10,
          status: '',
          project: '项目名称',
          phoneNumber: 15000000000,
          user: '昵称(姓名)',
          msgTitle: '标题标题标题',
          msgContent: '内容内容内容内容内容',
          pushtime: '2020-11-20  08:50:08'
        },
        {
          key: '2',
          id: 10,
          status: '',
          project: '项目名称',
          phoneNumber: 15000000000,
          user: '昵称(姓名)',
          msgTitle: '标题标题标题',
          msgContent: '内容内容内容内容内容',
          pushtime: '2020-11-20  08:50:08'
        },
        {
          key: '3',
          id: 10,
          status: '',
          project: '项目名称',
          phoneNumber: 15000000000,
          user: '昵称(姓名)',
          msgTitle: '标题标题标题',
          msgContent: '内容内容内容内容内容',
          pushtime: '2020-11-20  08:50:08'
        }
      ],
      columns: [
        {
          dataIndex: 'id',
          key: 'id',
          title: 'ID'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '项目',
          dataIndex: 'project',
          key: 'project'
        },
        {
          title: '手机号',
          key: 'phoneNumber',
          dataIndex: 'phoneNumber'
        },
        {
          title: '用户',
          dataIndex: 'user',
          key: 'user'
        },
        {
          title: '消息标题',
          dataIndex: 'msgTitle',
          key: 'msgTitle'
        },
        {
          title: '消息内容',
          dataIndex: 'msgContent',
          key: 'msgContent'
        },
        {
          title: '推送时间',
          dataIndex: 'pushtime',
          key: 'pushtime'
        }
      ],
      form: {
        selectValue: undefined
      },
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
    onChange (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    sizeChange (current, size) {
      console.log('size: ', size)
    }
  },
  mounted () {
    console.log('this.$refs.card.offsetHeight', this.$refs.card.$el.offsetHeight)
    this.oHeight = this.$refs.card.$el.offsetHeight
  }
}
</script>

<style lang="less" scoped>
.history {
  .card {
    /deep/ .ant-card-body {
      padding-bottom: 0;
    }
    margin-top: 20px;
  }
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
  /deep/ .ant-form-item-label {
    width: 100px !important;
  }
}
</style>
