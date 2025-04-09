<template>
  <v-card>
    <v-card-title>
      <span class="text-h6">{{ $t('profile.languages.title') }}</span>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-autocomplete
          v-model="formData.language"
          variant="outlined"
          chips
          clearable
          :items="languages"
          :label="$t('profile.languages.language')"></v-autocomplete>

        <v-select
          v-model="formData.proficiency"
          :items="proficiencyLevels"
          variant="outlined"
          :label="$t('profile.languages.level')"
          required></v-select>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn text color="grey" variant="tonal" @click="$emit('cancel')">
        {{ $t('actions.cancel') }}
      </v-btn>

      <v-btn text color="primary" variant="tonal" @click="submitForm">
        {{ $t('actions.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const formData = ref({
  language: '',
  proficiency: ''
})

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

const emit = defineEmits(['submit', 'cancel', 'close'])

const submitForm = () => {
  console.log('Language submitted:', formData.value)

  emit('submit', formData.value)
  resetForm()
  emit('close')
}

const resetForm = () => {
  formData.value.language = ''
  formData.value.proficiency = ''
}
</script>
