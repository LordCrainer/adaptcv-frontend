import { createBuilderService } from '../services/create-builder.service'
import { useApi } from '~/shared/http-client'

export const builderProvider = () => {
  const { api } = useApi()
  return {
    builderService: createBuilderService(api)
  }
}
