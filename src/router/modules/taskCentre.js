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
      path: '/taskCentre/askQuestion', // 完整地址
      name: 'askQuestion',
      component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/askQuestion'),
      meta: {
        title: '提问',
        icon: 'table'
      }
    },
    {
      path: '/taskCentre/evaluate', // 完整地址
      name: 'evaluate',
      component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/evaluate'),
      meta: {
        title: '评价',
        icon: 'table'
      }
    },
    {
      path: '/taskCentre/complain', // 完整地址
      name: 'complain',
      component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/complain'),
      meta: {
        title: '投诉',
        icon: 'table'
      }
    },
    {
      path: '/taskCentre/taskGroup', // 完整地址
      name: 'taskGroup',
      component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/taskGroup'),
      meta: {
        title: '任务群',
        icon: 'table'
      }
    },
    {
      path: '/taskCentre/setting/setting', // 完整地址
      name: 'setting',
      component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/setting/setting'),
      meta: {
        title: '设置',
        icon: 'table'
      }
    },
    {
      path: '/taskCentre/taskGroup2', // 完整地址
      name: 'taskGroup2',
      component: RouteView,
      meta: {
        title: '任务群',
        icon: 'table'
      },
      redirect: '/taskCentre/groupDetail',
      children: [
        {
          path: '/taskCentre/groupDetail', // 完整地址
          name: 'groupDetail',
          component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/groupDetail'),
          meta: {
            title: '群详情',
            icon: 'table'
          }
        }
      ]
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
        },
        {
          path: '/taskCentre/toCheck', // 完整地址
          name: 'toCheck',
          component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/toCheck'),
          meta: {
            title: '任务详情',
            icon: 'table'
          }
        },
        {
          path: '/taskCentre/complainDetail', // 完整地址
          name: 'complainDetail',
          component: () => import(/* webpackChunkName: "life" */ '@/views/taskCentre/complainDetail'),
          meta: {
            title: '任务详情',
            icon: 'table'
          }
        }
      ]
    }
  ]
}
