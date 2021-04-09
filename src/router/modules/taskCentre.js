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
    }
  ]
}
