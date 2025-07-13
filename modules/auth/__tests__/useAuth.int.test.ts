import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useAuth } from '~/modules/auth/composables/useAuth'
import { useAuthStore } from '~/modules/auth/store/auth.store'
import { createPinia, setActivePinia } from 'pinia'
import { AuthHttpService } from '../services/auth-http.service'
import { useApi } from '~/composables/useApi'
import type { IUsers } from '@lordcrainer/adaptcv-shared-types'

vi.mock('~/composables/useApi', () => ({
  useApi: vi.fn(() => ({
    post: vi.fn(),
    get: vi.fn()
  }))
}))

describe('useAuth', () => {
  let mockApi: ReturnType<typeof useApi>

  beforeEach(() => {
    setActivePinia(createPinia())
    mockApi = useApi()
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('login: updates the store on success', async () => {
    const store = useAuthStore()
    const responsePayload = {
      accessToken: 'test-token',
      user: {
        _id: '1',
        name: 'Test User',
        email: 'test@test.com',
        status: 'active'
      } as IUsers
    }
    ;(mockApi.post as Mock).mockResolvedValue({ data: responsePayload })

    const authService = new AuthHttpService(mockApi)
    const { login } = useAuth(authService)

    await login({ email: 'a@a.com', password: '123' })

    expect(store.user).toEqual(responsePayload.user)
    expect(store.accessToken).toBe(responsePayload.accessToken)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('')

    expect(mockApi.post).toHaveBeenCalledWith('v1/auth/login', {
      email: 'a@a.com',
      password: '123'
    })
  })

  it('login: sets error in store and throws on failure', async () => {
    const store = useAuthStore()
    const error = {
      response: { data: { message: 'Invalid credentials' } },
      message: 'Request failed'
    }
    ;(mockApi.post as Mock).mockRejectedValue(error)

    const authService = new AuthHttpService(mockApi)
    const { login } = useAuth(authService)

    await expect(login({ email: 'a@a.com', password: '123' })).rejects.toBe(
      error
    )

    expect(store.error).toBe('Invalid credentials')
    expect(store.isLoading).toBe(false)
    expect(store.user).toBe(null)
    expect(store.accessToken).toBe('')
  })

  it('logout: calls service and resets auth state in store', async () => {
    const store = useAuthStore()
    const user = {
      _id: '123',
      email: 'a@a.com',
      name: '',
      status: 'pending'
    } as IUsers
    store.setUser(user)
    store.setToken('some-token')
    ;(mockApi.post as Mock).mockResolvedValue({ data: {} })
    const authService = new AuthHttpService(mockApi)
    const { logout } = useAuth(authService)

    await logout()

    expect(mockApi.post).toHaveBeenCalledWith('v1/auth/logout', {
      userId: '123'
    })
    expect(store.user).toBe(null)
    expect(store.accessToken).toBe('')
  })

  it('refreshToken: sets new token in store', async () => {
    const store = useAuthStore()
    const response = { accessToken: 'new-token', refreshedToken: 'new-refresh' }
    ;(mockApi.post as Mock).mockResolvedValue({ data: response })

    const authService = new AuthHttpService(mockApi)
    const { refreshToken } = useAuth(authService)

    await refreshToken()

    expect(mockApi.post).toHaveBeenCalledWith('v1/auth/refresh-token')
    expect(store.accessToken).toBe(response.accessToken)
  })

  it('refreshToken: throws if API call fails', async () => {
    const error = new Error('No refresh token')
    ;(mockApi.post as Mock).mockRejectedValue(error)
    const authService = new AuthHttpService(mockApi)
    const { refreshToken } = useAuth(authService)

    await expect(refreshToken()).rejects.toThrow('No refresh token')
  })
})
