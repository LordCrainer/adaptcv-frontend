import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '~/modules/auth/composables/useAuth'
import { useAuthStore } from '~/modules/auth/store/auth.store'
import { createPinia, setActivePinia } from 'pinia'
import { mockAuthService } from './mocks/mockHttpService'

describe('useAuth', () => {
  let store: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()

    vi.spyOn(store, 'setToken')
    vi.spyOn(store, 'setUser')
    vi.spyOn(store, 'toggleLoading')
    vi.spyOn(store, 'resetAuth')
    vi.spyOn(store, 'setRefreshToken')
  })

  it('login: sets token and user on success', async () => {
    const response = { token: 'token', user: { id: 1 } }
    mockAuthService.login.mockResolvedValue(response)

    const { login } = useAuth(mockAuthService)
    await login({ email: 'a@a.com', password: '123' })

    expect(store.token).toBe(response.token)
    expect(store.user).toEqual(response.user)
    expect(store.toggleLoading).toHaveBeenCalledWith(true)
    expect(store.setToken).toHaveBeenCalledWith('token')
    expect(store.setUser).toHaveBeenCalledWith({ id: 1 })
    expect(store.toggleLoading).toHaveBeenCalledWith(false)
  })

  it('login: sets error and throws on failure', async () => {
    const store = useAuthStore()
    const error = { response: { data: { message: 'fail' } }, message: 'fail' }
    mockAuthService.login.mockRejectedValue(error)
    const { login } = useAuth(mockAuthService)
    await expect(login({ email: 'a@a.com', password: '123' })).rejects.toBe(
      error
    )
    expect(store.error).toBe('fail')
    expect(store.toggleLoading).toHaveBeenCalledWith(false)
  })

  it('logout: calls service and resets auth', async () => {
    const store = useAuthStore()
    mockAuthService.logout.mockResolvedValue()
    const { logout } = useAuth(mockAuthService)
    await logout()
    expect(mockAuthService.logout).toHaveBeenCalled()
    expect(store.resetAuth).toHaveBeenCalled()
  })

  it('refreshToken: sets new tokens', async () => {
    const store = useAuthStore()
    const response = { token: 'new-token', refreshedToken: 'new-refresh' }
    mockAuthService.refreshToken.mockResolvedValue(response)
    const { refreshToken } = useAuth(mockAuthService)
    await refreshToken()
    expect(store.setToken).toHaveBeenCalledWith(response.token)
    expect(store.setRefreshToken).toHaveBeenCalledWith(response.refreshedToken)
  })

  it('refreshToken: throws if no refreshedToken', async () => {
    mockAuthService.refreshToken.mockRejectedValue(
      new Error('No refresh token')
    )
    store.refreshedToken = ''
    const { refreshToken } = useAuth(mockAuthService)
    await expect(refreshToken()).rejects.toThrow('No refresh token')
  })
})
