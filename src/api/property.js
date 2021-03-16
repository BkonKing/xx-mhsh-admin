import request from '@/utils/request'
const movieApi = {
  callpayList: '/butler/urgeLog/getUrgeLogList',
  selectList: '/butler/statistics/statistics',
  houseList: '/butler/statistics/statistics_building_screen',
  totalData: '/butler/statistics/basicStatistics',
  tabPie: '/butler/statistics/genreContributionRate',
  lineData: '/butler/statistics/life_data_table',
  shoudPay: '/butler/statistics/life_payable_data',
  alreadyPay: '/butler/statistics/life_paid_data',
  noPay: '/butler/statistics/life_qoq_data',
  noPaySituation: '/butler/statistics/life_qoq_details_data',
  buildList: '/butler/payRecords/building_data',
  unitList: '/butler/payRecords/unit_data',
  balanceList: '/butler/balance/balance_data',
  invest: '/butler/balance/recharge_json',
  submitInvest: '/butler/balance/recharge_balance',
  basisInfo: '/butler/balance/balance_details_json',
  detailList: '/butler/balance/house_pay_log_data',
  logList: '/butler/balance/house_admin_log_data',
  adjustmentInfo: '/butler/balance/adjust_json',
  adjustmentSend: '/butler/balance/adjust_balance',
  payDetail: '/butler/balance/pay_log_details_json'
}

// 催缴记录列表
export function getCallpayList (parameter) {
  return request({
    url: movieApi.callpayList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}

// 统计页面-下拉筛选
export function getSelectList (parameter) {
  return request({
    url: movieApi.selectList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-楼栋
export function getHouseList (parameter) {
  return request({
    url: movieApi.houseList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-应缴费、已缴费、未交费、缴费率
export function getTotalData (parameter) {
  return request({
    url: movieApi.totalData,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-各缴费类别缴费率
export function getTabPie (parameter) {
  return request({
    url: movieApi.tabPie,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-各缴费类别缴费率
export function getLineData (parameter) {
  return request({
    url: movieApi.lineData,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-应缴费
export function getShoudPay (parameter) {
  return request({
    url: movieApi.shoudPay,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-已缴费
export function getAlreadyPay (parameter) {
  return request({
    url: movieApi.alreadyPay,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-未缴费
export function getNoPay (parameter) {
  return request({
    url: movieApi.noPay,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 统计页面-未缴费
export function getNoPaySituation (parameter) {
  return request({
    url: movieApi.noPaySituation,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}

// 楼栋列表
export function getBuildList (parameter) {
  return request({
    url: movieApi.buildList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 单元列表
export function getUnitList (parameter) {
  return request({
    url: movieApi.unitList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}

// 余额管理页面-列表
export function getBalanceList (parameter) {
  return request({
    url: movieApi.balanceList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额管理页面-充值
export function getInvest (parameter) {
  return request({
    url: movieApi.invest,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额管理页面-充值提交
export function submitInvest (parameter) {
  return request({
    url: movieApi.submitInvest,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}

// 余额详情页面-基础信息
export function getBasisInfo (parameter) {
  return request({
    url: movieApi.basisInfo,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额详情页面-充缴明细
export function getDetailList (parameter) {
  return request({
    url: movieApi.detailList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额详情页面-操作日志
export function getLogList (parameter) {
  return request({
    url: movieApi.logList,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额详情页面-调整余额
export function getAdjustmentInfo (parameter) {
  return request({
    url: movieApi.adjustmentInfo,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额详情页面-调整余额
export function submitAdjustment (parameter) {
  return request({
    url: movieApi.adjustmentSend,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
// 余额详情页面-充缴明细-查看
export function getPayDetail (parameter) {
  return request({
    url: movieApi.payDetail,
    baseURL: process.env.VUE_APP_WSOLID_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}
