import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import pageMaps from './pageMaps'
// import {
//   UserLayout,
//   BasicLayout
//   // BlankLayout
// } from '@/layouts'
// import userRoutes from './modules/user'

/**
 * 重写路由的push方法
 */
// 保存原来的push函数
const routerPush = Router.prototype.push
// 重写push函数
Router.prototype.push = function push (location, onComplete, onAbort) {
  if (process.env.NODE_ENV === 'production') {
    let url = `#${location}`
    if (typeof location !== 'string') {
      url = this.resolve(location).href
    }
    const href = url.split('?')[0]
    if (pageMaps[href]) {
      const ht = +Cookies.get('project_id') ? 'xmht' : 'zht'
      const hash = encodeURIComponent(`/film/index.html${url}`)
      const newHref = `/${ht}${pageMaps[href]}?url=${hash}`
      // 如果重新跳转的地址跟顶层地址一样就刷新顶层页面
      if ((top.location.origin + newHref) === top.location.href) {
        top.location.reload()
        return
      }
      top.location.href = newHref
      return
    } else {
      // 调用原来的push函数，并捕获异常
      return routerPush.call(this, location, onComplete, onAbort).catch(error => error)
    }
  }
  // 调用原来的push函数，并捕获异常
  return routerPush.call(this, location, onComplete, onAbort).catch(error => error)
}

Vue.use(Router)

const asyncRoutes = []

const moduleRoutes = require.context('./modules', true, /\.js$/)

moduleRoutes.keys().forEach((name) => {
  asyncRoutes.push(moduleRoutes(name).default)
})
export {
  asyncRoutes
}

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

// 找不到路由则显示404
const errorRoute = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]

export default new Router({
  mode: process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true' ? 'history' : 'hash',
  routes: asyncRoutes.concat(constantRoutes).concat(errorRoute),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
