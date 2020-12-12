import axios from '@/utils/request'

export function login(url, params) {
  return axios.post(url, params, {
    header: { 'Content-Type': 'multipart/form-data' }
  })
}
