<template>
  <v-row>
    <v-col cols="12">
      <h1>{{ $t('cv.workExperience') }}</h1>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.jobTitle"
          variant="outlined"
          :label="$t('cv.jobTitle')"
          required></v-text-field>

        <v-text-field
          v-model="formData.company"
          :label="$t('cv.company')"
          variant="outlined"
          required></v-text-field>

        <v-text-field
          v-model="formData.startDate"
          :label="$t('cv.startDate')"
          variant="outlined"
          type="date"></v-text-field>

        <v-text-field
          v-model="formData.endDate"
          :label="$t('cv.endDate')"
          variant="outlined"
          type="date"></v-text-field>

        <v-textarea
          v-model="formData.description"
          :label="$t('cv.description')"
          variant="outlined"></v-textarea>

        <v-btn type="submit" color="success">
          {{ $t('actions.save') }}
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  description: ''
})

const submitForm = () => {
  console.log('Work experience submitted:', formData.value)
}
</script>
