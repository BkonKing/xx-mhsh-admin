import request from '@/utils/request'

export const withdrawApi = {
  getAccount: '/cash/cash/getAccount',
  getDropDownUser: '/cash/cash/getDropDownUser',
  getCashList: '/cash/cash/getCashList',
  cashApply: '/cash/cash/cashApply',
  getCheckAndPayInfo: '/cash/cash/getCheckAndPayInfo',
  checkCash: '/cash/cash/checkCash',
  updateCheckCash: '/cash/cash/updateCheckCash',
  updateCheckDesc: '/cash/cash/updateCheckDesc',
  getCashDetail: '/cash/cash/getCashDetail',
  setPayment: '/cash/cash/Payment',
  updatePayment: '/cash/cash/unpaidPayment',
  updatePaymentDesc: '/cash/cash/updatePayment',
  getProjectServiceFee: '/cash/cash/getProjectServiceFee'
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
export function getDropDownUser (data) {
  return request({
    url: withdrawApi.getDropDownUser,
    method: 'post',
    data
  })
}

// 提现申请
export function cashApply (data) {
  return request({
    url: withdrawApi.cashApply,
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

// 提现审核功能
export function checkCash (data) {
  return request({
    url: withdrawApi.checkCash,
    method: 'post',
    data
  })
}

// 查看提现（提现详情页）
export function getCashDetail (data) {
  return request({
    url: withdrawApi.getCashDetail,
    method: 'post',
    data
  })
}

// 修改审核功能
export function updateCheckCash (data) {
  return request({
    url: withdrawApi.updateCheckCash,
    method: 'post',
    data
  })
}

// 修改提现审核操作说明
export function updateCheckDesc (data) {
  return request({
    url: withdrawApi.updateCheckDesc,
    method: 'post',
    data
  })
}

// 打款功能
export function setPayment (data) {
  return request({
    url: withdrawApi.setPayment,
    method: 'post',
    data
  })
}

// 修改打款
export function updatePayment (data) {
  return request({
    url: withdrawApi.updatePayment,
    method: 'post',
    data
  })
}

// 修改打款其他信息
export function updatePaymentDesc (data) {
  return request({
    url: withdrawApi.updatePaymentDesc,
    method: 'post',
    data
  })
}

// 获取项目后台服务费率
export function getProjectServiceFee (data) {
  return request({
    url: withdrawApi.getProjectServiceFee,
    method: 'post',
    data
  })
}
