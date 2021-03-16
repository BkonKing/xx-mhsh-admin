import request from '@/utils/request'

export function doLogin (data) {
  return request({
    url: '/system/slognin/login',
    method: 'post',
    data
  })
}
