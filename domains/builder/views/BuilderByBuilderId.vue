<template>
  <div class="d-flex ga-4">
    <div class="d-flex flex-grow-0">
      <UserProfile />
    </div>
    <div class="d-flex flex-grow-1 flex-column ga-4">
      <AboutMe />
      <WorkExperience />
      <Education />
      <Skills />
      <Languages />
    </div>
    <!-- <div v-for="section in sections" :key="section.translationKey">
      <component
        :is="section.component"
        v-bind="section.props"
        :data="cvStore.curriculumVitae[section.id]"
        @update="
          (newData: any) => handleUpdate(section.id, newData)
        "></component>
    </div> -->
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

const cvStore = useCVStore()

function handleUpdate(section: Sections, newData: any) {
  cvStore.updateSection(section, newData)
}

const sections = ref<TabItem<Sections>[]>([
  {
    id: 'userProfile',
    title: 'Profile',
    translationKey: 'profile.personalInfo.title',
    component: markRaw(UserProfile),
    props: {}
  },
  {
    id: 'aboutMe',
    title: 'About Me',
    translationKey: 'profile.aboutMe.title',
    component: markRaw(AboutMe),
    props: {}
  },
  {
    id: 'workExperience',
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
