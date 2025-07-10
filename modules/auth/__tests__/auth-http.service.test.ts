import { expect, it, vi, describe } from 'vitest'
import { AuthHttpService } from '../services/auth-http.service'
import type { AxiosInstance } from 'axios'

describe('authHttpService', () => {
  const mockHttp = {
    get: vi.fn().mockResolvedValue({ data: {} }),
    post: vi.fn().mockResolvedValue({ data: {} })
  } as unknown as AxiosInstance

  const authService = new AuthHttpService(mockHttp)

  it('calls login endpoint', async () => {
    await authService.login({
      email: 'a@a.com',
      password: '123'
    })
    expect(mockHttp.post).toHaveBeenCalledWith('v1/auth/login', {
      email: 'a@a.com',
      password: '123'
    })
  })

  it('calls logout endpoint', async () => {
    await authService.logout('123')
    expect(mockHttp.post).toHaveBeenCalledWith('v1/auth/logout', {
      userId: '123'
    })
  })
})
