import { useAuthStore } from '../store/auth.store'
import type { IAuthService } from '../interfaces/auth.interface';

export const useAuth = (authHttpService: IAuthService) => {
  const store = useAuthStore()

  async function login(credentials: { email: string; password: string }) {
    store.toggleLoading(true)
    try {
      const response = await authHttpService.login(credentials)
      store.setToken(response.accessToken)
      store.setUser(response.user)
    } catch (err: any) {
      store.error = err.response?.data?.message || err.message
      throw err
    } finally {
      store.toggleLoading(false)
    }
  }

  async function logout() {
    if (!store.user) {
      store.resetAuth()
      throw new Error('No user logged in')
    }
    await authHttpService.logout(store.user._id)
    store.resetAuth()
  }

  async function refreshToken() {
    const response = await authHttpService.refreshToken()
    store.setToken(response.accessToken)
    return response
  }

  return {
    login,
    logout,
    refreshToken
  }
}
