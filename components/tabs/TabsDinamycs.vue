<template>
  <v-card max-width="800" width="100%" class="mx-auto flex-card flex-container">
    <div class="pa-4 text-h5 font-weight-bold">
      {{ $t('routes.fillInformation') }}
    </div>
    <div class="pa-4">
      <v-progress-linear
        color="primary"
        :model-value="progress"></v-progress-linear>
    </div>

    <v-tabs
      v-model="selectedTab"
      align-tabs="center"
      color="deep-purple-accent-4"
      class="mb-4">
      <v-tab
        v-for="(tab, index) in processedItems"
        :value="index"
        :key="tab.label">
        {{ $t(`profile.${tab.label}.title`) }}
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="selectedTab">
      <v-tabs-window-item
        v-for="(content, index) in processedItems"
        :key="content.title + index"
        :value="index">
        <v-container class="adaptable-container">
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
import type { TabItem } from '~/types/global'

const props = defineProps({
  tabs: {
    type: Array as () => TabItem[],
    default: () => []
  }
})

const selectedTab = ref<number>(0)

const processedItems = computed(() => props.tabs)

const progress = computed(() => {
  return (100 / processedItems.value.length) * (selectedTab.value + 1)
})

function previousTab() {
  if (selectedTab.value > 0) {
    selectedTab.value -= 1
  }
}

function nextTab() {
  if (selectedTab.value < processedItems.value.length - 1) {
    selectedTab.value += 1
  }
}
</script>
<style lang="scss" scoped>
.adaptable-container {
  height: 65dvh;
  overflow-y: auto;
  @media (max-width: 600px) {
    height: 55dvh;
  }
}
</style>
