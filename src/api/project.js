import axios from '@/utils/request'

export function upload(params) {
  return axios.post('addPicture', params, {
    header: { 'Content-Type': 'multipart/form-data' }
  })
}
