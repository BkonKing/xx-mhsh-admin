import {
  PageView
} from '@/layouts'

export default {
  path: '/systemSetup',
  name: 'systemSetup',
  component: PageView,
  meta: {
    title: '系统设置',
    icon: 'table'
  },
  redirect: '/systemSetup/limitRole',
  children: [
    {
      path: '/systemSetup/limitRole',
      name: 'limitRole',
      component: () => import('@/views/systemSetup/limitRole'),
      meta: {
        title: '权限角色',
        icon: 'table'
      }
    },
    {
      path: '/systemSetup/adminer',
      name: 'adminer',
      component: () => import('@/views/systemSetup/adminer'),
      meta: {
        title: '管理员',
        icon: 'table'
      }
    }
  ]
}
