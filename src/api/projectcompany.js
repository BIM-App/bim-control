import request from '@/utils/request'

// 查看参建方详情
export const findByIDApi = pid => {
  return request({
    url: '/springbootBim/projectCompany/findByID/' + pid,
    method: 'get'
  })
}

// 批量添加
export const addApi = data => {
  return request({
    url: '/springbootBim/projectCompany/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}

// 删除参建方
export const deleteByIDApi = cid => {
  return request({
    url: '/springbootBim/projectCompany/deleteByID/' + cid,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 更新参建方信息
export const updateApi = data => {
  return request({
    url: '/springbootBim/projectCompany/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 根据项目id获得参建方列表
export const findProjectCompaniesApi = pid => {
  return request({
    url: '/springbootBim/Company/findUsersByCompanyID/' + pid,
    method: 'get'
  })
}
