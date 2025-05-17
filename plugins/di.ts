import { installBuilderProviders } from '~/domains/builder/infraestructure/builder.install'

export default defineNuxtPlugin((nuxtApp) => {
  installBuilderProviders(nuxtApp.vueApp)
})
