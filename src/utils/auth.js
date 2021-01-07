import Cookies from 'js-cookie'

// cookie存储用户数据
export function setUser(data) {
  return Cookies.set('user', data)
}

export function getUser() {
  return JSON.parse(Cookies.get('user'))
}

export function removeUser() {
  return Cookies.remove('user')
}

export function setMember(data) {
  return Cookies.set('member', data)
}

export function getMember() {
  return JSON.parse(Cookies.get('member'))
}

export function removeMember() {
  return Cookies.remove('member')
}

export function setProjectPID(pid) {
  return Cookies.set('project', pid)
}

export function getProjectPID() {
  return JSON.parse(Cookies.get('project'))
}

export function removeProjectPID() {
  return Cookies.remove('project')
}

