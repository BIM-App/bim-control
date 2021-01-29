import Layout from '@/layout'

/**
 * asyncRoutes
 */
export const superRoutes = [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理', icon: 'nested' },
    children: [
      {
        path: 'companyCheck',
        name: 'CompanyCheck',
        component: () => import('@/views/system/companyCheck/index'),
        meta: { title: 'super公司管理', icon: 'dashboard' }
      },
      {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/system/staff/index'),
        meta: { title: '员工管理', icon: 'dashboard' }
      },
      {
        path: 'staffInfo',
        name: 'StaffInfo',
        hidden: true,
        component: () => import('@/views/system/staffInfo/index'),
        meta: { title: '员工详情', icon: 'dashboard' }
      }
    ]
  }
]

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
        name: 'Staff',
        component: () => import('@/views/system/staff/index'),
        meta: { title: '员工管理', icon: 'dashboard', roles: ['admin'] }
      },
      {
        path: 'staffInfo',
        name: 'StaffInfo',
        hidden: true,
        component: () => import('@/views/system/staffInfo/index'),
        meta: { title: '员工详情', icon: 'dashboard', roles: ['admin'] }
      }
    ]
  }
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const staffRoutes = [
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
  }
]
export const endRoutes = [{ path: '*', redirect: '/404', hidden: true }]
