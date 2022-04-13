import {deleteCla, alterGoodsClass, addGoodsClass, resGetGoodsClass} from '@/api/index.js'

const state = {
  goodsClassInfo: {}
}

const mutations = {
  GETGOODSCLASS(state, data) {
    state.goodsClassInfo = data
  }
}

const actions = {
  // 获取分类信息
  async getGoodsClass({commit}, {paNum = 1, paSize = 10, level}) {
    let pageNum = paNum
    let pageSize = paSize
    let result = await resGetGoodsClass(level, pageNum, pageSize)
    if (result.code === 0) {
      commit('GETGOODSCLASS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 增加分类
  async addCla({commit}, claInfo) {
    let result = await addGoodsClass(claInfo)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 修改分类
  async alterCla({commit}, {id, claInfo}) {
    let result = await alterGoodsClass(id, claInfo)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 删除分类
  async deleteClass({commit}, id) {
    let result = await deleteCla(id)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}

const getters = {
  goodsClassList(state) {
    return state.goodsClassInfo.list
  },
  goodsClassTotal(state) {
    return state.goodsClassInfo.total
  },
  goodsClassSize(state) {
    return state.goodsClassInfo.pageSize
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
