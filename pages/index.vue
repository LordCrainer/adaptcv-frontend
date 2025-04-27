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
import UserProfile from '~/features/profile/UserProfile/index.vue'
import WorkExperience from '~/features/profile/WorkExperience/index.vue'
import AboutMe from '~/features/profile/AboutMe/index.vue'

import Education from '~/features/profile/Education/index.vue'
import Skills from '@/features/profile/Skills/index.vue'
import Languages from '@/features/profile/Languages/index.vue'
import type { TabItem } from '~/types/global'
import CardDefault from '~/components/card/CardDefault.vue'

const tabs = ref<TabItem[]>([
  {
    title: 'Profile',
    translationKey: 'personalInfo',
    component: markRaw(UserProfile),
    props: {}
  },
  {
    title: 'About Me',
    translationKey: 'aboutMe',
    component: markRaw(AboutMe),
    props: {}
  },
  {
    title: 'Experience',
    translationKey: 'experience',
    component: markRaw(WorkExperience),
    props: {}
  },
  {
    title: 'Education',
    translationKey: 'education',
    component: markRaw(Education),
    props: {}
  },
  {
    title: 'Skills',
    translationKey: 'skills',
    component: markRaw(Skills),
    props: {}
  },
  {
    title: 'Languages',
    translationKey: 'languages',
    component: markRaw(Languages),
    props: {}
  }
])
</script>
