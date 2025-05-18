import type { IBuilderService } from '../domain/builder-service.interface'
import { BuilderServiceKey } from '../shared/builder-token.injection'

export const useBuilder = () => {
  const builderService = inject<IBuilderService>(BuilderServiceKey)
  if (!builderService) {
    throw new Error(
      'Builder service not found. Make sure to install the builder provider.'
    )
  }

  return {
    builderService
  }
}
