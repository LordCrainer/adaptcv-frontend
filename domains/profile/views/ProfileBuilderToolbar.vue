<template>
  <v-app-bar density="compact" flat app color="white" class="sticky-toolbar">
    <v-toolbar-title class="text-h5 font-weight-bold">
      {{ $t('routes.builder') }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-flex ga-2 pa-2 align-center">
      <v-btn
        size="small"
        v-tooltip:start="$t(isPreview ? 'actions.edit' : 'actions.preview')"
        :color="isPreview ? 'warning' : 'grey'"
        @click="toggleView"
        variant="tonal">
        <v-icon>{{ isPreview ? 'mdi-pencil' : 'mdi-eye' }}</v-icon>
      </v-btn>
      <v-btn
        size="small"
        v-tooltip:start="$t('actions.save')"
        class="text-success"
        @click="$router.push({ name: 'home' })"
        variant="tonal">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        size="small"
        v-tooltip:start="$t('actions.publish')"
        variant="tonal"
        @click="$router.push({ name: 'home' })"
        class="text-primary">
        <v-icon>mdi-publish</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isPreview = ref(route.path.includes('preview'))

const toggleView = async () => {
  await nextTick()
  const builderId = route.params.builderId
  if (!builderId) {
    console.error('Builder ID is not defined')
    return
  }
  const targetPath = isPreview.value
    ? `/builder/${builderId}`
    : `/builder/${builderId}/preview`

  await navigateTo(targetPath)
  isPreview.value = !isPreview.value
}
</script>

<style scoped>
.sticky-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
