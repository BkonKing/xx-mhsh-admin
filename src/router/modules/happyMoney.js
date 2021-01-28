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
    },
    {
      path: '/happyMoney/applyTotal',
      name: 'applyTotal',
      component: () => import('@/views/happyMoney/apply/applyTotal'),
      meta: {
        title: '申请-总后台',
        icon: 'table'
      }
    },
    {
      path: '/happyMoney/applySon',
      name: 'applySon',
      component: () => import('@/views/happyMoney/apply/applySon'),
      meta: {
        title: '申请-子后台',
        icon: 'table'
      }
    },
    {
      path: '/happyMoney/task',
      name: 'task',
      component: () => import('@/views/happyMoney/task/task'),
      meta: {
        title: '任务',
        icon: 'table'
      }
    },
    {
      path: '/happyMoney/setTask',
      name: 'setTask',
      component: () => import('@/views/happyMoney/task/setTask'),
      meta: {
        title: '任务设置',
        icon: 'table'
      }
    },
    {
      path: '/happyMoney/setAccount',
      name: 'setAccount',
      component: () => import('@/views/happyMoney/setAccount/setAccount'),
      meta: {
        title: '账户设置',
        icon: 'table'
      }
    }

  ]
}
