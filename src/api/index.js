
import request from './request'

// 获取全部商品
export const reqGetGoodsInfo = (pageNum, pageSize) => request({url: `/goods?pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 搜索商品
export const reqGetGoodsSearch = (pageNum, pageSize, goods_name) => request({url: `/goods/search?pageNum=${pageNum}&pageSize=${pageSize}`, data: {goods_name: goods_name}, method: 'post'})
// 添加商品
export const reqAddGoodsInformation = (information) => request({url: '/goods', method: 'post', data: information})
// 获取二级分类
export const reqGetClassification = (level, pageNum, pageSize) => request({url: `/cla?level=${level}&pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 下架/删除商品
export const shelvesGoods = (id) => request({url: `/goods/${id}/off`, method: 'post'})
// 修改商品
export const alterGoods = (id, information) => request({url: `/goods/${id}`, method: 'put', data: information})
// 登录接口
export const userLogin = (userInfo) => request({url: '/users/login', method: 'post', data: userInfo})
// 获取全部用户
export const reqGetUserInfo = (pageNum, pageSize) => request({url: `/users?pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 删除用户接口
export const shelvesUser = (user_name) => request({url: '/users/banned', method: 'post', data: {user_name}})
// 获取分类接口
export const resGetGoodsClass = (level, pageNum, pageSize) => request({url: `/cla?level=${level}&pageNum=${pageNum}&pageSize=${pageSize}`, method: 'get'})
// 增加分类
export const addGoodsClass = (claInfo) => request({url: '/cla', data: claInfo, method: 'post'})
// 修改分类
export const alterGoodsClass = (id, claInfo) => request({url:`/cla/${id}`, method: 'put', data: claInfo})
// 删除分类接口
export const deleteCla = (id) => request({url:`/cla/${id}`, method: 'delete'})

