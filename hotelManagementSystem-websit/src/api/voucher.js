/**
 *抵用券相关接口
 create by TC 2018/9/6
 */
import request from '@/utils/request'

export function voucherList (params) {
  return request({
    url: '/GwVoucher/GetMyVoucheList',
    method: 'get',
    params
  })
}
