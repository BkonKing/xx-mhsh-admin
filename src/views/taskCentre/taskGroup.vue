<template>
  <div class="taskGroup">
    <page-header-wrapper></page-header-wrapper>
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="任务群">
              <a-input
                v-model="task_search"
                placeholder="名称、ID"
                style="width:264px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="群主">
              <a-input
                v-model="owner"
                placeholder="手机号、昵称/ID、备注、所属项目"
                style="width:264px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="成员" v-if="!cardBol">
              <a-input
                v-model="member_search"
                placeholder="手机号、昵称/ID"
                style="width:264px"
              ></a-input>
            </a-form-model-item>
            <div class="btns" v-else>
              <a-button type="primary" @click="search">查询</a-button>
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
              <a-select
                placeholder="请选择"
                v-model="is_open"
                style="width: 264px"
              >
                <a-select-option value="1">
                  允许
                </a-select-option>
                <a-select-option value="0">
                  不允许
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8"></a-col>
          <a-col :span="8">
            <div class="btns">
              <a-button type="primary" @click="search">查询</a-button>
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
      <a-button
type="primary"
style="marginRight:10px"
@click="add"
        >新增群</a-button
      >
      <a-button @click="batchDel">批量操作 <a-icon type="down"/></a-button>
      <div class="selected" v-if="selectedRowKeys.length > 0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <div class="table">
        <a-table
          @change="tableChange"
          rowKey="id"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        >
          <template slot="owner_name" slot-scope="text, record">
            <div class="groupOwner">
              <div class="t1">{{ record.owner_name }}</div>
              <div class="t2">{{ record.project_name }}</div>
            </div>
          </template>
          <template slot="is_open" slot-scope="text, record">
            <div>
              <a-switch
                :default-checked="record.is_open === 1 ? true : false"
                @change="isOpen(record)"
              />
            </div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div class="opera">
              <a-button type="link" @click="$router.push('/taskCentre/groupDetail?id='+record.id)">查看</a-button>
              <a-button type="link" @click="deleteGroup(record)">删除</a-button>
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
                `共 ${total} 条记录 第${pagination.currentPage}/${Math.ceil(total / pagination.pageSize)}页`
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
import { getGroupList, toDelGroup, toSetAllow } from '@/api/taskCentre'
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
        pageSize: 10 // 默认页容量
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      cardBol: false,
      tableData: [], // 任务群列表
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
          dataIndex: 'group_name',
          key: 'group_name',
          width: 100
        },
        {
          title: '成员',
          dataIndex: 'group_member',
          key: 'group_member',
          sorter: true,
          width: 100
        },
        {
          title: '任务',
          dataIndex: 'group_task',
          key: 'group_task',
          sorter: true,
          width: 100
        },
        {
          title: '群主',
          dataIndex: 'owner_name',
          key: 'owner_name',
          width: 150,
          scopedSlots: { customRender: 'owner_name' }
        },
        {
          title: '手机号',
          dataIndex: 'group_mobile',
          key: 'group_mobile',
          width: 150
        },
        {
          title: '允许加入',
          dataIndex: 'is_open',
          key: 'is_open',
          width: 100,
          scopedSlots: { customRender: 'is_open' }
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
      selectedRowKeys: [], // 表格复选框的值
      order_field: '', // 排序字段
      sort_value: '', // 排序值
      is_open: undefined, // 是否允许加入
      task_search: '', // 任务搜索
      owner: '', // 群主搜索
      member_search: '' // 成员搜索
    }
  },
  mounted () {
    console.log(this.$refs.card.$el.offsetHeight)
  },
  methods: {
    // 是否允许加入
    async isOpen (record) {
      let res = ''
      if (record.is_open === 1) {
        res = await toSetAllow({
          group_id: record.id,
          is_open: 0
        })
      } else {
        res = await toSetAllow({
          group_id: record.id,
          is_open: 1
        })
      }
      console.log('是否允许加入', res)
    },
    // 查询
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 批量删除
    async batchDel () {
      const res = await toDelGroup({
        group_addr: this.selectedRowKeys
      })
      console.log('批量删除', res)
      this.getData()
      this.$message.success('删除成功')
    },
    // 排序
    tableChange (pagination, filters, sorter) {
      // console.log('pagination', pagination)
      // console.log('filters', filters)
      console.log('sorter', sorter)
      this.order_field = sorter.field
      if (sorter.order === 'ascend') {
        this.sort_value = 'asc'
      } else {
        this.sort_value = 'desc'
      }
      this.getData()
      // console.log('currentDataSource', currentDataSource)
    },
    // 获取任务群列表
    async getData () {
      const res = await getGroupList({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        order_field: this.order_field,
        sort_value: this.sort_value,
        member_search: this.member_search,
        owner: this.owner,
        task_search: this.task_search,
        is_open: this.is_open
      })
      this.tableData = res.list
      this.pagination.total = res.data.total
      console.log('获取任务群列表', res)
    },
    // 删除群
    deleteGroup (record) {
      console.log('record', record)
      this.$refs.delGroup.isShow = true
      this.$refs.delGroup.id = record.id
    },
    // 新增群
    add () {
      this.$refs.addGroup.isShow = true
    },
    // 清空
    clear () {
      this.selectedRowKeys = []
    },
    onSelectChange (selectedRowKeys, arr) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      console.log('arr', arr)
      this.selectedRowKeys = selectedRowKeys
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
      this.pagination.currentPage = 1
      this.pagination.pageSize = size
      this.getData()
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
  },
  created () {
    this.getData()
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
