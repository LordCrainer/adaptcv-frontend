<template>
  <v-app theme="light">
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
import Header from '~/components/general/Header.vue'
import Footer from '~/components/general/Footer.vue'
</script>

<style>
.container {
  padding: 16px;
  max-width: 1200px;
  margin: auto;
}
</style>
