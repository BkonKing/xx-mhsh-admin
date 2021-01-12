import {
  PageView
} from '@/layouts'

export default {
  path: '/life',
  name: 'life',
  component: PageView,
  meta: {
    title: '电商管理',
    icon: 'table'
  },
  redirect: '/life/goods', // 二级菜单需要重定向一个三级菜单地址
  children: [{
    path: '/life/goods', // 完整地址
    name: 'LifeGoods',
    component: () => import(/* webpackChunkName: "life" */ '@/views/life/goods'),
    meta: {
      title: '商品管理',
      icon: 'table'
    }
  }, {
    path: '/life/category', // 完整地址
    name: 'LifeCategory',
    component: () => import(/* webpackChunkName: "life" */ '@/views/life/category'),
    meta: {
      title: '商品分类',
      icon: 'table'
    }
  }]
}
