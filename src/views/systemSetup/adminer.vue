<template>
  <div class="adminer">
    <a-card>
      <a-button type='primary'
                @click="add">+添加管理员</a-button>
    </a-card>
    <a-card class="card2">
      <a-table :columns="columns"
               :data-source="tableData"
               :pagination='false'>
        <div slot="gender"
             slot-scope="gender">
          <span v-if="gender !=='0'">
            {{gender === '1'?'男':'女'}}
          </span>
        </div>
        <div slot="opera"
             slot-scope="text,record">
          <a-button type='link'
                    @click="edit(record)">编辑</a-button>
          <a-button type='link'
                    @click="del(record)">删除</a-button>
        </div>
      </a-table>
      <div class="pagination">
        <a-pagination show-quick-jumper
                      show-size-changer
                      :default-current="pagination.currentPage"
                      :page-size-options="pagination.sizes"
                      :total="pagination.total"
                      :page-size.sync="pagination.pageSize"
                      :show-total="(total, range) => `共 ${total} 条记录，共${pagination.pages}页`"
                      @change="onChange"
                      @showSizeChange="sizeChange" />
      </div>
    </a-card>
    <addAdmin ref="addAdmin"></addAdmin>
    <delAdmin ref="delAdmin"></delAdmin>
  </div>
</template>

<script>
import { getAdminList } from '@/api/systemSetup.js'
import addAdmin from './addAdmin'
import delAdmin from './delAdmin'
export default {
  components: {
    addAdmin,
    delAdmin
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页码
        total: 50, // 总条数
        pageSize: 10, // 当前页容量
        pages: 10 // 总页数
      },
      tableData: [],
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width: 150
        },
        {
          title: '账户名称',
          dataIndex: 'account',
          key: 'account',
          width: 200
        },
        {
          title: '真实姓名',
          dataIndex: 'realname',
          key: 'realname',
          width: 250
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: 250
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
          scopedSlots: { customRender: 'gender' },
          width: 200
        },
        {
          title: '角色',
          dataIndex: 'role_name',
          key: 'role_name',
          width: 300
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          slots: { id: 'id' },
          scopedSlots: { customRender: 'opera', id: 'id' }
        }
      ]
    }
  },
  methods: {
    // 编辑
    edit (record) {
      const row = JSON.parse(JSON.stringify(record))
      this.$refs.addAdmin.mode = 'edit'
      const obj = {
        ...row
      }
      obj.gender = +row.gender
      obj.realName = row.realname
      obj.roleId = +row.role_id
      this.$refs.addAdmin.isShow = true
      this.$refs.addAdmin.form = obj
    },
    // 删除
    del (record) {
      this.$refs.delAdmin.isShow = true
      this.$refs.delAdmin.id = record.id
      console.log(record)
    },
    // 添加管理员
    add () {
      this.$refs.addAdmin.isShow = true
      this.$refs.addAdmin.mode = 'add'
    },
    // 获取管理用户对象列表
    async getData () {
      const res = await getAdminList({
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
      this.tableData = res.data.records
      this.pagination.total = +res.data.total
      this.pagination.pages = res.data.pages
      console.log('管理员对象列表', res)
    },
    // 页码改变事件
    onChange (page, size) {
      // console.log('Page: ', page)
      this.pagination.currentPage = page
      this.getData()
    },
    // 页容量改变事件
    sizeChange (current, size) {
      this.pagination.pageSize = size
      this.pagination.currentPage = 1
      this.getData()
      // console.log('size: ', size)
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang='less' scoped>
.card2 {
  margin-top: 20px;
}
.pagination {
  margin-top: 10px;
  /deep/ .ant-pagination {
    padding: 10px;
  }
  /deep/ .ant-pagination-total-text {
    margin-left: 20px;
    margin-right: 800px;
  }
  /deep/ .ant-pagination-item-active {
    background-color: #1890ff;
    a {
      color: white;
    }
  }
}
</style>
