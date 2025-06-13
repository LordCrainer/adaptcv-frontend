import { useApi } from '~/composables/useApi'
import { AuthHttpService } from '../services/auth-http.service'
import { useAuth } from './useAuth'
import type { AxiosInstance } from 'axios'

export function useAuthWrapper(api: AxiosInstance = useApi()) {
  const authHttp = new AuthHttpService(api)
  return useAuth(authHttp)
}
