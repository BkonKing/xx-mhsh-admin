import request from '@/utils/request'
const movieApi = {
  creatActivity: '/activity/activity/addActivity',
  getActivity: '/activity/activity/getActivityInfo',
  editActivity: '/activity/activity/editActivity',
  sessionList: '/activity/activity/getSessions',
  activityFlowList: '/activity/activity/getActivityFlow',
  productList: '/recharge/recharge/getProjectList'
}
// 添加活动
export function creatActivity (parameter) {
  return request({
    url: movieApi.creatActivity,
    method: 'post',
    data: parameter
  })
}
// 活动详情
export function getActivity (parameter) {
  return request({
    url: movieApi.getActivity,
    method: 'post',
    data: parameter
  })
}
// 编辑活动
export function editActivity (parameter) {
  return request({
    url: movieApi.editActivity,
    method: 'post',
    data: parameter
  })
}
// 活动场次
export function getSessionList (parameter) {
  return request({
    url: movieApi.sessionList,
    method: 'post',
    data: parameter
  })
}
// 活动流水列表
export function getActivityFlowList (parameter) {
  return request({
    url: movieApi.activityFlowList,
    method: 'post',
    data: parameter
  })
}
// 项目列表
export function getProductList (parameter) {
  return request({
    url: movieApi.productList,
    method: 'post',
    data: parameter
  })
}
