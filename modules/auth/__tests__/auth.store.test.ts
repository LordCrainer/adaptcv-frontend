import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../store/auth.store'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets user and token', () => {
    const store = useAuthStore()
    store.setUser({
      name: 'John',
      email: 'john@example.com',
      status: 'active',
      _id: '1'
    })
    store.setToken('abc123')

    expect(store.user).toEqual({
      name: 'John',
      email: 'john@example.com',
      status: 'active',
      _id: '1'
    })
    expect(store.getToken()).toBe('abc123')
  })

  it('resets auth', () => {
    const store = useAuthStore()
    store.setUser({
      name: 'John',
      email: 'john@example.com',
      status: 'active',
      _id: '1'
    })
    store.setToken('abc123')
    store.resetAuth()

    expect(store.user).toBe(null)
    expect(store.getToken()).toBe('')
  })
})
