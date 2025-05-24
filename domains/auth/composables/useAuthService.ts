import { useApi } from '~/composables/useApi';
import type { IAuthService } from '../interfaces/auth.interface'
import { AuthHttpService } from '../services/auth-http.service'

let authService: IAuthService | null = null

export function useAuthService(): IAuthService {
  if (!authService) {
    const api = useApi()
    authService = new AuthHttpService(api)
  }
  return authService
}
