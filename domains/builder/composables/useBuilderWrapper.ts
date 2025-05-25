import { builderHttpService } from '../services/builder-http.service'
import { useBuilder } from './useBuilder'

export const useBuilderWrapper = () => {
  const api = useNuxtApp().$api
  const builderService = builderHttpService(api)
  return useBuilder(builderService)
}
