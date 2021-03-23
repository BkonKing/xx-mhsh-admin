import {
  RouteView
} from '@/layouts'

export default {
  path: '/property',
  name: 'property',
  component: RouteView,
  meta: {
    title: '物业管家',
    icon: 'table'
  },
  redirect: '/property/butler', // 二级菜单需要重定向一个三级菜单地址
  children: [
    {
      path: '/property/lifePay', // 完整地址
      name: 'lifePay',
      component: RouteView,
      meta: {
        title: '生活缴费',
        icon: 'table'
      },
      redirect: '/property/lifePay/balanceManage',
      children: [
        {
          path: '/property/lifePay/paymentRecord', // 完整地址
          name: 'paymentRecord',
          component: () => import(/* webpackChunkName: "life" */ '@/views/property/lifePay/payment'),
          meta: {
            title: '充缴记录',
            icon: 'table'
          }
        },
        {
          path: '/property/lifePay/callpayRecord', // 完整地址
          name: 'callpayRecord',
          component: () => import(/* webpackChunkName: "life" */ '@/views/property/lifePay/callpay'),
          meta: {
            title: '催缴记录',
            icon: 'table'
          }
        },
        {
          path: '/property/lifePay/balanceManage', // 完整地址
          name: 'balanceManage',
          component: () => import(/* webpackChunkName: "life" */ '@/views/property/lifePay/balance'),
          meta: {
            title: '余额管理',
            icon: 'table'
          }
        },
        {
          path: '/property/lifePay/balanceManage', // 完整地址
          name: 'balanceManage',
          component: RouteView,
          meta: {
            title: '余额管理',
            icon: 'table'
          },
          children: [
            {
              path: '/property/lifePay/balanceDetail', // 完整地址
              name: 'balanceDetail',
              component: () => import(/* webpackChunkName: "life" */ '@/views/property/lifePay/balance-detail'),
              meta: {
                title: '余额详情',
                icon: 'table'
              }
            }
          ]
        },
        {
          path: '/property/lifePay/statistics', // 完整地址
          name: 'statistics',
          component: () => import(/* webpackChunkName: "life" */ '@/views/property/lifePay/statistics'),
          meta: {
            title: '数据统计',
            icon: 'table'
          }
        },
        {
          path: '/property/lifePay/logs', // 完整地址
          name: 'logs',
          component: () => import(/* webpackChunkName: "life" */ '@/views/property/lifePay/logs'),
          meta: {
            title: '操作日志',
            icon: 'table'
          }
        }
      ]
    }
  ]
}
