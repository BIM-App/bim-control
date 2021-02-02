import Cookies from 'js-cookie'

// 存储用户信息
export const setUser = data => {
  return Cookies.set('user', data)
}

export const getUser = () => {
  return JSON.parse(Cookies.get('user'))
}

export const removeUser = () => {
  return Cookies.remove('user')
}

// 存储成员信息
export const setMember = data => {
  return Cookies.set('member', data)
}

export const getMember = () => {
  return JSON.parse(Cookies.get('member'))
}

export const removeMember = () => {
  return Cookies.remove('member')
}

// 存储项目信息
export const setProjectPID = (pid) => {
  return Cookies.set('pid', pid)
}

export const getProjectPID = () => {
  return JSON.parse(Cookies.get('pid'))
}

export const removeProjectPID = () => {
  return Cookies.remove('pid')
}

export const setRole = data => {
  return Cookies.set('role', data)
}

export const getRole = () => {
  return (Cookies.get('role'))
}

export const removeRole = () => {
  return Cookies.remove('role')
}

// 存储公司信息
export const setCompanyCID = (cid) => {
  return Cookies.set('cid', cid)
}

export const getCompanyCID = () => {
  return JSON.parse(Cookies.get('cid'))
}

export const removeCompanyCID = () => {
  return Cookies.remove('cid')
}

// 存储Access Token
export const setAccessToken = (data) => {
  return Cookies.set('accessToken', data)
}

export const getAccessToken = () => {
  return Cookies.get('accessToken')
  // return JSON.parse(Cookies.get('token'))
}

export const removeAccessToken = () => {
  return Cookies.remove('accessToken')
}

