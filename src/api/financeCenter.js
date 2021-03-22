import request from '@/utils/request'

// 获取充值列表记录
export function getRechargeList (data) {
  return request({
    url: '/recharge/recharge/getRechargeList',
    method: 'post',
    data
  })
}
