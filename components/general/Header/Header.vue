<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AdaptCV</v-app-bar-title>

    <template v-slot:append>
      <HeaderActionItems :tabs="items" />
      <HeaderSettingsMenu />
    </template>
  </v-app-bar>
  <NavigationDrawer v-model="drawer" :items="items" />
</template>

<script setup lang="ts">
import HeaderActionItems from './HeaderActionItems.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import HeaderSettingsMenu from './HeaderSettingsMenu.vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const items = ref([
  {
    title: 'Fill Information',
    path: '/',
    icon: 'mdi-information',
    id: 'fill-information'
  }
  // { title: 'Templates', path: '/templates', icon: 'mdi-note-multiple' }
])
</script>
