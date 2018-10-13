import request from '@/utils/request'

/**
 *
 * 用户登陆：
 *  接口地址:login
 *  可传参数：
 *    @params {string} value='' usercode
 *
 */
export function login (params) {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.setStorageSync('code', res.code)
        // 发起网络请求
        request.post(`/wxLogin/login`, {value: res.code}).then(res => {
          wx.setStorageSync('OpenId', res.Data.OpenId)
          if (res.Data.User === null) {
            wx.removeStorageSync('User')
            wx.removeStorageSync('token')
          } else {
            wx.setStorageSync('User', res.Data.User)
            wx.setStorageSync('token', res.Data.Token)
            wx.switchTab({ url: '../../pages/index/main' })
          }
        })
      } else {
        wx.showModal({
          title: '提示', // 提示的标题,
          content: '微信授权失败',
          showCancel: false, // 是否显示取消按钮,
          cancelColor: '#000000', // 取消按钮的文字颜色,
          confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F', // 确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
            } else if (res.cancel) {

            }
          }
        })
      }
    }
  })
}
/**
 *
 * 获取验证码：
 * 接口地址:HTValidateCode/PostSendCode
 *  可传参数：
 *    @params {number} input.value=0 电话号码
 *
 */
export function getCode (params) {
  return request.post(`/HTValidateCode/PostSendCode`, params)
}
/**
 *
 * 注册会员：
 * 接口地址:WxLogin/Register
 *  可传参数：
 *    @params {number} input.value=0 电话号码
 *
 */
export function registeUser (params) {
  return request.post(`/WxLogin/Register`, params)
}
/**
 * 获取常用信息列表
 * 接口地址:WxUserTravelInfo/GetList
 *  可传参数：
 *    @params {number} pageIndex=1 当前页
 *    @params {number} pageSize=10 每页多少条
 */
export function getCommonInfoList (params) {
  return request.get(`/WxUserTravelInfo/GetList`, params)
}
/**
 * 添加常用旅客信息
 * 接口地址:WxUserTravelInfo/Add
 *  可传参数：
 *    @params {string} Name='' 姓名
 *    @params {string} Mobile="" 电话号码
 *    @params {string} IdCard=""身份证号码
 *    @params {string} CertificatesType=""证件类型
 */
export function addCommonInfo (params) {
  return request.post(`/WxUserTravelInfo/Add`, params)
}
/**
 * 删除常用旅客信息
 * 接口地址:WxUserTravelInfo/Delete
 *
 */
export function deleteTravalUsers (id) {
  return request.delete(`WxUserTravelInfo/Delete/${id}`)
}
/**
 * 编辑常用旅客信息
 * 接口地址:/WxUserTravelInfo/Edit
 *
 */
export function editTravalUsers (params) {
  return request.post(`/WxUserTravelInfo/Edit`, params)
}
/**
 * 获取酒店列表
 * 接口地址:/WxHotel/GetList
 *
 */
export function queryHotelList (params) {
  return request.get(`/WxHotel/GetList`, params)
}
/**
 * 获取酒店详情
 * 接口地址:/WxHotel/GetHotelInfo
 *
 */
export function queryHotelDetail (params) {
  return request.get(`/WxHotel/GetHotelInfo`, params)
}
/**
 * 小程序支付
 * 接口地址:GwImg/WxPay/{id}
 */
export function wxpay (id) {
  return request.get(`/GwImg/WxPay/${id}`)
}
/**
 * 小程序新增订单
 * 接口地址:/api/WxOrder/Add
 */
export function orderAdd (params) {
  return request.post(`/WxOrder/Add`, params)
}
/**
 * 小程序订单列表
 * 接口地址:/WxOrder/GetList
 */
export function getOrderList (params) {
  return request.get(`/WxOrder/GetList`, params)
}
/**
 * 小程序订单详情
 * 接口地址:/WxOrder/GetOrderDetail/{id}
 */
export function getOrderDetai (id) {
  return request.get(`/WxOrder/GetOrderDetail/${id}`)
}
/**
 * 小程序获取城市列表
 * 接口地址:/WxAdminArea/Get
 */
export function getCitylist () {
  return request.get(`/WxAdminArea/Get`)
}
/**
 * 小程序获取城市列表
 * 接口地址:/WxHotel/GetHotelCalendarList
 */
export function GetHotelCalendarList (params) {
  return request.get(`/WxHotel/GetHotelCalendarList`, params)
}
/**
 * 小程序用户基本信息
 * 接口地址:/GwUser/GetBasicDetail
 */
export function getUserInfo () {
  return request.get(`/GwUser/GetBasicDetail`)
}
/**
 * 小程序获取抵用券列表
 * 接口地址:/GwVoucher/GetMyVoucheList
 */
export function getVouchList (params) {
  return request.get(`/GwVoucher/GetMyVoucheList`, params)
}
/**
 * 小程序根据订单获取抵用券列表
 * 接口地址:/WxOrder/GetByUserId
 */
export function GetByUserId (params) {
  return request.get(`/WxOrder/GetByUserId`, params)
}
/**
 * 小程序取消订单
 * 接口地址:/WxOrder/Cancel/{id}
 */
export function cancelOrder (id) {
  return request.post(`/WxOrder/Cancel/${id}`)
}
/**
 * 小程序获取房间制定日期范围内的价格以及满房情况
 * 接口地址:/WxHotel/GetRoomCalendarList
 */
export function getRoomCalendarList (params) {
  return request.get(`/WxHotel/GetRoomCalendarList`, params)
}
