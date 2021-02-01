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

// // get请求
// export function getListAPI(params){
//   return http.get(`${resquest}/getList.json`,params)
// }
// // post请求
// export function postFormAPI(params){
//   return http.post(`${resquest}/postForm.json`,params)
// }
// // put 请求
// export function putSomeAPI(params){
//   return http.put(`${resquest}/putSome.json`,params)
// }
// // delete 请求
// export function deleteListAPI(params){
//   return http.delete(`${resquest}/deleteList.json`,params)
// }

// api调用示例
/*
import {getListAPI,postFormAPI, putSomeAPI, deleteListAPI} from '@/api/api'

methods: {
  //promise调用，链式调用， getList()括号内只接受参数；
  //   get不传参
  getList() {
    getListAPI().then(res => console.log(res)).catch(err => console.log(err))
  },
  //post传参
  postForm(formData) {
    let data = formData
    postFormAPI(data).then(res => console.log(res)).catch(err => console.log(err))
  },

  //async await同步调用
  async postForm(formData) {
    const postRes = await postFormAPI(formData)
    const putRes = await putSomeAPI({data: 'putTest'})
    const deleteRes = await deleteListAPI(formData.name)
    // 数据处理
    console.log(postRes);
    console.log(putRes);
    console.log(deleteRes);
  },
}*/
