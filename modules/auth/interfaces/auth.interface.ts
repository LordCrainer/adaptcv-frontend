import type {
  IUsers,
  LoginResponse,
  LoginRequest
} from '@lordcrainer/adaptcv-shared-types'

export interface IAuthService {
  login(credentials: LoginRequest): Promise<LoginResponse>
  logout(userId: string): Promise<void>
  refreshToken(): Promise<{ accessToken: string; refreshedToken: string }>
  getCurrentUser(): Promise<IUsers>
}
