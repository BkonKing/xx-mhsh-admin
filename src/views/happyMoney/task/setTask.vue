<template>
  <div class="setTask">
    <a-card>
      <a-form-model layout="inline">
        <a-form-model-item label='开启/关闭'>
          <a-select style="width: 200px">
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
        <a-form-model-item label='搜索'>
          <a-input placeholder="任务名称"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="card">
      <a-button type='primary'
                @click="add">
        <a-icon type="plus" />添加
      </a-button>
      <a-table class="table"
               :columns="columns"
               :data-source="data"
               :pagination='false'>
        <div slot="icon">
          <img :style="{width:'60px',height:'60px'}"
               src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/exp/w=500/sign=09dc54243ec79f3d8fe1e4308aa3cdbc/0eb30f2442a7d9330874f5a8a84bd11372f00108.jpg"
               alt="">
        </div>
        <div slot="sort">
          <a-input class="input"></a-input>
        </div>
        <div slot="btn">
          <a-switch default-checked />
        </div>
        <div slot="opera">
          <a-button type='link'>修改</a-button>
          <a-button type='link'
                    @click="remove">删除</a-button>
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
    <addModel ref="addModel"></addModel>
    <delModel ref="delModel"></delModel>
  </div>
</template>

<script>
import addModel from './addModel'
import delModel from './delModel'
export default {
  components: {
    addModel,
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
          id: 1,
          task: '签到',
          intro: 'XXXXXXXXXXXX',
          useProject: 8
        },
        {
          key: '2',
          id: 1,
          task: '签到',
          intro: 'XXXXXXXXXXXX',
          useProject: 8
        },
        {
          key: '3',
          id: 1,
          task: '签到',
          intro: 'XXXXXXXXXXXX',
          useProject: 8
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '图标',
          dataIndex: 'icon',
          key: 'icon',
          width: 100,
          scopedSlots: { customRender: 'icon' }
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          width: 120
        },
        {
          title: '介绍',
          dataIndex: 'intro',
          key: 'intro',
          ellipsis: true
        },
        {
          title: '使用项目',
          dataIndex: 'useProject',
          key: 'useProject',
          ellipsis: true,
          width: 200
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          scopedSlots: { customRender: 'sort' }
        },
        {
          title: '开启/关闭',
          dataIndex: 'button',
          key: 'button',
          scopedSlots: { customRender: 'btn' }
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
    // 删除
    remove () {
      this.$refs.delModel.isShow = true
    },
    // 添加
    add () {
      this.$refs.addModel.isShow = true
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
.setTask {
  .card {
    margin-top: 20px;
    .table {
      margin-top: 10px;
    }
    .input {
      width: 100px;
    }
  }
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
</style>
