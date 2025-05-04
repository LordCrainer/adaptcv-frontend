<template>
  <BuilderByBuilderId />
</template>

<script lang="ts" setup>
import BuilderByBuilderId from '~/domains/builder/views/BuilderByBuilderId.vue'

definePageMeta({
  layout: 'builder',
  name: 'builder-builderId'
})
</script>
