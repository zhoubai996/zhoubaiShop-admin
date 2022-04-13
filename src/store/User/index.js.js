import {shelvesUser, reqGetUserInfo, userLogin} from '@/api/index.js'
const state = {
  userInfo: {},
  errorInfo: {},
  userList: {}
}
const mutations = {
  LOGIN(state, data) {
    state.userInfo = data
    localStorage.setItem('user', JSON.stringify(data))
  },
  ERRORINFO(state, data) {
    state.errorInfo = data
  },
  // 清除用户信息
  CLEARUSERINFO(state) {
    state.userInfo = {}
  },
  USERALLINFO(state, data) {
    state.userList = data
  }
}
const actions = {
  // 用户登录
  async login({commit}, userInfo) {
    let result = await userLogin(userInfo)
    if (result.code === 0) {
      commit('LOGIN', result.data)
      return 'ok'
    } else {
      console.log(result);
      commit('ERRORINFO', result)
      return
    }
  },
  // 获取全部用户
  async userAllInfo({commit}, {paNum = 1, paSize = 10}) {
    let pageNum = paNum
    let pageSize = paSize
    let result = await reqGetUserInfo(pageNum, pageSize)
    if(result.code == 0) {
      commit('USERALLINFO', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 删除用户
  async shelvesUserInfo({commit}, user_name) {
    let result = await shelvesUser(user_name)
    if(result.code == 0) {
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const getters = {
  username(state) {
    return state.userInfo.user_name
  },
  isAdmin(state) {
    return state.userInfo.is_admin
  },
  errorInfo(state) {
    return state.errorInfo
  },
  userList(state) {
    return state.userList.list
  },
  userTotal(state) {
    return state.userList.total
  },
  userSize(state) {
    return state.userList.pageSize
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
