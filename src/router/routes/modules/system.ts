import { DEFAULT_LAYOUT } from '../base'
import { ServerRouteRecordRaw } from '../types'

const MENUS: ServerRouteRecordRaw[] = [
  {
    path: '/system',
    name: 'system',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '10',
      locale: '系统管理',
      icon: 'apps',
      requiresAuth: true,
      order: 99,
      level: 1,
    },
    children: [
      {
        path: 'dictionaries',
        name: 'Dictionaries',
        component: () => import('@/views/system/dictionaries/index.vue'),
        meta: {
          id: '1001',
          locale: '字典管理',
          requiresAuth: true,
          icon: 'interaction',
          level: 2,
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/roles/index.vue'),
        meta: {
          id: '1002',
          locale: '角色管理',
          requiresAuth: true,
          icon: 'user-group',
          level: 2,
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          id: '1003',
          locale: '用户管理',
          requiresAuth: true,
          icon: 'user',
          level: 2,
        },
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          id: '1004',
          locale: '系统菜单',
          requiresAuth: true,
          icon: 'menu',
          level: 2,
        },
      },
    ],
  },
]

export default MENUS
