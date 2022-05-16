import {
  RouteView
} from '@/layouts'

export default {
  path: '/financeCenter',
  name: 'financeCenter',
  component: RouteView,
  meta: {
    title: '账户中心'
  },
  redirect: '/financeCenter/accountInfo',
  children: [
    {
      path: '/financeCenter/accountInfo',
      name: 'accountInfo',
      component: () => import(/* webpackChunkName: "financeCenter" */ '@/views/financeCenter/accountInfo.vue'),
      meta: {
        title: '账户信息'
      }
    },
    {
      path: '/financeCenter/accountRecharge',
      name: 'accountRecharge',
      component: () => import(/* webpackChunkName: "financeCenter" */ '@/views/financeCenter/accountRecharge.vue'),
      meta: {
        title: '账户充值'
      }
    }

  ]

}
