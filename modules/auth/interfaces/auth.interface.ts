import type {
  IUsers,
  LoginResponse,
  LoginRequest
} from '@lordcrainer/adaptcv-shared-types'

export interface RefreshTokenResponse {
  accessToken: string
  refreshedToken: string
}

export interface IAuthService {
  login(credentials: LoginRequest): Promise<LoginResponse>
  logout(userId: string): Promise<void>
  refreshToken(): Promise<RefreshTokenResponse>
  getCurrentUser(): Promise<IUsers>
}
