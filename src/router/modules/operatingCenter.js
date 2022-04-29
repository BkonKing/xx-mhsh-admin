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
          component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/special/list'),
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
              component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/special/detail'),
              meta: {
                title: '专题详情'
              }
            },
            {
              path: '/operatingCenter/special/edit',
              name: 'specialEdit',
              component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/special/edit'),
              meta: {
                title: '编辑专题'
              }
            }
          ]
        },
        {
          path: '/operatingCenter/activity/integral',
          name: 'integralActivity',
          component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/activity/integral'),
          meta: {
            title: '积分活动'
          }
        },
        {
          path: '/operatingCenter/activity/invite/index',
          name: 'inviteActivity',
          component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/activity/invite/index'),
          meta: {
            title: '邀请情况'
          }
        },
        {
          path: '/operatingCenter/activity/invite/setting',
          name: 'inviteActivitySetting',
          component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/activity/invite/setting'),
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
          component: () => import(/* webpackChunkName: "activity" */ '@/views/operatingCenter/handRoomGift/index'),
          meta: {
            title: '交房礼'
          }
        }
      ]
    }
  ]
}
