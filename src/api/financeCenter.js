import request from '@/utils/request'

// 获取充值列表记录
export function getRechargeList (data) {
  return request({
    url: '/recharge/recharge/getRechargeList',
    method: 'post',
    headers: {
      Authorization: '10a3accbf89e327a5c0ac3cb2d3984ea7a4b16de'
    },
    data
  })
}
// 获取所有项目
export function getProjectList (params) {
  return request({
    url: '/recharge/recharge/getProjectList',
    method: 'post',
    headers: {
      Authorization: '10a3accbf89e327a5c0ac3cb2d3984ea7a4b16de'
    }
  })
}
// 获取项目短信使用信息
export function getSmsUseInfo () {
  return request({
    url: '/recharge/recharge/getSmsUseInfo',
    method: 'post',
    headers: {
      Authorization: '10a3accbf89e327a5c0ac3cb2d3984ea7a4b16de'
    }
  })
}
// 添加充值记录
export function addRecharge (data) {
  return request({
    url: '/recharge/recharge/addRecharge',
    method: 'post',
    data
  })
}
