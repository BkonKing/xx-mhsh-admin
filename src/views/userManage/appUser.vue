<template>
  <div class="appUser">
    <a-card>
      <a-row>
        <a-col :span=10></a-col>
        <a-col class="col"
               :span=14>
          <a-form-model layout="inline">
            <a-form-model-item>
              <a-select placeholder="项目"
                        style="width: 200px">
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
            <a-form-model-item>
              <a-select placeholder="状态"
                        style="width: 200px">
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
            <a-form-model-item label='搜索'
                               :style="{marginLeft:'-56px'}">
              <a-input placeholder='请输入用户昵称、手机号'></a-input>
            </a-form-model-item>
          </a-form-model>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="card">
      <a-table :columns="columns"
               :data-source="data"
               :pagination='false'>
        <div slot="avatar">
          <img class="img"
               src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171005%2Fbdc8cc9f754548a7aa835fb8ebe49df5.gif&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614404635&t=4a515a17c5a22cf0eecddc4a8cd13b04"
               alt="">
        </div>
        <div slot="opera">
          <a-button type='link'
                    @click="check">查看</a-button>
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
    <chekcDrawer ref="chekcDrawer"></chekcDrawer>
  </div>
</template>

<script>
import chekcDrawer from './checkDrawer'
export default {
  components: {
    chekcDrawer
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
          id: 14987,
          age: 32,
          project: '五凤兰庭',
          type: '游客',
          nickname: '15655555555',
          name: '孙悟空',
          registerTime: '2020-12-17 16:34:33'
        },
        {
          key: '2',
          id: 14987,
          age: 42,
          project: '五凤兰庭',
          type: '游客',
          nickname: '15655555555',
          name: '孙悟空',
          registerTime: '2020-12-17 16:34:33'
        },
        {
          key: '3',
          id: 14987,
          age: 32,
          project: '五凤兰庭',
          type: '游客',
          nickname: '15655555555',
          name: '孙悟空',
          registerTime: '2020-12-17 16:34:33'
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
          width: 100
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: { customRender: 'avatar' },
          width: 100
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          width: 120
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '注册时间',
          dataIndex: 'registerTime',
          key: 'registerTime'
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
    // 查看
    check () {
      this.$refs.chekcDrawer.isShow = true
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
.appUser {
  .col {
    white-space: nowrap;
  }
  .card {
    margin-top: 20px;
    .img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
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
</style>
