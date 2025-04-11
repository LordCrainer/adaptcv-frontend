<template>
  <v-row>
    <v-col cols="12">
      <CardDefault :title="$t('profile.personalInfo.title')">
        <UserProfile></UserProfile>
      </CardDefault>
    </v-col>

    <v-col cols="12">
      <CardDefault :title="$t('profile.experience.title')">
        <WorkExperience></WorkExperience>
      </CardDefault>
    </v-col>

    <v-col cols="12">
      <CardDefault :title="$t('profile.education.title')">
        <Education></Education>
      </CardDefault>
    </v-col>

    <v-col cols="12">
      <CardDefault :title="$t('profile.skills.title')">
        <Skills></Skills>
      </CardDefault>
    </v-col>

    <v-col cols="12">
      <CardDefault :title="$t('profile.languages.title')">
        <Languages></Languages>
      </CardDefault>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import CardDefault from '~/components/card/CardDefault.vue'
import UserProfile from '~/features/profile/UserInformation/index.vue'
import WorkExperience from '~/features/profile/WorkExperience/index.vue'

import Education from '~/features/profile/Education/index.vue'
import Skills from '@/features/profile/Skills/index.vue'
import Languages from '@/features/profile/Languages/index.vue'
const formData = ref({
  name: '',
  profession: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  languages: [],
  projects: [],
  volunteer: [],
  publications: [],
  awards: [],
  references: [],
  hobbies: [],
  interests: [],
  additionalInfo: '',
  profilePicture: '',
  portfolio: '',
  socialMedia: {
    linkedin: '',
    github: '',
    twitter: '',
    facebook: '',
    instagram: ''
  },
  personalStatement: '',
  availability: ''
  // Otros campos del formulario
})

const submitForm = () => {
  // Aquí puedes agregar la lógica para enviar o guardar la información del formulario
  console.log('Datos del formulario:', formData.value)
}
</script>
