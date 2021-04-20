<template>
  <div class="taskType">
    <a-card class="card">
      <div class="btn">
        <a-button type="primary" @click="add">新增类型</a-button>
      </div>
     <div class="table">
        <a-table :columns="columns" :data-source="data" :pagination='false'>
        <span
                 slot="sortTitle"
          >排序
          <a-tooltip>
            <template slot="title">
              此列表及APP端显示顺序
            </template>
            <a-icon type="info-circle" style="fontSize:14px;marginLeft:10px" />
          </a-tooltip>
        </span>
        <template #sort>
          <div class="sort">
            <a-input style="width:128px"></a-input>
          </div>
        </template>
        <span
                   slot="isStartTitle"
          >是否开启
          <a-tooltip>
            <template slot="title">
              开启则展示在APP端并且可选
            </template>
            <a-icon type="info-circle" style="fontSize:14px;marginLeft:10px" />
          </a-tooltip>
        </span>
        <template #isStart>
          <div>
            <a-switch default-checked />
          </div>
        </template>
        <template #opera>
          <div class="opera">
            <a-button type="link">编辑</a-button>
  <a-popconfirm
    title="你确定要删除这行内容吗?"
    ok-text="确定"
    cancel-text="取消"
  >
   <a-icon slot="icon" type="close-circle" style="color: red" />
    <a href="#">删除</a>
  </a-popconfirm>
          </div>
        </template>
      </a-table>
     </div>
    </a-card>
    <editModel ref="editModel"></editModel>
  </div>
</template>

<script>
import editModel from './editModel'
export default {
  components: {
    editModel
  },
  data () {
    return {
      data: [
        {
          id: '00000000',
          taskType: '类型名称',
          referencePrice: '1000~1500',
          task: '1000',
          createPeople: '姓名',
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '00000000',
          taskType: '类型名称',
          referencePrice: '1000~1500',
          task: '1000',
          createPeople: '姓名',
          createTime: '2020-11-20  08:50:08'
        },
        {
          id: '00000000',
          taskType: '类型名称',
          referencePrice: '1000~1500',
          task: '1000',
          createPeople: '姓名',
          createTime: '2020-11-20  08:50:08'
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 100
          // scopedSlots: { customRender: 'name' }
        },
        {
          title: '任务类型',
          dataIndex: 'taskType',
          key: 'taskType',
          width: 100
        },
        {
          title: '参考价(幸福币)',
          dataIndex: 'referencePrice',
          key: 'referencePrice',
          width: 150
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
          sorter: true,
          width: 100
        },
        {
          dataIndex: 'sort',
          key: 'sort',
          slots: { title: 'sortTitle' },
          scopedSlots: { customRender: 'sort' },
          width: 200
        },
        {
          dataIndex: 'isStart',
          key: 'isStart',
          slots: { title: 'isStartTitle' },
          scopedSlots: { customRender: 'isStart' },
          width: 150
        },
        {
          title: '创建人',
          dataIndex: 'createPeople',
          key: 'createPeople',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: true,
          width: 200
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
    add () {
      this.$refs.editModel.isShow = true
    }
  }
}
</script>

<style lang='less' scoped>
.taskType{
  .card{
    margin-top: 20px;
  }
  .table{
    margin-top: 20px;
  }
}
</style>
