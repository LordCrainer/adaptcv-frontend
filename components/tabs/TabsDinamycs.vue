<template>
  <v-card max-width="800" width="100%" class="mx-auto flex-card flex-container">
    <v-tabs
      v-model="selectedTab"
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

    <v-tabs-window v-model="selectedTab">
      <v-tabs-window-item
        v-for="(content, index) in processedItems"
        :key="index"
        :value="content.value">
        <v-container style="height: 70dvh; overflow-y: auto">
          <component :is="content.component" v-bind="content.props" />
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <v-spacer></v-spacer>

    <v-card-actions class="justify-end">
      <v-btn @click="previousTab" :disabled="selectedTab === 0">
        {{ $t('actions.previous') }}
      </v-btn>
      <v-btn color="success" @click="nextTab">{{ $t('actions.next') }}</v-btn>
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

const selectedTab = ref<number>(0)

const processedItems = computed(() => {
  return props.items.map((item) => ({
    ...item
  }))
})

function previousTab() {
  if (selectedTab.value > 0) {
    selectedTab.value += -1
  }
}

function nextTab() {
  if (selectedTab.value < processedItems.value.length - 1) {
    selectedTab.value += 1
  }
}
</script>
