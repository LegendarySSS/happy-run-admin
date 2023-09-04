import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://60.204.204.44:8080',
    timeout: 5000
  })
  return instance(config)
}
// 权限获取拦截器
export function permissionRequest (config) {
  const instant = axios.create({
    baseURL: 'http://60.204.204.44:8080',
    timeout: 5000
  })
  // 添加请求拦截器
  instant.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start()
    config.headers['X-Token'] = sessionStorage.getItem('token')
    return config
  })
  // 添加响应拦截器
  instant.interceptors.response.use(function (config) {
  // 对响应数据做点什么
    NProgress.done()
    return config
  })
  return instant(config)
}
