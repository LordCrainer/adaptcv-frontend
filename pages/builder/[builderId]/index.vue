<template>
  <ProfileBuilderComponents />
</template>

<script lang="ts" setup>
import ProfileBuilderComponents from '~/domains/builder/views/ProfileBuilderComponents.vue'

definePageMeta({
  layout: 'profile-builder',
  name: 'builder-builderId'
})
</script>
