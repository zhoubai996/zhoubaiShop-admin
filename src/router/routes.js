// 导入组件
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
const User = () => import('@/views/User')
const Goods = () => import('@/views/Goods')
const GoodsClass = () => import('@/views/GoodsClass')

// 导出
export default [
  {
    path: '',
    component: Layout,
    // 路由元信息
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: '/goodsclass',
        name: 'GoodsClass',
        component: GoodsClass
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
