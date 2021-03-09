import router from './router'
import { superRoutes, adminRoutes, staffRoutes, endRoutes } from './router/asyncRoutes'
// import store from './store'
import { getRole, removeRole, removeUser } from '@/utils/cookie'

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  const hasRole = getRole()
  if (hasRole) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (router.options.routes.length === 9 && getRole() === 'super') {
        // super权限
        next()
      } else if (router.options.routes.length === 9 && getRole() === 'admin') {
        // admin权限
        next()
      } else if (router.options.routes.length === 9 && getRole() === 'staff') {
        // staff权限
        next()
      } else {
        try {
          // console.log('添加前路由', router.options.routes)
          // const addRoutes = getRole() === 'admin' ? [...adminRoutes, ...endRoutes] : endRoutes
          // 判断用户权限并给予对应的路由表
          const addRoutes = getRole() === 'super'
            ? [...superRoutes, ...endRoutes]
            : getRole() === 'admin'
              ? [...adminRoutes, ...endRoutes]
              : [...staffRoutes, ...endRoutes]
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
    if (whiteList.indexOf(to.path) !== -1 || to.path === '/register') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
