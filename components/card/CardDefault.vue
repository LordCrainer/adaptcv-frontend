<template>
  <v-card
    class="mx-auto"
    width="100%"
    :color="global.name.value === 'dark' ? 'grey-darken-4' : color">
    <div class="pa-4 d-flex">
      <slot name="left-items"></slot>
      <slot name="title">
        <span class="text-h6 font-weight-black text-primary">
          {{ $t(title) }}
        </span>
      </slot>
      <v-spacer></v-spacer>
      <slot name="right-items"></slot>
    </div>
    <div class="flex-container flex-card px-4 py-4 fill-height">
      <slot></slot>
    </div>
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
