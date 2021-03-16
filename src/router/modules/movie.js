import {
  PageView,
  RouteView
} from '@/layouts'

export default {
  path: '/movie',
  name: 'movie',
  component: PageView,
  meta: {
    title: '电影管理',
    icon: 'table'
  },
  redirect: '/movie/order', // 二级菜单需要重定向一个三级菜单地址
  children: [
    {
      path: '/movie/order', // 完整地址
      name: 'movieOrder',
      component: () => import(/* webpackChunkName: "life" */ '@/views/movie/order'),
      meta: {
        title: '影票订单',
        icon: 'table'
      }
    },
    {
      path: '/movie/order', // 完整地址
      name: 'movieOrder',
      component: RouteView,
      meta: {
        title: '影票订单',
        icon: 'table'
      },
      children: [
        {
          path: '/movie/detail', // 完整地址
          name: 'movieDetail',
          component: () => import(/* webpackChunkName: "life" */ '@/views/movie/detail'),
          meta: {
            title: '订单详情',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/movie/refund', // 完整地址
      name: 'refund',
      component: () => import(/* webpackChunkName: "life" */ '@/views/movie/refund'),
      meta: {
        title: '退款申请',
        icon: 'table'
      }
    },
    {
      path: '/movie/refund', // 完整地址
      name: 'refund',
      component: RouteView,
      meta: {
        title: '退款申请',
        icon: 'table'
      },
      children: [
        {
          path: '/movie/refundDetail', // 完整地址
          name: 'refundDetail',
          component: () => import(/* webpackChunkName: "life" */ '@/views/movie/refundDetail'),
          meta: {
            title: '退款详情',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/movie/film', // 完整地址
      name: 'film',
      component: () => import(/* webpackChunkName: "life" */ '@/views/movie/film'),
      meta: {
        title: '影片列表',
        icon: 'table'
      }
    },
    {
      path: '/movie/film', // 完整地址
      name: 'film',
      component: RouteView,
      meta: {
        title: '影片列表',
        icon: 'table'
      },
      children: [
        {
          path: '/movie/filmDetail', // 完整地址
          name: 'filmDetail',
          component: () => import(/* webpackChunkName: "life" */ '@/views/movie/filmDetail'),
          meta: {
            title: '影片详情',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: '/movie/filmSet', // 完整地址
      name: 'filmSet',
      component: () => import(/* webpackChunkName: "life" */ '@/views/movie/filmSet'),
      meta: {
        title: '电影设置',
        icon: 'table'
      }
    }
  ]
}
