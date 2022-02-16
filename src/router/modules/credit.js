import {
  RouteView
} from '@/layouts'

export default // 幸福币
{
  path: '/credit',
  name: 'credit',
  component: RouteView,
  redirect: '/credit/withdraw',
  meta: {
    title: '商家管理'
  },
  children: [
    {
      path: '/credit/withdrawList',
      name: 'withdrawList',
      component: () => import('@/views/credit/withdrawList'),
      meta: {
        title: '提现申请'
      }
    },
    {
      path: '/credit/withdrawList2',
      name: 'withdrawList2',
      component: RouteView,
      redirect: '/credit/withdrawList',
      meta: {
        title: '提现申请'
      },
      children: [
        {
          path: '/credit/withdrawDetail',
          name: 'withdrawDetail',
          component: () => import('@/views/credit/withdrawDetail'),
          meta: {
            title: '提现详情'
          }
        }
      ]
    }
  ]
}
