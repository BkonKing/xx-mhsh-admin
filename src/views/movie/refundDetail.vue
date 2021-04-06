<template>
  <div v-if="dataInfo">
    <a-card :bordered="false" title="流程进度">
      <a-steps direction="horizontal" :current="stepIndex" progressDot>
        <a-step>
          <template v-slot:title>
            <span>申请时间</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ dataInfo.process.apply_name }}
              <div>{{ dataInfo.process.ctime }}</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>退款</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ dataInfo.process.handle_name }}
              <div>{{ dataInfo.process.htime }}</div>
            </div>
          </template>
        </a-step>
        <a-step title="完成" />
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="基础信息">
      <a-descriptions>
        <a-descriptions-item label="退款状态">{{ dataInfo.basic.refund_desc }}</a-descriptions-item>
        <a-descriptions-item label="退款编号">{{ dataInfo.basic.returnfund_numb }}</a-descriptions-item>
        <a-descriptions-item label="订单编号"><a :href="'/zht/film/film/orderlist?order_id='+dataInfo.basic.order_id" target="_parent">{{ dataInfo.basic.order_no }}</a></a-descriptions-item>
        <a-descriptions-item label="申请退款">￥{{ dataInfo.basic.apply_price }}（￥{{ dataInfo.basic.apply_rmb_price }} + 幸福币{{ dataInfo.basic.apply_refund_happiness }}）</a-descriptions-item>
        <a-descriptions-item v-if="dataInfo.basic.refund_status == 1" label="实际退款">￥{{ dataInfo.basic.actual_price }}（￥{{ dataInfo.basic.actual_rmb_price }} + 幸福币{{ dataInfo.basic.actual_refund_happiness }}）</a-descriptions-item>
        <a-descriptions-item v-if="dataInfo.basic.refund_status == 1" label="退回方式">{{ dataInfo.basic.refund_type }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <a-descriptions>
        <a-descriptions-item label="项目">{{ dataInfo.user.project_name }}</a-descriptions-item>
        <a-descriptions-item label="用户"><a :href="'/zht/user/user/getUserList?uid='+dataInfo.user.uid" target="_parent">{{ dataInfo.user.nickname }}({{ dataInfo.user.realname }})</a></a-descriptions-item>
        <a-descriptions-item label="手机号">{{ dataInfo.user.mobile }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin: 24px 0" :bordered="false" title="操作日志">
      <a-table
        :columns="operationColumns"
        :dataSource="logData"
        :pagination="false"
      >
        <template
          slot="opt_status"
          slot-scope="opt_status, record">
          <a-badge :status="opt_status | statusTypeFilter" :text="record.status_desc"/>
        </template>
        <template
          slot="opt_usetime"
          slot-scope="text, record">
          {{ record.end_time - record.start_time }}s
        </template>
      </a-table>
    </a-card>
    <!-- <a-card v-if="dataInfo.process.refund_status != 1" style="margin-top: 24px" :bordered="false" title="确认退款">
      <a-row>
        <a-col :span="8" class="text-right"><p>申请金额：</p></a-col>
        <a-col :span="16"><p>￥{{ dataInfo.basic.apply_price }}（￥{{ dataInfo.basic.apply_rmb_price }} + 幸福币{{ dataInfo.basic.apply_refund_happiness }}）</p></a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="text-right"><p>退款金额：</p></a-col>
        <a-col :span="16" class="color-F5222D"><p>￥{{ dataInfo.basic.actual_price }}（￥{{ dataInfo.basic.actual_rmb_price }} + 幸福币{{ dataInfo.basic.actual_refund_happiness }}）</p></a-col>
      </a-row>
      <a-row>
        <a-col :span="16" :offset="8">
          <a-button type="primary" @click="tkSure">退款</a-button>
        </a-col>
      </a-row>
    </a-card> -->
  </div>
</template>

<script>
import { getRefundDetail, sendBatchRefund } from '@/api/movie'
export default {
  name: 'movieOrder',
  components: {
  },
  data () {
    return {
      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type_desc',
          key: 'type_desc'
        },
        {
          title: '操作员',
          dataIndex: 'handle_name',
          key: 'handle_name'
        },
        {
          title: '执行结果',
          dataIndex: 'opt_status',
          key: 'opt_status',
          scopedSlots: { customRender: 'opt_status' }
        },
        {
          title: '操作时间',
          dataIndex: 'opt_time',
          key: 'opt_time'
        },
        {
          title: '耗时',
          dataIndex: 'end_time',
          key: 'end_time',
          scopedSlots: { customRender: 'opt_usetime' }
        }
      ],
      stepIndex: 0,
      logData: [],
      order_id: '',
      dataInfo: ''
    }
  },
  created () {
    this.order_id = this.$route.query.order_id
    this.getData()
  },
  methods: {
    getData () {
      getRefundDetail({ order_id: this.order_id }).then(res => {
        this.dataInfo = res.data
        this.logData = res.data.log_info
        if (res.data.process.refund_status == 0) {
          this.stepIndex = 1
        } else {
          this.stepIndex = 1
        }
        if (res.data.process.is_finished == 1) {
          this.stepIndex = 2
        }
      })
    },
    tkSure () {
      sendBatchRefund({ order_id: this.order_id }).then(res => {
        this.$message.success(res.message)
        this.getData()
      }).catch(res => {
        if (res.type == 1) {
          this.modalError('退款失败', '请重试')
        } else if (res.type == 3) {
          this.modalWarning('余额不足', '账户余额不足，请先充值')
        }
      })
    },
    modalError (title, content) {
      this.$error({
        title: title,
        content: content
      })
    },
    modalWarning (title, content) {
      this.$warning({
        title: title,
        content: content
      })
    }
  },
  filters: {
    statusTypeFilter (type) {
      const statusTypeMap = {
        1: 'success',
        0: 'error'
      }
      return statusTypeMap[type]
    }
  }
}
</script>
