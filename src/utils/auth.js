import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

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
