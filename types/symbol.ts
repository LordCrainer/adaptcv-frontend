import type { AxiosInstance } from 'axios'
import type { InjectionKey } from 'vue'
import type { builderHttpService } from '~/modules/builder/services/builder-http.service'

export const ApiKey: InjectionKey<AxiosInstance> = Symbol('api')

export const BuilderServiceKey: InjectionKey<
  ReturnType<typeof builderHttpService>
> = Symbol('BuilderService')
