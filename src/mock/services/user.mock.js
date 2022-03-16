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
  RegExp('/invite/thematic/thematic_list'),
  'post',
  {
    code: '200',
    success: true,
    message: 'OK',
    data: {
      pageindex: 1,
      pagesize: 10,
      total: '1',
      list: [
        {
          id: '1',
          project_id: '0',
          thematic_name: '专题1',
          state: '未开始',
          is_limit: '1',
          s_time: '起 2022-03-03 18:00:00',
          e_time: '止 2022-03-04 18:00:00',
          content_type: '1',
          goods_num: '0',
          browse_num: '0',
          state1: '1',
          is_enabled: '0',
          listOrder: 1,
          content_type_name: '图片内容',
          project_name: '美好生活家园运营中心',
          img: 'https://img95.699pic.com/human/20220221/rg5nlngpgc6ioclo.jpg!/both/401x273',
          bgColor: '#999'
        }
      ]
    },
    timestamp: 1646288655616
  }

]
