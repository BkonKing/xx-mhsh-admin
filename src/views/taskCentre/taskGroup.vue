<template>
  <div class="taskGroup">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="任务群">
              <a-input placeholder="名称、ID" style="width:264px"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="群主">
              <a-input
                placeholder="手机号、昵称/ID、备注、所属项目"
                style="width:264px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="成员" v-if="!cardBol">
              <a-input
                placeholder="手机号、昵称/ID"
                style="width:264px"
              ></a-input>
            </a-form-model-item>
            <div class="btns" v-else>
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
              <a-button
type="link"
@click="open"
                >展开 <a-icon
type="down"
              /></a-button>
            </div>
          </a-col>
        </a-row>
        <a-row v-if="!cardBol">
          <a-col :span="8">
            <a-form-model-item label="允许加入">
              <a-select style="width: 264px">
                <a-select-option value="jack">
                  Jack
                </a-select-option>
                <a-select-option value="lucy">
                  Lucy
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  Disabled
                </a-select-option>
                <a-select-option value="Yiminghe">
                  yiminghe
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8"></a-col>
          <a-col :span="8">
            <div class="btns">
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
              <a-button
type="link"
@click="close"
                >收起 <a-icon
type="up"
              /></a-button>
            </div>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <a-button type="primary" style="marginRight:10px" @click="add">新增群</a-button>
      <a-button>批量操作 <a-icon type="down"/></a-button>
      <div class="selected" v-if="selectedRowKeys.length>0">
        <a-icon class="icon" type="info-circle"  />
        已选择 <span class="span1">{{selectedRowKeys.length}}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <div class="table">
        <a-table  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="columns" :data-source="data" :pagination='false'>
          <template #groupOwner>
            <div class="groupOwner">
              <div class="t1">用户昵称(姓名)</div>
              <div class="t2">项目</div>
            </div>
          </template>
          <template #allowJoin>
            <div>
              <a-switch default-checked />
            </div>
          </template>
          <template #opera>
            <div class="opera">
              <a-button type='link'>查看</a-button>
              <a-button type='link' @click="deleteGroup">删除</a-button>
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
                `共 ${total} 条记录 第${pagination.currentPage}/80页`
            "
            @change="onChangePage"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <addGroup ref="addGroup"></addGroup>
    <delGroup ref="delGroup"></delGroup>
  </div>
</template>

<script>
import addGroup from './addGroup'
import delGroup from './delGroup'
export default {
  components: {
    addGroup,
    delGroup
  },
  data () {
    return {
        pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 1 // 默认页容量
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      cardBol: false,
      data: [
        {
          id: '0000000',
          taskGroupName: '任务群',
          member: '100',
          task: '100',
          phone: '15000000000',
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '0000000',
          taskGroupName: '任务群',
          member: '100',
          task: '100',
          phone: '15000000000',
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '0000000',
          taskGroupName: '任务群',
          member: '100',
          task: '100',
          phone: '15000000000',
          createTime: '2020-11-20  08:50:08'
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '任务群',
          dataIndex: 'taskGroupName',
          key: 'taskGroupName',
          width: 100
        },
        {
          title: '成员',
          dataIndex: 'member',
          key: 'member',
          sorter: true,
          width: 100
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          sorter: true,
          width: 100
        },
        {
          title: '群主',
          dataIndex: 'groupOwner',
          key: 'groupOwner',
          width: 150,
          scopedSlots: { customRender: 'groupOwner' }
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 150
        },
        {
          title: '允许加入',
          dataIndex: 'allowJoin',
          key: 'allowJoin',
          width: 100,
          scopedSlots: { customRender: 'allowJoin' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
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
       selectedRowKeys: []
    }
  },
  mounted () {
    console.log(this.$refs.card.$el.offsetHeight)
  },
  methods: {
    // 删除群
    deleteGroup () {
      this.$refs.delGroup.isShow = true
    },
    // 新增群
    add () {
      this.$refs.addGroup.isShow = true
    },
    // 清空
    clear () {
      this.selectedRowKeys = []
    },
     onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
      // 页码改变事件
   onChangePage (page, size) {
      console.log('Page: ', page)
      this.pagination.currentPage = page
    },
    // 页容量改变事件
    sizeChange (current, size) {
      console.log('size: ', size)
    },
    // 展开
    open () {
      setTimeout(() => {
        this.cardBol = false
      }, 200)
      this.$refs.card.$el.style.height = '154px'
    },
    // 收起
    close () {
      this.cardBol = true
      this.$refs.card.$el.style.height = '77px'
    }
  }
}
</script>

<style lang="less" scoped>
.taskGroup {
  .card {
    margin-top: 20px;
    .btns {
      margin-left: 168px;
      button {
        margin-right: 10px;
      }
    }
    /deep/ .ant-card-body {
      padding-bottom: 0px;
    }
  }
  .card2 {
    margin-top: 20px;
    .selected {
      margin-top: 10px;
      width: 100%;
      height: 40px;
      padding-left: 15px;
      line-height: 40px;
      background-color: rgba(230, 247, 255, 1);
      border-width: 1px;
      border-style: solid;
      border-color: rgba(186, 231, 255, 1);
      border-radius: 4px;
      .icon {
        color: #0e77d1;
        margin-right: 10px;
      }
      .span1 {
        color: #0e77d1;
      }
      .span2 {
        cursor: pointer;
        color: #0e77d1;
        margin-left: 10px;
      }
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
}
</style>
