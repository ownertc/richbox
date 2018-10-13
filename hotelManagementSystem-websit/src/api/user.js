import request from '@/utils/request'
/**
 *用户信息相关接口
 create by TC 2018/9/6
 */

/**
 *官网用户注册
 接口地址：/GwUser/Add
 */
export function register (data, url) {
  return request({
    url,
    method: 'post',
    data
  })
}
/**
 *官网获取验证码
 接口地址：/GwUser/PostSendCode
 */
export function getValidCode (data) {
  return request({
    url: '/GwUser/PostSendCode',
    method: 'POST',
    data
  })
}
/**
 *官网用户登陆
 接口地址：/GwLogin/LoginImg
 */
export function login (data) {
  return request({
    url: '/GwLogin/LoginImg',
    method: 'POST',
    data
  })
}

/**
 *官网找回密码
 接口地址：/GwLogin/ForgetPass
 */
export function findPassword (data) {
  return request({
    url: '/GwLogin/ForgetPass',
    method: 'POST',
    data
  })
}
/**
 *官网找回密码验证码
 接口地址：/GwLogin/PostReSetCode
 */
export function findPasswordCode (data) {
  return request({
    url: '/GwLogin/PostReSetCode',
    method: 'POST',
    data
  })
}
/**
 * 获取会员基本信息
 *接口地址'/GwUser/GetBasicDetail'
 */
export function getUserInfo () {
  return request({
    url: '/GwUser/GetBasicDetail',
    method: 'get'
  })
}
/**
 * 获取获取登陆验证码
 *接口地址'/GwLogin/PostSendCode'
 */
export function getCode (data) {
  return request({
    url: '/GwLogin/PostSendCode',
    method: 'post',
    data
  })
}
/**
 * 个人信息修改
 *接口地址'/GwUser/Edit'
 */
export function userEdit (data) {
  return request({
    url: '/GwUser/Edit',
    method: 'post',
    data
  })
}
