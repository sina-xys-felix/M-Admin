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
      locale: 'menu.table',
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
          locale: 'menu.table.basic',
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
          locale: 'menu.table.columnar',
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
      locale: 'menu.form',
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
          locale: 'menu.form.basic',
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
          locale: 'menu.form.config',
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
      locale: 'menu.form.menus',
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
          locale: 'menu.form.menus.second.1',
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
          locale: 'menu.form.menus.second.2',
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
              locale: 'menu.form.menus.third.1',
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
              locale: 'menu.form.menus.third.2',
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
              locale: 'menu.form.menus.third.3',
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
  // 组件示例
  {
    path: '/components',
    name: 'Components',
    component: DEFAULT_LAYOUT,
    redirect: '/components/example',
    meta: {
      id: '14',
      locale: 'menu.components',
      icon: 'layers',
      requiresAuth: true,
      order: 1,
      hideChildrenInMenu: true,
      activeMenu: 'Components',
    },
    children: [
      {
        path: 'example',
        name: 'Example',
        component: () => import('@/views/components/index.vue'),
        meta: {
          locale: 'menu.components',
          requiresAuth: true,
          icon: 'folder',
          roles: ['*'],
          id: '1401',
        },
      },
    ],
  },
  // 自定义指令
  {
    path: '/directive',
    name: 'Directive',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '17',
      locale: 'menu.directive',
      icon: 'thunderbolt',
      requiresAuth: true,
      order: 1,
    },
    children: [
      {
        path: 'water-marker',
        name: 'WaterMarker',
        component: () => import('@/views/directive/water-marker/index.vue'),
        meta: {
          locale: 'menu.directive.water.marker',
          requiresAuth: true,
          icon: 'menu',
          roles: ['*'],
          id: '1701',
        },
      },
      {
        path: 'throttle',
        name: 'Throttle',
        component: () => import('@/views/directive/throttle/index.vue'),
        meta: {
          locale: 'menu.directive.throttle',
          requiresAuth: true,
          icon: 'menu',
          roles: ['*'],
          id: '1702',
        },
      },
      {
        path: 'debounce',
        name: 'Debounce',
        component: () => import('@/views/directive/debounce/index.vue'),
        meta: {
          locale: 'menu.directive.debounce',
          requiresAuth: true,
          icon: 'menu',
          roles: ['*'],
          id: '1702',
        },
      },
    ],
  },
  // 异常页
  {
    path: '/exception',
    name: 'Exception',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '15',
      locale: 'menu.exception',
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
          locale: 'menu.exception.403',
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
          locale: 'menu.exception.404',
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
          locale: 'menu.exception.500',
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
