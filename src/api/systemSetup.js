import request from '@/utils/request'

// 获取所有角色数据接口
export function getRoles () {
  return request({
    url: '/system/roles/getRoles'
  })
}

// 批量编辑权限角色接口
export function updateBatchRole (data) {
  return request({
    url: '/system/roles/updateBatchRole',
    method: 'post',
    data
  })
}

// 批量删除权限角色接口
export function removeBatchRole (data) {
  return request({
    url: '/system/roles/removeBatchRole',
    method: 'post',
    data
  })
}

// 删除权限角色接口
export function removeRole (data) {
  return request({
    url: '/system/roles/removeRole',
    method: 'post',
    data
  })
}

// 新增权限角色接口
export function addRole (data) {
  return request({
    url: '/system/roles/addRole',
    method: 'post',
    data
  })
}

// 编辑权限角色接口
export function updateRole (data) {
  return request({
    url: '/system/roles/updateRole',
    method: 'post',
    data
  })
}
// 角色对应的权限菜单接口
export function getAllotsMenus (params) {
  return request({
    url: '/system/roles/getAllotsMenus',
    params
  })
}
// 配置角色对应的菜单接口
export function updateAllotsMenus (data) {
  return request({
    url: '/system/roles/updateAllotsMenus',
    method: 'post',
    data
  })
}
