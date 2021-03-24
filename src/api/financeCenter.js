import request from '@/utils/request'

// 获取充值列表记录
export function getRechargeList (data) {
  return request({
    url: '/recharge/recharge/getRechargeList',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
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
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    }
  })
}
// 获取项目短信使用信息
export function getSmsUseInfo () {
  return request({
    url: '/recharge/recharge/getSmsUseInfo',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    }
  })
}
// 添加充值记录
export function addRecharge (data) {
  return request({
    url: '/recharge/newrecharge/addRecharge',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    },
    data
  })
}

// 预警设置
export function setWarning (data) {
  return request({
    url: '/recharge/recharge/setWarning',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    },
    data
  })
}

// 获取充值提醒用户列表
export function getRemindUser (data) {
  return request({
    url: '/recharge/recharge/getRemindUser',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    },
    data
  })
}

// 获取用户信息（新接收方式）
export function getUserInfo (data) {
  return request({
    url: '/recharge/newrecharge/getUserInfo',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    },
    data
  })
}

// 设置提醒用户（新接收方式）
export function setReminder (data) {
  return request({
    url: '/recharge/newrecharge/setReminder',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    },
    data
  })
}

// 支付接口
export function payOrder (data) {
  return request({
    url: '/recharge/newrecharge/pay_order',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    },
    data
  })
}
// 获取账户信息
export function getAccountInfo () {
  return request({
    url: '/recharge/recharge/getAccountInfo',
    method: 'post',
    headers: {
      Authorization: 'b46f189a3eaca7b6af946c71e01ee3f9924cfaea'
    }
  })
}
