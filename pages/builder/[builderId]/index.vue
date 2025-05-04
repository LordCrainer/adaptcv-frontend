<template>
  <ProfileBuilderComponents />
</template>

<script lang="ts" setup>
import ProfileBuilderComponents from '~/domains/profile/views/ProfileBuilderComponents.vue'

definePageMeta({
  layout: 'profile-builder',
  name: 'builder-builderId'
})
</script>
