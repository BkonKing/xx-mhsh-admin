import {
  RouteView
} from '@/layouts'

export default {
  path: '/financeCenter',
  name: 'financeCenter',
  component: RouteView,
  meta: {
    title: '财务中心',
    icon: 'table'
  },
  redirect: '/financeCenter/accountInfo',
  children: [
    {
      path: '/financeCenter/accountInfo',
      name: 'accountInfo',
      component: () => import('@/views/financeCenter/accountInfo.vue'),
      meta: {
        title: '账户信息',
        icon: 'table'
      }
    },
    {
      path: '/financeCenter/accountRecharge',
      name: 'accountRecharge',
      component: () => import('@/views/financeCenter/accountRecharge.vue'),
      meta: {
        title: '账户充值',
        icon: 'table'
      }
    }

  ]

}
