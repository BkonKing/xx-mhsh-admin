import request from '@/utils/request'

export const lotteryApi = {
  getLotteryData: '/invite/award/awardData',
  getLotterySetting: '/invite/award/getZpSetting',
  saveLotterySetting: '/invite/award/saveZpSetting',
  getGoodsList: '/invite/award/getGoodsList',
  getCouponList: '/invite/award/getCouponList',
  getShopCouponList: '/invite/award/getShopsCouponList',
  getLotteryLogList: '/invite/award/awardLogList',
  getLotteryTabData: '/invite/award/awardTabData',
  editLotteryStatus: '/invite/award/editAwardCash'
}

// 转盘数据
export function getLotteryData (data) {
  return request({
    url: lotteryApi.getLotteryData,
    method: 'post',
    data
  })
}

// 转盘基础数据
export function getLotterySetting (data) {
  return request({
    url: lotteryApi.getLotterySetting,
    method: 'post',
    data
  })
}

// 转盘基础数据
export function saveLotterySetting (data) {
  return request({
    url: lotteryApi.saveLotterySetting,
    method: 'post',
    data
  })
}

// 商品搜索列表
export function getGoodsList (data) {
  return request({
    url: lotteryApi.getGoodsList,
    method: 'post',
    data
  })
}

// 平台券搜索列表
export function getCouponList (data) {
  return request({
    url: lotteryApi.getCouponList,
    method: 'post',
    data
  })
}

// 商铺券搜索列表
export function getShopCouponList (data) {
  return request({
    url: lotteryApi.getShopCouponList,
    method: 'post',
    data
  })
}

// 抽奖记录
export function getLotteryLogList (data) {
  return request({
    url: lotteryApi.getLotteryLogList,
    method: 'post',
    data
  })
}

// 中奖兑换
export function getLotteryTabData (data) {
  return request({
    url: lotteryApi.getLotteryTabData,
    method: 'post',
    data
  })
}

// 联系工作人员 修改兑奖状态 接口
export function editLotteryStatus (data) {
  return request({
    url: lotteryApi.editLotteryStatus,
    method: 'post',
    data
  })
}
