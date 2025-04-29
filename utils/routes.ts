import type { IRoutes } from '~/types/global'

export const APP_ROUTES: IRoutes[] = [
  {
    title: 'home',
    path: '/',
    icon: 'mdi-home',
    id: 'home'
  },
  {
    title: 'builder',
    path: '/builder',
    icon: 'mdi-information',
    id: 'fill-information'
  },
  // { title: 'templates', path: '/templates', icon: 'mdi-note-multiple' },
  // { title: 'preview', path: '/preview', icon: 'mdi-eye' }
]
