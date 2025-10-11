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
  {
    path: '/dataview',
    name: 'DataView',
    component: () => import('@/views/dataview/index.vue'),
    meta: {
      id: '7100',
      locale: 'settings.bigScreen',
      icon: 'desktop',
      requiresAuth: true,
      order: 0,
      type: 'screen',
      level: 1,
      noAffix: false,
      tabar: false,
      hideInMenu: true,
      ignoreCache: true,
    },
  },
]

export default DASHBOARD
