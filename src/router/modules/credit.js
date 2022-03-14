import {
  RouteView
} from '@/layouts'

export default // 幸福币
{
  path: '/credit',
  name: 'credit',
  component: RouteView,
  redirect: '/credit/setting',
  meta: {
    title: '幸福币'
  },
  children: [
    {
      path: '/credit/setting',
      name: 'creditSetting',
      component: () => import('@/views/credit/setting'),
      meta: {
        title: '幸福币设置'
      }
    },
    {
      path: '/credit/withdraw/list',
      name: 'withdrawList',
      component: () => import('@/views/credit/withdraw/list'),
      meta: {
        keepAlive: true,
        title: '提现申请'
      }
    },
    {
      path: '/credit/withdraw/list',
      name: 'withdrawList2',
      component: RouteView,
      redirect: '/credit/withdraw/list',
      meta: {
        title: '提现申请'
      },
      children: [
        {
          path: '/credit/withdraw/detail',
          name: 'withdrawDetail',
          component: () => import('@/views/credit/withdraw/detail'),
          meta: {
            title: '提现详情'
          }
        }
      ]
    }
  ]
}
