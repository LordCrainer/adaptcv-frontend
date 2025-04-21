<template>
  <v-card
    max-width="800"
    width="100%"
    style="background-color: rgb(6, 43, 72)"
    class="mx-auto d-flex flex-column text-caption">
    <v-toolbar color="transparent" flat class="pb-2">
      <template v-slot:prepend>
        <div class="pa-2">
          <v-img :width="50" src="/Logo.png"></v-img>
        </div>
      </template>
      <v-toolbar-title class="text-h5 font-weight-bold text-center text-white">
        {{ 'Curriculum Vitae'.toLocaleUpperCase() }}
      </v-toolbar-title>
      <template v-slot:append>
        <v-btn icon="mdi-menu" color="white"></v-btn>
      </template>
    </v-toolbar>

    <div class="d-flex flex-row">
      <div style="width: 275px" class="ga-4 text-white d-flex flex-column pa-2">
        <div class="d-flex flex-column align-center pa-4">
          <div class="border-radius-circle">
            <v-img
              id="img-profile"
              src="/Logo.png"
              width="100"
              height="100"
              class="rounded-circle"></v-img>
          </div>

          <v-card-title class="text-h6 font-weight-bold">
            {{ userProfile.name }}
          </v-card-title>
          <p class="text-body-1 font-weight-bold">
            {{ userProfile.profession }}
          </p>
        </div>

        <div class="text-body-2">
          <p class="text-center pa-2 font-weight-bold">Slogan</p>
          <v-divider
            class="border-opacity-75 py-2"
            thickness="2"
            color="white"></v-divider>
          <div class="d-flex ga-2 align-center pa-2">
            <v-avatar size="32" color="white">
              <v-icon size="large" color="orange" icon="mdi-bullhorn"></v-icon>
            </v-avatar>
            <p>
              {{ userProfile.slogan }}
            </p>
          </div>
        </div>

        <div class="text-body-2">
          <p class="text-center pa-2 font-weight-bold">Contact</p>
          <v-divider
            class="border-opacity-75 py-2"
            thickness="2"
            color="white"></v-divider>
          <div
            v-for="contact in contacts"
            :key="contact.label"
            class="d-flex ga-2 align-center pa-2">
            <v-avatar size="32" color="white">
              <v-icon
                size="24"
                color="orange-darken-1"
                :icon="contact.icon"></v-icon>
            </v-avatar>
            <a :href="contact.link" target="_blank" class="text-white">
              {{ linkContact(contact) }}
            </a>
          </div>
        </div>

        <div class="text-body-2">
          <p class="text-center pa-2 font-weight-bold">
            {{ $t('profile.skills.title') }}
          </p>
          <v-divider
            class="border-opacity-75 py-2"
            thickness="2"
            color="white"></v-divider>
          <div
            v-for="skill in skills"
            :key="skill.skill"
            class="d-flex ga-2 align-center pa-2">
            <div
              class="pa-3 rounded-circle"
              style="border: 5px solid orange"></div>
            <p>
              {{ skill.skill }}
            </p>
          </div>
        </div>

        <div class="text-body-2">
          <p class="text-center pa-2 font-weight-bold">
            {{ $t('profile.languages.title') }}
          </p>
          <v-divider
            class="border-opacity-75 py-2"
            thickness="2"
            color="white"></v-divider>
          <div
            v-for="lang in languages"
            :key="lang.name"
            class="d-flex ga-2 align-center pa-2">
            <v-progress-circular
              :model-value="
                getProficiencyLevel(lang.proficiency, proficiencyLevels)
              "
              color="orange-darken-1"
              :width="6"></v-progress-circular>
            <p>
              {{ lang.name }} ({{
                $t(`profile.languages.${lang.proficiency}`)
              }})
            </p>
          </div>
        </div>
      </div>

      <v-col class="bg-white container-information">
        <v-card-title>Skills</v-card-title>
        <v-card-subtitle>{{ skills.join(', ') }}</v-card-subtitle>
      </v-col>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useLanguages } from '~/features/profile/Languages/useLanguages'

import { useCVStore } from '~/stores/cvStore'
const { proficiencyLevels } = useLanguages()
const { education, languages, userProfile, skills, workExperience } =
  useCVStore()

function getProficiencyLevel(prop: string, options: string[]) {
  const index = options.findIndex((s) => s === prop) + 1
  return (100 / options.length) * index
}

function getUserProfile(text: string) {
  const word = text.split('/').slice(-1)[0]
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function linkContact(contact: IContact) {
  return contact.hasUserProfile && contact.link
    ? getUserProfile(contact.link)
    : contact.label
}

interface IContact {
  icon: string
  link?: string
  label?: string
  hasUserProfile?: boolean
}

const contacts = ref<IContact[]>([
  {
    icon: 'mdi-email',
    link: `mailto:${userProfile.email}`,
    label: userProfile.email
  },
  {
    icon: 'mdi-phone',
    link: `https://wa.me/${userProfile.phone}`,
    label: 'phone',
    hasUserProfile: true
  },
  {
    icon: 'mdi-github',
    link: userProfile.socialMedia?.github,
    label: 'github',
    hasUserProfile: true
  },
  {
    icon: 'mdi-linkedin',
    link: userProfile.socialMedia?.linkedin,
    label: userProfile.socialMedia?.linkedin,
    hasUserProfile: true
  }
])
// rgb(8, 54, 91)
</script>

<style scoped lang="scss">
.border-radius-circle {
  border-radius: 50%;
  border: 5px solid white;
  padding: 10px;
  #img-profile {
    border: 3px solid white;
  }
}

.container-information {
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  background-color: white;
}
</style>
