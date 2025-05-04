<template>
  <BuilderPreviewByBuilderId />
</template>

<script lang="ts" setup>
import BuilderPreviewByBuilderId from '~/domains/builder/views/BuilderPreviewByBuilderId.vue'

definePageMeta({
  layout: 'builder',
  name: 'builder-builderId-preview'
})
</script>
