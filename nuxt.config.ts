// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/base.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  debug: true,
  app: {
    head: {
      title: 'AdaptCV',
      htmlAttrs: {
        lang: 'en'
      },
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        {
          name: 'description',
          content: 'AdaptCV is a generator app to create personalized CVs.'
        },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_API_URL || 'http://localhost:3000'
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    'pinia-plugin-persistedstate',
    '@nuxtjs/i18n',
    'dragon-editor'
  ],
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
        sets: [
          {
            name: 'mdi',
            cdn: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
          },
          {
            name: 'fa',
            cdn: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
          }
        ]
      }
    }
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.ts' },
      { code: 'es', name: 'Spanish', iso: 'es-ES', file: 'es-ES.ts' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    restructureDir: './',
    strategy: 'prefix_and_default',
    lazy: true
  }
})
