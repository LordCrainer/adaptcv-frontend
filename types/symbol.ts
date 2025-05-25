import type { AxiosInstance } from 'axios'
import type { InjectionKey } from 'vue'
import { useAuth } from '~/modules/auth/composables/useAuth'
import type { builderHttpService } from '~/modules/builder/services/builder-http.service'

export const ApiKey: InjectionKey<AxiosInstance> = Symbol('api')

export const UseAuthKey: InjectionKey<ReturnType<typeof useAuth>> =
  Symbol('useAuth')

export const BuilderServiceKey: InjectionKey<
  ReturnType<typeof builderHttpService>
> = Symbol('BuilderService')
