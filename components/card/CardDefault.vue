<template>
  <v-card
    class="mx-auto"
    width="100%"
    :color="global.name.value === 'dark' ? 'grey-darken-4' : color">
    <v-toolbar flat color="transparent" class="px-4">
      <v-toolbar-title class="text-h6 font-weight-black text-primary">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <template v-for="(action, i) in toolbarActions" :key="i">
        <v-btn
          :color="action.color"
          :icon="action.icon"
          :text="action.label"
          :variant="action.variant || 'flat'"
          :disabled="action.disabled?.value"
          :loading="action.loading?.value"
          v-bind="action.otherProps"
          @click="action.onClick"></v-btn>
      </template>
    </v-toolbar>
    <div class="flex-container flex-card px-4 py-4 fill-height">
      <slot></slot>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { label } from 'happy-dom/lib/PropertySymbol.js'
import { useTheme } from 'vuetify'

const { global } = useTheme()

interface Props {
  title: string
  color?: string
  icon?: string
  toolbarActions?: any[]
  footerActions?: any[]
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi-help-circle',
  color: 'white',
  toolbarActions: () => [],
  footerActions: () => []
})
</script>
