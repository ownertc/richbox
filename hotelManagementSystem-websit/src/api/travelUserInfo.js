
/**
 *酒店常用旅客相关接口
 create by TC 2018/9/10
 */
import request from '@/utils/request'
/**
 *官网常用旅客列表(分页)
 接口地址：/WxUserTravelInfo/GetListPaging
 */
export function userTravelListPage (params) {
  return request({
    url: '/WxUserTravelInfo/GetListPaging',
    method: 'get',
    params
  })
}
/**
 *官网常用旅客列表(不分页)
 接口地址：/WxUserTravelInfo/GetList
 */
export function userTravelList () {
  return request({
    url: '/WxUserTravelInfo/GetList',
    method: 'get'
  })
}

/**
 *官网常用旅客增加
 接口地址：/WxUserTravelInfo/Add
 */
export function userTravelAdd (data) {
  return request({
    url: '/WxUserTravelInfo/Add',
    method: 'post',
    data
  })
}
/**
 *官网常用旅客编辑
 接口地址：/WxUserTravelInfo/Edit
 */
export function userTravelEdit (data) {
  return request({
    url: '/WxUserTravelInfo/Edit',
    method: 'post',
    data
  })
}
/**
 *官网常用旅客编辑
 接口地址：WxUserTravelInfo/Delete/{id}
 */
export function userTravelDelete (id) {
  return request({
    url: `/WxUserTravelInfo/Delete/${id}`,
    method: 'delete'
  })
}
