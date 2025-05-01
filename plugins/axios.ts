import { useAuthStore } from '@/domains/auth/store/auth.store'
import axios, { type AxiosInstance } from 'axios'

const { getToken, clearAllAuthData } = useAuthStore()

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  const api: AxiosInstance = axios.create({
    baseURL: runtimeConfig.public.apiBase
  })

  api.interceptors.request.use(
    (config) => {
      // Modify request config before sending the request
      const token = getToken()
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
      // Handle successful response
      return response
    },
    (error) => {
      // Handle response error
      if (error.response && error.response.status === 401) {
        clearAllAuthData()
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
