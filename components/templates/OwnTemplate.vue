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
      <div
        style="width: 275px; min-width: 275px"
        class="ga-4 text-white d-flex flex-column pa-2">
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
            {{ userProfile?.name }}
          </v-card-title>
          <p class="text-body-1 font-weight-bold">
            {{ userProfile?.profession }}
          </p>
        </div>

        <div class="text-body-2">
          <p class="text-body-1 text-center pa-2 font-weight-bold">Slogan</p>
          <v-divider
            class="border-opacity-75 py-2"
            thickness="2"
            color="white"></v-divider>
          <div class="d-flex ga-2 align-center pa-2">
            <v-avatar size="32" color="white">
              <v-icon size="large" color="orange" icon="mdi-bullhorn"></v-icon>
            </v-avatar>
            <p>
              {{ aboutMe?.slogan }}
            </p>
          </div>
        </div>

        <div class="text-body-2">
          <p class="text-body-1 text-center pa-2 font-weight-bold">Contact</p>
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
          <p class="text-body-1 text-center pa-2 font-weight-bold">
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
          <p class="text-body-1 text-center pa-2 font-weight-bold">
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
                getProficiencyLevel(lang.proficiency, PROFICIENCY_LEVELS)
              "
              color="orange-darken-1"
              :width="6"></v-progress-circular>
            <p>
              {{ lang.name }} {{ lang }} ({{
                $t(`profile.languages.${lang.proficiency}`)
              }})
            </p>
          </div>
        </div>
      </div>

      <div
        class="bg-white own-rounded-bt-24 pa-4 ga-4 d-flex flex-column flex-grow-1">
        <div class="d-flex flex-column ga-4">
          <div class="d-flex ga-4 align-center">
            <v-icon size="32" icon="mdi-account-circle" color=""></v-icon>
            <p class="text-h6">{{ $t('profile.personalInfo.aboutMe') }}</p>
          </div>
          <div class="d-flex ga-4 align-center">
            <div class="rounded-divider ml-3"></div>
            <p class="text-caption" style="width: 100%">
              {{ aboutMe?.summary }}
            </p>
          </div>
        </div>

        <div class="d-flex flex-column ga-4">
          <div class="d-flex ga-4 align-center">
            <v-icon size="32" icon="mdi-account-circle" color=""></v-icon>
            <p class="text-h6">{{ $t('profile.experience.title') }}</p>
          </div>
          <div class="d-flex ga-4 align-center" v-for="exp in workExperience">
            <div class="rounded-divider ml-3"></div>
            <div class="text-caption" style="width: 100%">
              <div class="d-flex ga-1 flex-column">
                <div class="d-flex justify-space-between">
                  <div class="d-flex align-center ga-2">
                    <p class="font-weight-bold">
                      {{ exp.jobTitle }}
                    </p>
                    | {{ exp.company }}
                  </div>
                  <div>
                    {{
                      formatDateRange({
                        startDate: exp.startDate,
                        endDate: exp.endDate
                      })
                    }}
                  </div>
                </div>
                <div>
                  <DragonEditorViewer :content="exp.description" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column ga-4">
          <div class="d-flex ga-4 align-center">
            <v-icon size="32" icon="mdi-account-circle" color=""></v-icon>
            <p class="text-h6">{{ $t('profile.education.title') }}</p>
          </div>
          <div
            class="d-flex ga-4 align-center"
            v-for="edu in education"
            :key="edu.institution + edu.fieldOfStudy">
            <div class="ml-3 rounded-divider"></div>
            <div class="d-flex flex-column" style="width: 100%">
              <div class="d-flex justify-space-between">
                <p class="text-caption">
                  {{ edu.institution }}
                </p>
                <div>
                  {{
                    formatDateRange({
                      startDate: edu.startDate,
                      endDate: edu.endDate
                    })
                  }}
                </div>
              </div>
              <div>
                <p>{{ edu.fieldOfStudy }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useLanguages } from '~/domains/builder/components/languages/useLanguages'
import { useCVStore } from '~/domains/builder/store/cv.store'

const { formatDateRange } = useFormatDate()
const { PROFICIENCY_LEVELS } = useLanguages()
const { curriculumVitae } = useCVStore()

const { education, languages, userProfile, skills, workExperience, aboutMe } =
  curriculumVitae

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
    link: `mailto:${userProfile?.email}`,
    label: userProfile?.email
  },
  {
    icon: 'mdi-phone',
    link: `https://wa.me/${userProfile?.phone}`,
    label: 'phone',
    hasUserProfile: true
  },
  {
    icon: 'mdi-github',
    link: userProfile?.socialMedia?.github,
    label: 'github',
    hasUserProfile: true
  },
  {
    icon: 'mdi-linkedin',
    link: userProfile?.socialMedia?.linkedin,
    label: userProfile?.socialMedia?.linkedin,
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

.own-rounded-bt-24 {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  background-color: white;
}

.rounded-divider {
  width: 5px;
  height: 80%;
  background-color: #333;
  border-radius: 5px;
  margin: 20px auto;
}
</style>
