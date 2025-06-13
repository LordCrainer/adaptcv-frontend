import { useAuthStore } from '~/modules/auth/store/auth.store'
import axios, { type AxiosInstance } from 'axios'
import { useAuthWrapper } from '~/modules/auth/composables/useAuthWrapper'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()

  const api: AxiosInstance = axios.create({
    baseURL: runtimeConfig.public.apiBase,
    withCredentials: true
  })

  api.interceptors.request.use(
    (config) => {
      const token = authStore.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // Handle request error
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response.data
    },
    async (error) => {
      const { refreshToken } = useAuthWrapper(api)
      const response = error.response
      const originalRequest = error.config
      if (
        response?.status === 401 &&
        ['invalidToken', 'unauthorized'].includes(response.data.name) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true
        try {
          await refreshToken()
          originalRequest.headers.Authorization = `Bearer ${authStore.getToken()}`
          return api.request(originalRequest)
        } catch (refreshError) {
          authStore.resetAuth()
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})
