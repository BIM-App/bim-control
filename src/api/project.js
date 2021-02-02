import request from '@/utils/request'

// 新建项目
export const addProjectApi = data => {
  return request({
    url: '/springbootBim/Project/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}

// 根据项目id删除项目
export const deleteProjectApi = pid => {
  return request({
    url: '/springbootBim/Project/deleteByPID/' + pid,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 编辑更新项目
export const updateProjectApi = data => {
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
export const findProjectInfoApi = pid => {
  return request({
    url: '/springbootBim/Project/findByPID/' + pid,
    method: 'get'
  })
}

// 上传项目预览图
export const addProjectPictureApi = data => {
  return request({
    url: '/springbootBim/Project/addPicture',
    method: 'post',
    header: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 根据项目pid返回成员列表
export const findProjectMembersApi = pid => {
  return request({
    url: '/springbootBim/Project/findProjectMembersByPID/' + pid,
    method: 'get'
  })
}
