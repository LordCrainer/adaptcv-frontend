import type {
  IUsers,
  LoginOutput,
  LoginParams
} from '@lordcrainer/adaptcv-shared-types'

export interface IAuthService {
  login(credentials: LoginParams): Promise<LoginOutput>
  logout(): Promise<void>
  refreshToken(token: string): Promise<{ token: string; refreshToken: string }>
  getCurrentUser(): Promise<IUsers>
}
