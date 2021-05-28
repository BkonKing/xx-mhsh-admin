import request from '@/utils/request'
const userManageApi = {
  getList: '/user/user/getList'
}
// 获取游客列表
export function toGetList (data) {
  return request({
    url: userManageApi.getList,
    method: 'post',
    data
  })
}
