<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.name"
          :label="$t('cv.fullname')"
          placeholder="Ej: John Doe"
          variant="outlined"
          required></v-text-field>

        <v-text-field
          v-model="formData.professionalTitle"
          :label="$t('cv.professionalTitle')"
          placeholder="Ej: Software Engineer"
          variant="outlined"
          required></v-text-field>

        <v-text-field
          v-model="formData.email"
          :label="$t('cv.email')"
          placeholder="Ej: example@example.com"
          variant="outlined"
          type="email"
          required></v-text-field>

        <v-text-field
          v-model="formData.phone"
          :label="$t('cv.phone')"
          placeholder="Ej: +1234567890"
          variant="outlined"
          type="tel"></v-text-field>

        <v-text-field
          v-model="formData.address"
          :label="$t('cv.address')"
          placeholder="Ej: city, country"
          variant="outlined"></v-text-field>
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
  city: '',
  state: '',
  zip: '',
  country: ''
})

const submitForm = () => {
  console.log('Form submitted:', formData.value)
}
</script>
