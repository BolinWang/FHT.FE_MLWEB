import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API
  // interceptors: true // 是否开启response拦截器
  // timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const defaultConfig = {
    version: '1.0',
    timestamp: new Date().getTime(),
    reqId: '0010C2379272774D6EC087B917CE2A71438DEF90',
    sign: '8F4C4A8E9D850EDD9692DE38723D0543'
  }
  if (config.method.toUpperCase() === 'POST') {
    if (!config.noAssign) {
      config.data = Object.assign(config.data, defaultConfig)
    }
  } else {
    if (!config.noAssign) {
      config.params = Object.assign(config.params, defaultConfig)
    }
  }
  return config
}, error => {
  console.log('【REQUEST】' + error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('【response】' + error)
    return Promise.reject(error)
  }
)

export default service
