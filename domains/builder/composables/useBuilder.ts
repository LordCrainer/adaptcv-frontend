import type { IBuilderService } from '../domain/builder-service.interface'

export const useBuilder = () => {
  const builderService = inject<IBuilderService>('builderService')
  if (!builderService) {
    throw new Error(
      'Builder service not found. Make sure to install the builder provider.'
    )
  }

  return {
    builderService
  }
}
