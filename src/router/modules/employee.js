import {
  RouteView
} from '@/layouts'

export default {
  path: '/employee',
  name: 'employee',
  component: RouteView,
  meta: {
    title: '员工管理'
  },
  redirect: '/employee/list',
  children: [
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
