import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useAuthStore } from '~/modules/auth/store/auth.store'
import { createPinia, setActivePinia } from 'pinia'
import type { IUsers } from '@lordcrainer/adaptcv-shared-types'

const mockApi = { post: vi.fn(), get: vi.fn() }
vi.mock('~/composables/useApi', () => ({
  useApi: () => mockApi
}))

describe('Auth Store - Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('login: updates the store on success', async () => {
    const response = {
      accessToken: 'test-token',
      user: {
        _id: '1',
        name: 'Test User',
        email: 'test@test.com',
        status: 'active'
      } as IUsers
    }
    ;(mockApi.post as Mock).mockResolvedValue({ data: response })
    const store = useAuthStore()

    await store.login({ email: 'a@a.com', password: '123' })

    expect(store.user).toEqual(response.user)
    expect(store.accessToken).toBe(response.accessToken)
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

    await expect(
      store.login({ email: 'a@a.com', password: '123' })
    ).rejects.toBe(error)

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

    await store.logout()

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

    await store.refreshToken()

    expect(mockApi.post).toHaveBeenCalledWith('v1/auth/refresh-token')
    expect(store.accessToken).toBe(response.accessToken)
  })

  it('refreshToken: throws if API call fails', async () => {
    const error = new Error('No refresh token')
    const store = useAuthStore()
    ;(mockApi.post as Mock).mockRejectedValue(error)

    await expect(store.refreshToken()).rejects.toThrow('No refresh token')
  })
})
