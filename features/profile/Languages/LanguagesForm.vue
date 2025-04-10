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

const select = ref<ILanguageItem>({
  name: undefined,
  proficiency: 'Beginner'
})

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Native']

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
  select.value.name = undefined
  select.value.proficiency = 'Beginner'
}
</script>
