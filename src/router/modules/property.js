import {
  RouteView
} from '@/layouts'

export default {
  path: '/property',
  name: 'property',
  component: RouteView,
  meta: {
    title: '物业管家'
  },
  redirect: '/property/lifePay',
  children: [
    {
      path: '/property/lifePay',
      name: 'lifePay',
      component: RouteView,
      meta: {
        title: '生活缴费'
      },
      redirect: '/property/lifePay/paymentRecord',
      children: [
        {
          path: '/property/lifePay/paymentRecord',
          name: 'paymentRecord',
          component: () => import(/* webpackChunkName: "property" */ '@/views/property/lifePay/payment'),
          meta: {
            title: '充缴记录'
          }
        },
        {
          path: '/property/lifePay/callpayRecord',
          name: 'callpayRecord',
          component: () => import(/* webpackChunkName: "property" */ '@/views/property/lifePay/callpay'),
          meta: {
            title: '催缴记录'
          }
        },
        {
          path: '/property/lifePay/balanceManage',
          name: 'balanceManage',
          component: () => import(/* webpackChunkName: "property" */ '@/views/property/lifePay/balance'),
          meta: {
            title: '余额管理'
          }
        },
        {
          path: '/property/lifePay/balanceManage',
          name: 'balanceManage',
          component: RouteView,
          meta: {
            title: '余额管理'
          },
          children: [
            {
              path: '/property/lifePay/balanceDetail',
              name: 'balanceDetail',
              component: () => import(/* webpackChunkName: "property" */ '@/views/property/lifePay/balance-detail'),
              meta: {
                title: '余额详情'
              }
            }
          ]
        },
        {
          path: '/property/lifePay/statistics',
          name: 'statistics',
          component: () => import(/* webpackChunkName: "property" */ '@/views/property/lifePay/statistics'),
          meta: {
            title: '数据统计'
          }
        },
        {
          path: '/property/lifePay/logs',
          name: 'logs',
          component: () => import(/* webpackChunkName: "property" */ '@/views/property/lifePay/logs'),
          meta: {
            title: '操作日志'
          }
        }
      ]
    }
  ]
}
