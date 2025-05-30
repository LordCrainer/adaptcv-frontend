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
    children: [
      {
        path: '/',
        component: () => import('~/pages/builder/index.vue'),
        props: {
          title: 'builder',
          icon: 'mdi-file-document-edit-outline'
        }
      }
    ]
  }
]
