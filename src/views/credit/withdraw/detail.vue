<template>
  <page-header-view :title="title">
    <template v-slot:content>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="申请人" :span="2">
          {{ info.user_type | userType }}
          <a :href="`${userUrl}?uid=${info.uid}`" target="_blank"
            >{{ realname }} {{ mobile }}</a
          >
        </a-descriptions-item>
        <a-descriptions-item label="店铺名称">
          {{ info.shops_name || "(暂无名称)" }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺归属">
          {{ info.shops_project || "美好生活家园运营中心" }}
        </a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button v-if="+info.udpate_payment_button" @click="editPay(2)"
        >修改打款</a-button
      >
      <a-button v-if="+info.update_check_button" @click="editCheck(2)"
        >修改审核</a-button
      >
      <a-button
        v-if="+info.check_button"
        type="primary"
        @click="openCheck"
        >审核</a-button
      >
      <a-button
        v-if="+info.payment_button"
        type="primary"
        @click="openCheck(2)"
        >已打款</a-button
      >
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div style="flex: 0 0 130px;">
          <div class="text">状态</div>
          <div class="heading">{{ info.status_desc }}</div>
        </div>
      </div>
    </template>

    <status-steps
      title="券状态"
      titleKey="step_name"
      :data="stepsData"
      :current="stepCurrent"
    >
      <template #description="{data}">
        <div v-if="data.project_name">{{data.project_name}}</div>
        <div v-if="data.user_type">{{data.user_type}}</div>
        <div v-if="data.opt_user">{{data.opt_user}}</div>
        <div v-if="data.ctime">{{data.ctime}}</div>
      </template>
    </status-steps>

    <a-card title="基本信息" style="margin-top: 24px">
      <h3>提现信息</h3>
      <a-descriptions>
        <a-descriptions-item label="实际提现"
          ><span style="color: red;"
            >￥{{ info.actual_rmb }}</span
          ></a-descriptions-item
        >
        <a-descriptions-item label="提现人民币"
          >￥{{ info.cash_rmb }}</a-descriptions-item
        >
        <a-descriptions-item label="提现幸福币">{{
          info.credits
        }}</a-descriptions-item>
        <a-descriptions-item label="服务费"
          >{{ info.service_rate
          }}{{
            info.service_fee ? `(本次收取￥${info.service_fee})` : ""
          }}</a-descriptions-item
        >
        <a-descriptions-item label="提现单号">
          {{ info.cashout_numb }}</a-descriptions-item
        >
        <a-descriptions-item label="申请说明">{{
          info.cash_desc || "--"
        }}</a-descriptions-item>
      </a-descriptions>
      <h3>到账银行卡</h3>
      <a-descriptions>
        <a-descriptions-item label="卡类型">{{
          info.bank_name
        }}</a-descriptions-item>
        <a-descriptions-item label="卡号">{{
          info.bank_card
        }}</a-descriptions-item>
        <a-descriptions-item label="手机号">{{
          info.mobile
        }}</a-descriptions-item>
        <a-descriptions-item label="姓名">{{
          info.realname
        }}</a-descriptions-item>
        <a-descriptions-item label="身份证号">
          {{ info.idcard }}</a-descriptions-item
        >
      </a-descriptions>
    </a-card>

    <a-card
      v-if="info.payment_list && info.payment_list.length"
      title="打款信息"
      style="margin-top: 24px"
    >
      <a-table
        ref="remitTable"
        size="default"
        rowKey="id"
        :columns="remitColumns"
        :data-source="info.payment_list"
        :showPagination="false"
      >
      </a-table>
    </a-card>

    <a-card
      v-if="info.check_list && info.check_list.length"
      title="审核信息"
      style="margin-top: 24px"
    >
      <a-table
        ref="auditTable"
        size="default"
        rowKey="id"
        :columns="auditColumns"
        :data-source="info.check_list"
        :showPagination="false"
      >
      </a-table>
    </a-card>

    <check-form-modal
      ref="checkForm"
      v-model="checkVisible"
      :data="ids"
      :info="checkData"
      :type="checkMode"
      :check-id="checkId"
      @success="refreshPage"
    ></check-form-modal>
    <pay-form-modal
      ref="payForm"
      v-model="payVisible"
      :data="ids"
      :payId="payId"
      :info="payData"
      :type="payType"
      @success="refreshPage"
    ></pay-form-modal>
  </page-header-view>
</template>

<script>
// /credit/withdraw/detail
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
// import { STable } from '@/components'
import CheckFormModal from './components/CheckFormModal'
import PayFormModal from './components/PayFormModal'
import StatusSteps from '@/views/businessManage/components/statusSteps'
import { getCashDetail, getCheckAndPayInfo } from '@/api/credit/withdraw'

export default {
  name: 'withdrawDetail',
  components: {
    CheckFormModal,
    PayFormModal,
    StatusSteps
    // STable
  },
  data () {
    return {
      id: '',
      info: {
        log_data: []
      },
      remitColumns: [
        {
          title: '序号',
          dataIndex: 'id',
          customRender: (text, row, index) => {
            return index + 1
          }
        },
        {
          title: '操作时间',
          dataIndex: 'ctime'
        },
        {
          title: '打款结果',
          dataIndex: 'payment_result'
        },
        {
          title: '操作后台',
          dataIndex: 'backstage'
        },
        {
          title: '操作人',
          dataIndex: 'opt_user'
        },
        {
          title: '操作凭证',
          dataIndex: 'img',
          customRender: (text, row) => {
            if (text && text.length) {
              return (
                <span>
                  {text.length}张 <a onClick={() => { this.openImg(text) }}>查看</a>
                </span>
              )
            }
            return '--'
          }
        },
        {
          title: '操作说明',
          dataIndex: 'explain'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          customRender: (text, row) => {
            return (
              <a
                onClick={() => {
                  this.editPay(3, row)
                }}
              >
                修改
              </a>
            )
          }
        }
      ],
      auditColumns: [
        {
          title: '序号',
          dataIndex: 'id',
          customRender: (text, row, index) => {
            return index + 1
          }
        },
        {
          title: '审核时间',
          dataIndex: 'ctime'
        },
        {
          title: '审核结果',
          dataIndex: 'check_result'
        },
        {
          title: '审核后台',
          dataIndex: 'backstage'
        },
        {
          title: '审核人',
          dataIndex: 'opt_user'
        },
        {
          title: '操作说明',
          dataIndex: 'explain'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          customRender: (text, row) => {
            return (
              <a
                onClick={() => {
                  this.editCheck(3, row)
                }}
              >
                修改
              </a>
            )
          }
        }
      ],
      checkVisible: false,
      checkMode: 1,
      checkData: {},
      checkId: '',
      payVisible: false,
      payType: 1,
      payId: '',
      payData: {}
    }
  },
  computed: {
    ...mapGetters(['isParentProject', 'userUrl']),
    realname () {
      const realname = this.info.realname
      return realname || ''
    },
    mobile () {
      const mobile = this.info.mobile
      return mobile || ''
    },
    stepsData () {
      return this.info.process
    },
    stepCurrent () {
      const step = {
        1: 2,
        2: 1,
        3: 3
      }
      return step[this.info.coupon_status]
    },
    title () {
      return `提现单号：${this.info.cashout_numb}`
    },
    ids () {
      return [this.id]
    }
  },
  filters: {
    userType (value) {
      const text = {
        1: '项目 - ',
        2: '商家 - '
      }
      return text[value]
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getCashDetail()
  },
  methods: {
    async getCashDetail () {
      const { data } = await getCashDetail({
        cash_id: this.id
      })
      this.info = data
    },
    openImg (arr) {
      this.$viewerApi({
        images: arr
      })
    },
    refreshPage () {
      this.getCashDetail()
    },
    async openCheck (type = 1) {
      const { data } = await getCheckAndPayInfo({
        ids: [this.id],
        type
      })
      if (type === 1) {
        this.checkMode = 1
        this.checkData = data
        this.checkVisible = true
      } else {
        this.payType = 1
        this.payData = data
        this.payVisible = true
      }
    },
    editCheck (type, checkData) {
      // this.checkData = this.info
      type === 3 && (this.checkId = checkData.id)
      this.checkMode = type
      this.checkVisible = true
      if (type === 2) {
        this.$nextTick(() => {
          const status = +this.info.check_status === 1 ? 2 : 1
          this.$refs.checkForm.setCheckType(status)
        })
      }
    },
    editPay (type, data) {
      // this.payData = data
      this.payType = type
      this.payVisible = true
      if (type === 2) {
        this.$nextTick(() => {
          this.$refs.payForm.setStatus(3)
        })
      } else if (type === 3) {
        this.payId = data.id
        this.$nextTick(() => {
          this.$refs.payForm.setStatus(data.type)
          this.$refs.payForm.setFormData({
            payment_desc: data.explain,
            cash_img: data.img || []
          })
        })
      }
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
