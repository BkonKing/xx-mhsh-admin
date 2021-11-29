import request from '@/utils/request'

export const businessApi = {
  getBusinessSetting: '/business/business_setting/business_setting_info',
  setBusinessSetting: '/business/business_setting/business_setting_edit',
  getShopList: '/business/shops/shops_list',
  editShops: '/business/shops/edit_shops'
}

export function getBusinessSetting (data) {
  return request({
    url: businessApi.getBusinessSetting,
    method: 'post',
    data
  })
}

export function setBusinessSetting (data) {
  return request({
    url: businessApi.setBusinessSetting,
    method: 'post',
    data
  })
}

export function getShopList (data) {
  return request({
    url: businessApi.getShopList,
    method: 'post',
    data
  })
}

export function editShops (data) {
  return request({
    url: businessApi.editShops,
    method: 'post',
    data
  })
}
