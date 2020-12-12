/* axios封装
请求拦截、响应拦截、错误统一处理 */

import axios from 'axios'
import store from '@/store'

// axios.defaults.headers.post['Content-Type'] = ''

const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, 
  // url = base url + request url
  baseURL: 'http://47.112.132.91:8080/Test',
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
    return Promise.error(error);
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
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default service
