import request from '@/utils/request'

const bannerApi = {
  getSpecialList: '/invite/thematic/thematic_list',
  updateFieldCategory: '/invite/thematic/thematic_list2'
}

export function getSpecialList (data) {
  return request({
    url: bannerApi.getSpecialList,
    method: 'post',
    data
  })
}

export function updateFieldCategory (data) {
  return request({
    url: bannerApi.updateFieldCategory,
    method: 'post',
    data
  })
}
