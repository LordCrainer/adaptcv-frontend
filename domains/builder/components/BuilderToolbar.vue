<template>
  <v-app-bar density="compact" flat app color="white" class="sticky-toolbar">
    <slot name="toolbar-left"></slot>
    <v-toolbar-title class="text-h5 font-weight-bold ma-0">
      <slot name="toolbar-title">
        {{ $t('routes.builder') }}
      </slot>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <slot name="toolbar-items"></slot>
  </v-app-bar>
  <slot></slot>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.sticky-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
