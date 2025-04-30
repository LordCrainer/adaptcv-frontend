import { useAuthStore } from '@/domains/auth/store/auth.store';
import axios from 'axios'
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  })
  axiosInstance.interceptors.request.use(
    (config) => {
      // Modify request config before sending the request
      const token = useAuthStore().token
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
  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle successful response
      return response
    },
    (error) => {
      // Handle response error
      if (error.response && error.response.status === 401) {
        useAuthStore().logout()
      }
      return Promise.reject(error)
    }
  )
  return {
    provide: { axios: axiosInstance }
  }
})
