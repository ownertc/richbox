
/**
 *城市列表相关接口
 create by TC 2018/9/6
 */
import request from '@/utils/request'
/**
 *城市列表
 接口地址：/GwAdminArea/Get
 */
export function cityList () {
  return request({
    url: `/GwAdminArea/Get`,
    method: 'get'
  })
}
