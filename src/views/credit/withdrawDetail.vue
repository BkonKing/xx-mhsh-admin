<template>
  <page-header-view :title="`提现单号：${info.coupon_name}`">
    <template v-slot:content>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="申请人" :span="2">
          <a :href="`${userUrl}?uid=${info.uid}`" target="_blank"
            >{{ info.nickname }}{{ realname }}</a
          >
        </a-descriptions-item>
        <a-descriptions-item label="店铺名称">
          {{ info.shops_name || "(暂无名称)" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺归属">
          {{ info.limit_text || "--" }}
        </a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button @click="handleDelete">修改打款</a-button>
      <a-button @click="handleDelete">修改审核</a-button>
      <a-button type="primary" @click="handleFinish">审核</a-button>
      <a-button type="primary" @click="batchPublish">已打款</a-button>
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div style="flex: 0 0 110px;">
          <div class="text">状态</div>
          <div class="heading">{{ info.coupon_status_name }}</div>
        </div>
      </div>
    </template>

    <status-steps
      title="券状态"
      :data="stepsData"
      :current="stepCurrent"
      description="name"
      remarkKey="ctime"
    ></status-steps>

    <a-card title="基本信息" style="margin-top: 24px">
      <h3>提现信息</h3>
      <a-descriptions>
        <a-descriptions-item label="实际提现"
          ><span style="color: red;">{{
            info.shops_coupon_id
          }}</span></a-descriptions-item
        >
        <a-descriptions-item label="提现人民币">{{
          info.coupon_type_name
        }}</a-descriptions-item>
        <a-descriptions-item label="提现幸福币">{{
          info.ctime
        }}</a-descriptions-item>
        <a-descriptions-item label="服务费">{{
          info.coupon_scene_name
        }}</a-descriptions-item>
        <a-descriptions-item label="提现单号">
          {{ info.coupon_mode_text }}</a-descriptions-item
        >
        <a-descriptions-item label="申请说明">{{
          info.available_text || "--"
        }}</a-descriptions-item>
      </a-descriptions>
      <h3>到账银行卡</h3>
      <a-descriptions>
        <a-descriptions-item label="卡类型">{{
          info.shops_coupon_id
        }}</a-descriptions-item>
        <a-descriptions-item label="卡号">{{
          info.coupon_type_name
        }}</a-descriptions-item>
        <a-descriptions-item label="手机号">{{
          info.ctime
        }}</a-descriptions-item>
        <a-descriptions-item label="姓名">{{
          info.coupon_scene_name
        }}</a-descriptions-item>
        <a-descriptions-item label="身份证号">
          {{ info.coupon_mode_text }}</a-descriptions-item
        >
      </a-descriptions>
    </a-card>

    <a-card title="打款信息" style="margin-top: 24px">
      <s-table
        ref="remitTable"
        size="default"
        rowKey="id"
        :columns="remitColumns"
        :data="remitLoadData"
        :showPagination="true"
      >
      </s-table>
    </a-card>

    <a-card title="审核信息" style="margin-top: 24px">
      <s-table
        ref="auditTable"
        size="default"
        rowKey="id"
        :columns="auditColumns"
        :data="auditLoadData"
        :showPagination="true"
      >
      </s-table>
    </a-card>

    <check-form-modal
      v-model="publishVisible"
      :active="activeCoupons"
      @success="publishSuccess"
    ></check-form-modal>
  </page-header-view>
</template>

<script>
// /credit/withdrawDetail
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import { STable } from '@/components'
import CheckFormModal from './components/CheckFormModal'
import StatusSteps from '@/views/businessManage/components/statusSteps'
import {
  getShopCouponInfo,
  getUserCouponList,
  finishCoupon,
  deleteCoupon
} from '@/api/userManage/business'

export default {
  name: 'storeCouponDetail',
  components: {
    CheckFormModal,
    StatusSteps,
    STable
  },
  data () {
    return {
      id: '',
      info: {
        log_data: []
      },
      publishVisible: false,
      remitColumns: [
        {
          title: '序号',
          dataIndex: 'user_coupon_numb'
        },
        {
          title: '操作时间',
          dataIndex: 'c_status_name'
        },
        {
          title: '打款结果',
          dataIndex: 'nickname'
        },
        {
          title: '操作后台',
          dataIndex: 'realname'
        },
        {
          title: '操作人',
          dataIndex: 'pay_money'
        },
        {
          title: '操作凭证',
          dataIndex: 'pay_order_numb',
          customRender: (text, row) => {
            const aDom = (
              <a
                class="two-Multi"
                href={`${this.baseUrl}/life/orderProject/getOrderProjectList?project_id=${row.order_project_id}`}
                target="_blank"
              >
                {text}
              </a>
            )
            return text ? aDom : '--'
          }
        },
        {
          title: '操作说明',
          dataIndex: 'ptime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          customRender: (text, row) => {
            return (
              <a onClick={getShopCouponInfo}>
                修改
              </a>
            )
          }
        }
      ],
      // app 4 自测 2 后台 已使用4 后台 3
      remitLoadData: parameter => {
        return getUserCouponList(
          Object.assign(parameter, {
            shops_coupon_id: this.id
          })
        )
      },
      auditColumns: [
        {
          title: '序号',
          dataIndex: 'user_coupon_numb'
        },
        {
          title: '审核时间',
          dataIndex: 'c_status_name'
        },
        {
          title: '审核结果',
          dataIndex: 'nickname'
        },
        {
          title: '审核后台',
          dataIndex: 'realname'
        },
        {
          title: '审核人',
          dataIndex: 'pay_money'
        },
        {
          title: '操作说明',
          dataIndex: 'ptime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          customRender: (text, row) => {
            return (
              <a onClick={getShopCouponInfo}>
                修改
              </a>
            )
          }
        }
      ],
      auditLoadData: parameter => {
        return getUserCouponList(
          Object.assign(parameter, {
            shops_coupon_id: this.id
          })
        )
      }
    }
  },
  computed: {
    ...mapGetters(['isParentProject']),
    baseUrl () {
      return this.isParentProject ? '/zht' : '/xmht'
    },
    userUrl () {
      return this.isParentProject
        ? '/zht/user/user/getUserList'
        : '/xmht/household/member/getMemberList'
    },
    realname () {
      const realname = this.info.realname
      return realname ? `(${realname})` : ''
    },
    activeCoupons () {
      return [
        {
          id: this.id,
          coupon_name: this.info.coupon_name
        }
      ]
    },
    stepsData () {
      const stepArr = ['创建', '发布', '领取', '结束']
      const logData = cloneDeep(this.info.log_data)
      const { ds_etime: dsEndTime } = this.info
      if (+this.info.coupon_status !== 3 && this.info.ds_etime) {
        for (let index = logData.length; index < 4; index++) {
          if (index === 3) {
            logData.push({
              ctime: dsEndTime,
              name: '(定时结束)'
            })
            return
          }
          logData.push({})
        }
      }
      return stepArr.map((obj, index) => ({
        ...this.info.log_data[index],
        title: obj
      }))
    },
    stepCurrent () {
      const step = {
        1: 2,
        2: 1,
        3: 3
      }
      return step[this.info.coupon_status]
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getShopCouponInfo()
  },
  methods: {
    getShopCouponInfo () {
      getShopCouponInfo({
        shops_coupon_id: this.id
      }).then(({ data }) => {
        this.info = data
      })
    },
    refreshPage () {
      this.getShopCouponInfo()
      this.refreshTable()
    },
    confirm ({ title, content, fn }) {
      this.$confirm({
        title,
        content,
        icon: () => (
          <a-icon
            type="exclamation-circle"
            style="color: #faad14"
            theme="filled"
          />
        ),
        cancelText: '取消',
        okText: '确定',
        onOk () {
          fn()
        },
        onCancel () {}
      })
    },
    batchPublish () {
      this.publishVisible = true
    },
    publishSuccess () {
      this.refreshPage()
    },
    // 结束操作
    handleFinish () {
      this.confirm({
        title: '结束店铺券',
        content: () => (
          <div>
            <span style="color: #f5222d;">结束后将停止领取该券</span>
            ，确定结束吗？
          </div>
        ),
        fn: () => {
          this.finishCoupon()
        }
      })
    },
    finishCoupon () {
      finishCoupon({
        shops_coupon_id_text: this.id
      }).then(({ success }) => {
        if (success) {
          this.$message.success('提交成功')
          this.refreshPage()
        }
      })
    },
    // 删除操作
    handleDelete (id = this.selectedRowKeys) {
      this.confirm({
        title: '删除店铺券',
        content: () => (
          <div>
            <span style="color: #f5222d;">优惠券及其相关信息都会被删除</span>
            ，确定删除吗？
          </div>
        ),
        fn: () => {
          this.deleteCoupon()
        }
      })
    },
    deleteCoupon () {
      deleteCoupon({
        shops_coupon_id_text: this.id
      }).then(({ success }) => {
        if (success) {
          this.$message.success('删除成功')
          this.$router.replace({
            name: 'storeCoupon'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-children-content {
  padding-bottom: 24px;
}
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
  text-align: right;
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  text-align: right;
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

/deep/ .ant-pro-page-header-wrap-page-header-warp {
  .ant-pro-page-header-wrap-extraContent {
    position: initial;
  }
}
.status-list {
  display: flex;
  justify-content: flex-end;
  text-align: left;
  .text,
  .heading {
    padding-left: 40px;
  }
}
</style>
