import {
  userApi
} from '@/api/user'
import {
  withdrawApi
} from '@/api/credit/withdraw'
import {
  asyncRoutes
} from '@/router'

export const login = [
  RegExp(userApi.Login),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      access_token: '123123'
    }
  }
]

export const loginout = [
  RegExp(userApi.Logout),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK'
  }
]

export const getCheckAndPayInfo = [
  RegExp(withdrawApi.getCheckAndPayInfo),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      cash_credits: 400,
      cash_rmb: '40.00',
      actual_rmb: '38.00',
      project_account: [
        {
          mobile: '15060445590',
          realname: '彭俪婷'
        }
      ],
      shops_account: [
        {
          mobile: '15860069682',
          realname: '范旺林'
        },
        {
          mobile: '15060445590',
          realname: '彭俪婷'
        },
        {
          mobile: '15060445590',
          realname: '彭俪婷'
        },
        {
          mobile: '15060445590',
          realname: '彭俪婷'
        }
      ]
    }
  }
]

export const getCashList = [
  RegExp(withdrawApi.getCashList),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      project_audit_count: 0,
      headquarters_audit_count: 0,
      payment_tobepaid_count: 0,
      paid_count: 0,
      rejected_count: 1,
      pagesize: 10,
      pageindex: 1,
      total: 1,
      list: [
        {
          id: 4,
          user_type: 2,
          uid: 100054,
          cashout_numb: '2202151135570100054',
          credits: '10000',
          credits_sub: '950.00',
          service_fee: '50.00',
          ctime: '',
          payment_time: '',
          procedure: '1',
          head_check_time: '',
          project_check_time: '',
          status: 6,
          cash_status_desc: '交易取消',
          check_time_desc: '',
          is_over: '',
          mobile: '',
          realname: ''
        }
      ],
      to_be_reviewed: '0.00',
      'to_be_paid ': '0.00',
      paid: '0.00'
    }
  }
]

const setMenu = (data) => {
  const home = {
    path: '/home',
    name: 'index',
    hideChildrenInMenu: true,
    meta: {
      title: '首页',
      icon: 'table'
    }
  }
  data.unshift(home)
  return data.map(obj => {
    delete obj.component
    if (data.children && data.children.length) {
      data.children = setMenu(data.children)
    }
    return obj
  })
}

export const UserMenu = [
  RegExp(userApi.UserMenu),
  'get',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: setMenu(asyncRoutes)
  }
]
