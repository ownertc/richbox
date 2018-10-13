import axios from 'axios'
import Cookies from 'js-cookie'
import { Modal } from 'iview'
import router from '@/router/index.js'

const service = axios.create({
  baseURL: 'http://testapi.detuhotel.cn/api/', // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['usertoken'] = Cookies.get('usertoken')
    return config
  },
  error => {
    this.$Message.warning(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.Code === 401) {
      Modal.warning({
        title: '温馨提示',
        content: '登陆超时，请重新登陆',
        okText: '确认',
        onOk: () => {
          router.push('/login')
        }
      })
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$Message.warning('登录超时！')
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })
export default service
