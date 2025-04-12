<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AdaptCV</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <HeaderSettingsMenu />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import HeaderSettingsMenu from './HeaderOverflow Menu.vue'
</script>
