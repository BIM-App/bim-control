import request from '@/utils/request'

// 添加任务信息
export function addTask(data) {
  return request({
    url: '/Task/addTask',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
// 根据任务编号tid来修改任务信息
export function updateTask(tid, data) {
  return request({
    url: '/Task/updateTaskByTID' + tid,
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 根据pid返回任务列表
export function findTaskByPid(pid) {
  return request({
    url: '/Task/findTaskByPID/' + pid,
    method: 'Get'
  })
}

// 根据pid来删除所有绑定项目的任务信息
export function delTasksByPid(pid) {
  return request({
    url: '/Task/deleteTaskByPID' + pid,
    method: 'delete'
  })
}
// 根据任务编号来删除任务
export function delTasksByTid(tid) {
  return request({
    url: '/Task/deleteTaskByTID' + tid,
    method: 'delete'
  })
}

// 根据任务编号tid绑定模型编号mid
export function TaskBindModel(tid) {
  return request({
    url: '/Task/TaskBindModel' + tid,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
