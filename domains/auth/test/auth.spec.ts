// tests/unit/auth.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../store/auth.store'
import type { IAuthService } from '../interfaces/auth.interface'
import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockService: IAuthService = {
  login: vi.fn().mockResolvedValue({
    token: 't1',
    refreshToken: 'r1',
    user: {
      _id: '1',
      name: 'A',
      email: 'a@a'
    }
  }),
  logout: vi.fn().mockResolvedValue(undefined),
  refreshToken: vi.fn().mockResolvedValue({ token: 't2', refreshToken: 'r2' }),
  getCurrentUser: vi.fn().mockResolvedValue({ _id: '1', name: 'A', email: 'a@a' })
}
vi.mock('../services/auth-http.service', () => ({
  AuthHttpService: vi.fn(() => mockService)
}))

describe('Auth Store (Vitest)', () => {
  let store: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
  })

  it('hace login correctamente', async () => {
    await store.login({
      email: 'a@a',
      password: 'pwd'
    })
    expect(mockService.login).toHaveBeenCalledWith({
      email: 'a@a',
      password: 'pwd'
    })
    expect(store.token).toBe('t1')
    expect(store.user).toEqual({ _id: '1', name: 'A', email: 'a@a' })
  })

  it('refresca token al invocar refresh()', async () => {
    await store.login({
      email: 'a@a',
      password: 'pwd'
    })
    await store.refresh()
    expect(mockService.refreshToken).toHaveBeenCalledWith('r1')
    expect(store.token).toBe('t2')
    expect(store.refreshToken).toBe('r2')
  })

  it('hace logout y limpia el estado', async () => {
    await store.logout()
    expect(mockService.logout).toHaveBeenCalled()
    expect(store.token).toBe('')
    expect(store.user).toBeNull()
  })
})
