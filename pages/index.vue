<template>
  <v-row>
    <v-col cols="6">
      <CardDefault
        :title="$t('cv.personalInformation')"
        :icon="'mdi-account'"
        :color="'primary'">
        <UserProfile></UserProfile>
      </CardDefault>
    </v-col>
    <v-col cols="6">
      <CardDefault
        :title="$t('cv.workExperience')"
        :icon="'mdi-briefcase'"
        :color="'primary'">
        <WorkExperience></WorkExperience>
      </CardDefault>
    </v-col>
    <v-col cols="6">
      <CardDefault
        :title="$t('cv.education')"
        :icon="'mdi-school'"
        :color="'primary'">
        <Education></Education>
      </CardDefault>
    </v-col>
    <v-col cols="6">
      <CardDefault
        :title="$t('cv.skills')"
        :icon="'mdi-star'"
        :color="'primary'">
        <Skills></Skills>
      </CardDefault>
    </v-col>
    <v-col cols="6">
      <CardDefault
        :title="$t('cv.languages')"
        :icon="'mdi-translate'"
        :color="'primary'">
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
const formData = ref({
  name: '',
  professionalTitle: '',
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
