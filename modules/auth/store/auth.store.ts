import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUsers } from '@lordcrainer/adaptcv-shared-types'

const accessTokenKey = 'access-token'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string>('')
  const user = ref<IUsers | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  const isAuthenticated = computed(() => !!getToken())

  function setUser(data: IUsers | null) {
    user.value = data
  }
  function setToken(data: string) {
    accessToken.value = data
    localStorage.setItem(accessTokenKey, data)
  }

  function getToken() {
    return accessToken.value || localStorage.getItem(accessTokenKey) || ''
  }

  function resetAuth() {
    user.value = null
    accessToken.value = ''
    localStorage.removeItem(accessTokenKey)
  }

  function toggleLoading(loading: boolean) {
    isLoading.value = loading
  }

  return {
    accessToken,
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
