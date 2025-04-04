<template>
  <v-card
    rounded="lg"
    class="mx-auto my-4"
    max-width="600"
    :color="color"
    :prepend-icon="icon">
    <template v-slot:title>
      <span class="font-weight-black">{{ title }}</span>
    </template>
    <v-card-text class="bg-white pt-4">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'mdi-account'
  },
  color: {
    type: String,
    default: 'primary'
  }
})
</script>
