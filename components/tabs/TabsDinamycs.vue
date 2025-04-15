<template>
  <v-card max-width="800" class="mx-auto flex-card flex-container">
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
      class="mb-4">
      <v-tab v-for="tab in processedItems" :value="tab.value" :key="tab.value">
        {{ tab.title }}
      </v-tab>
    </v-tabs>
    <div class="pa-4">
      <v-progress-linear color="primary" model-value="20"></v-progress-linear>
    </div>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="(content, index) in processedItems"
        :key="index"
        :value="content.value">
        <div class="mx-auto pa-4">
          <component :is="content.component" v-bind="content.props" />
        </div>
      </v-tabs-window-item>
    </v-tabs-window>

    <v-spacer></v-spacer>

    <v-card-actions class="justify-end">
      <v-btn @click="previousTab">Previous</v-btn>
      <v-btn color="success" @click="nextTab">Next</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TabItem = {
  value: any
  title: string
  component: any
  props: any
}

const props = defineProps({
  items: {
    type: Array<TabItem>,
    default: () => []
  }
})

const tab = ref(props.items[1]?.value || null)

const processedItems = computed(() => {
  return props.items.map((item) => ({
    ...item
    // contents: item.contents || []
  }))
})

function previousTab() {
  const currentIndex = processedItems.value.findIndex(
    (item) => item.value === tab.value
  )
  if (currentIndex > 0) {
    tab.value = processedItems.value[currentIndex - 1].value
  }
}

function nextTab() {
  const currentIndex = processedItems.value.findIndex(
    (item) => item.value === tab.value
  )
  if (currentIndex < processedItems.value.length - 1) {
    tab.value = processedItems.value[currentIndex + 1].value
  }
}
</script>
