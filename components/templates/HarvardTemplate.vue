<script lang="ts" setup>
import { useBuilderStore } from '~/modules/builder/store/builder.store'
import Editor from '../Editor/Editor.vue'
const builderStore = useBuilderStore()

import { computed } from 'vue'

const { formatDateRange } = useFormatDate()
const { builderState } = storeToRefs(builderStore)

const location = computed(() => {
  return getLocation(builderState.value.userProfile?.city, builderState.value.userProfile?.country)
})

function getLocation(...args: (string | undefined)[]) {
  return [...args].filter(Boolean).join(', ')
}
</script>

<template>
  <v-card
    max-width="800"
    border
    width="100%"
    class="mx-auto flex-card flex-container pa-4 text-caption">
    <v-card-title class="text-h5 font-weight-bold text-center pb-0">
      {{ builderState.userProfile?.name }}
    </v-card-title>

    <v-card-item class="text-center">
      {{ location }} -
      <a
        :href="builderState.userProfile?.socialMedia?.linkedin"
        target="_blank"
        rel="noopener noreferrer">
        {{ builderState.userProfile?.socialMedia?.linkedin }}
      </a>
      - {{ builderState.userProfile?.phone }} -
      {{ builderState.userProfile?.email }}
    </v-card-item>
    <v-divider></v-divider>
    <v-card-item>
      {{ builderState.aboutMe?.summary }}
    </v-card-item>

    <v-card-item>
      <div class="text-body-2 font-weight-bold">
        {{ $t('profile.experience.title') }}
      </div>
      <v-divider></v-divider>
      <v-col
        v-for="(exp, index) in builderState.workExperience"
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
            <Editor
              hide-menu
              :read-only="true"
              v-model="exp.description"
              class="editor-container" />
          </v-col>
        </v-row>
      </v-col>
    </v-card-item>
    <v-card-item>
      <div class="text-body-2 font-weight-bold">
        {{ $t('profile.education.title') }}
      </div>
      <v-divider></v-divider>
      <v-row v-for="(edu, index) in builderState.education" :key="index" class="pa-4">
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
            <li v-for="(skill, index) in builderState.skills" :key="index">
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
            <li v-for="(language, index) in builderState.languages" :key="index">
              {{ language.name }} ({{ language.proficiency }})
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
