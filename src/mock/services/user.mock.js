import {
  userApi
} from '@/api/user'
import {
  asyncRoutes
} from '@/router'

export const login = [
  RegExp(userApi.Login),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      access_token: '123123'
    }
  }
]

export const loginout = [
  RegExp(userApi.Logout),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK'
  }
]

const setMenu = (data) => {
  const home = {
    path: '/home',
    name: 'index',
    hideChildrenInMenu: true,
    meta: {
      title: '首页',
      icon: 'table'
    }
  }
  data.unshift(home)
  return data.map(obj => {
    delete obj.component
    if (data.children && data.children.length) {
      data.children = setMenu(data.children)
    }
    return obj
  })
}

export const UserMenu = [
  RegExp(userApi.UserMenu),
  'get',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: setMenu(asyncRoutes)
  }
]
