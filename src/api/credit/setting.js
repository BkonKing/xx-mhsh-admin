import request from '@/utils/request'

export const withdrawApi = {
  getCreditSetting: '/cash/cash/getCreditSetting',
  setCredits: '/cash/cash/setCredits'
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
