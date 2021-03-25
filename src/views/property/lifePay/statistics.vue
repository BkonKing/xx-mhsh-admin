<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="ant-pro-page-header-wrap-detail">
        <div class="ant-pro-page-header-wrap-main">
          <div class="ant-pro-page-header-wrap-row">
            <div class="ant-pro-page-header-wrap-content">
              <span class="margin-left-large">账单月份：</span>
              <div>
                <a-select size="small" :dropdownMatchSelectWidth="false" v-model="monthKey" @change="getData">
                  <a-select-option v-for="item in monthList" :key="item.id">{{ item.setmeal_days }}</a-select-option>
                  <!-- <a-select-option :key="2">2021-02</a-select-option> -->
                </a-select>
              </div>
              <span class="margin-left-large">缴费类型：</span>
              <div>
                <a-select size="small" :dropdownMatchSelectWidth="false" v-model="payType" @change="getData">
                  <a-select-option v-for="item in payList" :key="item.genre_id">{{ item.genre_name }}</a-select-option>
                  <!-- <a-select-option :key="0">全部</a-select-option>
                  <a-select-option :key="1">水费</a-select-option> -->
                </a-select>
              </div>
              <span class="margin-left-large">缴费楼栋：</span>
              <div @click="selectHouse">{{ checkedList.length ? checkedList.length+'栋' : '全部' }} <a-icon type="down" style="color: rgba(0, 0, 0, 0.25);font-size: 12px" />
                <!-- <a-select size="small" v-model="payType" >
                  <a-select-option :key="0">全部</a-select-option>
                </a-select> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div>
      <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="应缴费" :total="'￥'+totalData.payable_money | NumberFormat">
            <div>
              <trend :flag="totalData.payable_qoq>0 ? 'up' : 'down'" style="margin-right: 16px;">
                <span slot="term">月环比</span>
                {{ totalData.payable_qoq }}%
              </trend>
            </div>
            <template slot="footer">户数<span>{{ totalData.payable_count }}</span></template>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="已缴费" :total="'￥' + totalData.paid_money | NumberFormat">
            <div>
              <trend :flag="totalData.paid_qoq>0 ? 'up' : 'down'" style="margin-right: 16px;">
                <span slot="term">月环比</span>
                {{ totalData.paid_qoq }}%
              </trend>
            </div>
            <template slot="footer">户数<span>{{totalData.paid_count}}</span></template>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="应缴费" :total="'￥' + totalData.unpaid_money | NumberFormat">
            <div>
              <trend :flag="totalData.unpaid_qoq>0 ? 'up' : 'down'" style="margin-right: 16px;">
                <span slot="term">月环比</span>
                {{ totalData.unpaid_qoq }}%
              </trend>
            </div>
            <template slot="footer">户数<span>{{ totalData.unpaid_count }}</span></template>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <chart-card :loading="loading" title="缴费率" :total="totalData.contributionRate+'%'">
            <a-tooltip title="缴费率=已缴费户数/应缴费户数" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <mini-progress color="rgb(19, 194, 194)" :target="100" :percentage="totalData.contributionRate" height="8px" />
            </div>
            <template slot="footer">
              <trend :flag="totalData.contributionRate_qoq>0 ? 'up' : 'down'">
                <span slot="term">月环比</span>
                {{ totalData.contributionRate_qoq }}%
              </trend>
            </template>
          </chart-card>
        </a-col>
      </a-row>
      <a-card class="p-t-0" :bordered="false" :style="{ marginBottom: '24px' }">
        <div class="summary-wrapper summary-wrapper-data-link">
          <div class="summary-container">
            <a-tabs class="summary data-link" v-model="lineActive" @change="lineChange">
              <a-tab-pane v-for="(item, index) in summaryList" :key="index">
                <div class="flex" slot="tab">
                  <div class="summary-item">
                    <div>{{ item.type }}</div>
                    <div>{{ item.text }}</div>
                    <div>{{ item.value }}%</div>
                  </div>
                  <v-chart
                  style="padding-top: 16px"
                    :forceFit="true"
                    width="90"
                    height="90"
                    :data="[item]"
                    padding="auto"
                  >
                    <v-tooltip></v-tooltip>
                    <v-facet
                        type="rect"
                        :fields="['type']"
                        :padding="0"
                        :showTitle="false"
                        :eachView="eachView"
                      />
                  </v-chart>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <a-line
          class="page-line"
          ref="aline"
          color="typename"
          position="name*value"
          :showLegend="true"
          :height="300"
          :data="lineData"
          :padding="[25, 30, 70]"
        ></a-line>
      </a-card>
      <a-row :gutter="24" class="row-block">
        <a-col :sm="12" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
          <a-card v-if="shoudPayData != ''" :bordered="false" title="应缴费">
            <a-pie :data="shoudPayData" :pieGuide="shoudPieGuide"></a-pie>
          </a-card>
        </a-col>
        <a-col :sm="12" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
          <a-card v-if="alreadyPayData" :bordered="false" title="已缴费">
            <div slot="extra" class="extra-wrapper">
              <a-range-picker :value="defultTime" @change="getTime" :ranges="ranges" :style="{width: '256px'}" />
            </div>
            <div class="analysis-salesTypeRadio">
              <a-radio-group defaultValue="0" v-model="alreadyPayType" @change="payChange">
                <a-radio-button value="0">全部方式</a-radio-button>
                <a-radio-button value="1">线上缴费</a-radio-button>
                <a-radio-button value="2">线下缴费</a-radio-button>
              </a-radio-group>
            </div>
            <a-pie :data="alreadyPayData" :pieGuide="alreadyPieGuide" :padding="[18, 400, 50, 0]" :height="368"></a-pie>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="row-block">
        <a-col :sm="12" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
          <a-card v-if="noPayData" :bordered="false" title="未缴费">
            <div slot="extra" class="extra-wrapper">
              <a-range-picker :value="defultTime" @change="getTime" :ranges="ranges" :style="{width: '256px'}" />
            </div>
            <a-pie :data="noPayData" :pieGuide="noPieGuide"></a-pie>
          </a-card>
        </a-col>
        <a-col :sm="12" :md="12" :xl="12">
          <a-card :loading="loading" :bordered="false" title="未缴费情况" :style="{ height: '100%' }">
            <a-row :gutter="68">
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">
                <div class="ant-pro-number-info">
                  <span>
                    <span>未缴费金额</span>
                  </span>
                  <div class="number-info-value">
                    <span style="font-size: 26px"> ￥{{ noMoney | NumberFormat}}</span>
                  </div>
                </div>
              </a-col>
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">
                <div class="ant-pro-number-info">
                  <span>
                    <span>未缴费户数</span>
                  </span>
                  <div class="number-info-value">
                    <span style="font-size: 26px"> {{ noCount}}</span>
                  </div>
                </div>
              </a-col>
            </a-row>
            <div class="ant-table-wrapper">
              <s-table
                ref="table"
                size="small"
                rowKey="expenses_house_id"
                class="table-box"
                :columns="columns"
                :pageInfo="pageInfo"
                :data="loadTableData"
              >
                <span slot="number" slot-scope="text, record, index">
                  {{ index + 1 }}
                </span>
                <span slot="money">欠费金额
                  <a-popover overlayClassName="popover-toast">
                    <template slot="content">
                      所有费用类型的欠费金额总和
                    </template>
                    <a-icon type="exclamation-circle" />
                  </a-popover>
                </span>
                <span slot="days">欠费天数
                  <a-popover overlayClassName="popover-toast">
                    <template slot="content">
                      所有费用类型的欠费天数总和
                    </template>
                    <a-icon type="exclamation-circle" />
                  </a-popover>
                </span>
              </s-table>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-modal
      title="缴费楼栋"
      width="800px"
      :visible="jfldShow"
      @ok="getData"
      @cancel="jfldShow = false"
    >
      <a-form layout="inline">
        <a-form-model-item label="楼栋名称">
          <a-input placeholder="请输入" v-model="searchHouse" style="width: 100%" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getHouseList">查 询</a-button>
        </a-form-model-item>
      </a-form>
      <div>
        <div style="margin-bottom: 10px">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            全选
          </a-checkbox>
        </div>
        <a-checkbox-group v-model="checkedList" @change="onChange">
          <a-checkbox v-for="(item, index) in houseList" :key="index" :value="item.id">{{item.building_name}}</a-checkbox>
        </a-checkbox-group>
        <!-- <a-checkbox-group v-model="checkedList" :options="houseList" @change="onChange" /> -->
      </div>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import {
  STable,
  ChartCard,
  MiniProgress,
  aLine,
  aPie,
  Trend
} from '@/components'
// import { getFilmList } from '@/api/movie'
import { getSelectList, getHouseList, getTotalData, getTabPie, getLineData, getShoudPay, getAlreadyPay, getNoPay, getNoPaySituation } from '@/api/property'
import moment from 'moment'
const columns = [
  {
    title: '排名',
    scopedSlots: { customRender: 'number' }
  },
  {
    title: '房产',
    dataIndex: 'house_property_name'
  },
  {
    dataIndex: 'z_money',
    slots: { title: 'money' },
    sorter: true
  },
  {
    dataIndex: 'day_num',
    slots: { title: 'days' },
    sorter: true
  }
]

