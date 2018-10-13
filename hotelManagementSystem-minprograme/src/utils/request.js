import Fly from 'flyio/dist/npm/wx'
import {login} from '@/utils/api'
const request = new Fly()
request.config.timeout = 10 * 1000
request.config.baseURL = 'https://api.detuhotel.cn/api/'
/* if (process.env.METHOD === 'proxy1') {
  request.config.baseURL = 'http://localhost:3001/douban' // 本地代理1(100次/小时)
} else if (process.env.METHOD === 'proxy2') {
  request.config.baseURL = 'http://localhost:3002' // 本地代理2(100次/小时)
} else if (process.env.METHOD === 'nginx') {
  request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie' // nginx 代理(100次/小时)
} */
request.interceptors.request.use((request) => {
  wx.showLoading({ title: '拼命加载中...' })
  request.headers['usertoken'] = wx.getStorageSync('token')
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    if (response.data.Code === 401) {
      wx.showToast({
        title: response.data.ShowData,
        icon: 'none'
      })
      login()
    }
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.showToast({
      title: err.message,
      icon: 'none'
    })

    return promise.resolve()
  }
)

export default request
