<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)">
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.path">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { IRoutes } from '~/types/global';

const props = defineProps({
  items: {
    type: Object as () => IRoutes[],
    default: () => []
  },
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>
