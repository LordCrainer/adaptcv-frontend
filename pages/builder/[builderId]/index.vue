<template>
  <ProfileRenderComponents />
</template>

<script lang="ts" setup>
import ProfileRenderComponents from '~/domains/profile/views/ProfileRenderComponents.vue'

const route = useRoute()

onMounted(() => {
  const { builderId } = route.params
  console.log('builderId:', builderId)
})

definePageMeta({
  layout: 'profile-builder',
  name: 'builder-builderId'
})
</script>
