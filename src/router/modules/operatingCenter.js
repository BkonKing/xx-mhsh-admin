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
          component: () => import('@/views/operatingCenter/activity/integral'),
          meta: {
            title: '积分活动'
          }
        },
        {
          path: '/operatingCenter/activity/invite/index',
          name: 'inviteActivity',
          component: () => import('@/views/operatingCenter/activity/invite/index'),
          meta: {
            title: '邀请情况'
          }
        },
        {
          path: '/operatingCenter/activity/invite/setting',
          name: 'inviteActivitySetting',
          component: () => import('@/views/operatingCenter/activity/invite/setting'),
          meta: {
            title: '邀请设置'
          }
        }
      ]
    },
    {
      path: '/operatingCenter/banner',
      name: 'Banner',
      component: () => import('@/views/operatingCenter/banner/list'),
      meta: {
        title: '轮播图'
      }
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
