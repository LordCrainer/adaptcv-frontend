<template>
  <TabsDinamycs :items="tabs"></TabsDinamycs>
</template>

<script setup>
import { ref } from 'vue'
import UserProfile from '~/features/profile/UserProfile/index.vue'
import WorkExperience from '~/features/profile/WorkExperience/index.vue'

import Education from '~/features/profile/Education/index.vue'
import Skills from '@/features/profile/Skills/index.vue'
import Languages from '@/features/profile/Languages/index.vue'
import TabsDinamycs from '~/components/tabs/TabsDinamycs.vue'

const tabs = ref([
  {
    title: 'Profile',
    value: 'profile',
    component: markRaw(UserProfile),
    props: {}
  },
  {
    title: 'Experience',
    value: 'experience',
    component: markRaw(WorkExperience),
    props: {}
  },
  {
    title: 'Education',
    value: 'education',
    component: markRaw(Education),
    props: {}
  },
  {
    title: 'Skills',
    value: 'skills',
    component: markRaw(Skills),
    props: {}
  },
  {
    title: 'Languages',
    value: 'languages',
    component: markRaw(Languages),
    props: {}
  }
])
</script>
