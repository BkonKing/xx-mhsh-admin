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
  groupList: '/linli/taskgroup/groupList',
  addGroup: '/linli/taskgroup/addGroup',
  delGroup: '/linli/taskgroup/delGroup',
  setAllow: '/linli/taskgroup/setAllow',
  getGroupBaseInfo: '/linli/taskgroup/getGroupBaseInfo',
  getGroupUserList: '/linli/taskgroup/getGroupUserList',
  addGroupUser: '/linli/taskgroup/addGroupUser',
  delGroupUser: '/linli/taskgroup/delGroupUser',
  importGroupUser: '/linli/taskgroup/importGroupUser',
  setGroupOwner: '/linli/taskgroup/setGroupOwner',
  getTaskStatus: '/linli/task/getTaskStatus',
  getProject: '/linli/common/getProject',
  updateGroup: '/linli/taskgroup/updateGroup',
  getLog: '/linli/taskgroup/getLog',
  getQuestionList: '/linli/question/getQuestionList',
  getList: '/linli/evaluate/getList',
  viewQuestion: '/linli/question/viewQuestion',
  checkQuestionReply: '/linli/question/checkQuestionReply',
  evaluateList: '/linli/evaluate/evaluateList',
  optEvaluate: '/linli/evaluate/optEvaluate',
  viewEvaluate: '/linli/evaluate/viewEvaluate',
  getComplaintList: '/linli/complaint/getList',
  getCompalintType: '/linli/complaint/getCompalintType',
  getCommonTaskStatus: '/linli/common/getTaskStatus',
  handComplaint: '/linli/complaint/handComplaint',
  viewComplaint: '/linli/complaint/viewComplaint',
  complaintDetail: '/linli/complaint/complaintDetail',
  getTaskList: '/linli/task/getList',
  getTaskType: '/linli/common/getTaskType',
  getProcessStatus: '/linli/common/getProcessStatus',
  handTask: '/linli/task/handTask',
  taskDetail: '/linli/task/taskDetail',
  getTaskSpeed: '/linli/task/getTaskSpeed',
  getButtonStatus: '/linli/task/getButtonStatus',
  getUserProcess: '/linli/task/getUserProcess',
  reward: '/linli/task/reward',
  taskCode: '/linli/task/taskCode',
  optTask: '/linli/task/optTask',
  violationReason: '/linli/common/violationReason'
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
// 任务群-添加任务群
export function toAddGroup (data) {
  return request({
    url: taskCentreApi.addGroup,
    method: 'post',
    data
  })
}

// 任务群-删除任务群
export function toDelGroup (data) {
  return request({
    url: taskCentreApi.delGroup,
    method: 'post',
    data
  })
}
// 任务群-开启允许加入
export function toSetAllow (data) {
  return request({
    url: taskCentreApi.setAllow,
    method: 'post',
    data
  })
}
// 群详情-基础信息
export function toGetGroupBaseInfo (data) {
  return request({
    url: taskCentreApi.getGroupBaseInfo,
    method: 'post',
    data
  })
}
// 群详情-成员列表
export function toGetGroupUserList (data) {
  return request({
    url: taskCentreApi.getGroupUserList,
    method: 'post',
    data
  })
}
// 群详情-添加用户
export function toAddGroupUser (data) {
  return request({
    url: taskCentreApi.addGroupUser,
    method: 'post',
    data
  })
}
// 群详情-删除用户(单个、批量)
export function toDelGroupUser (data) {
  return request({
    url: taskCentreApi.delGroupUser,
    method: 'post',
    data
  })
}
// 群详情-导入用户
export function toImportGroupUser (data) {
  return request({
    url: taskCentreApi.importGroupUser,
    method: 'post',
    data
  })
}
// 群详情-设置群主
export function toSetGroupOwner (data) {
  return request({
    url: taskCentreApi.setGroupOwner,
    method: 'post',
    data
  })
}
// // 任务-获取任务状态
// export function toGetTaskStatus () {
//   return request({
//     url: taskCentreApi.getTaskStatus,
//     method: 'post'
//   })
// }
 // 获取所有项目
