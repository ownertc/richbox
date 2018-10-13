
/**
 *酒店订单相关接口
 create by TC 2018/9/10
 */
import request from '@/utils/request'
/**
 *官网新增订单
 接口地址：/GwOrder/Add
 */
export function orderAdd (data) {
  return request({
    url: '/GwOrder/Add',
    method: 'post',
    data
  })
}
/**
 *官网订单列表
 接口地址：/GwOrder/GetList
 */
export function orderList (params) {
  return request({
    url: '/GwOrder/GetList',
    method: 'get',
    params
  })
}
/**
 *官网订单详情
 接口地址：/GwOrder/GetOrderDetail/{id}
 */
export function orderDetail (id) {
  return request({
    url: `/GwOrder/GetOrderDetail/${id}`,
    method: 'get'
  })
}
/**
 *官网取消订单
 接口地址：/GwOrder/Cancel/{id}
 */
export function orderCancel (id) {
  return request({
    url: `/GwOrder/Cancel/${id}`,
    method: 'post'
  })
}
/**
 *官网根据订单信息查找抵用券
 接口地址：/GwOrder/GetByUserId
 */

export function getOrderVon (params) {
  return request({
    url: '/GwOrder/GetByUserId/',
    method: 'get',
    params
  })
}
