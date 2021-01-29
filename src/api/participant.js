import request from '@/utils/request'

// 查看参建方详情
export const findParticipantInfoApi = id => {
  return request({
    url: '/springbootBim/projectCompany/findByID/' + id,
    method: 'get'
  })
}

// 批量添加参建方
export const addParticipantApi = data => {
  return request({
    url: '/springbootBim/projectCompany/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
    // data: JSON.stringify(data
  })
}

// 根据项目pid获取参建方列表
export const findParticipantApi = pid => {
  return request({
    url: '/springbootBim/projectCompany/findProjectCompanies/' + pid,
    method: 'get'
  })
}

// 删除参建方
export const deleteParticipantApi = id => {
  return request({
    url: '/springbootBim/projectCompany/deleteByID/' + id,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 更新参建方信息   单个公司更新
export const updateParticipantApi = data => {
  return request({
    url: '/springbootBim/projectCompany/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}
