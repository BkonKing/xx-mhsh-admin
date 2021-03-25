<template>
  <div class="weskitUser">
    <a-card>
      <a-button type='primary'
                @click="add">
        <a-icon type="plus" />添加马甲用户
      </a-button>
    </a-card>
    <a-card class="card">
      <a-table :columns="columns"
               :data-source="data"
               :pagination='false'>
        <div slot="avatar">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2302415327,3566063031&fm=11&gp=0.jpg"
               alt="">
        </div>
        <div slot="opera">
          <a-button type='link'
                    @click="edit">编辑</a-button>
          <a-button type='link'
                    @click='remove'>删除</a-button>
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
    <addWeskitUser ref="addWeskitUser"> </addWeskitUser>
    <delModel ref="delModel"></delModel>
  </div>
</template>

<script>
import addWeskitUser from './addWeskitUser'
import delModel from './delModel'
export default {
  components: {
    addWeskitUser,
    delModel
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
          id: 10020,
          nickname: '美好生活运营'

        },
        {
          key: '2',
          id: 10020,
          nickname: '美好生活运营'

        },
        {
          key: '3',
          id: 10020,
          nickname: '美好生活运营'

        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 200
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: { customRender: 'avatar' },
          width: 400
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          width: 400
        },
        {
          title: '操作',
          dataIndex: 'opera',
          key: 'epera',
          scopedSlots: { customRender: 'opera' }
        }
      ]
    }
  },
  methods: {
    // 删除
    remove () {
      this.$refs.delModel.isShow = true
    },
    // 编辑
    edit () {
      this.$refs.addWeskitUser.isShow = true
    },
    // 添加马甲用户
    add () {
      this.$refs.addWeskitUser.isShow = true
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

<style lang='less'>
.weskitUser {
  .card {
    margin-top: 20px;
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
    .pagination {
      margin-top: 10px;
      .ant-pagination {
        padding: 10px;
      }
      .ant-pagination-total-text {
        margin-left: 20px;
        margin-right: 300px;
      }
      .ant-pagination-item-active {
        background-color: #1890ff;
        a {
          color: white;
        }
      }
    }
  }
}
</style>
