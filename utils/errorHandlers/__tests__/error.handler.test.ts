import { describe, it, expect, vi } from 'vitest'
import {
  errorHandler,
  type ErrorHandlerParams
} from '~/utils/errorHandlers/error.handler'
import { errorNames } from '~/utils/errorHandlers/error.messages'

const getBaseParams = (overrides: Partial<ErrorHandlerParams> = {}) => ({
  name: 'notFound',
  status: 404,
  originalRequest: {},
  ...overrides
})

describe('errorHandler', () => {
  it('throws correct error for 404', async () => {
    await expect(
      errorHandler(getBaseParams({ status: 404 }))
    ).rejects.toMatchObject({
      statusCode: 404,
      statusMessage: errorNames.notFound
    })
  })

  it('throws correct error for 400 with custom message', async () => {
    await expect(
      errorHandler(
        getBaseParams({ status: 400, message: 'Custom bad request' })
      )
    ).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'Custom bad request'
    })
  })

  it('throws correct error for 401 unauthorized (no refresh)', async () => {
    await expect(
      errorHandler(getBaseParams({ status: 401, name: 'unauthorized' }))
    ).rejects.toMatchObject({
      statusCode: 401,
      statusMessage: errorNames.unauthorized
    })
  })

  it('refreshes token and retries for 401 invalidToken', async () => {
    const refreshToken = vi.fn().mockResolvedValue(undefined)
    const authStore = { getToken: () => 'token', resetAuth: vi.fn() }
    const api = { request: vi.fn().mockResolvedValue('retried') }
    const originalRequest: any = { _retry: false, headers: {} }
    const result = await errorHandler({
      name: 'invalidToken',
      status: 401,
      originalRequest,
      refreshToken,
      authStore,
      api
    })
    expect(refreshToken).toHaveBeenCalled()
    expect(api.request).toHaveBeenCalledWith(originalRequest)
    expect(result).toBe('retried')
  })

  it('throws error if refresh fails', async () => {
    const refreshToken = vi.fn().mockRejectedValue(new Error('fail'))
    const authStore = { getToken: () => 'token', resetAuth: vi.fn() }
    const api = { request: vi.fn() }
    const originalRequest: any = { _retry: false, headers: {} }
    await expect(
      errorHandler({
        name: 'invalidToken',
        status: 401,
        originalRequest,
        refreshToken,
        authStore,
        api
      })
    ).rejects.toMatchObject({
      statusCode: 401,
      statusMessage: errorNames.invalidToken
    })
    expect(authStore.resetAuth).toHaveBeenCalled()
  })
})
