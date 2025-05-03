<template>
  <ProfileRenderComponents />
</template>

<script lang="ts" setup>
import ProfileRenderComponents from '~/domains/profile/views/ProfileRenderComponents.vue'

definePageMeta({
  layout: 'profile-builder',
  name: 'builder-builderId'
})
</script>
