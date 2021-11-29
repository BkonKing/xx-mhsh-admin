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

export const getShopList = [
  RegExp(businessApi.getShopList),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      pageindex: 1,
      pagesize: 10,
      total: '2',
      list: [
        {
          id: '1',
          project_id: '1',
          shops_name: '商家1',
          uid: '100000',
          phone: '0591-88822114',
          power: '1,2',
          business_hours: '09:00~18:00',
          shops_notice: '公告',
          coupon_count: '0',
          is_del: '0',
          ctime: '2021-11-24 14:37:32',
          credits: '29746',
          mobile: '18900251800',
          realname: '鲁班',
          nickname: '189****1800',
          is_logoff: '0',
          project_name: '五凤兰庭'
        },
        {
          id: '2',
          project_id: '1',
          shops_name: '',
          uid: '100020',
          phone: '',
          power: '1',
          business_hours: '',
          shops_notice: '',
          coupon_count: '0',
          is_del: '0',
          ctime: '2021-11-24 14:37:32',
          credits: '235',
          mobile: '15959063868',
          realname: '',
          nickname: '159****3868',
          is_logoff: '0',
          project_name: '五凤兰庭'
        }
      ]
    },
    timestamp: 1637737895918
  }
]

export const editShops = [
  RegExp(businessApi.editShops),
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
