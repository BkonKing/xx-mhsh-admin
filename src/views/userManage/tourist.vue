<template>
  <page-header-view>
    <div class="tourist">
      <a-card class="card">
        <div class="table-page-search-wrapper">
          <a-form-model layout="inline">
            <a-row :gutter="36">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="类型">
                  <a-select v-model="type" placeholder="请选择">
                    <a-select-option value="1">
                      游客定位
                    </a-select-option>
                    <a-select-option value="2">
                      游客未认证业主
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="用户">
                  <a-input
                    placeholder="昵称、手机号"
                    v-model="search"
                  ></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24" v-if="btnBol">
                <a-form-model-item label="注册时间">
                  <a-range-picker
                    v-model="createTime"
                    class="piker-time"
                    :ranges="{
                      Today: [moment(), moment()],
                      'This Month': [moment(), moment().endOf('month')]
                    }"
                    show-time
                    @change="onChangeTime"
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :md="btnBol ? 24 : 8" :sm="24" :lg="btnBol ? 24 : 8">
                <div class="btns">
                  <a-button class="btn1" type="primary" @click="toSearch"
                    >查询</a-button
                  >
                  <a-button @click="reset">重置</a-button>
                  <a-button type="link" @click="toggle">
                    {{ !btnBol ? "展开" : "收起" }}
                    <a-icon :type="!btnBol ? 'down' : 'up'"
                  /></a-button>
                </div>
              </a-col>
            </a-row>
          </a-form-model>
        </div>
      </a-card>
      <a-card class="card2">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
        >
          <template slot="user_type" slot-scope="user_type">
            <div>
              <span v-if="user_type === 0">游客-定位</span>
              <span v-if="user_type === 5">游客-未认证业主</span>
            </div>
          </template>
          <template slot="avatar" slot-scope="avatar">
            <div class="avator" v-html="avatar"></div>
          </template>
          <template slot="opera" slot-scope="text, record">
            <div class="opera">
              <a-button type="link" @click="openUserDetail(record.id)"
                >查看</a-button
              >
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
      </a-card>
    </div>
  </page-header-view>
</template>

<script>
import PageHeaderView from '@/layouts/PageHeaderView'
import moment from 'moment'
import { toGetList } from '@/api/userManage'
export default {
  components: {
    PageHeaderView
  },
  data () {
    return {
      pagination: {
        sizes: ['1', '5', '10', '15'], // 页容量
        currentPage: 1, // 默认页
        total: 50, // 总数
        pageSize: 10 // 默认页容量
      },
      ctime: [], // 注册时间
      btnBol: false,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          // scopedSlots: { customRender: 'name' }
          width: '12.5%'
        },
        {
          title: '类型',
          dataIndex: 'user_type',
          key: 'user_type',
          width: '12.5%',
          scopedSlots: { customRender: 'user_type' }
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: { customRender: 'avatar' },
          width: '12.5%'
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          width: '12.5%'
        },
        {
          title: '姓名',
          dataIndex: 'realname',
          key: 'realname',
          width: '12.5%'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile',
          width: '12.5%'
        },
        {
          title: '注册时间',
          dataIndex: 'ctime',
          key: 'ctime',
          width: '12.5%'
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'opera',
          scopedSlots: { customRender: 'opera' },
          width: '12.5%'
        }
      ],
      tableData: [], // 表格列表
      createTime: [],
      search: '',
      type: undefined // 类型
    }
  },
  methods: {
    // 打开用户详情
    openUserDetail (uid) {
      window.open(`/xmht/household/member/getMemberList?uid=${uid}`, '_blank')
    },
    // 获取游客列表
    async getData () {
      const res = await toGetList({
        pageindex: this.pagination.currentPage,
        pagesize: this.pagination.pageSize,
        type: this.type,
        ctime: this.ctime,
        search: this.search
      })
      this.tableData = res.data.list
      this.pagination.total = +res.data.total
      console.log('游客列表', res)
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
    // 切换
    toggle () {
      this.btnBol = !this.btnBol
    },
    toSearch () {
      this.pagination.currentPage = 1
      this.getData()
    },
    reset () {
      this.type = undefined
      this.search = ''
      this.ctime = []
      this.createTime = []
      this.getData()
    },

    moment,
    // 时间改变事件
    onChangeTime (dates, dateStrings) {
      this.ctime = dateStrings[0] + '~' + dateStrings[1]
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.tourist {
  .card {
    /deep/ .ant-form-item-label {
      min-width: 88px;
    }
    .piker-time {
      width: 100% !important;
    }
    .btns {
      text-align: right;
      button {
        margin-left: 10px;
      }
    }
  }
  .card2 {
    margin-top: 20px;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .pagination {
      margin-top: 10px;
      /deep/ .ant-pagination {
        padding-top: 10px;
        padding-bottom: 20px;
        text-align: right;
      }
      /deep/ .ant-pagination-total-text {
        float: left;
        // margin-left: 20px;
        // margin-right: 300px;
      }
    }
  }
}
</style>
