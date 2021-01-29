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
      },
      {
        path: ':pid/participant',
        name: 'Participant',
        hidden: true,
        component: () => import('@/views/participant/index'),
        meta: { title: '参建方单位', icon: 'dashboard' }
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
  // {
  //   path: '/task',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Task',
  //       component: () => import('@/views/task/index'),
  //       meta: { title: '任务管理', icon: 'dashboard' }
  //     }
  //   ]
  // },
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
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
export function initRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  console.log(router.options.routes)
  router.options.routes = constantRoutes
}

export default router
