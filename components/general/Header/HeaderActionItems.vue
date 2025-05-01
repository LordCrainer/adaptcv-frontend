<template>
  <v-tabs aria-label="Tabs" class="d-none d-md-inline-block">
    <v-tab v-for="tab in tabs" :key="tab.props?.title" :value="tab.props?.title" :to="tab.path">
      {{ $t(`routes.${tab.props?.title}`) }}
    </v-tab>
  </v-tabs>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>
    <v-list :selected="selected">
      <v-list-item
        v-for="lang in locales"
        @click="toggleLanguage(lang)"
        :value="lang.code"
        :key="lang.code">
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'
import { useI18n } from 'vue-i18n'

const { setLocale, locales, locale } = useI18n()

defineProps({
  tabs: {
    type: Array as () => RouteExtended[],
    default: () => []
  }
})

const selected = shallowRef([locale.value])

const toggleLanguage = (lang: LocaleObject) => {
  setLocale(lang.code)
  selected.value = [lang.code]
}
</script>
