import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
const request = '/api/v1'

// 添加关注
export function follow_create(params) {
  return http.get(`${request}/friendship/follow/create`, params)
}
// 添加粉丝
export function following_create(params) {
  return http.get(`${request}/friendship/following/create`, params)
}
