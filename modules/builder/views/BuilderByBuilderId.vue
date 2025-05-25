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
    <BuilderForm
      :title="$t('profile.title')"
      @submit="handleSubmit"
      @close="close"></BuilderForm>
  </v-dialog>
</template>

<script setup lang="ts">
import UserProfile from '~/domains/builder/components/user-profile/index.vue'
import WorkExperience from '~/domains/builder/components/work-experience/index.vue'
import AboutMe from '~/domains/builder/components/about-me/index.vue'

import Education from '~/domains/builder/components/education/index.vue'
import BuilderToolbar from '../components/BuilderToolbar.vue'
import BuilderForm from '../components/BuilderForm.vue'
import { useBuilderStore } from '../store/builder.store'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'

const builderStore = useBuilderStore()
const { hasChanges } = useObject()
const { builderState } = storeToRefs(builderStore)

const route = useRoute()
const builderId = ref(route.params.builderId)
const builderStateTemp = ref<IBuilder>()

const openDialog = ref(false)

function close() {
  openDialog.value = false
}

function handleSubmit() {
  openDialog.value = false
}

const builderButtonsToolbar = [
  {
    icon: 'mdi-eye',
    value: 'actions.preview',
    tooltip: 'Preview',
    action: () => {
      navigateTo(`/builder/${builderId.value}/preview`)
    },
    props: {}
  },
  {
    icon: 'mdi-content-save',
    tooltip: 'Save',
    value: 'actions.save',
    action: async () => {
      await builderStore.saveByBuilderId(builderId.value as string)
    },
    props: {}
  },
  {
    icon: 'mdi-publish',
    value: 'actions.publish',
    tooltip: 'Publish',
    action: () => {},
    props: {}
  },
  {
    icon: 'mdi-cog',
    value: 'actions.settings',
    tooltip: 'Settings',
    action: () => {
      openDialog.value = true
    },
    props: {}
  }
]

onMounted(async () => {
  if (route.params.builderId) {
    await builderStore.getBuilder(route.params.builderId as string)
    builderStateTemp.value = { ...builderState.value }
  }
})

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    builderStore.saveByBuilderId(builderId.value as string)
  }
})
</script>
