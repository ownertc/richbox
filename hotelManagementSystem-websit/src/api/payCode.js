
/**
 *酒店付款码生产接口
 create by TC 2018/9/10
 */
import request from '@/utils/request'
/**
 *微信二维码
 接口地址：/GwImg/GetImgByWx/{id}
 */
export function GetImgByWx (id) {
  return request({
    url: `/GwImg/GetImgByWx/${id}`,
    method: 'GET',
    responseType: 'arraybuffer'
  })
}

/**
 *支付宝二维码
 接口地址：/GwImg/GetImgByAlipay/{id}
 */
export function GetImgByAlipay (id) {
  return request({
    url: `/GwImg/GetImgByAlipay/${id}`,
    method: 'GET',
    responseType: 'arraybuffer'
  })
}
