<template>
  <v-card
    class="mx-auto"
    width="100%"
    min-width="400px"
    :color="global.name.value === 'dark' ? 'grey-darken-4' : color">
    <template v-slot:title>
      <span class="font-weight-black text-primary">{{ $t(title) }}</span>
    </template>
    <v-card-text class="pt-4">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const { global } = useTheme()

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
