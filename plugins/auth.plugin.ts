import type { AxiosInstance } from "axios"
import { useAuth } from "~/domains/auth/composables/useAuth"
import { AuthHttpService } from "~/domains/auth/services/auth-http.service"


export default defineNuxtPlugin((nuxtApp) => {
  const axios = useNuxtApp().$axios as unknown as AxiosInstance
  const authHttp = new AuthHttpService(axios)

  const injectedUseAuth = useAuth(authHttp)

  nuxtApp.provide('useAuth', injectedUseAuth)
})
