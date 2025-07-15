import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUsers, LoginRequest } from '@lordcrainer/adaptcv-shared-types'
import { AuthHttpService } from '../services/auth-http.service'
import { useApi } from '~/composables/useApi'

const accessTokenKey = 'access-token'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string>('')
  const user = ref<IUsers | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string>('')

  let authServiceInstance: AuthHttpService | null = null

  function getAuthService() {
    if (!authServiceInstance) {
      authServiceInstance = new AuthHttpService(useApi())
    }
    return authServiceInstance
  }

  const isAuthenticated = computed(() => !!getToken())

  function setUser(data: IUsers | null) {
    user.value = data
    if (data) {
      localStorage.setItem('user', JSON.stringify(data))
    } else {
      localStorage.removeItem('user')
    }
  }
  function setToken(data: string) {
    accessToken.value = data
    localStorage.setItem(accessTokenKey, data)
  }

  function getToken() {
    return accessToken.value || localStorage.getItem(accessTokenKey) || ''
  }

  function getUser() {
    return user.value || JSON.parse(localStorage.getItem('user') || 'null')
  }

  function resetAuth() {
    user.value = null
    accessToken.value = ''
    localStorage.removeItem(accessTokenKey)
  }

  function toggleLoading(loading: boolean) {
    isLoading.value = loading
  }

  async function login(credentials: LoginRequest) {
    toggleLoading(true)
    error.value = ''
    try {
      const response = await getAuthService().login(credentials)
      setToken(response.accessToken)
      setUser(response.user)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      toggleLoading(false)
    }
  }

  async function logout() {
    const currentUser = getUser()
    if (!currentUser) {
      resetAuth()
      throw new Error('No user logged in')
    }
    await getAuthService().logout(currentUser._id)
    resetAuth()
  }

  async function refreshToken() {
    try {
      const response = await getAuthService().refreshToken()
      setToken(response.accessToken)
      return response
    } catch (err) {
      resetAuth()
      throw err
    }
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
    getUser, // getUser ya existe
    toggleLoading,
    login,
    logout,
    refreshToken
  }
})
