<template>
  <v-row>
    <v-col cols="12">
      <CardDefault :title="$t('profile.personalInfo.title')">
        <UserProfile></UserProfile>
      </CardDefault>
    </v-col>

    <v-col cols="12">
      <CardDefault :title="$t('profile.personalInfo.aboutMe')">
        <AboutMe></AboutMe>
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
import UserProfile from '~/views/profile/UserProfile.vue'
import WorkExperience from '~/views/profile/WorkExperience.vue'

import Education from '~/views/profile/Education.vue'
import Skills from '~/views/profile/Skills.vue'
import Languages from '~/views/profile/Languages.vue'
import AboutMe from '~/views/profile/AboutMe.vue'
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
