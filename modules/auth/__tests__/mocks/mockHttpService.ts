import { vi } from 'vitest'
import type { IAuthService } from '../../interfaces/auth.interface'

export const mockAuthService: Record<keyof IAuthService, any> = {
  login: vi.fn(),
  logout: vi.fn(),
  refreshToken: vi.fn(),
  getCurrentUser: vi.fn()
}
