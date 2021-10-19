import request from '@/utils/request'

// 服务记录
const serviceLog = {
  getBuild: '/server/labelserver/getBuild',
  getUnit: '/server/labelserver/getUnit',
  getHouse: '/server/labelserver/getHouse',
  getOwnerInfo: '/server/labelserver/getOwnerInfo',
  addServiceRecord: '/server/labelserver/addServiceRecord',
  updateServiceTitle: '/server/labelserver/updateServiceTitle',
  getServiceProvider: '/server/labelserver/getServiceProvider',
  getFollowInfo: '/server/labelserver/getFollowInfo',
  addSpeedInfo: '/server/labelserver/addSpeedInfo',
  viewRecord: '/server/labelserver/viewRecord',
  getServiceRecord: '/server/labelserver/getServiceRecord'
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
