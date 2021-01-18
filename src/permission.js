import router, { adminRoutes, endRoutes } from './router'
// import store from './store'
import { getRole } from '@/utils/cookie'

let flag = false
router.beforeEach((to, from, next) => {
  if (from.path === '/' && to.path === '/dashboard') {
    if (sessionStorage.getItem('uid')) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  } else {
    if (getRole() && flag === false) {
      // console.log('添加前路由', router.options.routes)
      const addRoutes = getRole() === 'admin' ? [...adminRoutes, ...endRoutes] : endRoutes
      router.addRoutes(addRoutes)
      router.options.routes = router.options.routes.concat(addRoutes)
      console.log('添加后路由', router.options.routes)
      flag = true
      next()
    } else {
      console.log(router.options.routes)
      next()
    }
  }
})
