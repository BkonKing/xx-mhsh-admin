import {
  RouteView
} from '@/layouts'

export default {
  path: '/realty',
  name: 'realty',
  component: RouteView,
  meta: {
    title: '房产管理'
  },
  children: [
    // 房屋管理
    {
      path: '/realty/house',
      name: 'realtyLog',
      component: () => import(/* webpackChunkName: "realty" */ '@/views/realty/house'),
      meta: {
        title: '房屋管理'
      }
    }
  ]

}
