<template>
  <TabsDinamycs :tabs="tabs"></TabsDinamycs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserProfile from '~/features/profile/UserProfile/index.vue'
import WorkExperience from '~/features/profile/WorkExperience/index.vue'
import AboutMe from '~/features/profile/AboutMe/index.vue'

import Education from '~/features/profile/Education/index.vue'
import Skills from '@/features/profile/Skills/index.vue'
import Languages from '@/features/profile/Languages/index.vue'
import TabsDinamycs from '~/components/tabs/TabsDinamycs.vue'
import type { TabItem } from '~/types/global'

const tabs = ref<TabItem[]>([
  {
    title: 'Profile',
    label: 'personalInfo',
    component: markRaw(UserProfile),
    props: {}
  },
  {
    title: 'About Me',
    label: 'aboutMe',
    component: markRaw(AboutMe),
    props: {}
  },
  {
    title: 'Experience',
    label: 'experience',
    component: markRaw(WorkExperience),
    props: {}
  },
  {
    title: 'Education',
    label: 'education',
    component: markRaw(Education),
    props: {}
  },
  {
    title: 'Skills',
    label: 'skills',
    component: markRaw(Skills),
    props: {}
  },
  {
    title: 'Languages',
    label: 'languages',
    component: markRaw(Languages),
    props: {}
  }
])
</script>
