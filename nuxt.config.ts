// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.ts' },
      { code: 'es', name: 'Spanish', iso: 'es-ES', file: 'es-ES.ts' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    lazy: true,
  }
})
