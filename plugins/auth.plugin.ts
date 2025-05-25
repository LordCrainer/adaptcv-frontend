import { useAuth } from '~/modules/auth/composables/useAuth'
import { AuthHttpService } from '~/modules/auth/services/auth-http.service'
import { UseAuthKey } from '~/types/symbol'

export default defineNuxtPlugin((nuxtApp) => {
  const api = useNuxtApp().$api
  const authHttp = new AuthHttpService(api)

  const injectedUseAuth = useAuth(authHttp)

  nuxtApp.vueApp.provide(UseAuthKey, injectedUseAuth)
})
