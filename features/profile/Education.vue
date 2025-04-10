<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.degree"
          variant="outlined"
          :label="$t('profile.education.degree')"
          required></v-text-field>

        <v-text-field
          v-model="formData.institution"
          :label="$t('profile.education.institution')"
          variant="outlined"
          required></v-text-field>

        <v-text-field
          v-model="formData.startDate"
          :label="$t('profile.education.startDate')"
          variant="outlined"
          type="date"></v-text-field>

        <v-text-field
          v-model="formData.endDate"
          :label="$t('profile.education.endDate')"
          variant="outlined"
          type="date"></v-text-field>
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
