const taskPages = {
  '#/taskCentre/task': '/task/task/getTaskInfo', // 任务列表
  '#/taskCentre/complete': '/task/task/getTaskInfo', // 任务列表
  '#/taskCentre/toCheck': '/task/task/getTaskInfo', // 任务审核
  '#/taskCentre/askQuestio': '/task/task/getQuestion', // 提问
  '#/taskCentre/evaluate': '/task/task/getEvaluate', // 评价
  '#/taskCentre/complain': '/task/task/getComplain', // 任务投诉
  '#/taskCentre/complainDetail': '/task/task/getComplain', // 投诉详情
  '#/taskCentre/taskGroup': '/task/task/getTaskGroup', // 任务群
  '#/taskCentre/groupDetail': '/task/task/getTaskGroup', // 任务群
  '#/taskCentre/setting/setting': '/task/task/getSetting' // 任务设置
}

const activitySpecial = {
  '#/operatingCenter/special/list': '/activity/special/specialList',
  '#/operatingCenter/special/list2': '/activity/special/specialList',
  '#/operatingCenter/special/edit': '/activity/special/edit',
  '#/operatingCenter/special/detail': '/activity/special/detail'
}

export default {
  ...taskPages,
  ...activitySpecial
}