// 未缴费情况
const DataSet = require('@antv/data-set')

// 圆环-百分比
const eachView = function (view, facet) {
  var data = facet.data
  // console.log('facet.data', facet.data)
  var color = '#0a9afe'
  data.push({
    type: '其他',
    value: 100 - data[0].value
  })
  view.source(data)
  view.coord('theta', {
    radius: 0.8,
    innerRadius: 0.7
  })
  view.intervalStack().position('value').color('type', [color, '#eceef1']).opacity(1)
}
export default {
  name: 'statistics',
  components: {
    STable,
    ChartCard,
    MiniProgress,
    aLine,
    aPie,
    Trend
  },
  data () {
    this.columns = columns
    return {
      jfldShow: false, // 缴费楼栋弹窗
      indeterminate: false,
      checkAll: false,

      params: {},
      monthKey: '', // 账单月份
      monthList: [], // 月份列表
      payType: 0, // 缴费类型
      payType2: 0, // 缴费类型-折线图
      payList: [], // 缴费类型列表
      houseList: [], // 楼栋列表
      checkedList: [], // 选中的楼栋id合集
      searchHouse: '', // 楼栋搜索
      totalData: '',
      loading: false,
      // 圆环
      defultTime: ['', ''],
      startTime: '',
      endTime: '',
      alreadyPayType: '0',
      shoudPayData: '', // 应缴费
      shoudPieGuide: '',
      alreadyPayData: '', // 已缴费
      alreadyPieGuide: '',
      noPayData: '', // 未缴费
      noPieGuide: '',
      noMoney: '', // 未缴费金额
      noCount: 0, // 未缴费户数
      data: [],
      padding: [50, 400, 50, 0],
      offset: [15, 0],
      scale: [
          {
              dataKey: 'percent',
              formatter: function formatter (val) {
                  val = (val * 100).toFixed(2) + '%'
                  return val
              },
              nice: false
          }
      ],
      filter: {
          dataKey: 'payType',
          callback: function (val) {
              return val !== 'UK'
          }
      },
      containerTplTooltip: `<div class="g2-tooltip"><ul class="g2-tooltip-list"></ul></div>`,
      itemTplTooltip: '<li data-index={index}><span style="color:{color}">{name}:</span>{value}</li>',
      containerTplLegend: `<div class="g2-legend" style="top: 0;bottom: 0;display: flex;align-items: center;"> <table class="g2-legend-list"></table> </div>`,
      color: [
          'payType',
          ['#67b7dc', '#84b761', '#fdd400', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f']
      ],
      style: {
          lineWidth: 2,
          stroke: '#fff'
      },
      // 折线
      // 页面分析tooltip自定义显示内容
      // pageContent (title, items) {
      //   return setToolTipTable({
      //     title: [title, '访问次数', '占比'],
      //     items,
      //     key: 'edis',
      //     suffix: '%'
      //   })
      // },
      lineData: [],
      lineActive: 0,
      summaryList: [

      ],
      eachView,
      ranges: { 今天: [this.moment(), this.moment()], 昨天: [this.moment().subtract('days', 1), this.moment().subtract('days', 1)], 最近7天: [this.moment().subtract('days', 6), this.moment()], 最近30天: [this.moment().subtract('days', 29), this.moment()], 本月: [this.moment().startOf('month'), this.moment().endOf('month')], 今年: [this.moment().startOf('year'), this.moment().endOf('year')] },
      pageInfo: {
        defaultPageSize: 5,
        pageSizeOptions: ['5', '10', '20', '30']
      }
    }
  },
  mounted () {
    this.getSelectList()
  },
  methods: {
    moment,
    getData () {
      this.params = {
        month_id: this.monthKey,
        genre_id: this.payType,
        expenses_house_ids: this.checkedList.join(',')
      }
      this.getTotalData()
      this.getTabPie()
      this.getShoudPay()
      this.getAlreadyPay()
      this.getNoPay()
      this.loadAllData()
      this.jfldShow = false
    },
    // 时间
    getTime (dates, dateStrings) {
      console.log(dates, dateStrings)
      this.defultTime = dates
      this.startTime = dateStrings[0]
      this.endTime = dateStrings[1]
      // this.getShoudPay()
      this.getAlreadyPay()
      this.getNoPay()
      // this.getNoPaySituation()
    },
    // 下拉筛选数据
    getSelectList () {
      getSelectList().then(res => {
        this.monthList = res.month_list
        this.defultTime = [res.month_list[0].sss_time, res.month_list[0].eee_time]
        this.startTime = res.month_list[0].sss_time
        this.endTime = res.month_list[0].eee_time
        this.monthKey = res.month_list[0].id
        this.payList = res.project_genre_list
        this.payType = res.project_genre_list[0].genre_id
        this.getData()
      })
    },
    // 楼栋
    getHouseList () {
      getHouseList({ building_name: this.searchHouse }).then(res => {
        this.houseList = res.list
      })
    },
    // 应缴费、已缴费、未交费、缴费率
    getTotalData () {
      getTotalData(this.params).then(res => {
        this.totalData = res.tab_data
      })
    },
    // 各个类型缴费率
    getTabPie () {
      getTabPie(this.params).then(res => {
        this.summaryList = res.data.map(item => {
          return {
            type: item.genre_name,
            value: item.contributionRate,
            id: item.genre_id,
            text: '缴费率'
          }
        })
        this.getLineData()
      })
    },
    // 支付户数、支付笔数
    getLineData (id) {
      const paramsData = this.params
      if (id) {
        paramsData.genre_id = id
      }
      getLineData(paramsData).then(res => {
        const listArr = []
        for (const i in res.households_data) {
          const obj = {}
          obj.name = i
          obj.value = res.households_data[i]
          obj.typename = '户数'
          listArr.push(obj)
        }
        for (const i in res.paycount_data) {
          const obj = {}
          obj.name = i
          obj.value = res.paycount_data[i]
          obj.typename = '支付笔数'
          listArr.push(obj)
        }
        this.lineData = listArr
      })
    },
    itemTplLegend (value, color, checked, index) {
      const obj = this.shoudPayData.rows[index]
      const percent = (obj.percent * 100).toFixed(2) + '%'
      checked = checked ? 'checked' : 'unChecked'
      return '<tr class="g2-legend-list-item item-' + index + ' ' + checked + '" data-value="' + value + '" data-color=' + color + ' >' + '<td style="width:120px;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' + '<span class="g2-legend-text" style="color: #666">' + value + '</span></td>' + '<td style="text-align: right">' + percent + '</td>' + '<td style="text-align: right;color: #666;width:80px">' + obj.litres + '</td>' + '</tr>'
    },
    // 应缴费
    getShoudPay () {
      getShoudPay(this.params).then(res => {
        let moneyTotal = 0
        const listArr = res.data.map(item => {
          moneyTotal += parseFloat(item.money)
          return {
            payType: item.genre_name,
            litres: parseFloat(item.money)
          }
        })
        this.shoudPieGuide = {
          name: '应缴费',
          moneyTotal: '￥' + moneyTotal,
          offsetX: -(('' + moneyTotal).length - 0.5) * 13
        }
        console.log('this.shoudPieGuide', (moneyTotal + '').length)
        this.shoudPayData = this.transformPie(listArr)
      })
    },
    // 已缴费筛选
    payChange (e) {
      this.getAlreadyPay()
    },
    // 已缴费
    getAlreadyPay () {
      getAlreadyPay(Object.assign({ zf_type: this.alreadyPayType, start_time: this.startTime, end_time: this.endTime + ' 23:59:59' }, this.params)).then(res => {
        let moneyTotal = 0
        const listArr = res.data.map(item => {
          moneyTotal += parseFloat(item.money)
          return {
            payType: item.genre_name,
            litres: parseFloat(item.money)
          }
        })
        this.alreadyPieGuide = {
          name: '已缴费',
          moneyTotal: '￥' + moneyTotal,
          offsetX: -(('' + moneyTotal).length - 0.5) * 13
        }
        this.alreadyPayData = this.transformPie(listArr)
      })
    },
    // 未缴费
    getNoPay () {
      getNoPay(Object.assign({ start_time: this.startTime, end_time: this.endTime + ' 23:59:59' }, this.params)).then(res => {
        let moneyTotal = 0
        const listArr = res.data.map(item => {
          moneyTotal += parseFloat(item.money)
          return {
            payType: item.genre_name,
            litres: parseFloat(item.money)
          }
        })
        this.noPieGuide = {
          name: '未缴费',
          moneyTotal: '￥' + moneyTotal,
          offsetX: -(('' + moneyTotal).length - 0.5) * 13
        }
        this.noPayData = this.transformPie(listArr)
      })
    },
    // 转换pie数据
    transformPie (data) {
      const ds = new DataSet()
      const dv = ds.createView().source(data).transform({
        type: 'percent',
        field: 'litres',
        dimension: 'payType',
        as: 'percent'
      })
      return dv
    },
    // tab切换
    tabSelect (key) {
      // this.queryParam = {}
      // this.queryParam.is_refund = key
      this.loadAllData()
    },
    // 筛选楼栋
    selectHouse () {
      this.jfldShow = true
      this.getHouseList()
    },
    onChange (checkedList) {
      console.log(checkedList)
      this.indeterminate = !!checkedList.length && checkedList.length < this.houseList.length
      this.checkAll = checkedList.length === this.houseList.length
      console.log(this.checkedList)
    },
    onCheckAllChange (e) {
      this.indeterminate = false
      this.checkAll = e.target.checked
      if (e.target.checked) {
        this.checkedList = this.houseList.map(item => {
          return item.id
        })
      } else {
        this.checkedList = []
      }
      console.log(this.checkedList)
      // Object.assign(this, {
      //   checkedList: e.target.checked ? this.houseList : [],
      //   indeterminate: false,
      //   checkAll: e.target.checked
      // })
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      if (page.sortOrder) {
        page.sortOrder = page.sortOrder == 'ascend' ? 'asc' : 'desc'
      }
      const requestParameters = Object.assign({}, this.params, page)
        console.log('loadData request parameters:', requestParameters)
        return getNoPaySituation(requestParameters)
          .then(res => {
            this.noMoney = res.z_money / 100
            this.noCount = res.data && res.data.total
            console.log(res.data)
            return res
          })
    },
    // 费用类型切换
    lineChange () {
      this.payType2 = this.summaryList[this.lineActive].id
      this.getLineData(this.payType2)
    }
  },
  filters: {
    NumberFormat (value) {
      if (!value) {
        return '0'
      }
      const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
      return intPartFormat
    }
  },
  watch: {
    payType () {
      this.lineActive = 0
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-content {
  display: flex;
  .ant-select-selection {
    border: none;
  }
  .ant-select-focused .ant-select-selection,
  .ant-select-selection:focus,
  .ant-select-selection:active {
    border: none;
    box-shadow: initial;
  }

  .ant-select-sm .ant-select-selection__rendered {
    margin-left: 0;
  }
  & > div {
    margin-right: 20px;
  }
}

/deep/ .g2-legend {
  font-size: 14px !important;
  top: 0 !important;
}
/deep/ .ant-card {
  .ant-card-extra {
    padding: 0;
  }
}
.row-block {
  /deep/ .ant-card {
    min-height: 509px;
  }
}
//
.p-t-0 {
  /deep/ .ant-card-body {
    padding-top: 0;
  }
}
.summary-wrapper {
  position: relative;
  min-height: 100px;
  background-color: #fff;
  /deep/ .ant-tabs-bar {
    border-bottom: none;
  }
  /deep/ .ant-tabs-ink-bar {
    top: 0;
    bottom: initial;
  }
  h3.summary-title {
    position: absolute;
    top: 26px;
    left: 20px;
    color: #808492;
  }
  .summary-container {
    overflow: auto;
    margin-left: 0;
    padding: 20px 0;
  }
  .summary-container {
    padding: 0;
    overflow: hidden;
    position: relative;
    .summary {
      width: 100%;
      margin-left: 0;
      table-layout: fixed;
      .summary-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 100px;
        height: 100%;
        margin-right: 10px;
        border-top: 2px solid transparent;
        padding-left: 20px;
        div:nth-child(1) {
          line-height: 30px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
        }
        div:nth-child(2) {
          line-height: 32px;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
        div:nth-child(3) {
          line-height: 32px;
          font-size: 28px;
          color: #000;
        }
      }
      /deep/ .ant-tabs-tab {
        padding-left: 0;
      }
      /deep/ .ant-tabs-tab-active .summary-item {
        .value,
        .text {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
