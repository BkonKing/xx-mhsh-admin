import {
  RouteView
} from '@/layouts'
// 运营中心
export default {
  path: '/operatingCenter',
  name: 'operatingCenter',
  component: RouteView,
  meta: {
    title: '运营中心',
    icon: 'table'
  },
  redirect: '/operatingCenter/appmessage',
  children: [
    {
      path: '/operatingCenter/activity', // 完整地址
      name: 'activity',
      component: RouteView,
      meta: {
        title: '活动管理',
        icon: 'table'
      },
      redirect: '/operatingCenter/activity/integral',
      children: [
        {
          path: '/operatingCenter/activity/integral', // 完整地址
          name: 'integralActivity',
          component: () => import(/* webpackChunkName: "life" */ '@/views/operatingCenter/activity/integral'),
          meta: {
            title: '积分活动',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/operatingCenter/appmessage', // app消息
      name: 'appmessage',
      component: () => import('@/views/operatingCenter/announcement/appmessage/appmessage'),
      meta: {
        title: 'APP消息',
        icon: 'table'
      }
    },
    {
      path: '/operatingCenter/shortNote', // 短信通知
      name: 'shortNote',
      component: () => import('@/views/operatingCenter/announcement/shortNote/shortNote'),
      meta: {
        title: '短信通知',
        icon: 'table'
      }
    },
    {
      path: '/operatingCenter/addmsg', // 新增消息
      name: 'addmsg',
      component: () => import('@/views/operatingCenter/announcement/appmessage/msgList/addmsg'),
      meta: {
        title: '新增消息',
        icon: 'table'
      }
    },
    {
      path: '/operatingCenter/msgDetail', // 信息详情
      name: 'msgDetail',
      component: () => import('@/views/operatingCenter/announcement/appmessage/msgList/msgDetail/msgDetail'),
      meta: {
        title: '消息详情',
        icon: 'table'
      }
    },
    {
      path: '/operatingCenter/addNote', // 新增短信
      name: 'addNote',
      component: () => import('@/views/operatingCenter/announcement/shortNote/noteList/addNote'),
      meta: {
        title: '新增短信',
        icon: 'table'
      }
    },
    {
      path: '/operatingCenter/noteDetail', // 信息详情
      name: 'noteDetail',
      component: () => import('@/views/operatingCenter/announcement/shortNote/noteList/noteDetail/noteDetail'),
      meta: {
        title: '短信详情',
        icon: 'table'
      }
    }
  ]
}
