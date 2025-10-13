import { DEFAULT_LAYOUT } from '../base'
import { ServerRouteRecordRaw } from '../types'

const DASHBOARD: ServerRouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    redirect: '/dashboard/analysis',
    meta: {
      id: '12',
      locale: '数据概览',
      icon: 'home',
      requiresAuth: true,
      order: 0,
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          locale: '数据概览',
          icon: 'computer',
          requiresAuth: true,
          roles: ['*'],
          id: '1202',
          activeMenu: 'dashboard',
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
      locale: '数据大屏',
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
