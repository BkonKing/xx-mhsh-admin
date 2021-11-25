import request from '@/utils/request'

export const businessApi = {
  getBusinessSetting: '/business/business_setting/business_setting_info',
  setBusinessSetting: '/business/business_setting/business_setting_edit'
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
