import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// //仓库，存放数据的地方
// const state = {

// }
// //处理state的唯一手段
// const mutations = {

// }
// //完成业务逻辑的地方,也可以处理异步
// const actions = {}
// //理解为计算属性
// const getters = {}
// // 对外暴露Store类的一个实例
//引入小仓库
import Goods from '@/store/Goods/index.js'
import User from '@/store/User/index.js'
import GoodsClass from '@/store/GoodsClass/index.js'
export default new Vuex.Store({
  //实现vuex模块式开发存储数据
  modules: {
    Goods,
    User,
    GoodsClass
  }
})
