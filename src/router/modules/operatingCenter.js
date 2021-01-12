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
      path: '/operatingCenter/appmessage', // app消息
      name: 'appmessage',
      component: () => import('@/views/operatingCenter/announcement/appmessage/appmessage'),
      meta: {
        title: 'APP消息',
        icon: 'table'
      }
      // redirect: '/operatingCenter/appmessage/msgList',
      // children: [
      //   {
      //     path: '/operatingCenter/appmessage/msgList', // 消息列表
      //     name: 'msgList',
      //     component: () => import('@/views/operatingCenter/announcement/appmessage/msgList/msgList'),
      //     meta: {
      //       title: '消息列表',
      //       icon: 'table'
      //     }
      //   },
      //   {
      //     path: '/operatingCenter/appmessage/history', // 推送历史
      //     name: 'history',
      //     component: () => import('@/views/operatingCenter/announcement/appmessage/history/history'),
      //     meta: {
      //       title: '推送历史',
      //       icon: 'table'
      //     }
      //   },
      //   {
      //     path: '/operatingCenter/appmessage/msgTemplate', // 消息模板
      //     name: 'msgTemplate',
      //     component: () => import('@/views/operatingCenter/announcement/appmessage/msgTemplate/msgTemplate'),
      //     meta: {
      //       title: '消息模板',
      //       icon: 'table'
      //     }
      //   }
      // ]
    },
    {
      path: '/operatingCenter/shortNote', // 短信通知
      name: 'shortNote',
      component: () => import('@/views/operatingCenter/announcement/shortNote/shortNote'),
      meta: {
        title: '短信通知',
        icon: 'table'
      }
    }
  ]
}