export function toGetProject () {
  return request({
    url: taskCentreApi.getProject,
    method: 'post'
  })
}
// 任务群-根据字段修改值
export function toUpdateGroup (data) {
  return request({
    url: taskCentreApi.updateGroup,
    method: 'post',
    data
  })
}
// 群详情-操作日志
export function toGetLog (data) {
  return request({
    url: taskCentreApi.getLog,
    method: 'post',
    data
  })
}
// 提问-提问列表
export function toGetQuestionList (data) {
  return request({
    url: taskCentreApi.getQuestionList,
    method: 'post',
    data
  })
}
// 评价-评价列表
export function toGetList (data) {
  return request({
    url: taskCentreApi.getList,
    method: 'post',
    data
  })
}
// 提问-查看详情
export function toViewQuestion (data) {
  return request({
    url: taskCentreApi.viewQuestion,
    method: 'post',
    data
  })
}
// 提问-审核问题
export function toCheckQuestionReply (data) {
  return request({
    url: taskCentreApi.checkQuestionReply,
    method: 'post',
    data
  })
}
// 评价-评价标签下拉列表
export function toEvaluateList () {
  return request({
    url: taskCentreApi.evaluateList,
    method: 'post'
  })
}
 // 评价-标记评价
export function toOptEvaluate (data) {
  return request({
    url: taskCentreApi.optEvaluate,
    method: 'post',
    data
  })
}
// 查看评价
export function toViewEvaluate (data) {
  return request({
    url: taskCentreApi.viewEvaluate,
    method: 'post',
    data
  })
}
// 投诉-投诉列表
export function toGetComplaintList (data) {
  return request({
    url: taskCentreApi.getComplaintList,
    method: 'post',
    data
  })
}
// 投诉-获取投诉类型
export function toGetCompalintType () {
  return request({
    url: taskCentreApi.getCompalintType,
    method: 'post'
  })
}
// 任务-获取任务状态
export function toGetCommonTaskStatus () {
  return request({
    url: taskCentreApi.getCommonTaskStatus,
    method: 'post'
  })
}
// 投诉-处理投诉
export function toHandComplaint (data) {
  return request({
    url: taskCentreApi.handComplaint,
    method: 'post',
    data
  })
}
// 投诉-查看投诉
export function toViewComplaint (data) {
  return request({
    url: taskCentreApi.viewComplaint,
    method: 'post',
    data
  })
}
// 投诉-投诉详情
export function getComplaintDetail (data) {
  return request({
    url: taskCentreApi.complaintDetail,
    method: 'post',
    data
  })
}
// 任务中心-任务列表
export function togetTaskList (data) {
  return request({
    url: taskCentreApi.getTaskList,
    method: 'post',
    data
  })
}
// 任务中心-获取任务类型（下拉）
export function toGetTaskType () {
  return request({
    url: taskCentreApi.getTaskType,
    method: 'post'
  })
}
// 获取进度状态
export function toGetProcessStatus () {
  return request({
    url: taskCentreApi.getProcessStatus,
    method: 'post'
  })
}
// 任务中心-任务审核
export function toHandTask (data) {
  return request({
    url: taskCentreApi.handTask,
    method: 'post',
    data
  })
}
// 任务列表-任务详情页
export function getTaskDetail (data) {
  return request({
    url: taskCentreApi.taskDetail,
    method: 'post',
    data
  })
}
// 任务详情-任务流水
export function toGetTaskSpeed (data) {
  return request({
    url: taskCentreApi.getTaskSpeed,
    method: 'post',
    data
  })
}
// 任务详情-按钮状态控制
export function toGetButtonStatus (data) {
  return request({
    url: taskCentreApi.getButtonStatus,
    method: 'post',
    data
  })
}
// 任务中心-任务详情页-用户任务流水
export function toGetUserProcess (data) {
  return request({
    url: taskCentreApi.getUserProcess,
    method: 'post',
    data
  })
}
// 任务详情-奖励幸福币
export function toReward (data) {
  return request({
    url: taskCentreApi.reward,
    method: 'post',
    data
  })
}
// 任务详情-生成任务二维码
export function toTaskCode (data) {
  return request({
    url: taskCentreApi.taskCode,
    method: 'post',
    data
  })
}
// 任务详情-任务操作
export function toOptTask (data) {
  return request({
    url: taskCentreApi.optTask,
    method: 'post',
    data
  })
}
// 获取违规原因
export function toViolationReason (data) {
  return request({
    url: taskCentreApi.violationReason,
    method: 'post',
    data
  })
}
