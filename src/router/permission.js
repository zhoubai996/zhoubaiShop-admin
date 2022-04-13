import router from './index'
import store from '@/store/index'
// 路由拦截
router.beforeEach((to, from, next) => {
  // 1.判断是否需要登录
  if (to.matched.some(ele => ele.meta.isLogin)) {
    // 2.判断用户是否已经登录
    let token = store.state.User.userInfo.token
    let is_admin = store.state.User.userInfo.is_admin
    if (token && is_admin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
