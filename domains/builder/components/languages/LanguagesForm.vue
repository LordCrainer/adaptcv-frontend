<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex flex-column ga-2">
      <div class="d-flex ga-2">
        <v-autocomplete
          v-model="localLang.name"
          icon-color="primary"
          prepend-inner-icon="mdi-magnify"
          density="comfortable"
          variant="outlined"
          :aria-label="$t('profile.languages.language')"
          :placeholder="$t('profile.languages.placeholderLanguage')"
          class="flex-grow-1"
          active
          clearable
          :items="LANGUAGES_LIST"
          :label="$t('profile.languages.language')"></v-autocomplete>

        <v-btn
          color="secondary"
          variant="flat"
          rounded
          icon="mdi-plus"
          type="submit"></v-btn>
      </div>

      <v-select
        prepend-inner-icon="mdi-layers-triple"
        icon-color="primary"
        v-model="localLang.proficiency"
        :items="PROFICIENCY_LEVELS"
        variant="outlined"
        active
        :item-title="(i) => $t(`profile.languages.${i}`)"
        :item-value="(i) => i"
        :label="$t('profile.languages.level')"
        required></v-select>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import type { ILanguageItem } from '@lordcrainer/adaptcv-shared-types'
import { useLanguages } from '~/domains/builder/components/languages/useLanguages'

const { PROFICIENCY_LEVELS, DEFAULT_LANGUAGE_ITEM, LANGUAGES_LIST } =
  useLanguages()

const props = defineProps({
  language: {
    type: Object as () => ILanguageItem,
    default: () => ({})
  }
})

const localLang = ref<ILanguageItem>({ ...props.language })

watch(
  () => props.language,
  (newLanguage) => {
    localLang.value = { ...newLanguage }
  },
  { immediate: true }
)

const emit = defineEmits(['submit'])

const submitForm = () => {
  if (localLang.value.name && localLang.value.proficiency) {
    console.log(
      '🚀 ~ file: LanguagesForm.vue:45 ~ submitForm ~ localLang.value:',
      localLang.value
    )
    emit('submit', { ...localLang.value })
    _reset()
  }
}

const _reset = () => {
  localLang.value = { ...DEFAULT_LANGUAGE_ITEM }
}
</script>
