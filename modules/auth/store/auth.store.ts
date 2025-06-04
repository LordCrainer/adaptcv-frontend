import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUsers } from '@lordcrainer/adaptcv-shared-types'

const accessTokenKey = 'access-token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const user = ref<IUsers | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  const isAuthenticated = computed(() => !!token.value)

  function setUser(data: IUsers | null) {
    user.value = data
  }
  function setToken(data: string) {
    token.value = data
    localStorage.setItem(accessTokenKey, data)
  }

  function getToken() {
    return token.value || localStorage.getItem(accessTokenKey) || ''
  }

  function resetAuth() {
    user.value = null
    token.value = ''
    localStorage.removeItem(accessTokenKey)
  }

  function toggleLoading(loading: boolean) {
    isLoading.value = loading
  }

  return {
    token,
    user,
    isLoading,
    error,

    isAuthenticated,

    setUser,
    setToken,
    getToken,
    resetAuth,
    toggleLoading
  }
})
