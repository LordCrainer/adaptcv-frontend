<template>
  <v-row>
    <v-col cols="12">
      <h1>{{ $t('cv.education') }}</h1>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.degree"
          variant="outlined"
          :label="$t('cv.degree')"
          required></v-text-field>

        <v-text-field
          v-model="formData.institution"
          :label="$t('cv.institution')"
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
  degree: '',
  institution: '',
  startDate: '',
  endDate: ''
})

const submitForm = () => {
  console.log('Education submitted:', formData.value)
}
</script>
