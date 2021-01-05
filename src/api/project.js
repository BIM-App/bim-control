import request from '@/utils/request'
// import qs from 'qs'

// 新建项目
export function addProject(data) {
  return request({
    url: '/springbootBim/Project/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 根据项目id删除项目
export function deleteByPID(pid) {
  return request({
    url: '/springbootBim/Project/deleteByPID/' + pid,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 编辑更新项目
export function updateProject(data) {
  return request({
    url: '/springbootBim/Project/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 根据项目id查询项目信息
export function findByPID(pid) {
  return request({
    url: '/springbootBim/Project/findByPID/' + pid,
    method: 'get'
  })
}

