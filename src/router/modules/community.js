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
    // 服务记录
    {
      path: '/community/serviceLog',
      name: 'serviceLog',
      component: () => import('@/views/community/serviceLog'),
      meta: {
        title: '服务记录'
      }
    }
  ]

}
