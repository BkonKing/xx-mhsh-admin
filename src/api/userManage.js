import Cookies from 'js-cookie'
import request from '@/utils/request'

const userManageApi = {
  getList: '/user/user/getList',
  getStaffList: '/staff/staff/staff_list',
  delStaff: '/staff/staff/staff_del',
  edit_staff: '/staff/staff/edit_staff',
  import_staff: '/staff/staff/import_staff',
  get_company_list: '/staff/staff/get_company_list',
  get_division_list: '/staff/staff/get_division_list',
  get_post_list: '/staff/staff/get_post_list',
  get_item_list: '/staff/staff/get_item_list',
  staff_credits: '/staff/staff/staff_credits',
  save_employee_basic_setting: '/staff/staff/save_employee_basic_setting',
  employee_basic_setting: '/staff/staff/employee_basic_setting',
  dimension_tag_list: '/user/tag/dimension_tag_list',
  edit_dimension_tag: '/user/tag/edit_dimension_tag',
  del_dimension: '/user/tag/del_dimension',
  del_tag: '/user/tag/del_tag',
  import_dimension_tag: '/user/tag/import_dimension_tag',
  editUserTag: '/user/tag/edit_user_tag',
  getUserTag: '/user/tag/user_tag_data'
}

export const appUser = {
  getUserList: '/user/user/new_getUserList',
  getMemberList: '/household/member/getMemberList',
  getUserShopInfo: '/user/user/user_shops_info',
  getShopAttestationList: '/user/user/shops_attestation_log_list',
  editBatchUserTag: '/user/tag/batch_edit_user_tag',
  getUserInfo: '/ajax/userInfo',
  getClogList: '/ajax/new_getClogList',
  getBuilding: '/xmht/ajax/getBuilding',
  getUnit: '/xmht/ajax/getUnit'
}

// 获取游客列表
export function toGetList (data) {
  return request({
    url: userManageApi.getList,
    method: 'post',
    data
  })
}

// 员工列表
export function getStaffList (data) {
  return request({
    url: userManageApi.getStaffList,
    method: 'post',
    data
  })
}

// 删除员工
export function delStaff (data) {
  return request({
    url: userManageApi.delStaff,
    method: 'post',
    data
  })
}

// 添加修改 员工
export function editStaff (data) {
  return request({
    url: userManageApi.edit_staff,
    method: 'post',
    data
  })
}

// 批量导入员工EXCEL 接口
export function importStaff (data) {
  return request({
    url: userManageApi.import_staff,
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    data
  })
}

// 员工公司 数据 接口
export function getCompanyList (data) {
  return request({
    url: userManageApi.get_company_list,
    method: 'post',
    data
  })
}

// 员工部门 数据
export function getDivisionList (data) {
  return request({
    url: userManageApi.get_division_list,
    method: 'post',
    data
  })
}

// 员工职务 数据 接口
export function getPostList (data) {
  return request({
    url: userManageApi.get_post_list,
    method: 'post',
    data
  })
}

// 员工 工作项目 数据 接口
export function getItemList (data) {
  return request({
    url: userManageApi.get_item_list,
    method: 'post',
    data
  })
}

// 奖励员工幸福币接口
export function awardCredits (data) {
  return request({
    url: userManageApi.staff_credits,
    method: 'post',
    data
  })
}

// 奖励员工幸福币接口
export function setStaff (data) {
  return request({
    url: userManageApi.save_employee_basic_setting,
    method: 'post',
    data
  })
}

// 员工基础设置 接口
export function getStaff (data) {
  return request({
    url: userManageApi.employee_basic_setting,
    method: 'post',
    data
  })
}

// 维度标签接口 列表数据 接口
export function getDimensionList (data) {
  return request({
    url: userManageApi.dimension_tag_list,
    method: 'post',
    data
  })
}

// 标签添加修改接口
export function editDimension (data) {
  return request({
    url: userManageApi.edit_dimension_tag,
    method: 'post',
    data
  })
}

// 维度删除
export function delDimension (data) {
  return request({
    url: userManageApi.del_dimension,
    method: 'post',
    data
  })
}

// 标签删除
export function delTag (data) {
  return request({
    url: userManageApi.del_tag,
    method: 'post',
    data
  })
}

// 批量导入员工EXCEL 接口
export function importDimensionTag (data) {
  return request({
    url: userManageApi.import_dimension_tag,
    method: 'post',
    data
  })
}

// 修改用户 标签 接口
export function editUserTag (data) {
  return request({
    url: userManageApi.editUserTag,
    method: 'post',
    data
  })
}

// 用户已有标签 数据 接口
export function getUserTag (data) {
  return request({
    url: userManageApi.getUserTag,
    method: 'post',
    data
  })
}

// 获取APP用户列表
export function getAppUserList (data) {
  return request({
    url: appUser.getUserList,
    method: 'post',
    data
  })
}

// 获取项目后台成员列表
export function getMemberList (data) {
  return request({
    url: appUser.getMemberList,
    method: 'post',
    data
  })
}

// 用户 商家信息
export function getUserShopInfo (data) {
  return request({
    url: appUser.getUserShopInfo,
    method: 'post',
    data
  })
}

// 商家审核记录列表数据 接口
export function getShopAttestationList (data) {
  return request({
    url: appUser.getShopAttestationList,
    method: 'post',
    data
  })
}

// 批量添加用户
export function editBatchUserTag (data) {
  return request({
    url: appUser.editBatchUserTag,
    method: 'post',
    data
  })
}

// 获取楼栋
export function getBuilding (data) {
  return request({
    url: appUser.getBuilding,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: ''
  })
}

// 获取单元
export function getUnit (data) {
  return request({
    url: appUser.getUnit,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: ''
  })
}

// 获取用户详情信息
export function getUserInfo (data) {
  const baseURL = +Cookies.get('project_id') ? '/xmht' : '/zht'
  return request({
    url: `${baseURL}${appUser.getUserInfo}`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: ''
  })
}

// 获取用户详情幸福币信息
export function getClogList (data) {
  const baseURL = +Cookies.get('project_id') ? '/xmht' : '/zht'
  return request({
    url: `${baseURL}${appUser.getClogList}`,
    method: 'post',
    data,
    baseURL: ''
  })
}
