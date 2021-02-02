<template>
  <div class="areaDictionary">
    <a-card>
      <a-button type='primary'
                @click="add">
        <a-icon type="plus" />
        添加一级区域
      </a-button>
    </a-card>
    <a-card>
      <a-table :columns="columns"
               :data-source="data">
        <div slot="isStart">
          <a-switch default-checked />
        </div>
        <div slot="opera">
          <a-button type='link'
                    @click="add">添加子区域</a-button>
          <a-button type='link'
                    @click="edit">编辑</a-button>
          <a-button type='link'
                    @click="remove">删除</a-button>
        </div>
      </a-table>
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
      data: [
        {
          key: '1',
          id: 10,
          areaName: '黑龙江省',
          sort: 0,
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          id: 10,
          areaName: '黑龙江省',
          sort: 0,
          tags: ['loser']
        },
        {
          key: '3',
          id: 10,
          areaName: '黑龙江省',
          sort: 0,
          tags: ['cool', 'teacher']
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
          title: '区域名称',
          dataIndex: 'areaName',
          key: 'areaName',
          width: 300
        },
        {
          title: '排序',
          dataIndex: 'sort',
          key: 'sort',
          width: 200
        },
        {
          title: '是否启用',
          dataIndex: 'isStart',
          key: 'isStart',
          scopedSlots: { customRender: 'isStart' },
          width: 300
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
    // 编辑
    edit () {
      this.$refs.addModel.isShow = true
    },
    // 添加
    add () {
      this.$refs.addModel.isShow = true
    }
  }
}
</script>

<style>
</style>
