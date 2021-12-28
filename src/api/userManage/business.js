import request from '@/utils/request'

export const businessApi = {
  getBusinessSetting: '/business/business_setting/business_setting_info',
  setBusinessSetting: '/business/business_setting/business_setting_edit',
  getShopList: '/business/shops/shops_list',
  getProjectList: '/business/shops/project_setect',
  editShops: '/business/shops/edit_shops',
  delShops: '/business/shops/del_shops',
  setShopsPower: '/business/shops/edit_shops_power',
  getUserList: '/business/shops/user_screen',
  getShopCouponList: '/business/shops_coupon/shops_coupon_list',
  publishCoupon: '/business/shops_coupon/open_shops_coupon',
  finishCoupon: '/business/shops_coupon/close_shops_coupon',
  deleteCoupon: '/business/shops_coupon/del_shops_coupon',
  getCouponInfo: '/business/shops_coupon/shops_coupon_info',
  getUserCouponList: '/business/shops_coupon/shops_user_coupon_list',
  getShopCouponInfo: '/business/shops_coupon/shops_coupon_info',
  getShopOptions: '/business/shops_coupon/shops_select_list'
}

export function getBusinessSetting (data) {
  return request({
    url: businessApi.getBusinessSetting,
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_API_BASE_URL
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

export function getProjectList (data) {
  return request({
    url: businessApi.getProjectList,
    method: 'post',
    data,
    baseURL: process.env.VUE_APP_API_BASE_URL
  })
}

export function editShops (data) {
  return request({
    url: businessApi.editShops,
    method: 'post',
    data
  })
}

export function delShops (data) {
  return request({
    url: businessApi.delShops,
    method: 'post',
    data
  })
}

export function setShopsPower (data) {
  return request({
    url: businessApi.setShopsPower,
    method: 'post',
    data
  })
}

export function getUserList (data) {
  return request({
    url: businessApi.getUserList,
    method: 'post',
    data
  })
}

export function getShopCouponList (data) {
  return request({
    url: businessApi.getShopCouponList,
    method: 'post',
    data
  })
}

export function publishCoupon (data) {
  return request({
    url: businessApi.publishCoupon,
    method: 'post',
    data
  })
}

export function finishCoupon (data) {
  return request({
    url: businessApi.finishCoupon,
    method: 'post',
    data
  })
}

export function deleteCoupon (data) {
  return request({
    url: businessApi.deleteCoupon,
    method: 'post',
    data
  })
}

export function getCouponInfo (data) {
  return request({
    url: businessApi.getCouponInfo,
    method: 'post',
    data
  })
}

export function getUserCouponList (data) {
  return request({
    url: businessApi.getUserCouponList,
    method: 'post',
    data
  })
}

export function getShopCouponInfo (data) {
  return request({
    url: businessApi.getShopCouponInfo,
    method: 'post',
    data
  })
}

export function getShopOptions (data) {
  return request({
    url: businessApi.getShopOptions,
    method: 'post',
    data
  })
}
