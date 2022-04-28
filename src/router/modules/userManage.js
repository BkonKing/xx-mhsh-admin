import {
  RouteView
} from '@/layouts'

export default {
  path: '/userManage',
  name: 'userManage',
  component: RouteView,
  meta: {
    title: '用户管理'
  },
  redirect: '/userManage/appUser',
  children: [
    {
      path: '/userManage/appUser',
      name: 'appUser',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/appUser'),
      meta: {
        title: '真实用户'
      }
    },
    {
      path: '/userManage/appUserChild',
      name: 'appUserChild',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/appUserChild'),
      meta: {
        title: '成员管理'
      }
    },
    // 用户标签
    {
      path: '/user/label',
      name: 'userLabel',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/userLabel'),
      meta: {
        title: '用户标签'
      }
    },
    // 员工管理
    {
      path: '/employee/list',
      name: 'employeeList',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/employee/list'),
      meta: {
        title: '员工列表'
      }
    },
    {
      path: '/employee/setting',
      name: 'employeeSetting',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/employee/setting'),
      meta: {
        title: '员工设置'
      }
    },
    {
      path: '/userManage/tourist',
      name: 'tourist',
      component: () => import(/* webpackChunkName: "userManage" */ '@/views/userManage/tourist'),
      meta: {
        title: '游客管理'
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
          component: () => import(/* webpackChunkName: "businessManage" */ '@/views/businessManage/list'),
          meta: {
            title: '商家列表'
          }
        },
        {
          path: '/store/staffList',
          name: 'storeStaffList',
          component: () => import(/* webpackChunkName: "businessManage" */ '@/views/businessManage/staffList'),
          meta: {
            title: '员工列表'
          }
        },
        {
          path: '/store/coupon',
          name: 'storeCoupon',
          component: () => import(/* webpackChunkName: "businessManage" */ '@/views/businessManage/coupon'),
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
              component: () => import(/* webpackChunkName: "businessManage" */ '@/views/businessManage/couponDetail'),
              meta: {
                title: '券详情'
              }
            }
          ]
        },
        {
          path: '/store/setting',
          name: 'storeSetting',
          component: () => import(/* webpackChunkName: "businessManage" */ '@/views/businessManage/setting'),
          meta: {
            title: '商家设置'
          }
        }
      ]
    }
  ]

}
