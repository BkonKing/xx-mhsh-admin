import request from '@/utils/request'

export const specialApi = {
  addSpecial: '/invite/thematic/edit_thematic',
  delSpecial: '/invite/thematic/del_thematic',
  finishSpecial: '/invite/thematic/end_thematic',
  editLimitTime: '/invite/thematic/limit_time_thematic',
  getSpecialDetail: '/invite/thematic/thematic_info',
  getSpecialList: '/invite/thematic/thematic_list',
  searchGoods: '/invite/thematic/goods_search',
  getSpecialOptions: '/invite/thematic/tj_thematic_list',
  saveWxHomeSpecial: '/invite/thematic/save_tj_thematic'
}

export function addSpecial (data) {
  return request({
    url: specialApi.addSpecial,
    method: 'post',
    data
  })
}

export function delSpecial (data) {
  return request({
    url: specialApi.delSpecial,
    method: 'post',
    data
  })
}

export function finishSpecial (data) {
  return request({
    url: specialApi.finishSpecial,
    method: 'post',
    data
  })
}

export function editLimitTime (data) {
  return request({
    url: specialApi.editLimitTime,
    method: 'post',
    data
  })
}

export function getSpecialDetail (data) {
  return request({
    url: specialApi.getSpecialDetail,
    method: 'post',
    data
  })
}

export function getSpecialList (data) {
  return request({
    url: specialApi.getSpecialList,
    method: 'post',
    data
  })
}

export function searchGoods (data) {
  return request({
    url: specialApi.searchGoods,
    method: 'post',
    data
  })
}

export function getSpecialOptions (data) {
  return request({
    url: specialApi.getSpecialOptions,
    method: 'post',
    data
  })
}

export function saveWxHomeSpecial (data) {
  return request({
    url: specialApi.saveWxHomeSpecial,
    method: 'post',
    data
  })
}
