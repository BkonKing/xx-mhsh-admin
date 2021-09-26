<template>
  <div class="whiteList">
    <a-card class="card" ref="card">
      <div class="table-page-search-wrapper">
        <a-row :gutter="36">
          <a-form-model layout="inline">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="所属项目">
                <a-select v-model="project_id" placeholder="请选择">
                  <a-select-option
                    v-for="(item, index) in projectList"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.project_name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="用户">
                <a-input
                  v-model="user_search"
                  placeholder="手机号、昵称/ID、备注"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24" v-if="!cardBol">
              <div class="btns">
                <a-button type="primary" @click="search">查询</a-button>
                <a-button @click="reset">重置</a-button>
                <a-button type="link" @click="open"
                  >展开 <a-icon type="down"
                /></a-button>
              </div>
            </a-col>
            <template v-if="cardBol">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="是否注册">
                  <a-select v-model="is_register" placeholder="请选择">
                    <a-select-option value="1">
                      已注册
                    </a-select-option>
                    <a-select-option value="0">
                      未注册
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>

              <a-col :md="8" :sm="24"></a-col>
              <a-col :md="8" :sm="24"></a-col>
              <a-col :md="8" :sm="24">
                <div class="btns">
                  <a-button type="primary" @click="search">查询</a-button>
                  <a-button @click="reset">重置</a-button>
                  <a-button type="link" @click="close"
                    >收起 <a-icon type="up"
                  /></a-button>
                </div>
              </a-col>
            </template>
          </a-form-model>
        </a-row>
      </div>
    </a-card>
    <a-card class="card2">
      <div class="btns">
        <a-button type="primary" @click="add">添加用户</a-button>
        <a-button @click="importUser"
          ><a-icon type="vertical-align-bottom" />导入用户</a-button
        >
        <!-- <a-button @click="handleMenuClick">批量操作<a-icon type="down"/></a-button> -->
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              批量删除
            </a-menu-item>
          </a-menu>
          <a-button> 批量操作 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </div>
      <div class="selected" v-if="selectedRowKeys.length > 0">
        <a-icon class="icon" type="info-circle" />
        已选择 <span class="span1">{{ selectedRowKeys.length }}</span> 项
        <span class="span2" @click="clear">清空</span>
      </div>
      <div class="table">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          @change="tableChange"
        >
          <template slot="owner_name" slot-scope="text, record">
            <div class="user">
              <div class="t1">{{ record.owner_name }}</div>
              <div class="t2">{{ record.project_name }}</div>
            </div>
          </template>
          <template slot="user_task" slot-scope="user_task, row">
            <a v-if="user_task > 0" @click="goTask(row)">{{user_task}}</a>
            <template v-else>{{user_task}}</template>
          </template>
          <template slot="register_time" slot-scope="register_time">
            <div>
              {{ register_time != 0 ? register_time : "" }}
            </div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div class="opera">
              <a @click="del(record)">删除</a>
            </div>
          </template>
        </a-table>
        <div class="pagination">
          <a-pagination
            v-model="pagination.currentPage"
            show-quick-jumper
            show-size-changer
            :page-size-options="pagination.sizes"
            :total="pagination.total"
            :page-size.sync="pagination.pageSize"
            :show-total="
              (total, range) =>
                `共 ${total} 条记录 第${pagination.currentPage}/${Math.ceil(
                  total / pagination.pageSize
                )}页`
            "
            @change="onChangePage"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <adduserModel ref="adduserModel" mode="publicUsers"></adduserModel>
    <importFile ref="importFile" mode="publicUsers"></importFile>
  </div>
</template>

