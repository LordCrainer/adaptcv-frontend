<template>
  <v-navigation-drawer
    persistent
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        active-class="text-primary">
        <template v-slot:prepend>
          <v-icon :icon="item.props?.icon"></v-icon>
        </template>
        <v-list-item-title>
          {{ $t(`routes.${item.props?.title}`) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Object as () => RouteExtended[],
    default: () => []
  },
  modelValue: {
    type: Boolean,
    default: true,
    required: true
  }
})

const selected = ref(null)

const emit = defineEmits(['update:modelValue'])
</script>
