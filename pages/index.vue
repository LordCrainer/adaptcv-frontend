<template>
  <div class="d-flex flex-column ga-4 justify-center align-center">
    <v-card width="100%" color="red" style="max-width: 800px">
      <v-toolbar color="white">
        <v-toolbar-title class="text-h5 font-weight-bold">
          {{ $t('routes.fillInformation') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push({ name: 'home' })" class="text-secondary">
          <v-icon>mdi-close</v-icon>
          {{ $t('actions.publish') }}
        </v-btn>
      </v-toolbar>
    </v-card>
    <CardDefault
      style="max-width: 800px"
      flat
      v-for="tab in tabs"
      :key="tab.translationKey"
      :is="tab.component"
      :title="tab.translationKey">
      <component :is="tab.component" v-bind="tab.props" />
    </CardDefault>
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
