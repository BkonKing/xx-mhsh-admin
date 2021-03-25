import {
  PageView
} from '@/layouts'

export default {
  path: '/userManage',
  name: 'userManage',
  component: PageView,
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
        title: 'APP用户',
        icon: 'table'
      }
    },
    {
      path: '/userManage/weskitUser',
      name: 'weskitUser',
      component: () => import('@/views/userManage/weskitUser'),
      meta: {
        title: '马甲用户',
        icon: 'table'
      }
    }
  ]

}
