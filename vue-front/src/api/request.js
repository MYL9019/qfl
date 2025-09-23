import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  // 设置基础URL，指向后端服务的 NodePort 地址
  baseURL: 'http://44.204.37.222:30808',
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在这里可以添加请求头等配置
    // 例如添加token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // 处理错误响应
    return Promise.reject(error)
  }
)

export default request
