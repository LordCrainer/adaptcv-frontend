import { errorHandler } from '~/utils/errorHandlers/error.handler'
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

import { errorMessages, errorNames } from '~/utils/errorHandlers/error.messages'

  interface ErrorHandler {
    name: string
    status: number
    originalRequest: any
    message?: string
  }


  api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const response = error.response
      const originalRequest = error.config
      const { status, data } = response || {}
      const { refreshToken } = useAuthWrapper(api)

      const result = await errorHandler({
        name: data?.name || 'UnknownError',
        status,
        refreshToken,
        originalRequest,
        message: data?.message
      })
      if (result) return result
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api
    }
  }
})
