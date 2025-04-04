<template>
  <v-card rounded="lg" class="mx-auto" max-width="800" :color="color">
    <template v-slot:title>
      <span class="font-weight-black text-primary">{{ title }}</span>
    </template>
    <v-card-text class="pt-4">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: String,
  color: {
    type: String,
    default: 'white'
  }
})
</script>
