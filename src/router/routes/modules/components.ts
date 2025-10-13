import { DEFAULT_LAYOUT, PAGE_LAYOUT } from '../base'
import { ServerRouteRecordRaw } from '../types'

const Components: ServerRouteRecordRaw[] = [
  // 列表管理
  {
    path: '/table',
    name: 'Table',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '10',
      locale: '列表管理',
      icon: 'list',
      requiresAuth: true,
      order: 1,
    },
    children: [
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/table/base/index.vue'),
        meta: {
          locale: '基础表格',
          requiresAuth: true,
          icon: 'menu',
          roles: ['*'],
          id: '1001',
        },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/table/tree/index.vue'),
        meta: {
          locale: '分栏表格',
          requiresAuth: true,
          icon: 'mind-mapping',
          roles: ['*'],
          id: '1002',
        },
      },
    ],
  },
  // 表单管理
  {
    path: '/form',
    name: 'Form',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '13',
      locale: '表单管理',
      icon: 'bookmark',
      requiresAuth: true,
      order: 1,
    },
    children: [
      {
        path: 'basic',
        name: 'Group',
        component: () => import('@/views/form/group/index.vue'),
        meta: {
          locale: '基础表单',
          requiresAuth: true,
          icon: 'archive',
          roles: ['*'],
          id: '1301',
        },
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/form/config/index.vue'),
        meta: {
          locale: '配置表单',
          requiresAuth: true,
          icon: 'tool',
          roles: ['*'],
          id: '1302',
        },
      },
    ],
  },
  // 多级菜单
  {
    path: '/multilevel',
    name: 'Multilevel',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '16',
      locale: '多级菜单',
      icon: 'mind-mapping',
      requiresAuth: true,
      order: 1,
    },
    children: [
      {
        path: 'second-1',
        name: 'second-1',
        component: () => import('@/views/multilevel/second1.vue'),
        meta: {
          locale: '二级菜单-1',
          requiresAuth: true,
          icon: 'menu',
          roles: ['*'],
          id: '1601',
        },
      },
      {
        path: 'second-2',
        name: 'second-2',
        component: PAGE_LAYOUT,
        meta: {
          locale: '二级菜单-2',
          requiresAuth: true,
          icon: 'menu',
          roles: ['*'],
          id: '1602',
        },
        children: [
          {
            path: 'third-1',
            name: 'third-1',
            component: () => import('@/views/multilevel/third1.vue'),
            meta: {
              locale: '三级级菜单-1',
              requiresAuth: true,
              icon: 'menu',
              roles: ['*'],
              id: '160201',
            },
          },
          {
            path: 'third-2',
            name: 'third-2',
            component: () => import('@/views/multilevel/third2.vue'),
            meta: {
              locale: '三级级菜单-2',
              requiresAuth: true,
              icon: 'menu',
              roles: ['*'],
              id: '160202',
            },
          },
          {
            path: 'third-3',
            name: 'third-3',
            component: () => import('@/views/multilevel/third3.vue'),
            meta: {
              locale: '三级级菜单-3',
              requiresAuth: true,
              icon: 'menu',
              roles: ['*'],
              id: '160203',
            },
          },
        ],
      },
    ],
  },
  // 异常管理
  {
    path: '/exception',
    name: 'Exception',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '15',
      locale: '异常管理',
      icon: 'exclamation-circle',
      requiresAuth: true,
      order: 1,
    },
    children: [
      {
        path: '403',
        name: '403',
        component: () => import('@/views/exception/403/index.vue'),
        meta: {
          locale: '403',
          requiresAuth: true,
          icon: 'clock-circle',
          roles: ['*'],
          id: '1501',
        },
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/exception/404/index.vue'),
        meta: {
          locale: '404',
          requiresAuth: true,
          icon: 'question-circle',
          roles: ['*'],
          id: '1502',
        },
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/exception/500/index.vue'),
        meta: {
          locale: '500',
          requiresAuth: true,
          icon: 'close-circle',
          roles: ['*'],
          id: '1503',
        },
      },
    ],
  },
]

export default Components
