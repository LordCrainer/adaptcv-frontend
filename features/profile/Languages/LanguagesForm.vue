<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex ga-2 align-start pa-2">
      <v-autocomplete
        v-model="select.name"
        variant="outlined"
        class="flex-grow-1"
        clearable
        :items="languages"
        :label="$t('profile.languages.language')"></v-autocomplete>

      <v-select
        v-model="select.proficiency"
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
import type { ILanguageItem } from '..'

const DEFAULT_LANGUAGE_ITEM: ILanguageItem = {
  name: undefined,
  proficiency: 'beginner'
}

const select = ref<ILanguageItem>(DEFAULT_LANGUAGE_ITEM)

const proficiencyLevels = ['beginner', 'intermediate', 'advanced', 'native']

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
  if (select.value.name && select.value.proficiency) {
    emit('submit', { ...select.value })
    _reset()
  }
}

const _reset = () => {
  select.value = DEFAULT_LANGUAGE_ITEM
}
</script>
