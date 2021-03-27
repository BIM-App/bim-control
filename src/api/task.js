import request from '@/utils/request'

// 项目编号pid查询任务信息
export const findTaskByPIDApi = pid => {
  return request({
    url: '/Task/findTaskByPID/' + pid,
    method: 'get'
  })
}

// 添加任务信息
export const addTaskApi = data => {
  return request({
    url: '/Task/addTask',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 根据tid删除任务
export const deleteTaskApi = tid => {
  return request({
    url: '/Task/deleteTaskByTID/' + tid,
    method: 'delete'
  })
}
