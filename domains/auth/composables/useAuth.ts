import { useAuthStore } from '../store/auth.store'
import type { IAuthService } from '../interfaces/auth.interface'

export const useAuth = (authHttpService: IAuthService) => {
  const store = useAuthStore()

  async function login(credentials: { email: string; password: string }) {
    store.toggleLoading(true)
    try {
      const response = await authHttpService.login(credentials)
      store.setToken(response.token)
      store.setUser(response.user)
    } catch (err: any) {
      store.error = err.response?.data?.message || err.message
      throw err
    } finally {
      store.toggleLoading(false)
    }
  }

  async function logout() {
    await authHttpService.logout()
    store.resetAuth()
  }

  async function refreshToken() {
    if (!store.refreshToken) throw new Error('No refresh token')
    const response = await authHttpService.refreshToken(store.refreshToken)
    store.setToken(response.token)
    store.setRefreshToken(response.refreshToken)
  }

  return {
    login,
    logout,
    refreshToken
  }
}
