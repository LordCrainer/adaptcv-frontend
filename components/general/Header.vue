<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AdaptCV</v-app-bar-title>

    <template v-slot:append>
      <HeaderActionItems />
      <HeaderOverflowMenu />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import HeaderActionItems from './HeaderActionItems.vue'
import HeaderOverflowMenu from './HeaderOverflowMenu.vue'
</script>
