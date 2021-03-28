import request from '@/utils/request'

// 项目编号pid查询任务信息
export const findTaskByPIDApi = pid => {
  return request({
    url: '/Task/findTaskByPID/' + pid,
    method: 'get'
  })
}
// 模型编号mid查询任务信息
export const findTaskByMIDApi = mid => {
  return request({
    url: '/Task/findTaskByMID/' + mid,
    method: 'get'
  })
}
// 任务编号tid查询任务信息
export const findTaskByTIDApi = tid => {
  return request({
    url: '/Task/findTaskByTID/' + tid,
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

// 任务编号绑定模型编号
/**
 *
 * @param {任务编号} tid
 * @param {请求体数据 包含模型Mid} data
 * @returns
 */
export const taskBindModelApi = (tid, data) => {
  return request({
    url: 'Task/TaskBindModel/' + tid,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 绑定三维标签
/**
 *
 * @param {任务编号} 任务编号tid
 * @param {标签位置position} 标签位置position
 * @returns
 */
export const taskBindPositionApi = (tid, data) => {
  return request({
    url: 'Task/TaskBindPosition/' + tid,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
