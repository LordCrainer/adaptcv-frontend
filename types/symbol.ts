import type { AxiosInstance } from 'axios'
import { useAuth } from '~/domains/auth/composables/useAuth'

export const ApiKey: InjectionKey<AxiosInstance> = Symbol('api')

export const UseAuthKey: InjectionKey<ReturnType<typeof useAuth>> =
  Symbol('useAuth')
