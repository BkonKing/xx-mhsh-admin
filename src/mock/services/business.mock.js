import {
  businessApi
} from '@/api/userManage/business'
import {
  appUser
} from '@/api/userManage'

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
      coupon_goods_type: '1',
      remind: '提醒',
      banner: '',
      banner_text: '123123'
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
      list: [{
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
        shops_name: '商家2',
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

export const getProjectList = [
  RegExp(businessApi.getProjectList),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: [{
      project_id: 0,
      project_name: '美好生活家园总部'
    },
    {
      project_id: '1',
      project_name: '五凤兰庭'
    }
    ],
    timestamp: 1637812386684
  }
]

export const delShops = [
  RegExp(businessApi.delShops),
  'post',
  {
    code: '200',
    success: true,
    message: '保存成功',
    timestamp: 1632360617392
  }
]

export const setShopsPower = [
  RegExp(businessApi.setShopsPower),
  'post',
  {
    code: '200',
    success: true,
    message: '保存成功',
    timestamp: 1632360617392
  }
]

export const getUserList = [
  RegExp(businessApi.getUserList),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      pageindex: 1,
      pagesize: 10,
      total: '2',
      list: [{
        id: '109111',
        nickname: '100****0000',
        realname: '十一',
        mobile: '10000000000',
        is_logoff: '0',
        name_text: '100****0000(十一)'
      },
      {
        id: '100000',
        nickname: '189****1800',
        realname: '鲁班',
        mobile: '18900251800',
        is_logoff: '0',
        name_text: '189****1800(鲁班)'
      }
      ]
    },
    timestamp: 1637733691041
  }
]

export const getShopCouponList = [
  RegExp(businessApi.getShopCouponList),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      pageindex: 1,
      pagesize: 10,
      total: '1',
      list: [{
        employ_rate: '33.33',
        id: '1',
        uid: '100000',
        shops_id: '1',
        coupon_status: '1',
        coupon_scene: '1',
        coupon_mode: '1',
        is_limit: '1',
        limit_num: '1',
        threshold_price: '50',
        coupon_type: '1',
        reduce_price: '500',
        reduce_discount: '0.00',
        receive: '3',
        employ: '1',
        stock: '100',
        ctime: '2021-11-25 10:25:39',
        denomination: '5元',
        coupon_status_name: '未发布',
        coupon_scene_name: '线下使用',
        coupon_mode_name: '免费领取',
        shops_name: '商家1',
        realname: '鲁班'
      },
      {
        employ_rate: '33.33',
        id: '2',
        uid: '100000',
        shops_id: '1',
        coupon_status: '3',
        coupon_scene: '1',
        coupon_mode: '1',
        is_limit: '1',
        limit_num: '1',
        threshold_price: '50',
        coupon_type: '1',
        reduce_price: '500',
        reduce_discount: '0.00',
        receive: '3',
        employ: '1',
        stock: '100',
        ctime: '2021-11-25 10:25:39',
        denomination: '5元',
        coupon_status_name: '已结束',
        coupon_scene_name: '线下使用',
        coupon_mode_name: '免费领取',
        shops_name: '商家1',
        realname: '鲁班'
      },
      {
        employ_rate: '33.33',
        id: '3',
        uid: '100000',
        shops_id: '1',
        coupon_status: '2',
        coupon_scene: '1',
        coupon_mode: '1',
        is_limit: '1',
        limit_num: '1',
        threshold_price: '50',
        coupon_type: '1',
        reduce_price: '500',
        reduce_discount: '0.00',
        receive: '3',
        employ: '1',
        stock: '100',
        ctime: '2021-11-25 10:25:39',
        denomination: '5元',
        coupon_status_name: '领取中',
        coupon_scene_name: '线下使用',
        coupon_mode_name: '免费领取',
        shops_name: '商家1',
        realname: '鲁班'
      }
      ]
    },
    timestamp: 1637822523769
  }
]

export const publishCoupon = [
  RegExp(businessApi.publishCoupon),
  'post',
  {
    code: '200',
    success: true,
    message: '保存成功',
    timestamp: 1632360617392
  }
]

export const finishCoupon = [
  RegExp(businessApi.finishCoupon),
  'post',
  {
    code: '200',
    success: true,
    message: '保存成功',
    timestamp: 1632360617392
  }
]

export const deleteCoupon = [
  RegExp(businessApi.deleteCoupon),
  'post',
  {
    code: '200',
    success: true,
    message: '保存成功',
    timestamp: 1632360617392
  }
]

export const getCouponInfo = [
  RegExp(businessApi.getCouponInfo),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      shops_coupon_id: '1',
      coupon_name: '优惠券1',
      miane: '5元',
      nickname: '189****1800',
      realname: '鲁班',
      menkan: '50元',
      shops_name: '商家1',
      youxiaoqi: '3天',
      coupon_status: '2',
      coupon_status_name: '未发布',
      log_data: [{
        name: '用户昵称(189****1800)',
        ctime: '2021-11-25 10:25:39'
      },
      {
        name: '用户昵称(189****1800)',
        ctime: '2021-11-25 10:25:39'
      },
      {
        name: '',
        ctime: ''
      },
      {
        name: '用户昵称(189****1800)',
        ctime: '2021-11-25 10:25:39'
      }
      ],
      stock: '100',
      surplus: 97,
      receive: '3',
      employ: '1',
      employ_rate: '33.33',
      coupon_type: '1',
      coupon_type_name: '满减券',
      ctime: '2021-11-25 10:25:39',
      coupon_scene: '1',
      coupon_scene_name: '线下使用',
      coupon_mode_text: '免费领取',
      available_text: '全部用户',
      goods_text: '全部商品',
      fb_time: '2021-11-25 10:25:39（立即发布 ）',
      sj_etime: '2021-11-25 21:32:19（实际结束）',
      ds_etime: ''
    },
    timestamp: 1638173204746
  }
]

export const getUserCouponList = [
  RegExp(businessApi.getUserCouponList),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      pageindex: 1,
      pagesize: 10,
      total: '1',
      list: [{
        id: '1',
        uid: '100020',
        shops_coupon_id: '1',
        couopn_mode: '1',
        pay_type: '0',
        pay_money: '--',
        c_status: '1',
        ptime: '2021-11-29 10:27:04',
        u_time: '0',
        g_etime: '1638412023',
        shops_coupon_name: '优惠券1',
        nickname: '159****3868',
        realname: '',
        mobile: '15959063868',
        c_status_name: '未使用',
        couopn_mode_name: '免费领取',
        sygq_time: ''
      }]
    },
    timestamp: 1638155673088
  }
]

export const getUserShopInfo = [
  RegExp(appUser.getUserShopInfo),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      shops_id: '1',
      uid: '100000',
      project_id: '1',
      project_name: '五凤兰庭',
      ctime: '2021-11-24 14:37:32',
      shops_name: '商家1',
      phone: '0591-88822114',
      business_hours: '09:00~18:00',
      shops_notice: '公告',
      address_detail: ''
    },
    timestamp: 1638253019773
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
