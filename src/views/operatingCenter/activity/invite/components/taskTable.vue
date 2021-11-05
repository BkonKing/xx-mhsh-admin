<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="任务">
              <a-input
                v-model="queryParam.search"
                placeholder="ID、名称"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select
                v-model="queryParam.is_open"
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                placeholder="请选择"
              >
                <a-select-option :value="1">
                  开启
                </a-select-option>
                <a-select-option :value="0">
                  关闭
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="search">查询</a-button>
              <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      :rowSelection="rowSelection"
      :rowSelectionPaging="true"
      :pagination="false"
    ></a-table>
  </div>
</template>

<script>
// import { STable } from '@/components'
import clonedeep from 'lodash.clonedeep'
import { getStaffList } from '@/api/userManage'

export default {
  name: 'taskTable',
  // components: {
  //   STable
  // },
  props: {
    disabledRowkeys: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      categoryOptions: [],
      queryParam: {},
      selectedRowKeys: [],
      selectedRows: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '任务名称',
          dataIndex: 'category_name'
        },
        {
          title: '幸福币',
          dataIndex: 'thumb'
        },
        {
          title: '任务时间',
          dataIndex: 'goods_name'
        },
        {
          title: '排序',
          dataIndex: 'shelf'
        },
        {
          title: '是否启用',
          dataIndex: 'shelf'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      data: [],
      tableData: []
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        getCheckboxProps: record => ({
          props: {
            disabled: this.disabledRowkeys.includes(record.id)
          }
        })
      }
    }
  },
  created () {
    this.getGoods()
    this.getCategory()
  },
  methods: {
    getGoods () {
      getGoods().then(({ list }) => {
        this.data = clonedeep(list)
        this.tableData = clonedeep(list)
      })
    },
    getCategory () {
      getCategory().then(({ list }) => {
        this.categoryOptions = list
      })
    },
    // 本地搜索
    search () {
      this.tableData = this.data.filter(obj => {
        const {
          is_open: isOpen,
          search,
          category_id: categoryId
        } = this.queryParam
        const isOpenBool = isOpen === undefined || obj.is_open === isOpen
        const searchBool =
          !search || obj.goods_name.indexOf(search) > -1 || obj.id == search
        const categoryBool = !categoryId || obj.category_id === categoryId
        return isOpenBool && searchBool && categoryBool
      })
    },
    reset () {
      this.queryParam = {}
      this.tableData = clonedeep(this.data)
    },
    // 取消选中
    deselect () {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style></style>
