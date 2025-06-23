import { DEFAULT_LAYOUT } from '../base'
import { ServerRouteRecordRaw } from '../types'

const DOCUMENT: ServerRouteRecordRaw[] = [
  {
    path: '/document',
    name: 'Document',
    component: DEFAULT_LAYOUT,
    meta: {
      id: '16',
      locale: 'menu.document',
      icon: 'home',
      requiresAuth: true,
      order: 2,
    },
    children: [
      {
        path: 'arco-design',  
        name: 'Arco Design',
        component: () => import('@/views/document/arco-design/index.vue'),
        meta: {
          locale: 'menu.document.arco',
          icon: 'font-colors',
          requiresAuth: true,   
          roles: ['*'],
          id: '1601',
        },
      },
      {
        path: 'vite',
        name: 'Vite',
        component: () => import('@/views/document/vite/index.vue'),
        meta: {
          locale: 'menu.document.vite',
          icon: 'right-circle',
          requiresAuth: true,
          roles: ['*'],
          id: '1602',
        },
      },
    ],
  },
]

export default DOCUMENT
