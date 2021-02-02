import request from '@/utils/request'

// 注册添加公司
export const addCompanyApi = data => {
  return request({
    url: '/springbootBim/Company/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}

// 查询所有公司列表
export const findCompanyApi = () => {
  return request({
    url: '/springbootBim/Company/findAll',
    method: 'get'
  })
}

// 公司信息更新
export const updateCompanyApi = data => {
  return request({
    url: '/springbootBim/Company/update',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 根据cid删除公司
export const deleteCompanyApi = cid => {
  return request({
    url: '/springbootBim/Company/deleteByCID/' + cid,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据公司cid返回该公司员工(用户)集合
export const findUsersByCompanyIDApi = cid => {
  return request({
    url: '/springbootBim/Company/findUsersByCompanyID/' + cid,
    method: 'get'
  })
}

// 根据公司cid返回公司参与的项目列表
export const findProjectsByCIDApi = cid => {
  return request({
    url: '/springbootBim/Company/findProjectsByCID/' + cid,
    method: 'get'
  })
}

// 更新审核字段为1(表示审核已通过)
export const updateCheckStatusApi = data => {
  return request({
    url: '/springbootBim/Company/updateCheckStatus',
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

