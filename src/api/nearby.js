import http from '../utils/http'

const request = '/api/v1'

// 清除位置缓存 nearby service
export function clear_viewer(params) {
  return http.get(`${request}/nearby/clear_viewer`, params)
}

export function weibo_position(params) {
  return http.get(`${request}/nearby/positions`, params)
}
