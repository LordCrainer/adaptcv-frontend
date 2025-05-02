import type { AxiosInstance } from "axios"

export const useApi = () => {
  // const { $api } = useNuxtApp()
  const $api = {} as AxiosInstance
  return $api
}
