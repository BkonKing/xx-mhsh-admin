import request from '@/utils/request'

// 服务记录
const serviceLog = {
  getBuild: '/server/labelserver/getBuild',
  getUnit: '/server/labelserver/getUnit',
  getHouse: '/server/labelserver/getHouse',
  getOwnerInfo: '/server/labelserver/getOwnerInfo',
  house_tag_data: '/server/labelserver/house_tag_data',
  setHouseTag: '/server/labelserver/setHouseTag',
  addServiceRecord: '/server/labelserver/addServiceRecord',
  updateServiceTitle: '/server/labelserver/updateServiceTitle',
  getServiceProvider: '/server/labelserver/getServiceProvider',
  getFollowInfo: '/server/labelserver/getFollowInfo',
  addSpeedInfo: '/server/labelserver/addSpeedInfo',
  viewRecord: '/server/labelserver/viewRecord',
  getServiceRecord: '/server/labelserver/getServiceRecord'
}

// 免费服务
export const freeServer = {
  getFreeServerList: '/server/freeserver/getFreeServerList',
  optReservation: '/server/freeserver/optReservation',
  getFreeCategoryList: '/server/freeserver/getFreeCategoryList',
  updateFieldCategory: '/server/freeserver/updateFieldCategory',
  deleteFreeCategory: '/server/freeserver/deleteFreeCategory',
  addFreeCategory: '/server/freeserver/addFreeCategory',
  getReservationInfo: '/server/freeserver/getReservationInfo',
  setRemark: '/server/freeserver/setRemark',
  getCancelReason: '/server/freeserver/getCancelReason', // options
  getCancelReservationReasonList: '/server/freeserver/getCancelReservationReasonList', // setting
  addCancelReservationReason: '/server/freeserver/addCancelReservationReason',
  getCategoryByProductId: '/server/freeserver/getCategoryByProductId'
}

// 获取服务预约记录列表
export function getFreeServerList (data) {
  return request({
    url: freeServer.getFreeServerList,
    method: 'post',
    data
  })
}

// 操作预约（设置完成、取消）
export function optReservation (data) {
  return request({
    url: freeServer.optReservation,
    method: 'post',
    data
  })
}

// 获取服务项目列表
export function getFreeCategoryList (data) {
  return request({
    url: freeServer.getFreeCategoryList,
    method: 'post',
    data
  })
}

// 根据字段更新服务(设置开关、排序)
export function updateFieldCategory (data) {
  return request({
    url: freeServer.updateFieldCategory,
    method: 'post',
    data
  })
}

// 删除服务
export function deleteFreeCategory (data) {
  return request({
    url: freeServer.deleteFreeCategory,
    method: 'post',
    data
  })
}

// 添加更新服务项目
export function addFreeCategory (data) {
  return request({
    url: freeServer.addFreeCategory,
    method: 'post',
    data
  })
}

// 获取服务详情
export function getReservationInfo (data) {
  return request({
    url: freeServer.getReservationInfo,
    method: 'post',
    data
  })
}

// 设置备注预约
export function setRemark (data) {
  return request({
    url: freeServer.setRemark,
    method: 'post',
    data
  })
}

// 获取取消原因
export function getCancelReason (data) {
  return request({
    url: freeServer.getCancelReason,
    method: 'post',
    data
  })
}

// 获取取消原因(设置页面)
export function getCancelReasonSettingList (data) {
  return request({
    url: freeServer.getCancelReservationReasonList,
    method: 'post',
    data
  })
}

// 添加更新取消原因
export function addCancelReason (data) {
  return request({
    url: freeServer.addCancelReservationReason,
    method: 'post',
    data
  })
}

// 获取服务项目下拉框
export function getCategoryByProductId (data) {
  return request({
    url: freeServer.getCategoryByProductId,
    method: 'post',
    data
  })
}

// 获取所有楼栋
export function getBuild (data) {
  return request({
    url: serviceLog.getBuild,
    method: 'post',
    data
  })
}

// 根据楼栋获取单元名称
export function getUnit (data) {
  return request({
    url: serviceLog.getUnit,
    method: 'post',
    data
  })
}
// 根据单元获取房屋信息
export function getHouse (data) {
  return request({
    url: serviceLog.getHouse,
    method: 'post',
    data
  })
}
// 根据房屋信息获取业主信息
export function getOwnerInfo (data) {
  return request({
    url: serviceLog.getOwnerInfo,
    method: 'post',
    data
  })
}
// 根据房屋信息获取业主信息
export function getHouseTagData (data) {
  console.log(serviceLog.house_tag_data)
  return request({
    url: serviceLog.house_tag_data,
    method: 'post',
    data
  })
}
// 设置未注册用户标签
export function setHouseTag (data) {
  return request({
    url: serviceLog.setHouseTag,
    method: 'post',
    data
  })
}
// 添加服务记录
export function addServiceRecord (data) {
  return request({
    url: serviceLog.addServiceRecord,
    method: 'post',
    data
  })
}
// 修改服务标题
export function updateServiceTitle (data) {
  return request({
    url: serviceLog.updateServiceTitle,
    method: 'post',
    data
  })
}
// 获取服务者
export function getServiceProvider (data) {
  return request({
    url: serviceLog.getServiceProvider,
    method: 'post',
    data
  })
}
// 获取跟进信息
export function getFollowInfo (data) {
  return request({
    url: serviceLog.getFollowInfo,
    method: 'post',
    data
  })
}
// 添加跟进信息
export function addSpeedInfo (data) {
  return request({
    url: serviceLog.addSpeedInfo,
    method: 'post',
    data
  })
}
// 查看跟进信息
export function viewRecord (data) {
  return request({
    url: serviceLog.viewRecord,
    method: 'post',
    data
  })
}
// 获取服务记录
export function getServiceRecord (data) {
  return request({
    url: serviceLog.getServiceRecord,
    method: 'post',
    data
  })
}
