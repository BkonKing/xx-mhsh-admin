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
