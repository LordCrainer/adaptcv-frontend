import type { IAuthService } from '../interfaces/auth.interface'
import type {
  IUsers,
  LoginOutput,
  LoginInput
} from '@lordcrainer/adaptcv-shared-types'
import type { AxiosInstance } from 'axios'

export class AuthHttpService implements IAuthService {
  url: string = 'v1/auth'
  constructor(private api: AxiosInstance) {}

  async login(credentials: LoginInput) {
    try {
      const { data } = await this.api.post<LoginOutput>(`${this.url}/login`, credentials)
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async logout() {
    const { data } = await this.api.post(`${this.url}/logout`)
    return data
  }

  async refreshToken(token: string) {
    const { data } = await this.api.post<{
      token: string
      refreshedToken: string
    }>(`${this.url}/refresh`, { refreshedToken: token })
    return data
  }

  async getCurrentUser() {
    const { data } = await this.api.get<IUsers>(`${this.url}/me`)
    return data
  }
}
