import {
  RouteView
} from '@/layouts'

export default {
  path: '/userManage',
  name: 'userManage',
  component: RouteView,
  meta: {
    title: '用户管理',
    icon: 'table'
  },
  redirect: '/userManage/appUser',
  children: [
    {
      path: '/userManage/appUser',
      name: 'appUser',
      component: () => import('@/views/userManage/appUser'),
      meta: {
        title: '真实用户'
      }
    },
    {
      path: '/userManage/appUserChild',
      name: 'appUserChild',
      component: () => import('@/views/userManage/appUserChild'),
      meta: {
        title: '成员管理'
      }
    },
    // 用户标签
    {
      path: '/user/label',
      name: 'userLabel',
      component: () => import('@/views/userManage/userLabel'),
      meta: {
        title: '用户标签'
      }
    },
    // 商家管理
    {
      path: '/store',
      name: 'businessManage',
      component: RouteView,
      redirect: '/store/list',
      meta: {
        title: '商家管理'
      },
      children: [
        {
          path: '/store/list',
          name: 'storeList',
          component: () => import('@/views/businessManage/list'),
          meta: {
            title: '商家列表'
          }
        },
        {
          path: '/store/staffList',
          name: 'storeStaffList',
          component: () => import('@/views/businessManage/staffList'),
          meta: {
            title: '员工列表'
          }
        },
        {
          path: '/store/coupon',
          name: 'storeCoupon',
          component: () => import('@/views/businessManage/coupon'),
          meta: {
            keepAlive: true,
            title: '店铺券'
          }
        },
        {
          path: '/store/coupon2',
          name: 'storeCoupon2',
          component: RouteView,
          redirect: '/store/coupon',
          meta: {
            title: '店铺券'
          },
          children: [
            {
              path: '/store/couponDetail',
              name: 'storeCouponDetail',
              component: () => import('@/views/businessManage/couponDetail'),
              meta: {
                title: '券详情'
              }
            }
          ]
        },
        {
          path: '/store/setting',
          name: 'storeSetting',
          component: () => import('@/views/businessManage/setting'),
          meta: {
            title: '商家设置'
          }
        }
      ]
    }
  ]

}
