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
          v-for="button in builderButtonsToolbar"
          :key="button.value"
          size="small"
          color="grey-darken-2"
          variant="text"
          v-tooltip:start="$t(button.value)"
          @click="button.action"
          icon
          v-bind="button.props">
          <v-icon>{{ button.icon }}</v-icon>
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

  <v-dialog
    v-model="openDialog"
    max-width="650px"
    transition="dialog-transition">
    <BuilderForm :title="$t('profile.title')" @close="close"></BuilderForm>
  </v-dialog>
</template>

<script setup lang="ts">
import UserProfile from '~/domains/builder/components/user-profile/index.vue'
import WorkExperience from '~/domains/builder/components/work-experience/index.vue'
import AboutMe from '~/domains/builder/components/about-me/index.vue'

import Education from '~/domains/builder/components/education/index.vue'
import BuilderToolbar from '../components/BuilderToolbar.vue'
import BuilderForm from '../components/BuilderForm.vue'

const route = useRoute()

const openDialog = ref(false)

function toggleView() {
  const builderId = route.params.builderId
  navigateTo(`/builder/${builderId}/preview`)
}

function close() {
  openDialog.value = false
}

const builderButtonsToolbar = [
  {
    icon: 'mdi-eye',
    value: 'preview',
    tooltip: 'Preview',
    action: () => {
      const builderId = route.params.builderId
      navigateTo(`/builder/${builderId}/preview`)
    },
    props: {}
  },
  {
    icon: 'mdi-content-save',
    tooltip: 'Save',
    value: 'save',
    action: () => {},
    props: {}
  },
  {
    icon: 'mdi-publish',
    value: 'publish',
    tooltip: 'Publish',
    action: () => {},
    props: {}
  },
  {
    icon: 'mdi-cog',
    value: 'settings',
    tooltip: 'Settings',
    action: () => {
      openDialog.value = true
    },
    props: {}
  }
]
</script>
