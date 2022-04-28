import {
  PageView,
  RouteView
} from '@/layouts'

export default {
  path: '/movie',
  name: 'movie',
  component: PageView,
  meta: {
    title: '电影管理'
  },
  redirect: '/movie/order',
  children: [
    {
      path: '/movie/order',
      name: 'movieOrder',
      component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/order'),
      meta: {
        title: '影票订单'
      }
    },
    {
      path: '/movie/order',
      name: 'movieOrder',
      component: RouteView,
      meta: {
        title: '影票订单'
      },
      children: [
        {
          path: '/movie/detail',
          name: 'movieDetail',
          component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/detail'),
          meta: {
            title: '订单详情'
          }
        }
      ]
    },
    {
      path: '/movie/refund',
      name: 'refund',
      component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/refund'),
      meta: {
        title: '退款申请'
      }
    },
    {
      path: '/movie/refund',
      name: 'refund',
      component: RouteView,
      meta: {
        title: '退款申请'
      },
      children: [
        {
          path: '/movie/refundDetail',
          name: 'refundDetail',
          component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/refundDetail'),
          meta: {
            title: '退款详情'
          }
        }
      ]
    },
    {
      path: '/movie/film',
      name: 'film',
      component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/film'),
      meta: {
        title: '影片列表'
      }
    },
    {
      path: '/movie/film',
      name: 'film',
      component: RouteView,
      meta: {
        title: '影片列表'
      },
      children: [
        {
          path: '/movie/filmDetail',
          name: 'filmDetail',
          component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/filmDetail'),
          meta: {
            title: '影片详情'
          }
        }
      ]
    },
    {
      path: '/movie/filmSet',
      name: 'filmSet',
      component: () => import(/* webpackChunkName: "movie" */ '@/views/movie/filmSet'),
      meta: {
        title: '电影设置'
      }
    }
  ]
}
