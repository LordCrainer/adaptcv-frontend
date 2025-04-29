<template>
  <CardDefault
    class="d-flex flex-column ga-4"
    style="max-width: 800px"
    flat
    v-for="tab in tabs"
    :key="tab.translationKey"
    :is="tab.component"
    :title="tab.translationKey">
    <component :is="tab.component" v-bind="tab.props" />
  </CardDefault>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import UserProfile from '~/domains/profile/components/UserProfile/index.vue'
import WorkExperience from '~/domains/profile/components/WorkExperience/index.vue'
import AboutMe from '~/domains/profile/components/AboutMe/index.vue'

import Education from '~/domains/profile/components/Education/index.vue'
import Skills from '~/domains/profile/components/Skills/index.vue'
import Languages from '~/domains/profile/components/Languages/index.vue'
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
