import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUsers } from '@lordcrainer/adaptcv-shared-types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const refreshedToken = ref<string>('')
  const user = ref<IUsers | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  const isAuthenticated = computed(() => !!token.value)

  function setUser(data: IUsers | null) {
    user.value = data
  }
  function setToken(data: string) {
    token.value = data
  }
  function resetAuth() {
    user.value = null
    token.value = ''
    refreshedToken.value = ''
  }

  function toggleLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setRefreshToken(data: string) {
    refreshedToken.value = data
  }

  return {
    token,
    refreshedToken,
    user,
    isLoading,
    error,

    isAuthenticated,

    setUser,
    setToken,
    resetAuth,
    toggleLoading,
    setRefreshToken
  }
})
