import request from '@/utils/request'

export const withdrawApi = {
  getCreditSetting: '/cash/cash/getCreditSetting',
  setCredits: '/cash/cash/setCredits',
  getServiceFee: '/cash/cash/getServiceFee',
  setServiceFee: '/cash/cash/setServiceFee'
}

// 获取幸福币设置
export function getCreditSetting (data) {
  return request({
    url: withdrawApi.getCreditSetting,
    method: 'post',
    data
  })
}

// 幸福币设置
export function setCredits (data) {
  return request({
    url: withdrawApi.setCredits,
    method: 'post',
    data
  })
}

// 获取项目后台服务费率
export function getServiceFee (data) {
  return request({
    url: withdrawApi.getServiceFee,
    method: 'post',
    data
  })
}

// 项目后台服务费率设置
export function setServiceFee (data) {
  return request({
    url: withdrawApi.setServiceFee,
    method: 'post',
    data
  })
}
