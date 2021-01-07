import request from '@/utils/request'

// 根据项目pid返回成员列表
export function addMembersData(data) {
  return request({
    url: 'springbootBim/ProjectMember/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}

// 根据成员id删除项目成员   FIXME:此id为成员id不是用户id
export function deleteMemberByID(id) {
  return request({
    url: '/springbootBim/ProjectMember/deleteByID/' + id,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据成员id更新成员信息
export function updateMemberByID(data) {
  return request({
    url: '/springbootBim/ProjectMember/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
