<template>
  <div class="whiteList">
    <a-card class="card" ref="card">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="所属项目">
              <a-select style="width: 264px">
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
          <a-col :span="8">
            <a-form-model-item label="用户">
              <a-input
                placeholder="手机号、昵称/ID、备注"
                style="width: 264px"
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="是否注册" v-if="!cardBol">
              <a-select style="width: 264px">
                <a-select-option value="jack">
                  已注册
                </a-select-option>
                <a-select-option value="lucy">
                  未注册
                </a-select-option>
              </a-select>
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
      </a-form-model>
      <a-row v-if="!cardBol">
        <a-col :span="8"></a-col>
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
    </a-card>
    <a-card class="card2">
      <div class="btns">
        <a-button type="primary" @click="add">添加用户</a-button>
        <a-button
@click="importUser"
          ><a-icon type="vertical-align-bottom" />导入用户</a-button
        >
        <a-button @click="batchDel">批量操作<a-icon type="down"/></a-button>
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
        >
          <template slot="owner_name" slot-scope="text, record">
            <div class="user">
              <div class="t1">{{ record.owner_name }}</div>
              <div class="t2">{{ record.project_name }}</div>
            </div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div class="opera">
              <a-button type="link" @click="del(record)">删除</a-button>
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
              (total, range) =>`共 ${total} 条记录 第${pagination.currentPage}/${Math.ceil(total / pagination.pageSize)}页`
            "
            @change="onChangePage"
            @showSizeChange="sizeChange"
          />
        </div>
      </div>
    </a-card>
    <adduserModel ref="adduserModel" mode='whiteUser'></adduserModel>
    <importFile ref="importFile" mode="whiteUser"></importFile>
  </div>
</template>

<script>
import adduserModel from '../adduserModel'
import importFile from '../importFile'
import { gainGetWhiteListUser, toDelWhiteUser } from '@/api/taskCentre'
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      cardBol: false,
      tableData: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: 150
        },
        {
          title: '用户',
          dataIndex: 'owner_name',
          key: 'owner_name',
          width: 150,
          scopedSlots: { customRender: 'owner_name' }
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 100
        },
        {
          title: '任务',
          dataIndex: 'user_task',
          key: 'user_task',
          sorter: true,
          width: 100
        },
        {
          title: '注册时间',
          dataIndex: 'register_time',
          key: 'register_time',
          sorter: true,
          width: 200
        },
        {
          title: '添加人',
          dataIndex: 'admin_realname',
          key: 'admin_realname',
          width: 100
        },
        {
          title: '添加时间',
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
      selectedRowKeys: [],
      projectList: []
    }
  },
  mounted () {
    console.log(this.$refs.card.$el.offsetHeight) // 146
  },
  methods: {
    // 批量删除
    async batchDel () {
       await toDelWhiteUser({ ids: this.selectedRowKeys })
       this.$message.success('删除成功')
      this.getData()
      // console.log('删除白名单', res)
    },
    // 删除
    async del (record) {
      const idArr = []
      idArr.push(record.id)
      await toDelWhiteUser({ ids: idArr })
      //  console.log('删除白名单', res)
      this.$message.success('删除成功')
      this.getData()
    },
    // 获取白名单列表
    async getData () {
      const res = await gainGetWhiteListUser({
        pagesize: this.pagination.pageSize,
        pageindex: this.pagination.currentPage
      })
      this.tableData = res.list
      //  this.projectList = res.list.filter(item => {
      //   return !this.projectList.includes(item)
      //  })
      this.pagination.total = res.data.total
      console.log('获取白名单列表', res)
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
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getData()
    },
    // 展开
    open () {
      setTimeout(() => {
        this.cardBol = false
      }, 200)
      this.$refs.card.$el.style.height = '146px'
    },
    // 收起
    close () {
      this.cardBol = true
      this.$refs.card.$el.style.height = '80px'
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.whiteList {
  .card {
    margin-top: 20px;
    .btns {
      margin-left: 178px;
      button {
        margin-right: 10px;
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
          padding: 10px;
        }
        /deep/ .ant-pagination-total-text {
          margin-left: 20px;
          margin-right: 890px;
        }
        // /deep/ .ant-pagination-item-active {
        //   background-color: #1890ff;
        //   a {
        //     color: white;
        //   }
        // }
      }
    }
  }
}
</style>
