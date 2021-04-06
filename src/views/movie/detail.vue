<template>
  <div v-if="dataInfo">
    <a-card :bordered="false" title="流程进度">
      <a-steps direction="horizontal" :current="stepIndex" progressDot>
        <a-step>
          <template v-slot:title>
            <span>创建时间</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ dataInfo.user_info.proejct_name }}-{{ dataInfo.user_info.username }}
              <div>{{ dataInfo.process.ctime }}</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>支付时间</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ dataInfo.user_info.proejct_name }}-{{ dataInfo.user_info.username }}
              <div>{{ dataInfo.process.pay_time }}</div>
            </div>
          </template>
        </a-step>
        <a-step v-if="dataInfo.basic.status == 3 || dataInfo.basic.status == 5">
          <template v-slot:title>
            <span>售后</span>
          </template>
          <template v-slot:description>
            <div v-if="dataInfo.process.refund_time && dataInfo.process.refund_time!='0'" class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ dataInfo.process.refund_username }}
              <div>{{ dataInfo.process.refund_time }}</div>
            </div>
          </template>
        </a-step>
        <a-step v-if="dataInfo.basic.status == 3 || dataInfo.basic.status == 5" title="售后完成" />
        <a-step v-else-if="dataInfo.basic.status == 4" title="订单成功" />
        <a-step v-else-if="dataInfo.basic.status == 11">
          <template v-slot:title>
            <span>交易取消</span>
          </template>
          <template v-slot:description>
            <div v-if="dataInfo.process.refund_time && dataInfo.process.refund_time!='0'" class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ dataInfo.process.refund_username }}
              <div>{{ dataInfo.process.refund_time }}</div>
            </div>
          </template>
        </a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="基础信息">
      <a-descriptions>
        <a-descriptions-item label="订单状态">{{ dataInfo.basic.order_status }}</a-descriptions-item>
        <a-descriptions-item label="支付方式">{{ dataInfo.basic.status != 11 ? dataInfo.basic.pay_type : '--' }}</a-descriptions-item>
        <a-descriptions-item label="支付订单号">{{ dataInfo.basic.status != 11 ? dataInfo.basic.pay_number : '--' }}</a-descriptions-item>
        <a-descriptions-item label="订单编号" :span="dataInfo.basic.status == 11 || dataInfo.basic.status == 4 ? 3 : 1">{{ dataInfo.basic.order_no }}</a-descriptions-item>
        <template v-if="dataInfo.basic.status == 3 || dataInfo.basic.status == 5">
          <a-descriptions-item label="退款编号"><a :href="'/zht/film/film/getrefundlist?order_id='+dataInfo.basic.order_id" target="_parent">{{ dataInfo.basic.returnfund_numb }}</a></a-descriptions-item>
          <a-descriptions-item label="退款状态">{{ dataInfo.basic.status == 3 ? '已退款' : '退款中' }}</a-descriptions-item>
        </template>
        <a-descriptions-item label="支付金额"><template v-if="dataInfo.basic.status != 11">￥</template>{{ dataInfo.basic.status != 11 ? dataInfo.basic.pay_price : '--' }}</a-descriptions-item>
        <a-descriptions-item label="优惠金额">￥{{ dataInfo.basic.coupon_price }}</a-descriptions-item>
        <a-descriptions-item label="总座位费">￥{{ dataInfo.basic.seat_price }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="影票信息">
      <a-descriptions>
        <a-descriptions-item label="取票号">{{ dataInfo.ticket_info.print_no }}</a-descriptions-item>
        <!-- <a-descriptions-item label="是否取票">{{ dataInfo.ticket_info.is_get == '已取票' || '未取票' }}</a-descriptions-item> -->
        <a-descriptions-item label="取票码" span="2"><span style="display: flex; vertical-align: middle" @click="dataInfo.ticket_info.printno_url ? imgShow=true : ''"><a-icon style="fontSize: 20px" type="qrcode" /></span></a-descriptions-item>
        <a-descriptions-item label="场次">{{ dataInfo.ticket_info.sessions + ' ' + dataInfo.ticket_info.week + ' ' + dataInfo.ticket_info.time }}</a-descriptions-item>
        <a-descriptions-item label="厅号" span="2">{{ dataInfo.ticket_info.hall_name }}</a-descriptions-item>
        <a-descriptions-item label="座位" span="3">{{ dataInfo.ticket_info.seat_name }}</a-descriptions-item>
        <a-descriptions-item label="座位费" span="3">{{ dataInfo.ticket_info.seat_price }} <a @click="paydetailShow = !paydetailShow">明细 <a-icon :type="paydetailShow ? 'up' : 'down'" /></a></a-descriptions-item>
      </a-descriptions>
      <a-descriptions v-show="paydetailShow">
        <a-descriptions-item label="计算" span="3">座位费=票价+服务费</a-descriptions-item>
        <a-descriptions-item label="票价" span="3">{{ dataInfo.ticket_info.ticket_price }}</a-descriptions-item>
        <a-descriptions-item label="服务费" span="3">{{ dataInfo.ticket_info.service_addfee }}</a-descriptions-item>
        <a-descriptions-item label="优惠金额" span="3">￥{{ dataInfo.basic.coupon_price }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="影片影院">
      <a-descriptions>
        <a-descriptions-item label="影片">
          <a v-if="dataInfo.cinema_info.is_jump == 1" :href="'/zht/film/film/getfilmlist?film_code='+dataInfo.cinema_info.film_no" target="_parent">《{{ dataInfo.cinema_info.film_name }}》</a>
          <template v-else>《{{ dataInfo.cinema_info.film_name }}》</template>
        </a-descriptions-item>
        <a-descriptions-item label="影片时长">{{ dataInfo.cinema_info.total_time }}</a-descriptions-item>
        <a-descriptions-item label="影片类型">{{ dataInfo.cinema_info.film_type }}</a-descriptions-item>
        <a-descriptions-item label="影城">{{ dataInfo.cinema_info.cinema_name }}</a-descriptions-item>
        <a-descriptions-item label="影城地址">{{ dataInfo.cinema_info.address }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <a-descriptions>
        <a-descriptions-item label="项目">{{ dataInfo.user_info.proejct_name }}</a-descriptions-item>
        <a-descriptions-item label="用户"><a :href="'/zht/user/user/getUserList?uid='+dataInfo.user_info.uid" target="_parent">{{ dataInfo.user_info.username }}</a></a-descriptions-item>
        <a-descriptions-item label="手机号">{{ dataInfo.user_info.mobile }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card style="margin: 24px 0" :bordered="false" title="操作日志">
      <a-table
        :columns="operationColumns"
        :dataSource="logData"
        :pagination="false"
        rowKey="id"
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
    <a-modal
      width="460px"
      :visible="imgShow"
      class="cztx-modal"
      :footer="null"
      @cancel="imgShow = false"
    >
      <div><img width="400px" height="400px" :src="dataInfo.ticket_info.printno_url" /></div>
    </a-modal>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/movie'
export default {
  name: 'movieOrder',
  components: {
  },
  data () {
    return {
      order_id: '', // 订单id
      dataInfo: '',
      paydetailShow: false,
      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type_desc'
        },
        {
          title: '操作员',
          dataIndex: 'handle_name'
        },
        {
          title: '执行结果',
          dataIndex: 'opt_status',
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
          scopedSlots: { customRender: 'opt_usetime' }
        }
      ],
      stepIndex: 0,
      logData: [],
      imgShow: false
    }
  },
  mounted () {
    this.order_id = this.$route.query.order_id
    this.getData()
  },
  methods: {
    getData () {
      getOrderDetail({ order_id: this.order_id }).then(res => {
        this.dataInfo = res.data
        this.logData = res.data.log_info
        switch (res.data.basic.status) {
          case 3: // 已取消（已退款）
            this.stepIndex = 3
            break
          case 4: // 已成功
            this.stepIndex = 2
            break
          case 5: // 已取消（退款中）
            this.stepIndex = 2
            break
          case 11: // 取消付款
            this.stepIndex = 2
            break
        }
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
