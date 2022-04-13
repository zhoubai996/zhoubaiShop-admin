import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import * as echarts from 'echarts'
import './assets/css/reset.css'
// 数据持久化
import '@/util/localStorage'
// 导航守卫
import '@/router/permission'
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
