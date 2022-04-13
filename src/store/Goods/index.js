import {alterGoods, shelvesGoods, reqGetClassification, reqAddGoodsInformation, reqGetGoodsSearch, reqGetGoodsInfo} from '@/api/index.js'
const state = {
  goodsInfo: {},
  goodsSearchInfo: {},
  addGoodsInfo: {},
  classification: {}
}
const mutations = {
  GETGOODSLIST(state, data) {
    state.goodsInfo = data
  },
  GOODSSEARCH(state, data) {
    state.goodsSearchInfo = data
  },
  ADDGOODS(state, data) {
    state.addGoodsInfo = data
  },
  CLASSIFICATION(state, data) {
    state.classification = data
  }
}
const actions = {
  // 获取购物车数据
  async getGoodsInfo({commit}, {paNum = 1, paSize = 10}) {
    let pageNum = paNum
    let pageSize = paSize
    let result = await reqGetGoodsInfo(pageNum, pageSize)
    if(result.code == 0) {
      commit('GETGOODSLIST', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 搜索商品
  async goodsSearch({commit}, {paNum = 1, paSize = 10, input}) {
    let pageNum = paNum
    let pageSize = paSize
    let goods_name = input
    let result = await reqGetGoodsSearch(pageNum, pageSize, goods_name)
    if(result.code == 0) {
      commit('GOODSSEARCH', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 添加商品
  async  addGoods({commit}, information) {
    let result = await reqAddGoodsInformation(information)
    if (result.code === 0) {
      commit('ADDGOODS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取分类
  async getClassification({commit}) {
    let level = 2
    let pageNum = 1
    let pageSize = 20
    let result = await reqGetClassification(level, pageNum, pageSize)
    if (result.code === 0) {
      commit('CLASSIFICATION', result.data)
      // console.log(result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 下架商品
  async shelvesGood({commit}, id) {
    let result = await shelvesGoods(id)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 修改商品
  async alterGoodsInfo({commit}, {id, information}) {
    let result = await alterGoods(id, information)
    if (result.code === 0) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const getters = {
  goodsList(state) {
    return state.goodsInfo.list
  },
  goodsTotal(state) {
    return state.goodsInfo.total
  },
  goodsSize(state) {
    return state.goodsInfo.pageSize
  },
  goodsSearchList(state) {
    return state.goodsSearchInfo.list
  },
  goodsSearchTotal(state) {
    return state.goodsSearchInfo.total
  },
  goodsSearchSize(state) {
    return state.goodsSearchInfo.pageSize
  },
  classification(state) {
    return state.classification.list
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
