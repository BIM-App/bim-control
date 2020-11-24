import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'

// 路由懒加载
const ProjectList = () => import('../views/user/ProjectList.vue')
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
    redirect: '/projectlist',
    children: [
      {
        path: '/projectlist',
        name: 'ProjectList',
        component: ProjectList,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/modellist',
        name: 'ModelList',
        component: ModelList,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
          requiresAuth: true
        }
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

// 路由导航守卫
// router.beforeEach((to, form, next) => {
//   let token = window.localStorage.getItem('token')
//   if (to.meta.requiresAuth) {
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
