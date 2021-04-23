import request from '@/utils/request'
const taskCentreApi = {
  functionOpen: '/linli/basicsetting/functionOpen',
  set: '/linli/basicsetting/set',
  getSet: '/linli/basicsetting/getSet',
  setLabel: '/linli/basicsetting/setLabel',
  getLabel: '/linli/basicsetting/getLabel',
  setReason: '/linli/basicsetting/setReason',
  getReason: '/linli/basicsetting/getReason',
  taskSet: '/linli/basicsetting/taskSet',
  getTaskSet: '/linli/basicsetting/getTaskSet',
  setQuestion: '/linli/basicsetting/setQuestion',
  getBasic: '/linli/basicsetting/getBasic',
  setComplaint: '/linli/basicsetting/setComplaint',
  setComplaintType: '/linli/basicsetting/setComplaintType',
  getComplaintType: '/linli/basicsetting/getComplaintType',
  getTaskTypeList: '/linli/basicsetting/getTaskTypeList',
  addTaskType: '/linli/basicsetting/addTaskType',
  updateTaskType: '/linli/basicsetting/updateTaskType',
  getWhiteListUser: '/linli/basicsetting/getWhiteListUser',
  addWhiteUser: '/linli/basicsetting/addWhiteUser',
  delWhiteUser: '/linli/basicsetting/delWhiteUser',
  importWhiteUser: '/linli/basicsetting/importWhiteUser',
  groupList: '/linli/taskgroup/groupList'
}

// 基础-设置全部用户、白名单开关
export function setFunctionOpen (data) {
  return request({
    url: taskCentreApi.functionOpen,
    method: 'post',
    data
  })
}
// 基础设置
export function setSetting (data) {
  return request({
    url: taskCentreApi.set,
    method: 'post',
    data
  })
}

// 获取任务基础信息
export function gainGetSet (data) {
  return request({
    url: taskCentreApi.getSet,
    method: 'post',
    data
  })
}
// 基础-添加评价标签
export function addSetLabel (data) {
  return request({
    url: taskCentreApi.setLabel,
    method: 'post',
    data
  })
}

// 基础-获取评价标签
export function gainGetLabel (data) {
  return request({
    url: taskCentreApi.getLabel,
    method: 'post',
    data
  })
}
// 基础-添加淘汰、放弃原因
export function addSetReason (data) {
  return request({
    url: taskCentreApi.setReason,
    method: 'post',
    data
  })
}
// 基础-获取淘汰、放弃原因列表
export function gainGetReason (data) {
  return request({
    url: taskCentreApi.getReason,
    method: 'post',
    data
  })
}

// 投诉审核-任务设置
export function setTaskSet (data) {
  return request({
    url: taskCentreApi.taskSet,
    method: 'post',
    data
  })
}

// 投诉审核-获取任务设置信息
export function gainGetTaskSet () {
  return request({
    url: taskCentreApi.getTaskSet,
    method: 'post'
  })
}
// 投诉审核-提问设置
export function toSetQuestion (data) {
  return request({
    url: taskCentreApi.setQuestion,
    method: 'post',
    data
  })
}
// 获取基础设置信息
export function gainGetBasic () {
  return request({
    url: taskCentreApi.getBasic,
    method: 'post'
  })
}
// 投诉审核-投诉处理时效设置
export function toSetComplaint (data) {
  return request({
    url: taskCentreApi.setComplaint,
    method: 'post',
    data
  })
}

// 投诉审核-投诉、提问违规类型设置
export function toSetComplaintType (data) {
  return request({
    url: taskCentreApi.setComplaintType,
    method: 'post',
    data
  })
}
// 投诉审核-获取投诉、提问违规类型列表
export function gainGetComplaintType (data) {
  return request({
    url: taskCentreApi.getComplaintType,
    method: 'post',
    data
  })
}
// 任务类型-任务列表
export function gainGetTaskTypeList (data) {
  return request({
    url: taskCentreApi.getTaskTypeList,
    method: 'post',
    data
  })
}

// 任务类型-添加修改类型
export function toAddTaskType (data) {
  return request({
    url: taskCentreApi.addTaskType,
    method: 'post',
    data
  })
}
// 任务类型-根据字段修改值
export function toUpdateTaskType (data) {
  return request({
    url: taskCentreApi.updateTaskType,
    method: 'post',
    data
  })
}
// 白名单-白名单列表
export function gainGetWhiteListUser (data) {
  return request({
    url: taskCentreApi.getWhiteListUser,
    method: 'post',
    data
  })
}
// 白名单-添加用户
export function toAddWhiteUser (data) {
  return request({
    url: taskCentreApi.addWhiteUser,
    method: 'post',
    data
  })
}
// 白名单-删除用户
export function toDelWhiteUser (data) {
  return request({
    url: taskCentreApi.delWhiteUser,
    method: 'post',
    data
  })
}
// 白名单-导入用户
export function toImportWhiteUser (data) {
  return request({
    url: taskCentreApi.importWhiteUser,
    method: 'post',
    data
  })
}
// 任务群-任务群列表
export function getGroupList (data) {
  return request({
    url: taskCentreApi.groupList,
    method: 'post',
    data
  })
}
