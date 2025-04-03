<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.jobTitle"
          variant="outlined"
          :label="$t('profile.experience.jobTitle')"
          placeholder="Ej: Software Engineer"
          required></v-text-field>

        <v-text-field
          v-model="formData.company"
          :label="$t('profile.experience.company')"
          variant="outlined"
          placeholder="Ej: Tech Company"
          required></v-text-field>

        <v-text-field
          v-model="formData.startDate"
          :label="$t('profile.experience.startDate')"
          variant="outlined"
          type="date"></v-text-field>

        <v-text-field
          v-model="formData.endDate"
          :label="$t('profile.experience.endDate')"
          variant="outlined"
          type="date"></v-text-field>

        <v-textarea
          v-model="formData.description"
          :label="$t('profile.experience.description')"
          variant="outlined"
          placeholder="Ej: A brief description of your work experience"
          required></v-textarea>
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
