import request from '@/utils/request'

export const withdrawApi = {
  getAccount: '/cash/cash/getAccount',
  getCashList: '/cash/cash/getCashList',
  getCheckAndPayInfo: '/cash/cash/getCheckAndPayInfo'
}

// 获取对公账户
export function getAccount (data) {
  return request({
    url: withdrawApi.getAccount,
    method: 'post',
    data
  })
}

// 获取提现列表
export function getCashList (data) {
  return request({
    url: withdrawApi.getCashList,
    method: 'post',
    data
  })
}

// 获取提现列表
export function getCheckAndPayInfo (data) {
  return request({
    url: withdrawApi.getCheckAndPayInfo,
    method: 'post',
    data
  })
}
