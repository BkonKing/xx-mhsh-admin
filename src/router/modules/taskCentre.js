import {
  RouteView
} from '@/layouts'

export default {
  path: '/taskCentre',
  name: 'taskCentre',
  component: RouteView,
  meta: {
    title: '任务中心'
  },
  redirect: '/taskCentre/task',
  children: [
    {
      path: '/taskCentre/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/task'),
      meta: {
        title: '任务'
      }
    },
    {
      path: '/taskCentre/askQuestion',
      name: 'askQuestion',
      component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/askQuestion'),
      meta: {
        title: '提问'
      }
    },
    {
      path: '/taskCentre/evaluate',
      name: 'evaluate',
      component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/evaluate'),
      meta: {
        title: '评价'
      }
    },
    {
      path: '/taskCentre/complain',
      name: 'complain',
      component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/complain'),
      meta: {
        title: '投诉'
      }
    },
    {
      path: '/taskCentre/taskGroup',
      name: 'taskGroup',
      component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/taskGroup'),
      meta: {
        title: '任务群'
      }
    },
    {
      path: '/taskCentre/setting/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/setting/setting'),
      meta: {
        title: '设置'
      }
    },
    {
      path: '/taskCentre/taskGroup2',
      name: 'taskGroup2',
      component: RouteView,
      meta: {
        title: '任务群'
      },
      redirect: '/taskCentre/taskGroup',
      children: [
        {
          path: '/taskCentre/groupDetail',
          name: 'groupDetail',
          component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/groupDetail'),
          meta: {
            title: '群详情'
          }
        }
      ]
    },
    {
      path: '/taskCentre/task2',
      name: 'task2',
      component: RouteView,
      meta: {
        title: '任务'
      },
      redirect: '/taskCentre/task',
      children: [
        // {
        //   path: '/taskCentre/addTask',
        //   name: 'addTask',
        //   component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/addTask'),
        //   meta: {
        //     title: '新建任务'
        //   }
        // },
        {
          path: '/taskCentre/complete',
          name: 'complete',
          component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/complete'),
          meta: {
            title: '任务详情'
          }
        },
        {
          path: '/taskCentre/toCheck',
          name: 'toCheck',
          component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/toCheck'),
          meta: {
            title: '任务详情'
          }
        }
      ]
    },
    {
      path: '/taskCentre/complain11',
      name: 'task3',
      component: RouteView,
      meta: {
        title: '投诉'
      },
      redirect: '/taskCentre/complain',
      children: [
        {
          path: '/taskCentre/complainDetail',
          name: 'complainDetail',
          component: () => import(/* webpackChunkName: "task" */ '@/views/taskCentre/complainDetail'),
          meta: {
            title: '投诉详情'
          }
        }
      ]
    }
  ]
}
