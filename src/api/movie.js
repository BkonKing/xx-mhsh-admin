import request from '@/utils/request'

const movieApi = {
  productList: '/life/orderProject/getProjectList',
  orderStatu: '/film/film/getAllOrderStatus',
  orderList: '/film/film/orderlist',
  orderDetail: '/film/film/orderdetail',
  refundList: '/film/film/getrefundlist',
  remindTel: '/film/film/noticemobile',
  refundTotal: '/film/film/calculatePrice',
  batchRefund: '/film/film/refund',
  refundDetail: '/film/film/getrefunddetail',
  filmList: '/film/film/getfilmlist',
  filmDetail: '/film/film/filmdetail',
  filmScheduling: '/film/film/getschedulebyfilmno',
  schedulingDate: '/film/film/getschedudate',
  screensList: '/film/film/gethall',
  setTel: '/film/film/customerPhone'
}

// 项目列表
export function getProductList (parameter) {
  console.log(process.env.VUE_APP_LIFE_API_BASE_URL + movieApi.productList)
  return request({
    url: movieApi.productList,
    baseURL: process.env.VUE_APP_LIFE_API_BASE_URL,
    method: 'post',
    data: parameter
  })
}

// 订单状态
export function getOrderStatus (parameter) {
  return request({
    url: movieApi.orderStatu,
    method: 'post',
    data: parameter
  })
}

// 影票订单
export function getOrderList (parameter) {
  return request({
    url: movieApi.orderList,
    method: 'post',
    data: parameter
  })
}

// 影票订单详情
export function getOrderDetail (parameter) {
  return request({
    url: movieApi.orderDetail,
    method: 'post',
    data: parameter
  })
}

// 退款订单
export function getRefundList (parameter) {
  return request({
    url: movieApi.refundList,
    method: 'post',
    data: parameter
  })
}

// 充值提醒-添加手机号
export function sendRemindTel (parameter) {
  return request({
    url: movieApi.remindTel,
    method: 'post',
    data: parameter
  })
}

// 批量退款-计算退款金额
export function getRefundTotal (parameter) {
  return request({
    url: movieApi.refundTotal,
    method: 'post',
    data: parameter
  })
}

// 批量退款-提交
export function sendBatchRefund (parameter) {
  return request({
    url: movieApi.batchRefund,
    method: 'post',
    data: parameter
  })
}

// 退款订单详情
export function getRefundDetail (parameter) {
  return request({
    url: movieApi.refundDetail,
    method: 'post',
    data: parameter
  })
}

// 影片列表
export function getFilmList (parameter) {
  return request({
    url: movieApi.filmList,
    method: 'post',
    data: parameter
  })
}

// 影片详情
export function getFilmDetail (parameter) {
  return request({
    url: movieApi.filmDetail,
    method: 'post',
    data: parameter
  })
}

// 影片详情-影片排期
export function getFilmScheduling (parameter) {
  return request({
    url: movieApi.filmScheduling,
    method: 'post',
    data: parameter
  })
}

// 影片详情-影片的排期日期
export function getSchedulingDate (parameter) {
  return request({
    url: movieApi.schedulingDate,
    method: 'post',
    data: parameter
  })
}

// 影片详情-影厅
export function getScreensList (parameter) {
  return request({
    url: movieApi.screensList,
    method: 'post',
    data: parameter
  })
}
