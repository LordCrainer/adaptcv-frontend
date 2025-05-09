<template>
  <v-tabs aria-label="Tabs" class="d-none d-md-inline-block">
    <v-tab
      v-for="tab in tabs"
      :key="tab.props?.title"
      :value="tab.props?.title"
      :to="tab.path">
      {{ $t(`routes.${tab.props?.title}`) }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
defineProps({
  tabs: {
    type: Array as () => RouteExtended[],
    default: () => []
  }
})
</script>
