import router, { adminRoutes, endRoutes } from './router'
// import store from './store'
import { getRole, removeRole, removeUser } from '@/utils/cookie'

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  const hasRole = getRole()
  if (hasRole) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (router.options.routes.length === 9 && getRole() === 'admin') {
        // admin权限
        next()
      } else if (router.options.routes.length === 7 && getRole() === 'staff') {
        // staff权限
        next()
      } else {
        try {
          // console.log('添加前路由', router.options.routes)
          const addRoutes = getRole() === 'admin' ? [...adminRoutes, ...endRoutes] : endRoutes
          router.addRoutes(addRoutes)
          router.options.routes = router.options.routes.concat(addRoutes)
          // console.log('添加后路由', router.options.routes)
          next(to.fullPath)
        } catch (error) {
          await removeRole()
          await removeUser()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 没有登录获取权限前
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(getRole())
      next(`/login?redirect=${to.path}`)
    }
  }
})
