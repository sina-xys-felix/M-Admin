import { DEFAULT_LAYOUT } from '../base'
import { ServerRouteRecordRaw } from '../types'

const DASHBOARD: ServerRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '12',
      locale: 'menu.home',
      icon: 'home',
      requiresAuth: true,
      order: 0,
    },
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: () => import('@/views/dashboard/welcome/index.vue'),
        meta: {
          locale: 'menu.dashboard.welcome',
          icon: 'face-smile-fill',
          requiresAuth: true,
          roles: ['*'],
          id: '1201',
        },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          locale: 'menu.dashboard.analysis',
          icon: 'computer',
          requiresAuth: true,
          roles: ['*'],
          id: '1202',
        },
      },
    ],
  },
]

export default DASHBOARD
