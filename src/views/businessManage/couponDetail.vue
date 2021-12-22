<template>
  <page-header-view :title="info.coupon_name">
    <template v-slot:content>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="面额">
          {{ info.miane || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="创建人">
          <a
            :href="`/zht/user/user/getUserList?uid=${info.uid}`"
            target="_blank"
            >{{ info.nickname }}{{ realname }}</a
          >
        </a-descriptions-item>
        <a-descriptions-item label="门槛">
          {{ info.menkan || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="所属店铺">
          {{ info.shops_name || "--" }}
        </a-descriptions-item>
        <a-descriptions-item label="有效期" :span="2">
          {{ info.youxiaoqi || "--" }}
        </a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button
        v-if="['2', '3'].includes(info.coupon_status)"
        @click="handleDelete"
        >删除</a-button
      >
      <a-button
        v-if="info.coupon_status === '1'"
        type="primary"
        @click="handleFinish"
        >结束</a-button
      >
      <a-button
        v-if="info.coupon_status === '2'"
        type="primary"
        @click="batchPublish"
        >发布</a-button
      >
    </template>

    <template v-slot:extraContent>
      <div class="status-list">
        <div style="flex: 0 0 110px;">
          <div class="text">状态</div>
          <div class="heading">{{ info.coupon_status_name }}</div>
        </div>
      </div>
    </template>

    <a-card :bordered="false" style="margin-top: 24px">
      <a-row type="flex">
        <a-col flex="1">
          <detail-info title="发行量" :value="info.stock" :bordered="true" />
        </a-col>
        <a-col flex="1">
          <detail-info
            title="剩余张数"
            :value="info.surplus"
            :bordered="true"
          />
        </a-col>
        <a-col flex="1">
          <detail-info
            title="累计领取张数"
            :value="info.receive"
            :bordered="true"
          />
        </a-col>
        <a-col flex="1">
          <detail-info
            title="累计使用张数"
            :value="info.employ"
            :bordered="true"
          />
        </a-col>
        <a-col flex="1">
          <detail-info title="累计使用量" :value="info.employ_rate" />
        </a-col>
      </a-row>
    </a-card>

    <status-steps
      title="券状态"
      :data="stepsData"
      :current="stepCurrent"
      description="name"
      remarkKey="ctime"
    ></status-steps>

    <a-card title="基本信息" style="margin-top: 24px">
      <a-descriptions>
        <a-descriptions-item label="券ID">{{
          info.shops_coupon_id
        }}</a-descriptions-item>
        <a-descriptions-item label="券类型">{{
          info.coupon_type_name
        }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{
          info.ctime
        }}</a-descriptions-item>
        <a-descriptions-item label="使用场景">{{
          info.coupon_scene_name
        }}</a-descriptions-item>
        <a-descriptions-item label="领取方式">
          {{ info.coupon_mode_text }}</a-descriptions-item
        >
        <a-descriptions-item label="可领取用户">{{
          info.available_text
        }}</a-descriptions-item>
        <a-descriptions-item label="可使用商品">{{
          info.goods_text
        }}</a-descriptions-item>
        <a-descriptions-item label="发布时间">{{
          info.fb_time
        }}</a-descriptions-item>
        <a-descriptions-item label="结束时间"
          ><div>
            <div>{{ info.sj_etime }}</div>
            <div>{{ info.ds_etime }}</div>
          </div></a-descriptions-item
        >
      </a-descriptions>
    </a-card>

    <a-card title="领取记录" style="margin-top: 24px">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="领取用户">
                <a-input
                  v-model="queryParam.user_text"
                  placeholder="ID、昵称、姓名、手机号"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="券状态">
                <a-select
                  v-model="queryParam.c_status"
                  :options="useStatus"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="券编号">
                <a-input
                  v-model="queryParam.user_coupon_numb"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付订单">
                <a-input
                  v-model="queryParam.order_numb"
                  placeholder="请输入"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="领取时间">
                <a-range-picker
                  v-model="queryParam.time"
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                  :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                  :placeholder="['开始时间', '结束时间']"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
            <advanced-form
              v-model="advanced"
              :md="8"
              :isAdvanced="false"
              @reset="resetTable"
              @search="refreshTable(true)"
            ></advanced-form>
          </a-row>
        </a-form>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          :showPagination="true"
        >
        </s-table>
      </div>
    </a-card>
    <publish-modal
      v-model="publishVisible"
      :active="activeCoupons"
      @success="publishSuccess"
    ></publish-modal>
  </page-header-view>
</template>

<script>
// /store/couponDetail
import clonedeep from 'lodash.clonedeep'
import { STable, AdvancedForm, DetailInfo } from '@/components'
import PublishModal from './components/PublishModal'
import StatusSteps from './components/statusSteps'
import {
  getShopCouponInfo,
  getUserCouponList,
  finishCoupon,
  deleteCoupon
} from '@/api/userManage/business'
import CouponRecords from './mixins/CouponRecords'

export default {
  name: 'storeCouponDetail',
  components: {
    AdvancedForm,
    DetailInfo,
    PublishModal,
    StatusSteps,
    STable
  },
  mixins: [CouponRecords],
  data () {
    return {
      id: '',
      info: {
        log_data: []
      },
      queryParam: {},
      publishVisible: false,
      columns: [
        {
          title: '券编号',
          dataIndex: 'user_coupon_numb'
        },
        {
          title: '使用状态',
          dataIndex: 'c_status_name'
        },
        {
          title: '领取用户',
          dataIndex: 'nickname',
          customRender: (text, row) => {
            return (
              <a
                class="two-Multi"
                href={`/zht/user/user/getUserList?uid=${row.uid}`}
                target="_blank"
              >
                {text}
              </a>
            )
          }
        },
        {
          title: '姓名/手机号',
          dataIndex: 'realname',
          customRender: (text, row) => {
            return (
              <div>
                <div>{text}</div>
                <div>{row.mobile}</div>
              </div>
            )
          }
        },
        {
          title: '支付金额',
          dataIndex: 'pay_money'
        },
        {
          title: '支付订单',
          dataIndex: 'pay_order_numb',
          customRender: (text, row) => {
            const aDom = (
              <a
                class="two-Multi"
                href={`/zht/life/orderProject/getOrderProjectList?project_id=${row.order_project_id}`}
                target="_blank"
              >
                {text}
              </a>
            )
            return text ? aDom : '--'
          }
        },
        {
          title: '领取时间',
          dataIndex: 'ptime',
          sorter: true
        },
        {
          title: '使用/过期时间',
          dataIndex: 'sygq_time'
        },
        {
          title: '券核销人',
          dataIndex: 'shops_realname',
          customRender: (text, row) => {
            return (
              <div>
                <div>{text}</div>
                <div>{row.shops_mobile}</div>
              </div>
            )
          }
        }
      ],
      loadData: parameter => {
        const sortText = {
          ascend: 'asc',
          descend: 'desc'
        }
        const params = clonedeep(this.queryParam)
        params.sort_field = parameter.sortField
        params.sort_type = sortText[parameter.sortOrder]
        const time = params.time
        if (time && time.length) {
          params.ctime_start_time = time[0]
          params.ctime_end_time = time[1]
        }
        return getUserCouponList(
          Object.assign(parameter, params, {
            shops_coupon_id: this.id
          })
        )
      }
    }
  },
  computed: {
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
      return stepArr.map((obj, index) => ({
        ...this.info.log_data[index],
        title: obj
      }))
    },
    stepCurrent () {
      const len = this.info.log_data.length
      return len ? len - 1 : 0
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

.table-page-search-wrapper
  /deep/
  .ant-form-inline
  .ant-form-item
  > .ant-form-item-label {
  min-width: 80px;
  flex-shrink: 0;
}
</style>
