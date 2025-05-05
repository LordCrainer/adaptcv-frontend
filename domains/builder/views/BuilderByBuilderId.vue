<template>
  <BuilderToolbar>
    <template #toolbar-left>
      <v-btn
        variant="text"
        class="text-primary"
        @click="$router.push('/builder')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </template>
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
  <v-row>
    <v-col cols="12" lg="4">
      <UserProfile />
    </v-col>
    <v-col cols="12" lg="8" class="d-flex flex-column ga-4">
      <AboutMe />
      <WorkExperience />
      <Education />
    </v-col>
  </v-row>
  <!-- <div class="d-flexflex-grow-1 flex-shrink-1">
    </div>
    <div class="d-flex flex-grow-0 flex-column ga-4">
    </div> -->
</template>

<script setup lang="ts">
import UserProfile from '~/domains/builder/components/user-profile/index.vue'
import WorkExperience from '~/domains/builder/components/work-experience/index.vue'
import AboutMe from '~/domains/builder/components/about-me/index.vue'

import Education from '~/domains/builder/components/education/index.vue'
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
