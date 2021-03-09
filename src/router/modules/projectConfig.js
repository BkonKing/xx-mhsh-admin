import {
  PageView
} from '@/layouts'

export default {
  path: '/projectConfig',
  name: 'projectConfig',
  component: PageView,
  meta: {
    title: '项目配置',
    icon: 'table'
  },
  redirect: '/projectConfig/projectManage',
  children: [
    {
      path: '/projectConfig/projectManage',
      name: 'projectManage',
      component: () => import('@/views/projectConfig/projectManage/projectManage'),
      meta: {
        title: '项目管理',
        icon: 'table'
      }
    },
    {
      path: '/projectConfig/areaDictionary',
      name: 'areaDictionary',
      component: () => import('@/views/projectConfig/areaDictionary/areaDictionary'),
      meta: {
        title: '区域字典',
        icon: 'table'
      }
    },
    {
      path: '/projectConfig/permissList',
      name: 'permissList',
      component: () => import('@/views/projectConfig/permissList/permissList'),
      meta: {
        title: '权限列表',
        icon: 'table'
      }
    }
  ]
}
