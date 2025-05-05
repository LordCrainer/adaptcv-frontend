<template>
  <BuilderToolbar>
    <template #toolbar-items>
      <div class="d-flex ga-2 pa-2 align-center">
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.preview')"
          color="grey"
          @click="toggleView"
          variant="tonal">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.save')"
          class="text-success"
          @click="$router.push({ name: 'home' })"
          variant="tonal">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.publish')"
          variant="tonal"
          @click="$router.push({ name: 'home' })"
          class="text-primary">
          <v-icon>mdi-publish</v-icon>
        </v-btn>
      </div>
    </template>
  </BuilderToolbar>
  <div class="d-flex flex-wrap ga-4">
    <div class="d-flex flex-grow-1">
      <UserProfile />
    </div>
    <div class="d-flex flex-grow-1 flex-column ga-4">
      <AboutMe />
      <WorkExperience />
      <Education />
      <Skills />
      <Languages />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import UserProfile from '~/domains/builder/components/user-profile/index.vue'
import WorkExperience from '~/domains/builder/components/work-experience/index.vue'
import AboutMe from '~/domains/builder/components/about-me/index.vue'

import Education from '~/domains/builder/components/education/index.vue'
import Skills from '~/domains/builder/components/skills/index.vue'
import Languages from '~/domains/builder/components/languages/index.vue'
import type { TabItem } from '~/types/global'
import { useCVStore } from '../shared/cv.store'
import type { Sections } from '../shared'
import BuilderToolbar from '../components/BuilderToolbar.vue'

const cvStore = useCVStore()
const route = useRoute()

function handleUpdate(section: Sections, newData: any) {
  cvStore.updateSection(section, newData)
}

function toggleView() {
  const builderId = route.params.builderId
  navigateTo(`/builder/${builderId}/preview`)
}
</script>
