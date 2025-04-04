<template>
  <v-app
    :theme="global.name.value"
    :class="global.name.value === 'dark' ? '' : 'bg-grey-lighten-3'">
    <Header />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import Header from '~/components/general/Header.vue'
import Footer from '~/components/general/Footer.vue'

const { global } = useTheme()
</script>

<style>
.container {
  padding: 16px;
  max-width: 1200px;
  margin: auto;
}
</style>
