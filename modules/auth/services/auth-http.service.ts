import type { IAuthService } from '../interfaces/auth.interface'
import type {
  IUsers,
  LoginResponse,
  LoginRequest
} from '@lordcrainer/adaptcv-shared-types'
import type { AxiosInstance } from 'axios'

export class AuthHttpService implements IAuthService {
  url: string = 'v1/auth'
  constructor(private api: AxiosInstance) {}

  async login(credentials: LoginRequest) {
    try {
      const { data } = await this.api.post<LoginResponse>(
        `${this.url}/login`,
        credentials
      )
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async logout(userId: string) {
    const { data } = await this.api.post(`${this.url}/logout`, {
      userId
    })
    return data
  }

  async refreshToken() {
    const { data } = await this.api.post<{
      accessToken: string
      refreshedToken: string
    }>(`${this.url}/refresh-token`)
    return data
  }

  async getCurrentUser() {
    const { data } = await this.api.get<IUsers>(`${this.url}/me`)
    return data
  }
}
