import { createError } from 'h3'
import { errorMessages, errorNames } from '~/utils/errorHandlers/error.messages'
import type { RefreshTokenResponse } from '~/modules/auth/interfaces/auth.interface'

export interface ErrorHandlerParams {
  name: string
  status: number
  originalRequest: any
  message?: string
  refreshToken?: () => Promise<RefreshTokenResponse>
  authStore?: any
  api?: any
}

export async function errorHandler({
  name,
  status,
  originalRequest,
  message,
  refreshToken,
  authStore,
  api
}: ErrorHandlerParams) {
  switch (status) {
    case 401:
      if (
        ['invalidToken', 'unauthorized'].includes(name) &&
        !originalRequest._retry &&
        refreshToken &&
        authStore &&
        api
      ) {
        originalRequest._retry = true
        try {
          await refreshToken()
          originalRequest.headers.Authorization = `Bearer ${authStore.getToken()}`
          return api.request(originalRequest)
        } catch (refreshError) {
          authStore.resetAuth()
          const statusMessage = errorNames[name] || errorMessages[401]
          throw createError({ statusCode: 401, statusMessage })
        }
      }
      const statusMessage401 = errorNames[name] || errorMessages[401]
      throw createError({ statusCode: 401, statusMessage: statusMessage401 })
    default:
      const errorMessage =
        message ||
        (name && errorNames[name]) ||
        errorMessages[status] ||
        'Unknown error'
      throw createError({ statusCode: status, statusMessage: errorMessage })
  }
}
