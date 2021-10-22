import request from '@/utils/request'

// 房产管理
const realtyLog = {
  getHouseList: '/property/house/newHouseList',
  deleteHouse: '/property/house/deleteHouse',
  importHouse: '/property/house/importHouse',
  addHouse: '/property/house/addHouse',
  updateHouse: '/property/house/updateHouse',
  enabledHouse: '/property/house/enabledHouse'
}

// 获取房屋列表
export function getHouseList (data) {
  return request({
    url: realtyLog.getHouseList,
    method: 'post',
    data
  })
}

// 删除房屋
export function deleteHouse (data) {
  return request({
    url: realtyLog.deleteHouse,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 导入房屋
export function importHouse (data) {
  return request({
    url: realtyLog.importHouse,
    method: 'post',
    data
  })
}

// 编辑房屋
export function editHouse (data) {
  return request({
    url: data.id ? realtyLog.updateHouse : realtyLog.addHouse,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 设置房屋启用
export function setEnabledHouse (data) {
  return request({
    url: realtyLog.enabledHouse,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
