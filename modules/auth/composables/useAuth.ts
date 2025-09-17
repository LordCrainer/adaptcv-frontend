import { computed } from 'vue'
import { useAuthStore } from '~/modules/auth/store/auth.store'

/**
 * Composable para interactuar con la autenticación desde componentes.
 * Expone el estado y las acciones del Auth Store de forma reactiva.
 */
export function useAuth() {
  const store = useAuthStore()

  const user = computed(() => store.user)
  const isLoading = computed(() => store.isLoading)
  const error = computed(() => store.error)
  const isAuthenticated = computed(() => store.isAuthenticated)

  async function login(credentials: { email: string; password: string }) {
    return store.login(credentials)
  }

  async function logout() {
    return store.logout()
  }

  async function refreshToken() {
    return store.refreshToken()
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshToken
  }
}
