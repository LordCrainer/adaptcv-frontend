import { useAuthStore } from '~/modules/auth/store/auth.store'
import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const runtimeConfig = useRuntimeConfig()

  const api: AxiosInstance = axios.create({
    baseURL: runtimeConfig.public.apiBase,
    withCredentials: true
  })

  api.interceptors.request.use(
    (config) => {
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
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
      console.error('API Error:', response)
      if (
        response.status === 401 &&
        ['invalidToken', 'unauthorized'].includes(response.data.name)
      ) {
        await refreshToken()
      }
      return Promise.reject(error)
    }
  )

  function refreshToken() {
    return api
      .post('/v1/auth/refresh-token')
      .then((response) => {
        if (response.data.token) {
          authStore.setToken(response.data.token)
          return response.data.token
        } else {
          authStore.resetAuth()
          throw new Error('Failed to refresh token')
        }
      })
      .catch((error) => {
        authStore.resetAuth()
        throw error
      })
  }

  return {
    provide: {
      api
    }
  }
})
