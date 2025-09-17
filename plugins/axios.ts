import { errorHandler } from '~/utils/errorHandlers/error.handler'
import { useAuthStore } from '~/modules/auth/store/auth.store'
import axios, { type AxiosInstance } from 'axios'
import { API_KEY } from '~/composables/useApi'

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
    (response) => response.data,
    async (error) => {
      const response = error.response
      const originalRequest = error.config
      const { status, data } = response || {}
      const { refreshToken } = authStore

      const result = await errorHandler({
        name: data?.name || 'UnknownError',
        status,
        refreshToken,
        originalRequest,
        message: data?.message,
        authStore,
        api
      })
      if (result) return result
      return Promise.reject(error)
    }
  )

  // Proveer la instancia para Vue
  nuxtApp.vueApp.provide(API_KEY, api)

  return {
    provide: {
      api
    }
  }
})
