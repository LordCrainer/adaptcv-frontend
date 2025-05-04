<template>
  <v-card
    class="mx-auto"
    width="100%"
    :color="global.name.value === 'dark' ? 'grey-darken-4' : color">
    <div class="px-4 py-2 d-flex">
      <slot name="card-title">
        <span class="text-h6 font-weight-black text-primary">
          {{ $t(title) }}
        </span>
      </slot>
    </div>
    <slot></slot>
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
