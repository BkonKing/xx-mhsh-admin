<template>
  <div>
    <a-card :bordered="false" title="状态">
      <a-row>
        <a-col :span="14" :push="5" >
          <a-steps direction="horizontal" :current="1" progressDot>
            <a-step>
              <template v-slot:title>
                <span>创建时间</span>
              </template>
              <template v-slot:description>
                <div class="antd-pro-pages-profile-advanced-style-stepDescription">
                  {{ dataInfo.ctime }}
                </div>
              </template>
            </a-step>
            <a-step>
              <template v-slot:title>
                <span>{{ dataInfo.is_shown == 1 ? '热映' : '待映' }}</span>
              </template>
              <template v-slot:description>
                <div class="antd-pro-pages-profile-advanced-style-stepDescription">
                  {{ dataInfo.publish_date }}
                </div>
              </template>
            </a-step>
          </a-steps>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" title="基础信息">
      <a-row>
        <a-col :span="16">
            <a-descriptions :column="2">
              <a-descriptions-item label="影片ID">{{ dataInfo.film_id }}</a-descriptions-item>
              <a-descriptions-item label="上映阶段">{{ dataInfo.is_shown == 1 ? '热映' : '待映' }}影片</a-descriptions-item>
              <a-descriptions-item label="影片">{{ dataInfo.film_name }}</a-descriptions-item>
              <a-descriptions-item label="是否预售">{{ dataInfo.pre_saleflag == 1 ? '是' : '否' }}</a-descriptions-item>
              <a-descriptions-item label="类型">{{ dataInfo.type }}</a-descriptions-item>
              <a-descriptions-item label="上映时间">{{ dataInfo.publish_date }}</a-descriptions-item>
              <a-descriptions-item label="制式">￥{{ dataInfo.version }}</a-descriptions-item>
              <a-descriptions-item label="归属地区">￥{{ dataInfo.area }}</a-descriptions-item>
              <a-descriptions-item label="时长">{{ dataInfo.duration }}</a-descriptions-item>
              <a-descriptions-item v-if="dataInfo.ticket_price" label="最低售价">￥{{ dataInfo.ticket_price }}</a-descriptions-item>
              <a-descriptions-item label="评分">{{ dataInfo.score }}</a-descriptions-item>
              <a-descriptions-item label="已售票数"><a v-if="dataInfo.tickets_sold>0" :href="'/zht/film/film/orderlist?tabIndex=1&film_name='+encodeURI(dataInfo.film_name)" target="_parent">{{ dataInfo.tickets_sold }}</a><span v-else>{{ dataInfo.tickets_sold }}</span></a-descriptions-item>
              <a-descriptions-item label="想看">{{ dataInfo.want_view }}</a-descriptions-item>
            </a-descriptions>
        </a-col>
        <a-col :span="8">
          <img :src="dataInfo.cover" alt="" width="185px" height="250px">
        </a-col>
      </a-row>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions v-if="dataInfo.director" :column="1">
        <a-descriptions-item label="导演">({{ dataInfo.director.count }}位) {{ dataInfo.director.info }}</a-descriptions-item>
        <a-descriptions-item v-if="dataInfo.cast_type == 0" label="主演">({{ dataInfo.to_star.count }}位) {{ dataInfo.to_star.info }}</a-descriptions-item>
        <a-descriptions-item v-else label="配音">({{ dataInfo.to_star.count }}位) {{ dataInfo.to_star.info }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions :column="1">
        <a-descriptions-item label="影片描述">{{ dataInfo.introduction }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :tabList="weekTabList"
      :activeTabKey="weekActiveTabKey"
      @tabChange="tabSelect"
      :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-model-item label="地区">
                  <a-cascader
                  :changeOnSelect="true"
                  :options="options"
                  v-model="areaCodeL"
                  placeholder="Please select"
                  @popupVisibleChange="getAara"
                  @change="onChange" />
                  <!-- <a-select v-model="queryParam.product" placeholder="请选择" default-value="0">
                    <a-select-option v-for="item in productList" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select> -->
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="影厅">
                  <a-select v-model="queryParam.hall_no" placeholder="请选择">
                    <a-select-option v-for="item in screensList" :key="item.text" :value="item.text">
                      {{ item.value }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-model-item label="搜索">
                  <a-input v-model="queryParam.search" placeholder="影城" style="width: 100%" />
                </a-form-model-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 24 || 24" :sm="24">
              <span class="table-page-search-submitButtons" style="float: right; overflow: hidden">
                <a-button type="primary" @click="loadAllData">查询</a-button>
                <a-button style="margin-left: 8px" @click="reSet">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data-source="tableData"
        showPagination="auto"
      >
        <template
          slot="filmCity"
          slot-scope="text, record">
          {{ record.cinema_name }}<br />
          <span class="color-00025">{{ record.address }}</span>
        </template>
        <template
          slot="hall"
          slot-scope="hall">
          <span v-for="(item, index) in hall" :key="index">{{item.hall_name}}{{index < hall.length-1 ? ',' : ''}}</span>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getFilmDetail, getFilmDetail2, getFilmScheduling, getSchedulingDate, getScreensList } from '@/api/movie'
import { cityOpction } from '@/const/city'

const columns = [
  {
    title: '影城',
    dataIndex: 'cinema_name',
    scopedSlots: { customRender: 'filmCity' }
  },
  {
    title: '影厅',
    dataIndex: 'hall',
    scopedSlots: { customRender: 'hall' }
  },
  {
    title: '最低售价',
    dataIndex: 'ticket_price',
    sorter: (a, b) => a.ticket_price - b.ticket_price
  }
]
export default {
  name: 'filmDetail',
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      tableData: [],
      paydetailShow: false,
      weekTabList: [],
      weekDateList: [],
      weekActiveTabKey: '0',
      screensList: [],
      film_id: '', // 影片id
      film_code: '', // 影片编码
      areaCodeL: ['35', '350100', ''],
      dataInfo: '',
      options: cityOpction,
      // 高级搜索 展开/关闭
      advanced: true,
      // 查询参数
      queryParam: {}
    }
  },
  created () {
    this.film_id = this.$route.query.film_id
    this.film_code = this.$route.query.film_code
    this.getData()
    console.log(cityOpction)
  },
  methods: {
    getData () {
      if (this.film_id) {
        getFilmDetail({ film_id: this.film_id }).then(res => {
          this.dataInfo = res.data
          this.getScreens()
        })
      } else {
        getFilmDetail2({ film_no: this.film_code }).then(res => {
          this.dataInfo = res.data
          this.getScreens()
        })
      }
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    reSet () {
      this.areaCodeL = ['35', '350100']
      this.queryParam = {}
    },
    // 排期
    getScheduling () {
      getFilmScheduling()
    },
    // 影厅
    getScreens () {
      const that = this
      const param = {
        id: this.areaCodeL[2] ? this.areaCodeL[2] : this.areaCodeL[1],
        type: this.areaCodeL[2] ? 2 : 1
      }
      getSchedulingDate({ film_no: this.film_code }).then(res => {
        let tabObj = { key: '', tab: '' }
        const tabArr = []
        that.weekDateList = res.data.list
        res.data.list.map((item, index) => {
          tabObj = { key: '', tab: '' }
          tabObj.key = index + ''
          tabObj.tab = item.date + ' ' + item.week
          tabArr.push(tabObj)
        })
        that.weekTabList = tabArr
        that.loadTableData()
      })
      getScreensList(param).then(res => {
        this.screensList = res.data
      })
    },
    tabSelect (key) {
      // this.queryParam = {}
      this.weekActiveTabKey = key
      this.loadAllData()
    },
    onChange (value, selectedOptions) {
      console.log(value.length, this.areaCodeL)
    },
    getAara (cascaderType) {
      if (!cascaderType) {
        this.queryParam = {}
        this.getScreens()
      }
    },
    // 刷新表格数据
    loadAllData () {
      this.loadTableData()
      // this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData () {
      // console.log('page', this.weekTabList)
      if (this.weekTabList.length == 0) {
        return ''
      }
      // const param = this.form
      // return getRefundList(param)
      // const aa = this.$nextTick(() => {
        const param = {
          date: this.weekDateList[this.weekActiveTabKey].year_date,
          film_no: this.film_code,
          city_id: this.areaCodeL[1],
          county_id: this.areaCodeL[2]
        }
        const requestParameters = Object.assign(param, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getFilmScheduling(requestParameters)
          .then(res => {
            // const list = res.data.list
            // const listArr = []
            // for (const key in res.data.list) {
            //   listArr.push(res.data.list[key])
            // }
            // res.data.total = 1
            // res.data.list = listArr[0]
            // console.log(res)
            this.tableData = res.data.list
            console.log('this.tableData', this.tableData)
          })
      // })
      // console.log('a', aa)
    }
  },
  filters: {
    statusTypeFilter (type) {
      const statusTypeMap = {
        agree: 'success',
        reject: 'error'
      }
      return statusTypeMap[type]
    }
  }
}
</script>

<style less lang="less">
</style>
