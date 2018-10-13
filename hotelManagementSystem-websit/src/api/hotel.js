
/**
 *首页酒店列表相关接口
 create by TC 2018/9/6
 */
import request from '@/utils/request'
/**
 *官网酒店首页列表
 接口地址：/GwHotel/GetListByHome
 */
export function getHotelListHome () {
  return request({
    url: '/GwHotel/GetListByHome',
    method: 'GET'
  })
}
/**
 *官网酒店列表
 接口地址：/GwHotel/GetList
 */
export function getHotelList (params) {
  return request({
    url: '/GwHotel/GetList',
    method: 'GET',
    params
  })
}
/**
今天起开始的最新3个月的所有酒店的最低价格
接口地址:/GwHotel/GetHotelCalendarList
 */
export function GetHotelCalendarList (params) {
  return request({
    url: '/GwHotel/GetHotelCalendarList',
    method: 'GET',
    params
  })
}
/**
 *获取酒店详情
接口地址：/GwHotel/GetHotelInfo
 */
export function GetHotelInfo (params) {
  return request({
    url: '/GwHotel/GetHotelInfo',
    method: 'get',
    params
  })
}
/**
 *获取房间制定日期范围内的价格以及满房情况
接口地址：/GwHotel/GetRoomCalendarList
 */
export function GetRoomCalendarList (params) {
  return request({
    url: '/GwHotel/GetRoomCalendarList',
    method: 'get',
    params
  })
}
