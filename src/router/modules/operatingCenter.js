import {
  RouteView
} from '@/layouts'
// 运营中心
export default {
  path: '/operatingCenter',
  name: 'operatingCenter',
  component: RouteView,
  meta: {
    title: '运营中心'
  },
  redirect: '/operatingCenter/special/list',
  children: [
    {
      path: '/operatingCenter/activity',
      name: 'activity',
      component: RouteView,
      meta: {
        title: '活动管理'
      },
      redirect: '/operatingCenter/special/list',
      children: [
        {
          path: '/operatingCenter/special/list',
          name: 'specialList',
          component: () => import(/* webpackChunkName: "special" */ '@/views/operatingCenter/special/list'),
          meta: {
            title: '专题管理'
          }
        },
        {
          path: '/operatingCenter/special/list2',
          name: 'specialList2',
          component: RouteView,
          meta: {
            title: '专题列表'
          },
          redirect: '/operatingCenter/special/list',
          children: [
            {
              path: '/operatingCenter/special/detail',
              name: 'specialDetail',
              component: () => import(/* webpackChunkName: "special" */ '@/views/operatingCenter/special/detail'),
              meta: {
                title: '专题详情'
              }
            },
            {
              path: '/operatingCenter/special/edit',
              name: 'specialEdit',
              component: () => import(/* webpackChunkName: "special" */ '@/views/operatingCenter/special/edit'),
              meta: {
                title: '编辑专题'
              }
            }
          ]
        },
        {
          path: '/operatingCenter/activity/integral',
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
        },
        {
          path: '/operatingCenter/lottery/index',
          name: 'lotteryIndex',
          component: () => import('@/views/operatingCenter/activity/lottery/index'),
          meta: {
            title: '转盘抽奖'
          }
        },
        {
          path: '/operatingCenter/handRoomGift/index',
          name: 'handRoomGift',
          component: () => import('@/views/operatingCenter/handRoomGift/index'),
          meta: {
            title: '交房礼'
          }
        }
      ]
    },
    {
      path: '/operatingCenter/appmessage', // app消息
      name: 'appmessage',
      component: () => import('@/views/operatingCenter/announcement/appmessage/appmessage'),
      meta: {
        title: 'APP消息'
      }
    },
    {
      path: '/operatingCenter/shortNote', // 短信通知
      name: 'shortNote',
      component: () => import('@/views/operatingCenter/announcement/shortNote/shortNote'),
      meta: {
        title: '短信通知'
      }
    },
    {
      path: '/operatingCenter/addmsg', // 新增消息
      name: 'addmsg',
      component: () => import('@/views/operatingCenter/announcement/appmessage/msgList/addmsg'),
      meta: {
        title: '新增消息'
      }
    },
    {
      path: '/operatingCenter/msgDetail', // 信息详情
      name: 'msgDetail',
      component: () => import('@/views/operatingCenter/announcement/appmessage/msgList/msgDetail/msgDetail'),
      meta: {
        title: '消息详情'
      }
    },
    {
      path: '/operatingCenter/addNote', // 新增短信
      name: 'addNote',
      component: () => import('@/views/operatingCenter/announcement/shortNote/noteList/addNote'),
      meta: {
        title: '新增短信'
      }
    },
    {
      path: '/operatingCenter/noteDetail', // 信息详情
      name: 'noteDetail',
      component: () => import('@/views/operatingCenter/announcement/shortNote/noteList/noteDetail/noteDetail'),
      meta: {
        title: '短信详情'
      }
    }
  ]
}
