<template>
  <page-header-view :title="info.name">
    <template v-slot:content>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="面额">
          {{ info.projectName || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="创建人">
          {{ info.createAdmin }}<span class="two-blank"></span>{{ info.ctime }}
        </a-descriptions-item>
        <a-descriptions-item label="门槛">
          {{ info.projectName || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="所属店铺">
          {{ info.projectName || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="有效期" :span="2">
          {{ info.projectName || "--" }}
        </a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button @click="goEdit">删除</a-button>
      <a-button type="primary" @click="openCheck">结束</a-button>
      <a-button type="primary" @click="openCheck">发布</a-button>
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div style="flex: 0 0 110px;">
          <div class="text">状态</div>
          <div class="heading">{{ info.statusv }}</div>
        </div>
      </div>
    </template>
    <a-card :bordered="false" style="margin-top: 24px">
      <a-row type="flex">
        <a-col flex="1">
          <detail-info title="发行量" :value="info.paid" :bordered="true" />
        </a-col>
        <a-col flex="1">
          <detail-info title="剩余张数" :value="info.unpaid" :bordered="true" />
        </a-col>
        <a-col flex="1">
          <detail-info
            title="累计领取张数"
            :value="info.invoiced"
            :bordered="true"
          />
        </a-col>
        <a-col flex="1">
          <detail-info
            title="累计使用张数"
            :value="info.notInvoiced"
            :bordered="true"
          />
        </a-col>
        <a-col flex="1">
          <detail-info title="累计使用量" :value="`${info.notInvoiced}%`" />
        </a-col>
      </a-row>
    </a-card>

    <a-card title="基本信息" style="margin-top: 24px">
      <a-descriptions>
        <a-descriptions-item label="券ID">{{
          info.order_status
        }}</a-descriptions-item>
        <a-descriptions-item label="券类型">{{
          info.status
        }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{
          info.status
        }}</a-descriptions-item>
        <a-descriptions-item label="使用场景">{{
          info.status
        }}</a-descriptions-item>
        <a-descriptions-item label="领取方式">
          付费领取 - 5幸福币</a-descriptions-item
        >
        <a-descriptions-item label="可领取用户">{{
          info.status
        }}</a-descriptions-item>
        <a-descriptions-item label="可使用商品">{{
          info.status
        }}</a-descriptions-item>
        <a-descriptions-item label="发布时间"
          >2021-11-15 00:00:00（定时发布 ）</a-descriptions-item
        >
        <a-descriptions-item label="发布时间"
          ><div>
            <div>2021-11-30 00:00:00（实际结束）</div>
            <div>2021-11-30 00:00:00（定时结束）</div>
          </div></a-descriptions-item
        >
      </a-descriptions>
    </a-card>
  </page-header-view>
</template>

<script>
// /store/couponDetail
import { DetailInfo } from '@/components'
import { getStaffList } from '@/api/userManage'
import CouponRecords from './components/CouponRecords'

export default {
  name: 'storeCouponDetail',
  components: {
    DetailInfo,
    CouponRecords
  },
  data () {
    return {
      id: '',
      UpdatePermission: 0,
      tabList: [],
      tabActiveKey: '0',
      info: {
        name: ''
      },
      visible: false,
      confirmLoading: false
    }
  },
  computed: {
    isPass () {
      return this.info.status === '1'
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo () {
      getStaffList({
        id: this.id
      }).then(({ data }) => {
        this.info = data
        this.info.id = this.id
        if (data.status !== '1') {
          this.tabList = []
        } else {
          this.tabList = [
            { key: '0', tab: '详情' },
            { key: '1', tab: '审批' }
          ]
        }
      })
    },
    goEdit () {
      this.$router.push({
        name: 'OrderEdit',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-descriptions-item {
  vertical-align: top;
  > span {
    vertical-align: top;
  }
}
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
  .status-list {
    text-align: left;
  }
}
</style>
