import type {
  LoginParams,
  RequestUserData
} from '@lordcrainer/adaptcv-shared-types'
import type { AxiosInstance } from 'axios'

export class AuthService {
  url: string = 'auth'
  constructor(private api: AxiosInstance) {}

  async login(
    credentials: LoginParams
  ): Promise<{ user: RequestUserData; token: string }> {
    try {
      const response = await this.api.post(`/v1/${this.url}/login`, credentials)

      return response.data
    } catch (error) {
      console.error('Error logging in:', error)
      throw new Error('AuthService.login: logging in')
    }
  }

  async register(user: any): Promise<any> {
    try {
      const { data = {} } = await this.api.post(
        `/v1/${this.url}/register`,
        user
      )
      return data
    } catch (error) {
      console.error('Error registering:', error)
      throw new Error('AuthService.register: registering')
    }
  }

  async logout(userId: string): Promise<any> {
    try {
      const { data = {} } = await this.api.post(`/v1/${this.url}/logout`, {
        userId
      })
      return data
    } catch (error) {
      console.error('Error logging out:', error)
      throw new Error('AuthService.logout: logging out')
    }
  }
}
