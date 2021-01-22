import request from '../utils/request'
import qs from 'qs'

// 用户登录
export const loginApi = params => {
  return request({
    url: '/springbootBim/User/login',
    method: 'get',
    params
  })
}

// 用户注册
export const registerApi = data => {
  return request({
    url: '/springbootBim/User/register',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 用户注销
export const deleteUserApi = (id, username) => {
  return request({
    url: '/springbootBim/User/deleteByID/' + id + '/' + username,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据用户id查询用户信息
export const findUserApi = uid => {
  return request({
    url: '/springbootBim/User/findByID/' + uid,
    method: 'get'
  })
}

// 更新用户信息
export const updateUserApi = data => {
  return request({
    url: 'springbootBim/User/update',
    method: 'put',
    data
  })
}

// 上传用户头像
export const addUserPictureApi = data => {
  return request({
    url: '/springbootBim/User/addPicture',
    method: 'post',
    header: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 根据用户名查询用户项目
export const findProjectsApi = username => {
  return request({
    url: 'springbootBim/User/findProjectsByUserName/' + username,
    method: 'get'
  })
}

// 请求 Access Token
export const getAccessToken = () => {
  const appKey = 'ktmv7CmriQsFVtgYTgjahbNS1Z9xl6P0'
  const appSecret = 'VUZGNWtcC27QNxIV5AUwwcDwahKOhDAW'
  return request({
    url: '/oauth2/token',
    method: 'post',
    headers: { Authorization: 'Basic' + ' ' + window.btoa(appKey + ':' + appSecret) }
    // headers: { 'Authorization': 'Basic a3RtdjdDbXJpUXNGVnRnWVRnamFoYk5TMVo5eGw2UDA6VlVaR05XdGNDMjdRTnhJVjVBVXd3Y0R3YWhLT2hEQVc=' }
  })
}
