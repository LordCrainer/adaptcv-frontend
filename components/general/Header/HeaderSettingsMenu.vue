<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item @click="toggleTheme">
        <template v-slot:prepend>
          <v-icon :icon="selectedTheme.icon"></v-icon>
        </template>
        <v-list-item-title>
          {{ selectedTheme.label }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const { global } = useTheme()

interface IThemeMode {
  icon: string
  label: string
}

const themeMode: Record<string, IThemeMode> = {
  light: {
    icon: 'mdi-moon-waxing-crescent',
    label: 'Dark Mode'
  },
  dark: {
    icon: 'mdi-white-balance-sunny',
    label: 'Light Mode'
  }
}

const selectedTheme = computed(() => themeMode[global.name.value])

const toggleTheme = () => {
  global.name.value = global.name.value === 'dark' ? 'light' : 'dark'
}
</script>
