const { $api } = useNuxtApp()
import { useAuthStore } from '@/domains/auth/store/auth.store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { AuthService } from '../services/auth.service'
import type { RequestUserData } from '@lordcrainer/adaptcv-shared-types'

export function useAuth() {
  const authService = new AuthService($api)
  const { setUserData, setToken, clearAllAuthData, getUserData, removeToken } =
    useAuthStore()
  const router = useRouter()
  const loading = ref(false)

  const login = async (credentials) => {
    try {
      loading.value = true
      const data = await authService.login(credentials)
      setUserData(data.user)
      setToken(data.token)
      return data
    } catch (error) {
      removeToken()
      throw new Error('useAuth.login: logging in')
    } finally {
      loading.value = false
    }
  }

  const register = async (user: RequestUserData) => {
    try {
      if (!user) {
        throw new Error('User not found')
      }
      const data = await authService.register(user)
      return data
    } catch (error) {
      throw new Error('useAuth.register: registering')
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      const user = getUserData()
      if (!user) {
        throw new Error('User not found')
      }
      await router.push({ name: 'login' })
      const data = await authService.logout(user._id)
      return data
    } catch (error) {
      await router.back()
      throw new Error('useAuth.logout: logging out')
    } finally {
      loading.value = false
      clearAllAuthData()
    }
  }

  return { login, register, logout }
}
