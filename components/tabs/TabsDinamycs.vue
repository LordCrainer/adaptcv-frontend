<template>
  <v-card max-width="800" width="100%" class="mx-auto flex-card flex-container">
    <div class="pa-4 text-h5 font-weight-bold">
      {{ $t('routes.fillInformation') }}
    </div>
    <div class="pa-4">
      <v-progress-linear color="primary" model-value="20"></v-progress-linear>
    </div>

    <v-tabs
      v-model="selectedTab"
      align-tabs="center"
      color="deep-purple-accent-4"
      class="mb-4">
      <v-tab v-for="tab in processedItems" :value="tab.label" :key="tab.label">
        {{ $t(`profile.${tab.label}.title`) }}
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="selectedTab">
      <v-tabs-window-item
        v-for="(content, index) in processedItems"
        :key="index"
        :value="content.label">
        <v-container class="adaptable-container">
          <component :is="content.component" v-bind="content.props" />
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>

    <v-spacer></v-spacer>

    <v-card-actions class="justify-end">
      <v-btn @click="previousTab" :disabled="selectedTab === 'personalInfo'">
        {{ $t('actions.previous') }}
      </v-btn>
      <v-btn color="success" @click="nextTab">{{ $t('actions.next') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TabItem = {
  label: any
  title: string
  component: any
  props: any
}

const props = defineProps({
  items: {
    type: Array as () => TabItem[],
    default: () => []
  }
})

const selectedTab = ref<string>('Profile')

const processedItems = computed(() => {
  return props.items.map((item) => ({
    ...item
  }))
})

function previousTab() {
  const currentIndex = processedItems.value.findIndex(
    (item) => item.label === selectedTab.value
  )
  if (currentIndex > 0) {
    selectedTab.value = processedItems.value[currentIndex - 1].label
  }
}

function nextTab() {
  const currentIndex = processedItems.value.findIndex(
    (item) => item.label === selectedTab.value
  )
  if (currentIndex < processedItems.value.length - 1) {
    selectedTab.value = processedItems.value[currentIndex + 1].label
  }
}
</script>
<style lang="scss" scoped>
.adaptable-container {
  height: 70dvh;
  overflow-y: auto;
  @media (max-width: 600px) {
    height: 55dvh;
  }
}
</style>
