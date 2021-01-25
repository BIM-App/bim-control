// axios封装，请求拦截、响应拦截、错误统一处理

import axios from 'axios'
import { Message } from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 针对请求 Access Token进行跨域配置
    if (config.headers.Authorization) {
      config.baseURL = '/proxy'
    }
    // 加载loading
    // loadingInstance = Loading.service({
    //   fullscreen: true,
    //   text: 'Loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // loadingInstance.close() // 关闭loading
    /* 如果响应返回的状态码为200,则说明接口请求成功，可以正常拿到数据
    否则抛出错误 */
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
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
