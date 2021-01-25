import {
  PageView
} from '@/layouts'

export default {
  path: '/happyMoney',
  name: 'happyMoney',
  component: PageView,
  meta: {
    title: '幸福币',
    icon: 'table'
  },
  redirect: '/happyMoney/detailTotal',
  children: [
    {
      path: '/happyMoney/detailTotal',
      name: 'detailTotal',
      component: () => import('@/views/happyMoney/detail/detailTotal'),
      meta: {
        title: '明细-总后台',
        icon: 'table'
      }
    },
    {
      path: '/happyMoney/detailSon',
      name: 'detailSon',
      component: () => import('@/views/happyMoney/detail/detailSon'),
      meta: {
        title: '明细-子后台',
        icon: 'table'
      }
    },
    {
      path: '/happyMoney/transfer',
      name: 'transfer',
      component: () => import('@/views/happyMoney/transfer/transfer'),
      meta: {
        title: '转账',
        icon: 'table'
      }
    }
  ]
}
