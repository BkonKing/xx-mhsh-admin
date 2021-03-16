<template>
  <div>
    <a-card class="search-card" :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-model-item label="上映阶段">
                <a-select v-model="queryParam.show" placeholder="请选择" default-value="0">
                  <!-- <a-select-option value="0">全部</a-select-option> -->
                  <a-select-option value="1">热映影片</a-select-option>
                  <a-select-option value="2">待映影片</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-model-item label="是否预售">
                <a-select v-model="queryParam.saleflag" placeholder="请选择">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="搜索">
                  <a-input v-model="queryParam.search" placeholder="影片ID/名称" style="width: 100%" />
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="上映时间" prop="releaseDate">
                  <a-range-picker
                    showTime
                    class="piker-time"
                    :placeholder="['开始时间', '结束时间']"
                    format="YYYY-MM-DD"
                    @change="getTime"
                  />
                </a-form-model-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 16" :sm="24">
              <span class="table-page-search-submitButtons" style="float: right; overflow: hidden">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        class="table-box"
        :columns="columns"
        :data="loadTableData"
      >
        <span slot="look">实际想看
          <a-popover overlayClassName="popover-toast">
            <template slot="content">
              APP用户的想看
            </template>
            <a-icon type="exclamation-circle" />
          </a-popover>
        </span>
        <span slot="sellNum">已售票数
          <a-popover overlayClassName="popover-toast">
            <template slot="content">
              已购买成功的座位票张数
            </template>
            <a-icon type="exclamation-circle" />
          </a-popover>
        </span>
        <template
          slot="hot"
          slot-scope="is_shown">
          {{ is_shown == 1 ? '热映' : '待映' }}
        </template>
        <template
          slot="tickets_sold"
          slot-scope="tickets_sold, record">
          <a v-if="tickets_sold > 0" :href="'/zht/film/film/orderlist?tabIndex=1&film_name='+encodeURI(record.film_name)" target="_parent">{{ tickets_sold }}</a>
          <span v-else>{{ tickets_sold }}</span>
          <!-- <a @click="goOrder(record)">{{ tickets_sold }}</a> -->
        </template>
        <template
          slot="ticket_price"
          slot-scope="ticket_price">
          ￥{{ ticket_price }}
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="goDetail(record.film_id, record.film_code)">查看</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getFilmList } from '@/api/movie'
const columns = [
  {
    title: '影片ID',
    dataIndex: 'film_id'
  },
  {
    title: '影片',
    dataIndex: 'film_name'
  },
  {
    title: '上映阶段',
    dataIndex: 'is_shown',
    scopedSlots: { customRender: 'hot' }
  },
  {
    title: '评分',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score
  },
  {
    dataIndex: 'actual_account',
    key: 'actual_account',
    slots: { title: 'look' },
    sorter: (a, b) => a.actual_account - b.actual_account
  },
  {
    title: '想看',
    dataIndex: 'want_view',
    sorter: (a, b) => a.want_view - b.want_view
  },
  {
    dataIndex: 'tickets_sold',
    slots: { title: 'sellNum' },
    scopedSlots: { customRender: 'tickets_sold' },
    sorter: (a, b) => a.tickets_sold - b.tickets_sold
  },
  {
    title: '最低售价',
    dataIndex: 'ticket_price',
    scopedSlots: { customRender: 'ticket_price' },
    sorter: (a, b) => a.ticket_price - b.ticket_price
  },
  {
    title: '上映时间',
    dataIndex: 'publish_date',
    sorter: (a, b) => moment(a.publish_date).valueOf() - moment(b.publish_date).valueOf()
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'film',
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      tabList: [
        { key: '0', tab: '全部' },
        { key: '1', tab: '已成功' },
        { key: '2', tab: '已取消' }
      ],
      productList: [
        { id: 0, name: '请选择' },
        { id: 1, name: '全部' },
        { id: 2, name: '已成功' }
      ],
      statusList: [
        { id: 0, name: '请选择' },
        { id: 1, name: '全部' },
        { id: 2, name: '取消付款' }
      ],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {}
    }
  },
  methods: {
    getTime (dates, dateStrings) {
      console.log(dates, dateStrings)
      this.queryParam.publish_date = dateStrings[0] + '~' + dateStrings[1]
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSubmit () {},
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder && page.sortField) {
        if (page.sortField == 'score' && page.sortOrder == 'ascend') {
          // 升序
        } else {
          // 降序
        }
        if (page.sortField == 'actual_account' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'want_view' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'tickets_sold' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'ticket_price' && page.sortOrder == 'ascend') {
        } else {}
        if (page.sortField == 'publish_date' && page.sortOrder == 'ascend') {
        } else {}
      }
      const requestParameters = Object.assign({}, this.queryParam, page)
        console.log('loadData request parameters:', requestParameters)
        return getFilmList(requestParameters)
          .then(res => {
            console.log(res.data)
            return res
          })
    },
    goDetail (id, filmCode) {
      this.$router.push({
        path: '/movie/filmDetail',
        query: {
          film_id: id,
          film_code: filmCode
        }
      })
    },
    goOrder (item) {
      this.$router.push({
        path: '/movie/order',
        query: {
          tabIndex: '1',
          film_name: item.film_name
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  /deep/ .ant-form-item-label {
    min-width: 88px;
  }
  .piker-time {
    width: 100% !important;
  }
}
.ant-card {
  margin-bottom: 24px;
}
</style>
