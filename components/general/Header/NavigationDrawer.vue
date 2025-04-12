<template>
  <v-card style="height: 100px"></v-card>
  <v-navigation-drawer v-model="localDrawer">
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="item.value">
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
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Object as () => Array<{ title: string; value: string; icon: string }>,
    default: () => []
  },
  drawer: {
    type: Boolean,
    default: false
  }
})

const localDrawer = ref(props.drawer)

const emit = defineEmits(['update:drawer'])

watch(
  () => props.drawer,
  (val) => {
    localDrawer.value = val
  }
)
</script>
