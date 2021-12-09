import {
  RouteView
} from '@/layouts'

export default {
  path: '/community',
  name: 'community',
  component: RouteView,
  meta: {
    title: '社区服务'
  },
  redirect: '/community/freeServer/list',
  children: [
    // 免费服务列表
    {
      path: '/community/freeServer/list',
      name: 'freeServerList',
      component: () => import('@/views/community/freeServer/list'),
      meta: {
        title: '免费服务'
      }
    },
    {
      path: '/community/freeServer/list2',
      name: 'freeServerList',
      component: RouteView,
      meta: {
        title: '免费服务'
      },
      redirect: '/community/freeServer/list',
      children: [
        // 免费服务设置
        {
          path: '/community/freeServer/setting',
          name: 'freeServerSetting',
          component: () => import('@/views/community/freeServer/setting'),
          meta: {
            title: '服务设置'
          }
        }
      ]
    },
    // 服务记录
    {
      path: '/community/serviceLog',
      name: 'serviceLog',
      component: () => import('@/views/community/serviceLog/index'),
      meta: {
        title: '服务记录'
      }
    }
  ]

}
