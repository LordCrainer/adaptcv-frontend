import type { IAuthService } from '~/domains/auth/interfaces/auth.interface'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUsers } from '@lordcrainer/adaptcv-shared-types'
import { useAuthService } from '../composables/useAuthService'

export const useAuthStore = defineStore('auth', () => {
  // ——— State (refs) ———
  const token = ref<string>('')
  const refreshToken = ref<string>('')
  const user = ref<IUsers | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  const isAuthenticated = computed(() => !!token.value)

  function getAuthService(): IAuthService {
    return useAuthService()
  }

  // ——— Actions ———
  async function login(credentials: { email: string; password: string }) {
    isLoading.value = true
    error.value = ''
    try {
      const response = await getAuthService().login(credentials)
      token.value = response.token
      refreshToken.value = response.refreshToken
      user.value = response.user
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function clearAuthData() {
    token.value = ''
    refreshToken.value = ''
    user.value = null
  }

  async function logout() {
    await getAuthService().logout()
    clearAuthData()
  }

  async function refresh() {
    if (!refreshToken.value) throw new Error('No refresh token')
    const response = await getAuthService().refreshToken(refreshToken.value)
    token.value = response.token
    refreshToken.value = response.refreshToken
  }

  async function fetchUser() {
    user.value = await getAuthService().getCurrentUser()
  }

  // ——— Expose ———
  return {
    // state
    token,
    refreshToken,
    user,
    isLoading,
    error,

    // getters
    isAuthenticated,

    // actions
    login,
    logout,
    refresh,
    fetchUser,
    clearAuthData
  }
})
