import {
  RouteView
} from '@/layouts'

export default {
  path: '/userManage',
  name: 'userManage',
  component: RouteView,
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  redirect: '/userManage/appUser',
  children: [
    {
      path: '/userManage/appUser',
      name: 'appUser',
      component: () => import('@/views/userManage/appUser'),
      meta: {
        title: '真实用户'
      }
    },
    // 用户标签
    {
      path: '/user/label',
      name: 'userLabel',
      component: () => import('@/views/userManage/userLabel'),
      meta: {
        title: '用户标签'
      }
    }
  ]

}
