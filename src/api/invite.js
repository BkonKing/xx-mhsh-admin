import request from '@/utils/request'
const inviteApi = {
  getInviteSetting: '/invite/invite/get_invite_setting',
  getInviteStatistics: '/invite/invite/get_invite_tab',
  getInviteList: '/invite/invite/invite_list',
  getLogList: '/invite/invite/invite_log_list',
  getRewardList: '/invite/invite/invite_reward_log_list',
  saveInviteSetting: '/invite/invite/save_invite_setting'
}

export function getInviteSetting (data) {
  return request({
    url: inviteApi.getInviteSetting,
    method: 'post',
    data
  })
}

export function getInviteStatistics (data) {
  return request({
    url: inviteApi.getInviteStatistics,
    method: 'post',
    data
  })
}

export function getInviteList (data) {
  return request({
    url: inviteApi.getInviteList,
    method: 'post',
    data
  })
}

export function getLogList (data) {
  return request({
    url: inviteApi.getLogList,
    method: 'post',
    data
  })
}

export function getRewardList (data) {
  return request({
    url: inviteApi.getRewardList,
    method: 'post',
    data
  })
}

export function saveInviteSetting (data) {
  return request({
    url: inviteApi.saveInviteSetting,
    method: 'post',
    data
  })
}
