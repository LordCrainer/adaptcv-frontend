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
    path: '/profile',
    props: {
      title: 'profile',
      icon: 'mdi-account'
    },
    component: () => import('~/layouts/profileBuilder.vue'),
    children: [
      {
        path: '/',
        component: () => import('~/pages/profile/index.vue'),
        props: {
          title: 'builder',
          icon: 'mdi-file-document-edit-outline'
        }
      },
      {
        path: 'preview',
        component: () => import('~/pages/profile/preview.vue'),
        props: {
          title: 'preview',
          icon: 'mdi-eye-outline'
        }
      }
    ]
  }
]
