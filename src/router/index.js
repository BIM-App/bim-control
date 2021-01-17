import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all role can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/index',
    meta: { title: '项目管理', icon: 'dashboard' },
    children: [
      {
        path: 'index',
        name: 'Project',
        component: () => import('@/views/project/index'),
        hidden: true
      },
      {
        path: ':pid/member',
        name: 'Member',
        hidden: true,
        component: () => import('@/views/member/index'),
        meta: { title: '项目成员', icon: 'dashboard' }
      },
      {
        path: ':pid/info',
        name: 'ProjectInfo',
        hidden: true,
        component: () => import('@/views/projectInfo/index'),
        meta: { title: '项目详情', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: 'Profile' }
    }]
  },
  {
    path: '/task',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Task',
        component: () => import('@/views/task/index'),
        meta: { title: '任务管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

/**
 * asyncRoutes
 */
export const adminRoutes = [

  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理', icon: 'nested', roles: ['admin'] },
    children: [
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/system/company/index'),
        meta: { title: '公司管理', icon: 'dashboard', roles: ['admin'] }
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/system/staff/index'),
        meta: { title: '员工管理', icon: 'dashboard', roles: ['admin'] }
      }
    ]
  }
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const endRoutes = [{ path: '*', redirect: '/404', hidden: true }]
