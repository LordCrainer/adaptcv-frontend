<template>
  <v-app-bar color="primary" density="compact" app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>AdaptCV</v-app-bar-title>
    <template v-slot:append>
      <HeaderActionItems :tabs="items" />
      <v-divider vertical></v-divider>
      <HeaderLanguage />
      <HeaderSettingsMenu />
    </template>
  </v-app-bar>
  <NavigationDrawer v-model="drawer" :items="items" />
</template>

<script setup lang="ts">
import HeaderActionItems from './HeaderActionItems.vue'
import HeaderLanguage from './HeaderLanguage.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import HeaderSettingsMenu from './HeaderSettingsMenu.vue'

const drawer = ref(false)

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

defineProps({
  items: {
    type: Object as () => RouteExtended[],
    default: () => []
  }
})
</script>
