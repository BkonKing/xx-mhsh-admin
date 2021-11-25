import {
  businessApi
} from '@/api/userManage/business'

export const getBusinessSetting = [
  RegExp(businessApi.getBusinessSetting),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      id: '1',
      project_id: '0',
      is_reveal: '0',
      power: '1,2,3',
      project_examine_day: '5',
      examine_day: '5',
      handle_day: '5',
      is_limit: '0',
      min_credits: '0',
      max_credits: '0',
      service_fee: '5',
      procedure: '1',
      coupon_type: '1,2',
      coupon_scene: '1',
      coupon_mode: '1,2',
      receive_coupon: '1,2,3',
      coupon_goods_type: '1'
    },
    timestamp: 1637657167707
  }
]

export const setBusinessSetting = [
  RegExp(businessApi.setBusinessSetting),
  'post',
  {
    code: '200',
    success: true,
    message: '保存成功',
    timestamp: 1632360617392
  }
]

// export const setBusinessSetting = [
//   RegExp(businessApi.setBusinessSetting),
//   'post',
//   {
//     code: '200',
//     success: true,
//     message: '保存成功',
//     timestamp: 1632360617392
//   }
// ]
