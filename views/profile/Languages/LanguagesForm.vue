<template>
  <v-card>
    <v-card-title>
      <span class="text-h6">{{ $t('profile.languages.title') }}</span>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.language"
          :label="$t('profile.languages.language')"
          placeholder="Ej: English"
          variant="outlined"
          required></v-text-field>

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

// Emit the form data to the parent component
const emit = defineEmits(['submit', 'cancel'])

const submitForm = () => {
  console.log('Language submitted:', formData.value)
  // Emit the form data to the parent component
  emit('submit', formData.value)

  formData.value.language = ''
  formData.value.proficiency = ''
}
</script>
