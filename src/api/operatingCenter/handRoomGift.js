import request from '@/utils/request'

export const apiObj = {
  getCeremonyList: '/activity/ceremony/getCeremonyList',
  optCeremony: '/activity/ceremony/optCeremony',
  getGoodsByProject: '/activity/ceremony/getGoodsByProject'
}

export function getCeremonyList (data) {
  return request({
    url: apiObj.getCeremonyList,
    method: 'post',
    data
  })
}

// optType 1添加 2修改 3删除
export function optCeremony (data) {
  return request({
    url: apiObj.optCeremony,
    method: 'post',
    data
  })
}

export function getGoodsByProject (data) {
  return request({
    url: apiObj.getGoodsByProject,
    method: 'post',
    data
  })
}
