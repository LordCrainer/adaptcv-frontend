<template>
  <v-row>
    <v-col cols="12" lg="4">
      <UserProfile />
    </v-col>
    <v-col class="d-flex flex-column ga-4">
      <AboutMe />
      <WorkExperience />
      <Education />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UserProfile from '~/modules/builder/components/user-profile/index.vue'
import WorkExperience from '~/modules/builder/components/work-experience/index.vue'
import AboutMe from '~/modules/builder/components/about-me/index.vue'
import Education from '~/modules/builder/components/education/index.vue'
import { useBuilderStore } from '../store/builder.store'
import type { IBuilder } from '@lordcrainer/adaptcv-shared-types'
import { useBuilder } from '../composables/useBuilder'

const builderStore = useBuilderStore()
const { hasChanges } = useObject()
const { builderState } = storeToRefs(builderStore)
const { getBuilderById, updateBuilder } = useBuilder()

const route = useRoute()
const builderId = ref(route.params.builderId)
const builderStateTemp = ref<IBuilder>()

const openDialog = ref(false)

onMounted(async () => {
  if (route.params.builderId) {
    await getBuilderById(route.params.builderId as string)
    builderStateTemp.value = { ...builderState.value }
  }
})

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    updateBuilder(builderId.value as string, builderState.value)
  }
})
</script>
