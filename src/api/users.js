import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
const request = '/api/v1'

// 登录
export function user_login(params) {
  return http.post(`${request}/login`, params)
}

// 登录
export function user_logout(params) {
  return http.get(`${request}/logout`, params)
}

// 查询用户
export function get_user(params) {
  return http.get(`${request}/users`, params)
}

// 创建用户
export function add_user(params) {
  return http.post(`${request}/users`, params)
}

// 编辑用户
export function update_user(id, params) {
  return http.put(`${request}/users/${id}`, params)
}

// 删除用户
export function delete_user(id) {
  return http.delete(`${request}/users/` + id)
}
