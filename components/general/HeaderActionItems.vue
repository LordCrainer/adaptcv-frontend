<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>
    <v-list :selected="selected">
      <v-list-item
        v-for="locale in availableLocales"
        @click="toggleLanguage(locale)"
        :key="locale">
        <v-list-item-title>{{ localItems[locale] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { availableLocales, setLocale, locale } = useI18n()

const selected = ref(locale.value)

const localItems = {
  en: 'English',
  es: 'Spanish'
}

const toggleLanguage = (lang: any) => {
  setLocale(lang)
}
</script>
