<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex ga-2 align-start pa-2">
      <v-autocomplete
        v-model="localLang.name"
        variant="outlined"
        class="flex-grow-1"
        clearable
        :items="languages"
        :label="$t('profile.languages.language')"></v-autocomplete>

      <v-select
        v-model="localLang.proficiency"
        :items="proficiencyLevels"
        variant="outlined"
        :item-title="(i) => $t(`profile.languages.${i}`)"
        :label="$t('profile.languages.level')"
        required></v-select>

      <v-btn
        color="primary"
        variant="tonal"
        rounded
        size="large"
        icon="mdi-plus"
        type="submit"></v-btn>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import type { ILanguageItem } from '~/domains/profile'
import { useLanguages } from '~/domains/profile/components/languages/useLanguages'

const { proficiencyLevels } = useLanguages()

const DEFAULT_LANGUAGE_ITEM: ILanguageItem = {
  name: undefined,
  proficiency: 'beginner'
}

const localLang = ref<ILanguageItem>(DEFAULT_LANGUAGE_ITEM)

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
