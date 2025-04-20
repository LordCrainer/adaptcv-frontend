<script lang="ts" setup>
import { useCVStore } from '~/stores/cvStore'
const { education, languages, userProfile, skills, workExperience } =
  useCVStore()
import { computed } from 'vue'

const location = computed(() => {
  return getLocation(userProfile.city, userProfile.country)
})

function getLocation(...args: (string | undefined)[]) {
  return [...args].filter(Boolean).join(', ')
}

const data = ref<DEContentData>([])
const $editor = ref<DragonEditor | null>(null)
function getData() {
  data.value = $editor.value?.getContentData() || []
  console.log('data', data.value)
}
</script>

<template>
  <v-card
    max-width="800"
    width="100%"
    class="mx-auto flex-card flex-container pa-4 text-caption">
    <!-- <v-btn color="success" @click="getData">text</v-btn>
    <ClientOnly>
      <DragonEditor ref="$editor" />
    </ClientOnly> -->
    <v-card-title class="text-h5 font-weight-bold text-center">
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
      <v-col v-for="(exp, index) in workExperience" :key="index" class="pa-4">
        <v-row>
          <v-col cols="8" md="8">
            <p class="font-weight-bold">
              {{ exp.company }}
            </p>
            <p>{{ exp.jobTitle }}</p>
          </v-col>
          <v-col cols="4" md="4" class="text-right">
            <p>{{ getLocation(exp.city, exp.country) }}</p>
            <p>{{ exp.startDate }} - {{ exp.endDate }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <DragonEditorViewer :content="exp.description" />
          </v-col>
        </v-row>
      </v-col>
    </v-card-item>
    <v-card-item>
      <div class="text-body-2 font-weight-bold">Education</div>
      <v-divider></v-divider>
      <v-row v-for="(edu, index) in education" :key="index" class="pa-4">
        <v-col cols="8" md="8">
          <p class="font-weight-bold">
            {{ edu.institution }}
          </p>
          <p>{{ edu.fieldOfStudy }}</p>
        </v-col>
        <v-col cols="4" md="4" class="text-right">
          <p>{{ getLocation(edu.city, edu.country) }}</p>
          <p>{{ edu.startDate }} - {{ edu.endDate }}</p>
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
