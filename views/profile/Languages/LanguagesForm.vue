<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex ga-2 align-start pa-2">
      <v-autocomplete
        v-model="select.language"
        variant="outlined"
        clearable
        :items="languages"
        :label="$t('profile.languages.language')"></v-autocomplete>

      <v-select
        v-model="select.proficiency"
        :items="proficiencyLevels"
        variant="outlined"
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
import type { ILanguages } from '..'

const select = ref<ILanguages>({ language: undefined, proficiency: 'Beginner' })

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Native']

const languages = [
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
]

const emit = defineEmits(['submit'])

const submitForm = () => {
  emit('submit', { ...select.value })
  _reset()
}

const _reset = () => {
  select.value.language = undefined
  select.value.proficiency = 'Beginner'
}
</script>
