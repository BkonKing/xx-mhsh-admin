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
      path: '/operatingCenter/msgDetail', // 新增消息
      name: 'msgDetail',
      component: () => import('@/views/operatingCenter/announcement/appmessage/msgList/msgDetail/msgDetail'),
      meta: {
        title: '消息详情',
        icon: 'table'
      }
    },
    {
      path: '/operatingCenter/addNote', // 新增消息
      name: 'addNote',
      component: () => import('@/views/operatingCenter/announcement/shortNote/noteList/addNote'),
      meta: {
        title: '新增短信',
        icon: 'table'
      }
    }
  ]
}
