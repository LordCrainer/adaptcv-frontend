<template>
  <v-app
    :theme="global.name.value"
    :class="global.name.value === 'dark' ? '' : 'bg-grey-lighten-3'">
    <Header :items="APP_ROUTES" />
    <v-main>
      <div class="pa-4 flex-container position-relative">
        <NuxtPage />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import Header from '~/components/general/Header/Header.vue'
import Footer from '~/components/general/Footer.vue'
import { APP_ROUTES } from '~/utils/routes'

const { global } = useTheme()
</script>
