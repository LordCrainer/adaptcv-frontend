<template>
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
import UserProfile from '~/modules/builder/components/user-profile/index.vue'
import WorkExperience from '~/modules/builder/components/work-experience/index.vue'
import AboutMe from '~/modules/builder/components/about-me/index.vue'
import Education from '~/modules/builder/components/education/index.vue'
import BuilderForm from '../components/BuilderForm.vue'
import { useBuilderStore } from '../store/builder.store'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { useBuilderWrapper } from '../composables/useBuilderWrapper'

const builderStore = useBuilderStore()
const { hasChanges } = useObject()
const { builderState } = storeToRefs(builderStore)
const useBuilder = useBuilderWrapper()

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

onMounted(async () => {
  if (route.params.builderId) {
    await useBuilder.getBuilderById(route.params.builderId as string)
    builderStateTemp.value = { ...builderState.value }
  }
})

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    useBuilder.updateBuilder(builderId.value as string, builderState.value)
  }
})
</script>
