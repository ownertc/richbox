import Fly from 'flyio/dist/npm/wx'
import {login} from '@/utils/api'
const request = new Fly()
request.config.timeout = 10 * 1000
request.config.baseURL = 'https://testapi.detuhotel.cn/api/'
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
