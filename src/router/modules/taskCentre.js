import {
  RouteView
} from '@/layouts'

export default {
  path: '/taskCentre',
  name: 'taskCentre',
  component: RouteView,
  meta: {
    title: '任务中心',
    icon: 'table'
  },
  redirect: '/taskCentre/task', // 二级菜单需要重定向一个三级菜单地址
  children: [
    {
      path: '/taskCentre/task', // 完整地址
      name: 'task',
      component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/task'),
      meta: {
        title: '任务',
        icon: 'table'
      }
    },
    {
      path: '/taskCentre/task2', // 完整地址
      name: 'task2',
      component: RouteView,
      meta: {
        title: '任务',
        icon: 'table'
      },
      redirect: '/taskCentre/addTask',
      children: [
        {
          path: '/taskCentre/addTask', // 完整地址
          name: 'addTask',
          component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/addTask'),
          meta: {
            title: '新建任务',
            icon: 'table'
          }
        },
        {
          path: '/taskCentre/complete', // 完整地址
          name: 'complete',
          component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/complete'),
          meta: {
            title: '任务详情',
            icon: 'table'
          }
        }
      ]
    }
  ]
}
