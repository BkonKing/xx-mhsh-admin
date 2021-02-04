<template>
  <div class="projectManage">
    <a-card>
      <a-form-model layout="inline">
        <a-row>
          <a-col :span='8'>
            <a-form-model-item label='项目'>
              <a-input style="width:300px"
                       placeholder="请输入"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='是否启用'>
              <a-select placeholder="请选择"
                        style="width: 300px">
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
          </a-col>
          <a-col :span='8'>
            <a-form-model-item label='地区'>
              <a-select placeholder="请选择"
                        style="width: 300px">
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
          </a-col>
        </a-row>
        <div class="btns">
          <a-row>
            <a-col :span='8'></a-col>
            <a-col :span='8'></a-col>
            <a-col :span='8'>
              <a-button type='primary'>查询</a-button>
              <a-button>重置</a-button>
              <a-button type='link'>收起
                <a-icon type="up" />
              </a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-model>
    </a-card>
    <a-card class="card">
      <a-button type='primary'
                @click="$router.push('/operatingCenter/addNote')">
        <a-icon type="plus" />新建
      </a-button>
      <a-table class='table'
               :columns="columns"
               :data-source="data"
               :pagination='false'>
        <span slot="noteTitle">短信
          <a-tooltip placement="top">
            <template slot="title">
              <span>剩余条数(排序)|已使用条数</span>
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </span>
        <div slot="note">
          <div>剩余：1000</div>
          <div class="use"
               @click="$router.push('/operatingCenter/shortNote')">使用：100</div>
        </div>
        <span slot="payment">支付额度
          <a-tooltip placement="top">
            <template slot="title">
              <span>剩余额度(排序)|已使用额度</span>
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </span>
        <div slot="pay">
          <div>剩余：<span>1000</span></div>
          <div class="use">使用：100</div>
        </div>
        <div slot="isStart">
          <a-switch default-checked />
        </div>
        <div slot="opera"
             class="operabtns">
          <a-button type='link'
                    @click="openLimit">权限</a-button>
          <a-button type='link'
                    @click="edit">编辑</a-button>
          <a-popconfirm title="你确定要删除这行内容吗?"
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
                      :total="pagination.total"
                      :page-size.sync="pagination.pageSize"
                      :show-total="(total, range) => `共 ${total} 条记录 第${pagination.currentPage}/80页`"
                      @change="onChange"
                      @showSizeChange="sizeChange" />
      </div>
    </a-card>
    <limitModel ref="limitModel"></limitModel>
    <editModel ref="editModel"></editModel>
  </div>
</template>

<script>
import limitModel from './limitModel'
import editModel from './editModel'
export default {
  components: {
    limitModel,
    editModel
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
          project: '项目名称',
          address: '河南省平顶山市叶县昆阳大道交叉口北50米路...',
          suberManage: 'cg',
          createTime: '2020-11-20  08:50:08'
        },
        {
          key: '2',
          id: 10,
          project: '项目名称',
          address: '河南省平顶山市叶县昆阳大道交叉口北50米路...',
          suberManage: 'cg',
          createTime: '2020-11-20  08:50:08'
        },
        {
          key: '3',
          id: 10,
          project: '项目名称',
          address: '河南省平顶山市叶县昆阳大道交叉口北50米路...',
          suberManage: 'cg',
          createTime: '2020-11-20  08:50:08'
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
          title: '项目',
          dataIndex: 'project',
          key: 'project',
          width: 120
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          ellipsis: true,
          width: 200
        },
        {
          title: '超管',
          dataIndex: 'suberManage',
          key: 'suberManage',
          width: 80
        },
        {
          dataIndex: 'note',
          key: 'note',
          sorter: true,
          slots: { title: 'noteTitle' },
          scopedSlots: { customRender: 'note' },
          width: 150
        },
        {
          dataIndex: 'pay',
          key: 'pay',
          sorter: true,
          slots: { title: 'payment' },
          scopedSlots: { customRender: 'pay' },
          width: 150
        },
        {
          title: '是否启用',
          dataIndex: 'isStart',
          key: 'isStart',
          scopedSlots: { customRender: 'isStart' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: true
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
    confirm () { },
    cancel () { },
    // 编辑
    edit () {
      this.$refs.editModel.isShow = true
    },
    // 打开权限
    openLimit () {
      this.$refs.limitModel.isShow = true
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
.projectManage {
  .btns {
    margin-top: 20px;
    button:first-child {
      margin-left: 109px;
    }
    button:nth-child(-n + 2) {
      margin-right: 10px;
    }
  }
  .table {
    margin-top: 20px;
  }
  .use:hover {
    color: #1890ff;
    text-decoration: underline;
    cursor: pointer;
  }
  .operabtns {
    display: flex;
    align-items: center;
    .ant-btn {
      padding: 0;
      padding-right: 10px;
    }
  }
  .card {
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
  .active {
    color: red;
  }
}
</style>
