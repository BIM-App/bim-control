import request from '@/utils/request'

// 新增项目成员
export const addMembersApi = data => {
  return request({
    url: 'springbootBim/ProjectMember/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}

// 根据成员id删除项目成员   TODO:此id为成员id不是用户id
export const deleteMemberApi = id => {
  return request({
    url: '/springbootBim/ProjectMember/deleteByID/' + id,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据成员id更新成员信息
export const updateMemberApi = data => {
  return request({
    url: '/springbootBim/ProjectMember/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
