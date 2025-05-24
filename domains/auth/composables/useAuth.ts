import { computed } from 'vue'
import { useAuthStore } from '../store/auth.store'

export function useAuth() {
  const store = useAuthStore()

  return {
    // State
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),

    // Actions
    login: store.login,
    logout: store.logout,
    fetchUser: store.fetchUser
  }
}
