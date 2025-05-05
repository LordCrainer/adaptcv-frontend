<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex flex-column ga-2">
      <div class="d-flex ga-2">
        <v-autocomplete
          v-model="localLang.name"
          icon-color="primary"
          prepend-icon="mdi-magnify"
          density="comfortable"
          variant="outlined"
          :aria-label="$t('profile.languages.language')"
          :placeholder="$t('profile.languages.placeholderLanguage')"
          class="flex-grow-1"
          active
          clearable
          :items="languages"
          :label="$t('profile.languages.language')"></v-autocomplete>

        <v-btn
          color="secondary"
          variant="flat"
          rounded
          icon="mdi-plus"
          type="submit"></v-btn>
      </div>

      <v-select
        prepend-icon="mdi-layers-triple"
        icon-color="primary"
        v-model="localLang.proficiency"
        :items="proficiencyLevels"
        variant="outlined"
        active
        :item-title="(i) => $t(`profile.languages.${i}`)"
        :label="$t('profile.languages.level')"
        required></v-select>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import type { ILanguageItem } from '~/domains/builder/shared'
import { useLanguages } from '~/domains/builder/components/languages/useLanguages'

const { proficiencyLevels } = useLanguages()

const DEFAULT_LANGUAGE_ITEM: ILanguageItem = {
  name: undefined,
  proficiency: 'beginner'
}

const localLang = ref<ILanguageItem>({ ...DEFAULT_LANGUAGE_ITEM })

const languages = ref(
  [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Chinese',
    'Japanese',
    'Russian',
    'Arabic'
  ].sort()
)

const emit = defineEmits(['submit'])

const submitForm = () => {
  if (localLang.value.name && localLang.value.proficiency) {
    emit('submit', { ...localLang.value })
    _reset()
  }
}

const _reset = () => {
  localLang.value = DEFAULT_LANGUAGE_ITEM
}
</script>
