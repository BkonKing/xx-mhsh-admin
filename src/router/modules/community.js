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
  children: [
    // 免费服务列表
    {
      path: '/community/freeService/list',
      name: 'freeService',
      component: () => import('@/views/community/freeService/list'),
      meta: {
        title: '免费服务'
      }
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
