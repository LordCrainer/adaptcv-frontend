<template>
  <div class="d-flex flex-column ga-4 justify-center align-center">
    <v-app-bar density="compact" flat app color="white" class="sticky-toolbar">
      <v-toolbar-title class="text-h5 font-weight-bold">
        {{ $t('routes.builder') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex ga-2 pa-2 align-center">
        <v-btn
          size="small"
          v-tooltip:start="$t('actions.preview')"
          class="text-grey-darken-1"
          @click="$router.push({ name: 'home' })"
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
    </v-app-bar>
    <div style="max-width: 800px" class="d-flex flex-column ga-4">
      <!-- <v-toolbar color="primary" class="">
        <v-tabs>
          <v-tab density="comfortable">Informacion</v-tab>
          <v-tab density="comfortable">Visualizar</v-tab>
        </v-tabs>
      </v-toolbar> -->
      <CardDefault
        flat
        v-for="tab in tabs"
        :key="tab.translationKey"
        :is="tab.component"
        :title="tab.translationKey">
        <component :is="tab.component" v-bind="tab.props" />
      </CardDefault>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import UserProfile from '~/domains/profile/UserProfile/index.vue'
import WorkExperience from '~/domains/profile/WorkExperience/index.vue'
import AboutMe from '~/domains/profile/AboutMe/index.vue'

import Education from '~/domains/profile/Education/index.vue'
import Skills from '~/domains/profile/Skills/index.vue'
import Languages from '~/domains/profile/Languages/index.vue'
import type { TabItem } from '~/types/global'
import CardDefault from '~/components/card/CardDefault.vue'

const tabs = ref<TabItem[]>([
  {
    title: 'Profile',
    translationKey: 'profile.personalInfo.title',
    component: markRaw(UserProfile),
    props: {}
  },
  {
    title: 'About Me',
    translationKey: 'profile.aboutMe.title',
    component: markRaw(AboutMe),
    props: {}
  },
  {
    title: 'Experience',
    translationKey: 'profile.experience.title',
    component: markRaw(WorkExperience),
    props: {}
  },
  {
    title: 'Education',
    translationKey: 'profile.education.title',
    component: markRaw(Education),
    props: {}
  },
  {
    title: 'Skills',
    translationKey: 'profile.skills.title',
    component: markRaw(Skills),
    props: {}
  },
  {
    title: 'Languages',
    translationKey: 'profile.languages.title',
    component: markRaw(Languages),
    props: {}
  }
])
</script>

<style scoped>
.sticky-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
