import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
    baseURL: 'http://localhost:8080',  // 后端服务地址
    timeout: 10000,   // 请求超时时间
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 可以在这里添加认证信息，例如 token
        // const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    error => {
        console.error('Request error:', error)
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 可以统一处理响应数据
        const res = response.data
        if (res.code === 200) {
            return res.data
        }
        // 处理其他状态码
        console.error('API error:', res.message)
        return Promise.reject(new Error(res.message))
    },
    error => {
        console.error('Response error:', error)
        return Promise.reject(error)
    }
)

export default request
