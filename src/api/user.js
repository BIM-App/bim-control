import request from '@/utils/request'
import qs from 'qs'

// 用户登录
export function login(params) {
  return request({
    url: '/springbootBim/User/login',
    method: 'get',
    params
  })
}

// 用户注册
export function register(data) {
  return request({
    url: '/springbootBim/User/register',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 用户注册
export function deleteByID(id, username) {
  return request({
    url: '/springbootBim/User/deleteByID/' + id + '/' + username,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 根据用户id查询用户信息
export function findByID(uid) {
  return request({
    url: '/springbootBim/User/findByID/' + uid,
    method: 'get'
  })
}

// 更新用户信息
export function updateUser(data) {
  return request({
    url: 'springbootBim/User/update',
    method: 'put',
    data
  })
}

// 上传用户头像
export function addPicture(data) {
  return request({
    url: '/springbootBim/User/addPicture',
    method: 'post',
    header: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 根据用户名查询用户项目
export function findProjects(username) {
  return request({
    url: 'springbootBim/User/findProjectsByUserName/' + username,
    method: 'get'
  })
}
