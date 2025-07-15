import type { AxiosInstance } from 'axios'
import { inject, getCurrentInstance } from 'vue'
import { useNuxtApp } from '#app'

export const API_KEY = Symbol('api')

export const useApi = (): AxiosInstance => {
  if (getCurrentInstance()) {
    const apiFromInject = inject<AxiosInstance>(API_KEY)
    if (apiFromInject) {
      return apiFromInject
    }
  }

  const nuxtApi = useNuxtApp().$api as AxiosInstance | undefined
  if (nuxtApi) {
    return nuxtApi
  }
  throw new Error('API instance is not available')
}
