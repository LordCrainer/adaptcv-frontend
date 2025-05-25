import { useAuthStore } from '~/modules/auth/store/auth.store'

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  const { isAuthenticated } = auth
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
  if (to.path === '/login' && isAuthenticated) {
    return navigateTo('/')
  }
})
