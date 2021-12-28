<template>
  <div class="appUser">
    <page-header :routes="routes"></page-header>
    <div style="padding: 24px;">
      <a-card class="search-card" :bordered="false">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="楼栋">
                  <a-select
                    v-model="queryParam.building_id"
                    placeholder="请选择"
                    @change="handleBuildChange"
                  >
                    <a-select-option
                      v-for="item in buildOptions"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.building_name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="单元">
                  <a-select v-model="queryParam.unit_id" placeholder="请选择">
                    <a-select-option
                      v-for="item in unitOptions"
                      :key="item.id"
                      :value="item.id"
                      >{{ item.unit_name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户类型">
                  <a-select
                    v-model="queryParam.house_role"
                    :options="userTypeOptions"
                    placeholder="请选择"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户">
                  <a-input
                    v-model="queryParam.sSearch"
                    placeholder="ID、昵称、姓名、手机号"
                  ></a-input>
                </a-form-item>
              </a-col>
              <!-- <a-col :md="8" :sm="24">
                  <a-form-item label="注册时间">
                    <a-range-picker
                      v-model="queryParam.service_time"
                      valueFormat="YYYY-MM-DD HH:mm:ss"
                      :show-time="{ defaultValue: [defaultTime, defaultTime] }"
                      :placeholder="['开始时间', '结束时间']"
                      style="width: 100%;"
                    />
                  </a-form-item>
                </a-col> -->
              <!-- <a-col :md="8" :sm="24">
                  <a-form-item label="是否员工">
                    <a-select v-model="queryParam.build_id1" placeholder="请选择">
                      <a-select-option value="1">是</a-select-option>
                      <a-select-option value="0">否</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col> -->
              <advanced-form
                v-model="advanced"
                :md="16"
                :is-advanced="false"
                @reset="resetTable"
                @search="$refs.table.refresh(true)"
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
          <template slot="userInfo" slot-scope="text, record">
            <template v-if="text || record.mobile">
              <div>{{ text }}</div>
              <div>{{ record.mobile }}</div>
            </template>
            <template v-else>无</template>
          </template>
          <div slot="avatar" slot-scope="text">
            <a-avatar v-if="text" :size="40" :src="text" />
          </div>
          <span class="table-action" slot="action" slot-scope="text, record">
            <a style="margin-right: 10px;" @click="check(record)">查看</a>
          </span>
        </s-table>
      </a-card>
    </div>
    <chekcDrawer ref="chekcDrawer" :uid="activeUid"></chekcDrawer>
  </div>
</template>

<script>
import { STable, AdvancedForm, PageHeader } from '@/components'
import chekcDrawer from './checkDrawer'
import cloneDeep from 'lodash.clonedeep'
import moment from 'moment'
import { getMemberList, getBuilding, getUnit } from '@/api/userManage'

export default {
  components: {
    chekcDrawer,
    STable,
    AdvancedForm,
    PageHeader
  },
  data () {
    return {
      defaultTime: moment('00:00:00', 'HH:mm:ss'),
      defaultEndTime: moment('23:59:59', 'HH:mm:ss'),
      routes: [
        {
          breadcrumbName: '用户管理'
        },
        {
          breadcrumbName: '成员管理'
        }
      ],
      advanced: false,
      queryParam: {},
      buildOptions: [],
      unitOptions: [],
      userTypeOptions: [
        {
          value: '1',
          label: '业主'
        },
        {
          value: '2',
          label: '业主成员'
        },
        {
          value: '3',
          label: '租户'
        },
        {
          value: '4',
          label: '租户成员'
        }
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '类型',
          dataIndex: 'house_role'
        },
        {
          title: '房产',
          dataIndex: 'building_name',
          customRender: (text, row) => {
            return `${text} - ${row.unit_name} - ${row.house_name}`
          }
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          scopedSlots: { customRender: 'avatar' }
        },
        {
          title: '昵称',
          dataIndex: 'nickname'
        },
        {
          title: '姓名/手机号',
          dataIndex: 'realname',
          scopedSlots: { customRender: 'userInfo' }
        },
        {
          title: '绑定时间',
          dataIndex: 'btime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 80
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const params = cloneDeep(this.queryParam)
        return getMemberList(Object.assign(parameter, params))
      },
      activeUid: ''
    }
  },
  computed: {},
  created () {
    this.getBuilding()
  },
  mounted () {
    const uid = this.$route.query.uid
    const isShop = this.$route.query.isShop
    if (uid) {
      this.check({ uid, lastPageShop: isShop })
    }
  },
  methods: {
    moment,
    getBuilding () {
      getBuilding().then(({ data }) => {
        this.buildOptions = data || []
      })
    },
    handleBuildChange () {
      this.$set(this.queryParam, 'unit_id', undefined)
      this.getUnit()
    },
    getUnit () {
      getUnit({
        building_id: this.queryParam.building_id
      }).then(({ data }) => {
        this.unitOptions = data || []
      })
    },
    // 查看
    check ({ uid, lastPageShop }) {
      this.activeUid = uid
      this.$refs.chekcDrawer.isShow = true
      if (lastPageShop) {
        this.$nextTick(() => {
          this.$refs.chekcDrawer.currentIndex = 2
        })
      }
    },
    resetTable () {
      this.queryParam = {}
      this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  /deep/ .ant-form-inline .ant-form-item > .ant-form-item-label {
    min-width: 80px;
    flex-shrink: 0;
  }
}
.form-item-text {
  /deep/ .ant-form-item-control,
  /deep/ .ant-form-item-label {
    line-height: 24px;
  }
}
.appUser {
  .avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
}
/deep/ .ant-table-tbody .tag {
  margin-bottom: 5px;
}
</style>
