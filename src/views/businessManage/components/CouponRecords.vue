<template>
  <div>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select
                  v-model="queryParam.c_status"
                  :options="useStatus"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="券名称">
                <a-input
                  v-model="queryParam.coupon_name"
                  placeholder="请输入"
                ></a-input>
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
              <a-form-item label="领取用户">
                <a-input
                  v-model="queryParam.user_text"
                  placeholder="ID、昵称、姓名、手机号"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="领取方式">
                <a-select
                  v-model="queryParam.couopn_mode"
                  :options="pickupTypes"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="支付订单">
                  <a-input
                    v-model="queryParam.order_numb"
                    placeholder="请输入"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="券核销人">
                  <a-input
                    v-model="queryParam.shops_user_text"
                    placeholder="手机号、姓名、昵称、ID"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="所属商户">
                  <a-select
                    v-model="queryParam.shops_id"
                    placeholder="请选择"
                  >
                    <a-select-option
                      v-for="item in shopList"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.shops_name || '暂无名称' }}</a-select-option
                    >
                  </a-select>
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
              <a-col :md="8" :sm="24">
                <a-form-item label="使用/过期">
                  <a-range-picker
                    v-model="queryParam.useTime"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :show-time="{ defaultValue: [defaultTime, defaultEndTime] }"
                    :placeholder="['开始时间', '结束时间']"
                    style="width: 100%;"
                  />
                </a-form-item>
              </a-col>
            </template>
            <advanced-form
              v-model="advanced"
              :md="16"
              @reset="resetTable"
              @search="refreshTable(true)"
            ></advanced-form>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
      >
      </s-table>
    </a-card>
  </div>
</template>

<script>
// /store/list
import { mapGetters } from 'vuex'
import { STable, AdvancedForm } from '@/components'
import CouponRecords from '../mixins/CouponRecords'
import clonedeep from 'lodash.clonedeep'
import { getUserCouponList, getShopOptions } from '@/api/userManage/business'

export default {
  name: 'CouponRecords',
  mixins: [CouponRecords],
  components: {
    STable,
    AdvancedForm
  },
  data () {
    return {
      shopList: [],
      columns: [
        {
          title: '券名称',
          dataIndex: 'shops_coupon_name',
          customRender: (text, row) => {
            return (
              <a
                class="two-Multi"
                href={`${this.baseUrl}/user/shop/detail?id=${row.shops_coupon_id}`}
                target="_blank"
              >
                {text}
              </a>
            )
          }
        },
        {
          title: '券编号',
          dataIndex: 'user_coupon_numb'
        },
        {
          title: '使用状态',
          dataIndex: 'c_status_name'
        },
        {
          title: '领取方式',
          dataIndex: 'couopn_mode_name'
        },
        {
          title: '领取用户',
          dataIndex: 'nickname',
          customRender: (text, row) => {
            return (
              <a
                class="two-Multi"
                href={`${this.userUrl}?uid=${row.uid}`}
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
              <a href={`${this.userUrl}?uid=${row.shops_uid}`}
                target="_blank">
                <div>{text}</div>
                <div>{row.shops_mobile}</div>
              </a>
            )
          }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
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
        const useTime = params.useTime
        if (useTime && useTime.length) {
          params.start_time = useTime[0]
          params.end_time = useTime[1]
        }
        return getUserCouponList(Object.assign(parameter, params))
      }
    }
  },
  computed: {
    ...mapGetters(['projectId', 'isParentProject']),
    baseUrl () {
      return this.isParentProject ? '/zht' : '/xmht'
    },
    userUrl () {
      return this.isParentProject ? '/zht/user/user/getUserList' : '/xmht/household/member/getMemberList'
    }
  },
  created () {
    this.getShopList()
  },
  methods: {
    async getShopList () {
      const { data } = await getShopOptions({
        project_id: this.projectId
      })
      this.shopList = data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
