<template>
  <BuilderByBuilderId />
</template>

<script lang="ts" setup>
const BuilderByBuilderId = defineAsyncComponent(() => import('~/modules/builder/views/BuilderByBuilderId.vue'))

definePageMeta({
  name: 'builder-builderId',
  ssr: false,
})
</script>
