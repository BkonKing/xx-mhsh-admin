import request from '@/utils/request'

// 后台权限菜单对象接口
export function getMenus () {
  return request({
    url: '/system/menus/getMenus'
  })
}
// 批量添加 / 编辑权限菜单接口
export function updateBatchMenu (data) {
  return request({
    url: '/system/menus/updateBatchMenu',
    method: 'post',
    data
  })
}

//  删除菜单接口
export function removeMenu (data) {
  return request({
    url: '/system/menus/removeMenu',
    method: 'post',
    data
  })
}

// 修改权限菜单接口
export function updateMenu (data) {
  return request({
    url: '/system/menus/updateMenu',
    method: 'post',
    data
  })
}

// 批量删除菜单
export function removeBatchMenu (data) {
  return request({
    url: '/system/menus/removeBatchMenu',
    method: 'post',
    data
  })
}

export function addMenu (data) {
  return request({
    url: '/system/menus/addMenu',
    method: 'post',
    data
  })
}
