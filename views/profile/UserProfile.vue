<style>
.profile-photo {
  width: 175px;
  height: 175px;
}
</style>
<template>
  <v-form @submit.prevent="submitForm">
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-1-0 justify-center">
        <v-card class="profile-photo rounded-circle">
          <v-img
            class="profile-photo"
            aspect-ratio="1/1"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" class="d-flex flex-column ga-2">
        <div class="d-flex justify-end py-4">
          <v-btn color="secondary" variant="outlined" @click="fillInformation">
            {{ $t('profile.personalInfo.fillInformation') }}
          </v-btn>
        </div>
        <div class="d-flex flex-column ga-2">
          <v-text-field
            prepend-inner-icon="mdi-account"
            v-model="formData.name"
            :label="$t('profile.personalInfo.fullname')"
            placeholder="Ej: John Doe"
            variant="outlined"
            :rules="[rules.required($t('profile.personalInfo.fullname'))]"
            required></v-text-field>
          <v-text-field
            v-model="formData.email"
            prepend-inner-icon="mdi-email"
            :label="$t('profile.personalInfo.email')"
            placeholder="Ej: example@example.com"
            variant="outlined"
            type="email"
            required></v-text-field>

          <v-text-field
            v-model="formData.phone"
            prepend-inner-icon="mdi-phone"
            :label="$t('profile.personalInfo.phone')"
            placeholder="Ej: +1234567890"
            variant="outlined"
            type="tel"></v-text-field>

          <v-row class="py-2">
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="formData.country"
                :label="$t('profile.personalInfo.country')"
                prepend-inner-icon="mdi-map"
                placeholder="Ej: country"
                variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-text-field
                v-model="formData.city"
                :label="$t('profile.personalInfo.city')"
                prepend-inner-icon="mdi-city"
                placeholder="Ej: city"
                variant="outlined"></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-select
            clearable
            :label="$t('profile.personalInfo.areaProfession')"
            variant="outlined"
            prepend-inner-icon="mdi-briefcase"
            :items="Object.keys(areasProfession)"
            v-model="formData.areaProfession"
            autocomplete></v-select>
          <v-select
            v-if="formData.areaProfession"
            prepend-inner-icon="mdi-account-hard-hat"
            :label="$t('profile.personalInfo.profession')"
            variant="outlined"
            :items="professions"
            v-model="formData.profession"
            autocomplete></v-select>
        </div>
      </v-col>
      <v-col>
        <v-textarea
          v-model="formData.summary"
          rounded="md"
          flat
          prepend-inner-icon="mdi-file-document"
          :label="$t('profile.personalInfo.summary')"
          variant="outlined"
          placeholder="Ej: A brief summary about yourself"
          name="summary"></v-textarea>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end ga-4 pa-4">
      <v-btn color="primary" rounded variant="outlined" class="px-8">
        {{ $t('actions.cancel') }}
      </v-btn>
      <v-btn color="primary" rounded @click="submitForm" class="px-8">
        {{ $t('actions.save') }}
      </v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { rules } = useRules()

interface FormData {
  name: string
  profession: string
  areaProfession: keyof typeof areasProfession | undefined
  email: string
  phone: string
  address: string
  country?: string
  city?: string
  summary?: string
}

const formData = ref<FormData>({
  name: '',
  profession: '',
  areaProfession: undefined,
  email: '',
  phone: '',
  address: '',
  country: '',
  city: '',
  summary: ''
})

const professions = ref<string[]>([])

watch(
  () => formData.value.areaProfession,
  (newArea) => {
    if (newArea) {
      formData.value.profession = ''
      professions.value = areasProfession[newArea]
    }
  }
)

const areasProfession = {
  Technology: [
    'Software Development',
    'Data Analysis',
    'Product Management',
    'UI/UX Design',
    'Digital Marketing'
  ],
  Finance: [
    'Investment Banking',
    'Financial Analysis',
    'Accounting',
    'Risk Management',
    'Insurance'
  ],
  Healthcare: [
    'Nursing',
    'Medical Research',
    'Healthcare Administration',
    'Pharmacy',
    'Public Health'
  ],
  Education: [
    'Teaching',
    'Educational Administration',
    'Curriculum Development',
    'Special Education',
    'Counseling'
  ],
  Marketing: [
    'Content Marketing',
    'Social Media Management',
    'SEO Specialist',
    'Brand Management',
    'Market Research'
  ]
}

const fillInformation = () => {
  console.log('Fill information clicked')
}

const submitForm = () => {
  console.log('Form submitted:', formData.value)
}
</script>
