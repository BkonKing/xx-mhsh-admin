import axios from 'axios'
import store from '@/store'
import storage from 'store'
import Cookies from 'js-cookie'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'

// 创建 axios 实例
const request = axios.create({
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // Authorization: Cookies.get('access_token'),
    // Authorization: '9dd6d22b1f5add4d7c125feb76fc02b2092030f6', // admin
    // Authorization: '7cd02a55873732ebda31892e66b57d16abee7713', // 子后台
    Authorization: '724cbf9c9f6f9e83e360fb7a18b0581cab5ffb7b', // 项目后台
    Projectid: Cookies.get('project_id')
  },
  // API 请求的默认前缀
  baseURL: Cookies.get('project_id') && Cookies.get('project_id') > 0 ? process.env.VUE_APP_WSOLID_API_BASE_URL : process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  // 转换参数格式
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

export default request
