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

  // Error message dictionary (English)
  const errorMessages: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Access denied',
    404: 'Resource not found',
    500: 'Internal server error'
  }
  const errorNames: Record<string, string> = {
    notFound: 'Resource not found',
    invalidToken: 'Session expired. Please log in again.',
    unauthorized: 'You are not authorized to perform this action.'
  }

  interface ErrorHandler {
    name: string
    status: number
    originalRequest: any
    message?: string
  }

  // const errorHandler = async (params: ErrorHandler) => {
  //   const { name, status, originalRequest, message } = params
  //   const { refreshToken } = useAuthWrapper(api)

  //   switch (status) {
  //     case 401:
  //       if (
  //         ['invalidToken', 'unauthorized'].includes(name) &&
  //         !originalRequest._retry
  //       ) {
  //         originalRequest._retry = true
  //         try {
  //           await refreshToken()
  //           originalRequest.headers.Authorization = `Bearer ${authStore.getToken()}`
  //           return api.request(originalRequest)
  //         } catch (refreshError) {
  //           authStore.resetAuth()
  //           const statusMessage = errorNames[name] || errorMessages[401]
  //           throw createError({ statusCode: 401, statusMessage })
  //         }
  //       }
  //       // Si no aplica refresh, lanza error personalizado
  //       const statusMessage401 = errorNames[name] || errorMessages[401]
  //       throw createError({ statusCode: 401, statusMessage: statusMessage401 })
  //     default:
  //       // Prioridad: mensaje backend > error name > error code
  //       const errorMessage =
  //         message ||
  //         (name && errorNames[name]) ||
  //         errorMessages[status] ||
  //         'Unknown error'
  //       throw createError({ statusCode: status, statusMessage: errorMessage })
  //   }
  // }

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
