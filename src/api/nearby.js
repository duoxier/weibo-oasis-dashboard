import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
const request = '/api/v1'

// 清除位置缓存 nearby service
export function clear_viewer(params) {
  return http.get(`${request}/nearby/clear_viewer`, params)
}
