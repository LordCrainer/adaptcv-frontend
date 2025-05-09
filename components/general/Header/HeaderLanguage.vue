<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn class="fill-height" prepend-icon="mdi-web" v-bind="props">{{ locale }}</v-btn>
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

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'
import { useI18n } from 'vue-i18n'

const { setLocale, locales, locale } = useI18n()
const selected = shallowRef([locale.value])

const toggleLanguage = (lang: LocaleObject) => {
  setLocale(lang.code)
  selected.value = [lang.code]
  localStorage.setItem('locale', lang.code)
}

onMounted(() => {
  const storedLocale = localStorage.getItem('locale') as LocaleObject['code']
  if (storedLocale) {
    setLocale(storedLocale)
    selected.value = [storedLocale]
  }
})
</script>

<style></style>
