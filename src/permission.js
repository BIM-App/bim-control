import router from './router'
import store from './store'
import { getUser } from './utils/auth'

router.beforeEach((to, from, next) => {
  if (from.path === '/' && to.path === '/dashboard') {
    next(`/login?redirect=${to.path}`)
  } else {
    if (to.meta.requiresAuth) {
      // 检查vuex或 cookie内是否存在用户信息
      if (store.state.user.user.id) {
        next()
      } else if (getUser()) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    } else {
      next()
    }
  }
})
