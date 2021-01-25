<template>
  <div class="transfer">
    <div class="top">
      <div class="item"
           v-for="(item, index) in typeObj"
           :key="index"
           @click="currentIndex=index"
           :class="{active:currentIndex===index}">{{item}}</div>
    </div>
    <a-card class="card">
      <a-form-model :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    layout="inline">
        <a-form-model-item label='账户类型'>
          <a-select style="width: 200px"
                    placeholder="请选择">
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
        <a-form-model-item label='时间'>
          <a-date-picker />
        </a-form-model-item>
        <a-form-model-item label='搜索'>
          <a-input placeholder="手机号、姓名"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="card2">
      <div class="btns">
        <a-button type='primary'>
          <a-icon type="plus" />
          申请
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay"
                  @click="handleMenuClick">
            <a-menu-item key="1">
              批量转账
            </a-menu-item>
            <a-menu-item key="2">
              批量拒绝
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 批量审核
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <a-table class="table"
               :pagination='false'
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
               :columns="columns"
               :data-source="data" />
      <div slot="aaa">1111</div>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          key: '1',
          applyTime: '2020-09-07 00:00:00',
          type: '用户',
          otheraccount: '5000000000彭生生 (昵称昵称)',
          happyMoney: 100,
          remark: '啊啊啊啊',
          checkTime: '2020-09-09 00:00:00',
          aaa: ''
        },
        {
          key: '2',
          applyTime: '2020-09-07 00:00:00',
          type: '用户',
          otheraccount: '5000000000彭生生 (昵称昵称)',
          happyMoney: 100,
          remark: '啊啊啊啊',
          checkTime: '2020-09-09 00:00:00',
          aaa: ''
        },
        {
          key: '3',
          applyTime: '2020-09-07 00:00:00',
          type: '用户',
          otheraccount: '5000000000彭生生 (昵称昵称)',
          happyMoney: 100,
          remark: '啊啊啊啊',
          checkTime: '2020-09-09 00:00:00',
          aaa: ''
        }
      ],
      columns: [
        {
          title: '申请时间',
          dataIndex: 'applyTime',
          key: 'applyTime',
          sorter: true,
          width: 180
        },
        {
          title: '账户类型',
          dataIndex: 'type',
          key: 'type',
          width: 100
        },
        {
          title: '对方账户',
          dataIndex: 'otheraccount',
          key: 'otheraccount',
          width: 200
        },
        {
          title: '幸福币',
          dataIndex: 'happyMoney',
          key: 'happyMoney',
          width: 80
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
          width: 100
        },
        {
          title: '审核时间',
          dataIndex: 'checkTime',
          key: 'checkTime',
          width: 200
        },
        {
          title: '操作',
          dataIndex: 'aaa',
          key: 'aaa',
          scopedSlots: { customRender: 'aaa' }
        }
      ],
      selectedRowKeys: [], // Check here to configure the default column
      typeObj: ['待审核', '已转账', '已拒绝'],
      currentIndex: 0,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  methods: {
    handleMenuClick (e) {
      console.log('click', e)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  },
  created () {

  }
}
</script>

<style lang='less'>
.transfer {
  .top {
    display: flex;
    align-items: center;
    background-color: #c7cace;
    color: white;
    .item {
      width: 120px;
      line-height: 40px;
      text-align: center;
    }
    .active {
      background-color: #000;
    }
  }
  .card {
    margin-top: 20px;
  }
  .card2 {
    margin-top: 20px;
    .btns {
      button:last-child {
        margin-left: 10px;
      }
    }
    .table {
      margin-top: 10px;
    }
  }
}
</style>
