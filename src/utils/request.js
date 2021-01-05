/* axios封装
请求拦截、响应拦截、错误统一处理 */

import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000
})

// 设置请求拦截器
service.interceptors.request.use(
  config => {
    // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    // config.headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded' // 配置请求头
    // }
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.error(error)
  }
)

// 设置响应拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，则说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      Message({
        message: response.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default service
