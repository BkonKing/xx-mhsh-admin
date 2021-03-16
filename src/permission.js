import router from './router'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import {
  setDocumentTitle,
  domTitle
} from '@/utils/domUtil'
// import storage from 'store'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getLocal } from '@/utils/local.js'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const allowList = ['Login'] // 免登录路由name
const loginRoutePath = '/login'
// const defaultRoutePath = '/dashboard/workplace'
const token = getLocal('token')
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  /* has token */
  if (token) {
    if (to.path === loginRoutePath) {
      next()
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({
        path: loginRoutePath,
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
