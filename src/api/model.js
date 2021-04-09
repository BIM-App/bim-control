import request from '@/utils/request'
// import qs from 'qs'

// 添加模型
export function addModelApi(data) {
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
export function delModelApi(mid) {
  return request({
    url: '/Model/delModel/' + mid,
    method: 'delete'

  })
}

// 根基Pid删除模型
export function delModelByPIDApi(pid) {
  return request({
    url: '/Model/delModelByPID/' + pid,
    method: 'delete'
  })
}

// 编辑模型描述
export function updateModelByMIdApi(data) {
  return request({
    url: '/Model/updateModelByMId/',
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 根据项目pid查询模型列表
export function findModelByPIDApi(pid) {
  return request({
    url: '/Model/findModelByPID/' + pid,
    method: 'GET'
  })
}

// 根据模型mid查询模型信息
export function findModelByMidApi(mid) {
  return request({
    url: '/Model/findModelByMid/' + mid,
    method: 'GET'
  })
}

// 获取viewToken
export const getModelTokenApi = (params, accessToken) => {
  return request({
    url: '/view/token',
    headers: { Authorization: 'Bearer' + ' ' + accessToken },
    method: 'GET',
    params
  })
}
// 获取图纸列表
export const getMapListApi = (fileId, accessToken) => {
  return request({
    url: '/data/v2/files/' + fileId + '/drawingsheets',
    headers: { Authorization: 'Bearer' + ' ' + accessToken },
    method: 'GET'
  })
}
