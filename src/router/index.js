import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import Test from '../components/Test.vue'


// 路由懒加载
const Management = () => import('../views/user/Management.vue')
const ModelList = () => import('../views/user/ModelList.vue')
const Profile = () => import('../views/user/Profile.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/test',
    children: [
      {
        path: '/test',
        name: 'Test',
        component: Test
      },
      {
        path: '/management',
        name: 'Management',
        component: Management
      },
      {
        path: '/modellist',
        name: 'ModelList',
        component: ModelList
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
