import {
  PageView
} from '@/layouts'

export default {
  path: '/userManage',
  name: 'userManage',
  component: PageView,
  meta: {
    title: '用户管理'
  },
  redirect: '/userManage/appUser',
  children: [
    {
      path: '/userManage/weskitUser',
      name: 'weskitUser',
      component: () => import('@/views/userManage/weskitUser'),
      meta: {
        title: '马甲用户'
      }
    },
    {
      path: '/userManage/tourist',
      name: 'tourist',
      component: () => import('@/views/userManage/tourist'),
      meta: {
        title: '游客管理'
      }
    },
    // 员工管理
    {
      path: '/employee/list',
      name: 'employeeList',
      component: () => import('@/views/userManage/employee/list'),
      meta: {
        title: '员工列表'
      }
    },
    {
      path: '/employee/company',
      name: 'employeeCompany',
      component: () => import('@/views/userManage/employee/company'),
      meta: {
        title: '公司管理'
      }
    },
    {
      path: '/employee/setting',
      name: 'employeeSetting',
      component: () => import('@/views/userManage/employee/setting'),
      meta: {
        title: '员工设置'
      }
    }
  ]

}
