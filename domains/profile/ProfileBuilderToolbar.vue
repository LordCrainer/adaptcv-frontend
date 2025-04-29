<template>
  <v-app-bar density="compact" flat app color="white" class="sticky-toolbar">
    <v-toolbar-title class="text-h5 font-weight-bold">
      {{ $t('routes.builder') }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-flex ga-2 pa-2 align-center">
      <v-btn
        size="small"
        v-tooltip:start="$t('actions.preview')"
        class="text-grey-darken-1"
        @click="$router.push({ name: 'preview' })"
        variant="tonal">
        <v-icon>mdi-eye</v-icon>
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

<style scoped>
.sticky-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
