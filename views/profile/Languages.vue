<template>
  <v-row>
    <v-col cols="12">
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
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  language: '',
  proficiency: ''
})

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Native']

const submitForm = () => {
  console.log('Language submitted:', formData.value)
}
</script>
