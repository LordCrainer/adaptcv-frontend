<template>
  <Builder />
</template>

<script lang="ts" setup>
import Builder from '~/modules/builder/views/Builders.vue'

definePageMeta({
  title: 'Builder',
  layout: 'default',
  middleware: ['auth']
})
</script>
