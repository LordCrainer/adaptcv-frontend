<template>
  <div class="d-flex flex-column ga-4">
    <div v-for="tab in tabs" :key="tab.translationKey">
      <component :is="tab.component" v-bind="tab.props"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import UserProfile from '~/domains/profile/components/user-profile/index.vue'
import WorkExperience from '~/domains/profile/components/work-experience/index.vue'
import AboutMe from '~/domains/profile/components/about-me/index.vue'

import Education from '~/domains/profile/components/education/index.vue'
import Skills from '~/domains/profile/components/skills/index.vue'
import Languages from '~/domains/profile/components/languages/index.vue'
import type { TabItem } from '~/types/global'

type Sections =
  | 'user-profile'
  | 'about-me'
  | 'work-experience'
  | 'education'
  | 'skills'
  | 'languages'

const tabs = ref<TabItem<Sections>[]>([
  {
    id: 'user-profile',
    title: 'Profile',
    translationKey: 'profile.personalInfo.title',
    component: markRaw(UserProfile),
    props: {}
  },
  {
    id: 'about-me',
    title: 'About Me',
    translationKey: 'profile.aboutMe.title',
    component: markRaw(AboutMe),
    props: {}
  },
  {
    id: 'work-experience',
    title: 'Experience',
    translationKey: 'profile.experience.title',
    component: markRaw(WorkExperience),
    props: {}
  },
  {
    id: 'education',
    title: 'Education',
    translationKey: 'profile.education.title',
    component: markRaw(Education),
    props: {}
  },
  {
    id: 'skills',
    title: 'Skills',
    translationKey: 'profile.skills.title',
    component: markRaw(Skills),
    props: {}
  },
  {
    id: 'languages',
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
