<template>
  <DefaultLayout>
    <div class="d-flex flex-column ga-4 justify-center align-center">
      <ProfileBuilderToolbar />
      <NuxtPage />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import ProfileBuilderToolbar from '~/domains/builder/components/ProfileBuilderToolbar.vue'
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
