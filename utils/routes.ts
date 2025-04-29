import type { RouteExtended } from '~/types/global'

export const APP_ROUTES: RouteExtended[] = [
  {
    path: '/',
    props: {
      title: 'home',
      icon: 'mdi-home'
    },
    component: () => import('~/pages/index.vue')
  },
  {
    path: '/builder',
    props: {
      title: 'builder',
      icon: 'mdi-file-document-edit-outline'
    },
    component: () => import('~/layouts/builder.vue'),
    children: [
      {
        path: '',
        component: () => import('~/pages/builder/index.vue')
      },
      {
        path: 'preview',
        component: () => import('~/pages/builder/preview.vue')
      }
    ]
  }
]
