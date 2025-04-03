<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.name"
          :label="$t('profile.personalInfo.fullname')"
          placeholder="Ej: John Doe"
          variant="outlined"
          required></v-text-field>

        <v-text-field
          v-model="formData.professionalTitle"
          :label="$t('profile.personalInfo.professionalTitle')"
          placeholder="Ej: Software Engineer"
          variant="outlined"
          required></v-text-field>

        <v-text-field
          v-model="formData.email"
          :label="$t('profile.personalInfo.email')"
          placeholder="Ej: example@example.com"
          variant="outlined"
          type="email"
          required></v-text-field>

        <v-text-field
          v-model="formData.phone"
          :label="$t('profile.personalInfo.phone')"
          placeholder="Ej: +1234567890"
          variant="outlined"
          type="tel"></v-text-field>

        <v-text-field
          v-model="formData.address"
          :label="$t('profile.personalInfo.address')"
          placeholder="Ej: city, country"
          variant="outlined"></v-text-field>

        <v-textarea
          v-model="formData.description"
          :label="$t('profile.personalInfo.description')"
          variant="outlined"
          placeholder="Ej: A brief description about yourself"
          name="description"></v-textarea>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  professionalTitle: '',
  email: '',
  phone: '',
  address: '',
  description: ''
})

const submitForm = () => {
  console.log('Form submitted:', formData.value)
}
</script>
