<script lang="ts" setup>
import { useCVStore } from '~/stores/cvStore'
const { education, languages, userProfile, skills, workExperience } =
  useCVStore()
import { computed } from 'vue'

const { formatDateRange } = useFormatDate()

const location = computed(() => {
  return getLocation(userProfile.city, userProfile.country)
})

function getLocation(...args: (string | undefined)[]) {
  return [...args].filter(Boolean).join(', ')
}
</script>

<template>
  <v-card
    max-width="800"
    width="100%"
    class="mx-auto flex-card flex-container pa-4 text-caption">
    <v-card-title class="text-h5 font-weight-bold text-center pb-0">
      {{ userProfile.name }}
    </v-card-title>

    <v-card-item class="text-center">
      {{ location }} -
      <a
        :href="userProfile.socialMedia?.linkedin"
        target="_blank"
        rel="noopener noreferrer">
        {{ userProfile.socialMedia?.linkedin }}
      </a>
      - {{ userProfile.phone }} -
      {{ userProfile.email }}
    </v-card-item>
    <v-divider></v-divider>
    <v-card-item>
      {{ userProfile.summary }}
    </v-card-item>

    <v-card-item>
      <div class="text-body-2 font-weight-bold">
        {{ $t('profile.experience.title') }}
      </div>
      <v-divider></v-divider>
      <v-col
        v-for="(exp, index) in workExperience"
        :key="index"
        class="py-2 px-0">
        <v-row>
          <v-col cols="8" md="8">
            <p class="font-weight-bold">
              {{ exp.company }}
            </p>
            <p>{{ exp.jobTitle }}</p>
          </v-col>
          <v-col cols="4" md="4" class="text-right">
            <p>{{ getLocation(exp.city, exp.country) }}</p>
            <p>
              {{
                formatDateRange({
                  startDate: exp.startDate,
                  endDate: exp.endDate
                })
              }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <DragonEditorViewer :content="exp.description" />
          </v-col>
        </v-row>
      </v-col>
    </v-card-item>
    <v-card-item>
      <div class="text-body-2 font-weight-bold">
        {{ $t('profile.education.title') }}
      </div>
      <v-divider></v-divider>
      <v-row v-for="(edu, index) in education" :key="index" class="pa-4">
        <v-col cols="8" md="8" class="py-2 px-0">
          <p class="font-weight-bold">
            {{ edu.institution }}
          </p>
          <p>{{ edu.fieldOfStudy }}</p>
        </v-col>
        <v-col cols="4" md="4" class="text-right">
          <p>{{ getLocation(edu.city, edu.country) }}</p>
          <p>
            {{
              formatDateRange({
                startDate: edu.startDate,
                endDate: edu.endDate
              })
            }}
          </p>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-item>
      <div class="text-body-2 font-weight-bold">
        {{ $t('profile.skills.title') }}
      </div>
      <v-divider></v-divider>
      <v-row class="pa-4">
        <v-col cols="8" md="8">
          <ul>
            <li v-for="(skill, index) in skills" :key="index">
              {{ skill.skill }} ({{
                $t(`profile.skills.${skill.yearsOfExperience}`)
              }})
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-item>
      <div class="text-body-2 font-weight-bold">
        {{ $t('profile.languages.title') }}
      </div>
      <v-divider></v-divider>
      <v-row class="pa-4">
        <v-col cols="8" md="8">
          <ul>
            <li v-for="(language, index) in languages" :key="index">
              {{ language.name }} ({{ language.proficiency }})
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<style>
.dragon-editor-viewer {
  margin: 0;
  padding: 0;
}
</style>
