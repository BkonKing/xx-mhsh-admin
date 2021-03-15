import request from '@/utils/request'

export function getMenus () {
  return request({
    url: '/system/menus/getMenus'
  })
}

export function updateBatchMenu (data) {
  return request({
    url: '/system/menus/updateBatchMenu',
    method: 'post',
    data
  })
}
