import request from '@/utils/request'
// import qs from 'qs'

// 添加模型
export function addModel(data) {
  return request({
    url: '/Model/addModel',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 5 * 60 * 1000,
    data
  })
}

// 根基Mid删除模型
export function delModel(mid) {
  return request({
    url: '/Model/delModel/' + mid,
    method: 'delete'

  })
}

// 根基Pid删除模型
export function delModelByPID(pid) {
  return request({
    url: '/Model/delModelByPID/' + pid,
    method: 'delete'
  })
}

// 编辑模型描述
export function updateModelByMId(data) {
  return request({
    url: '/Model/updateModelByMId/',
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 根据项目id查询模型信息
export function findmodelByPID(pid) {
  return request({
    url: '/Model/findModelByPID/' + pid,
    method: 'GET'
  })
}

// 根据模型id查询模型信息
export function findModelByMid(mid) {
  return request({
    url: '/Model/findModelByMid/' + mid,
    method: 'GET'
  })
}
