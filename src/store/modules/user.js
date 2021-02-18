import { user_login, get_user, user_logout } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    userId: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      user_login(params).then(response => {
        // const res = response.data
        // commit('SET_TOKEN', res.data['token'])
        // setToken(res.token['token'])
        const token = response.data.token
        const userId = response.data.id
        commit('SET_TOKEN', token)
        commit('SET_USERID', userId)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const params = {
        'id': state.userId
      }
      get_user(params).then(response => {
        const res = response.datas
        if (response.status !== 'SUCCEED') {
          return reject('获取用户信息失败')
        }
        // const phone = res[0]['phone']
        // const email = res[0]['email']
        commit('SET_NAME', 'Super Admin')
        // commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      const params = {
        'id': state.userId
      }
      user_logout(params).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

