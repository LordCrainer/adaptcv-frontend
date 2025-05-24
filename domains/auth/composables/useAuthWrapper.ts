import { useApi } from '~/composables/useApi'
import { AuthHttpService } from '../services/auth-http.service'
import { useAuth } from './useAuth'

export function useAuthWrapper() {
  const api = useApi()
  const authHttp = new AuthHttpService(api)
  return useAuth(authHttp)()
}
