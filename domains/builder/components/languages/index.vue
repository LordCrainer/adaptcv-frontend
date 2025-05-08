<template>
  <div class="d-flex flex-column ga-4">
    <div class="d-flex flex-wrap">
      <v-chip
        v-for="(item, index) in languages"
        :key="item.name"
        class="ma-2 flex-grow-0"
        color="primary"
        closable
        @click="edit(item)"
        @click:close="removeLanguage(index)">
        {{ item.name }} ({{ item.proficiency }})
      </v-chip>
    </div>
    <div>
      <LanguagesForm :language="selectedLanguage" @submit="upsertLanguage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ILanguageItem } from '@lordcrainer/adaptcv-shared-types'
import LanguagesForm from './LanguagesForm.vue'
import { useLanguages } from '~/domains/builder/components/languages/useLanguages'

const { languages, upsertLanguage, removeLanguage, DEFAULT_LANGUAGE_ITEM } =
  useLanguages()

const selectedLanguage = ref<ILanguageItem>({ ...DEFAULT_LANGUAGE_ITEM })

function edit(language: ILanguageItem) {
  selectedLanguage.value = language
}
</script>
