/**
 *酒店图形验证码生成
 create by TC 2018/9/10
 */
import request from '@/utils/request'
/**
 *图形验证码生成
 接口地址：/HTValidateCodeImg/PostSendImgCode
 */
export function getCode (params) {
  return request({
    url: `HTValidateCodeImg/PostSendImgCode`,
    method: 'GET',
    params,
    responseType: 'arraybuffer'
  })
}
/**
 *图形验证码验证接口
 接口地址：/HTValidateCodeImg/PostSendImgCode
 */
export function validCode (data) {
  return request({
    url: `HTValidateCodeImg/PostValidateCode`,
    method: 'post',
    data
  })
}
