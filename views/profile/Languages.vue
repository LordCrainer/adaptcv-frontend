<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>{{ $t('cv.languages') }}</h1>
        </v-col>
        <v-col cols="12">
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.language"
              :label="$t('cv.language')"
              required></v-text-field>

            <v-select
              v-model="formData.proficiency"
              :items="proficiencyLevels"
              :label="$t('cv.proficiency')"
              required></v-select>

            <v-btn type="submit" color="success">
              {{ $t('actions.save') }}
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
