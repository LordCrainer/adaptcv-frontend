import type { App } from 'vue'
import { builderProvider } from './builder.provider'

export const installBuilderProviders = (app: App) => {
  // Register the builder provider
  const { builderService } = builderProvider()

  // Register the builder service in the app
  app.provide('builderService', builderService)
}
