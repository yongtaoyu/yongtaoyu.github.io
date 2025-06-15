import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'


// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 30000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const { userInfo } = useUserStore()
  const token = userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  ElMessage({
    message: e.response.data.message,
    type: 'warning',
  })
  if (e.response.status === 401) {
    userStore.clearUserInfo()
    // useRouter只能在setup中使用，此处导入:
    // import router from '@/router'
    router.push('/login')
  }

  return Promise.reject(e)
})


export default httpInstance
