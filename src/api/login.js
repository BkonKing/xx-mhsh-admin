import request from '@/utils/request'
// 用户登录
export function doLogin (data) {
  return request({
    url: '/system/slognin/login',
    method: 'post',
    data
  })
}

// 退出登录
export function outlogin () {
  return request({
    url: '/system/slognin/outlogin'
  })
}
