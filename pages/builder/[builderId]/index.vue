<template>
  <BuilderByBuilderId />
</template>

<script lang="ts" setup>
const BuilderByBuilderId = defineAsyncComponent(() => import('~/domains/builder/views/BuilderByBuilderId.vue'))

definePageMeta({
  name: 'builder-builderId'
})
</script>
