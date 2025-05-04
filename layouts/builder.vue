<template>
  <DefaultLayout>
    <div class="d-flex flex-column ga-4 justify-center align-center">
      <BuilderToolbar />
      <NuxtPage />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import BuilderToolbar from '~/domains/builder/components/BuilderToolbar.vue'
import DefaultLayout from './default.vue'
</script>

<style scoped>
.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
</style>
