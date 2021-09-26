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
  employee_basic_setting: '/staff/staff/employee_basic_setting'
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