<script>
import adduserModel from '../adduserModel'
import importFile from '../importFile'
import { getOpenListUser, delOpenUser, toGetProject } from '@/api/taskCentre'
export default {
  components: {
    adduserModel,
    importFile
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      cardBol: false,
      tableData: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: '8%'
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: '11.111111%'
        },
        {
          title: '用户',
          dataIndex: 'owner_name',
          key: 'owner_name',
          width: '13%',
          scopedSlots: { customRender: 'owner_name' }
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: '6%'
        },
        {
          title: '任务',
          dataIndex: 'user_task',
          key: 'user_task',
          sorter: true,
          width: '11.111111%',
          align: 'center',
          scopedSlots: { customRender: 'user_task' }
        },
        {
          title: '注册时间',
          dataIndex: 'register_time',
          key: 'register_time',
          scopedSlots: { customRender: 'register_time' },
          sorter: true,
          width: '16%'
        },
        {
          title: '添加人',
          dataIndex: 'admin_realname',
          key: 'admin_realname',
          width: '11.111111%'
        },
        {
          title: '添加时间',
          dataIndex: 'ctime',
          key: 'ctime',
          sorter: true,
          width: '16%'
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'opera',
          key: 'opera',
          width: '11.111111%',
          scopedSlots: { customRender: 'opera' }
        }
      ],
      selectedRowKeys: [],
      projectList: [], // 所有项目
      user_search: '', // 否string用户搜索
      is_register: undefined, // 否intis_register 0未注册 1已注册
      project_id: undefined, // 否int用户所属项目
      order_field: '', // 否string排序字段user_task任务数 register_time注册时间 ctime添加时间
      sort_value: '' // 否string排序值 desc 降序 asc 降序
    }
  },
  mounted () {
    // console.log(this.$refs.card.$el.offsetHeight) // 146
  },
  methods: {
    // 排序
    tableChange (pagination, filters, sorter, { currentDataSource }) {
      // console.log('sorter', sorter)
      this.order_field = sorter.field
      if (sorter.order === 'ascend') {
        this.sort_value = 'asc'
      } else {
        this.sort_value = 'desc'
      }
      this.getData()
    },
    // 查询
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 重置
    reset () {
      this.user_search = ''
      this.is_register = undefined
      this.project_id = undefined
      this.order_field = ''
      this.sort_value = ''
      this.pagination.currentPage = 1
      this.getData()
    },
    // 批量删除
    async handleMenuClick (e) {
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请先选择后再操作')
        return
      }
      if (+e.key === 1) {
        await delOpenUser({ ids: this.selectedRowKeys })
        this.$message.success('删除成功')
        this.getData()
        this.selectedRowKeys = []
      }

      // console.log('删除白名单', res)
    },
    // 删除
    async del (record) {
      const idArr = []
      idArr.push(record.id)
      await delOpenUser({ ids: idArr })
      //  console.log('删除白名单', res)
      this.$message.success('删除成功')
      this.getData()
    },
    // 获取白名单列表
    async getData () {
      const res = await getOpenListUser({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage,
        user_search: this.user_search,
        is_register: this.is_register,
        project_id: this.project_id,
        order_field: this.order_field,
        sort_value: this.sort_value
      })
      this.tableData = res.list
      this.pagination.total = res.data.total
      // console.log('获取白名单列表', res)
    },
    goTask ({ mobile }) {
      this.$router.push('/taskCentre/task?userMobile=' + mobile)
    },
    // 导入用户
    importUser () {
      this.$refs.importFile.isShow = true
    },
    // 添加用户
    add () {
      this.$refs.adduserModel.isShow = true
    },
    // 清空
    clear () {
      this.selectedRowKeys = []
    },
    onSelectChange (selectedRowKeys, arr) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      // console.log('arr', arr)
      this.selectedRowKeys = selectedRowKeys
    },
    // 页码改变事件
    onChangePage (page, size) {
      // console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getData()
    },
    // 页容量改变事件
    sizeChange (current, size) {
      // console.log('size: ', size)
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getData()
    },
    // 展开
    open () {
      this.cardBol = true
    },
    // 收起
    close () {
      this.cardBol = false
    }
  },
  async created () {
    this.getData()
    const res = await toGetProject()
    this.projectList = res.data
    // console.log('获取所有项目', res)
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-form .ant-btn-link {
  padding: 0;
}
.whiteList {
  .card {
    /deep/ .ant-form-item-label {
      min-width: 88px;
    }
    margin-top: 20px;
    .btns {
      padding-bottom: 20px;
      text-align: right;
      button + button {
        margin-left: 10px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
    .btns {
      button {
        margin-right: 10px;
      }
    }
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
          padding-top: 10px;
          padding-bottom: 20px;
          text-align: right;
        }
        /deep/ .ant-pagination-total-text {
          float: left;
        }
      }
    }
  }
}
</style>
