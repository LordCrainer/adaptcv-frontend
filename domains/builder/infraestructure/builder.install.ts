import type { App } from 'vue'
import { builderProvider } from './builder.provider'
import { BuilderServiceKey } from '../shared/builder-token.injection'

export const installBuilderProviders = (app: App) => {
  // Register the builder provider
  const { builderService } = builderProvider()

  // Register the builder service in the app
  app.provide(BuilderServiceKey, builderService)
}
