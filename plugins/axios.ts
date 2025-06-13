import { useAuthStore } from '~/modules/auth/store/auth.store'
import axios, { type AxiosInstance } from 'axios'
import { useAuthWrapper } from '~/modules/auth/composables/useAuthWrapper'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()
  const { refreshToken } = useAuthWrapper()

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
      const response = error.response
      if (
        response?.status === 401 &&
        ['invalidToken', 'unauthorized'].includes(response.data.name)
      ) {
        try {
          // Usar el método refreshToken del wrapper, que ya maneja la lógica y guarda el token
          await refreshToken()
          // Obtener el nuevo token del store
          const newToken = authStore.getToken()
          error.config.headers.Authorization = `Bearer ${newToken}`
          // Reintentar la petición original
          return api.request(error.config)
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
