import type { AxiosInstance } from 'axios'

export const useApi = () => {
  const api = useNuxtApp().$api
  if (!api) {
    throw new Error('API instance is not available')
  }
  return api as AxiosInstance
}
