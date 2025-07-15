<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        class="fill-height"
        rounded
        icon="mdi-dots-vertical"
        v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="option in settingsOptions"
        :key="option.key"
        @click="option.action">
        <template v-slot:prepend>
          <v-icon :icon="option.icon()"></v-icon>
        </template>
        <v-progress-circular
          v-if="option?.loading()"
          indeterminate
          size="24"
          class="mr-2"></v-progress-circular>
        <v-list-item-title v-else>
          {{ option.label() }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useAuth } from '~/modules/auth/composables/useAuth'
import { useThemeAcv } from '~/shared/useThemeAcv'

const { selectedTheme, toggleTheme } = useThemeAcv()
const { logout, isLoading } = useAuth()
const router = useRouter()

const settingsOptions = [
  {
    icon: () => selectedTheme.value.icon,
    label: () => selectedTheme.value.label,
    action: () => {
      toggleTheme()
    },
    loading: () => false,
    key: 'theme'
  },
  {
    icon: () => 'mdi-logout',
    label: () => 'Log Out',
    action: async () => {
      try {
        await logout()
      } catch (err) {
        console.error('Logout error:', err)
      } finally {
        await router.push('/login')
      }
    },
    loading: () => isLoading.value,
    key: 'logout'
  }
]
</script>
