<template>
  <div class="info">
    <a-card class="card">
      <div class="title">基础信息</div>
      <div class="content">
        <a-row class="row">
          <a-col :span="8">
            <div class="t1">
              生日: <span>{{ userInfo.birthday || "--" }}</span>
            </div>
            <div class="t2">
              幸福币：<span>{{ userInfo.credits }}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="t1">
              角色：<span>{{ userInfo.user_type | userType }}</span>
            </div>
            <div class="t2">
              注册时间：<span>{{ userInfo.ctime }}</span>
            </div>
          </a-col>
          <a-col :span="8"
            >消费总额：<span>{{ userInfo.credits }}</span></a-col
          >
        </a-row>
      </div>
    </a-card>
    <a-card class="card2">
      <a-table
        rowKey="id"
        :columns="addressColumns"
        :data-source="addressData"
        :pagination="false"
      ></a-table>
    </a-card>
    <a-card class="card2">
      <a-table
        rowKey="id"
        :columns="houseColumns"
        :data-source="houseData"
        :pagination="false"
      ></a-table>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    },
    addressData: {
      type: Array,
      default: () => []
    },
    houseData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      addressColumns: [
        {
          title: '收货地址',
          dataIndex: 'address_detail',
          width: '60%',
          customRender: (text, row) => {
            return text + row.address_name + row.address_house
          }
        },
        {
          title: '收件人',
          dataIndex: 'realname',
          width: '20%'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          width: '20%'
        }
      ],
      houseColumns: [
        {
          title: '房产信息',
          dataIndex: 'fc_info',
          width: '60%'
        },
        {
          title: '角色',
          dataIndex: 'house_role',
          width: '20%'
        },
        {
          title: '绑定',
          dataIndex: 'btime',
          width: '20%'
        }
      ]
    }
  },
  filters: {
    userType (value) {
      const type = {
        0: '游客',
        1: '业主',
        2: '业主成员',
        3: '租户',
        4: '租户成员',
        5: '游客-未认证业主',
        6: '游客-定位',
        7: '游客-未定位'
      }
      return type[value]
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  .card {
    margin-top: 20px;
    .title {
      border-bottom: 1px solid #ccc;
      padding-bottom: 15px;
      font-weight: 600;
    }
    /deep/ .ant-card-body {
      padding: 15px;
    }
    .content {
      width: 100%;
      .row {
        width: 100%;
        // padding: 15px;
        div {
          line-height: 40px;
        }
        span {
          color: #999;
        }
      }
    }
  }
  .card2 {
    margin-top: 20px;
    /deep/.ant-card-body {
      padding: 15px;
    }
    .title {
      // padding: 0 10px;
      display: flex;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      .t1 {
        flex: 3;
      }
      .t2 {
        flex: 1;
      }
      .t3 {
        flex: 1;
      }
    }
    .bottom {
      height: 30px !important;
    }
  }
}
</style>
