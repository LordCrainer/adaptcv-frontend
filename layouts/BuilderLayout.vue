<template>
  <div class="d-flex flex-column">
    <ProfileBuilderToolbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import ProfileBuilderToolbar from '~/domains/profile/ProfileBuilderToolbar.vue'
</script>

<style scoped>
.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
</style>