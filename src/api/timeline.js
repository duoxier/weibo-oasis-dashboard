import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
const request = '/api/v1'

// 查询用户
export function get_timeline_user(params) {
  return http.get(`${request}/timeline/user`, params)
}
