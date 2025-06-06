// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/css/base.scss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    // baseURL: '/app/',
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
  devServer: {
    port: Number(process.env.VITE_PORT) || 4000,
    url: process.env.VITE_BASE_URL || 'http://localhost:4000'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_API_URL || 'http://localhost:3001'
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
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
          }
        ]
      }
    }
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
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
