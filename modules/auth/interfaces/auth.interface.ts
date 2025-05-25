import type {
  IUsers,
  LoginOutput,
  LoginInput
} from '@lordcrainer/adaptcv-shared-types'

export interface IAuthService {
  login(credentials: LoginInput): Promise<LoginOutput>
  logout(): Promise<void>
  refreshToken(token: string): Promise<{ token: string; refreshedToken: string }>
  getCurrentUser(): Promise<IUsers>
}
