<template>
  <v-row>
    <v-col cols="12" lg="4">
      <CardDefault
        :title="$t('profile.personalInfo.title')"
        style="min-width: 300px">
        <v-text-field
          v-model="builderState.name"
          @blur="onNameBlur"
          density="comfortable"
          prepend-inner-icon="mdi-text"
          :label="$t('profile.namePlaceholder')"
          :placeholder="$t('profile.namePlaceholder')"
          variant="outlined"
          required />
        <UserProfile />
      </CardDefault>
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
import CardDefault from '~/components/card/CardDefault.vue'

const builderStore = useBuilderStore()
const { hasChanges } = useObject()
const { builderState } = storeToRefs(builderStore)
const { getBuilderById, updateBuilder, updateSection } = useBuilder()

const route = useRoute()
const builderId = ref(route.params.builderId)
const builderStateTemp = ref<IBuilder>()

function onNameBlur() {
  if (
    builderStateTemp.value &&
    builderStateTemp.value.name !== builderState.value.name
  ) {
    updateBuilder(builderId.value as string, {
      name: builderState.value.name
    })
    // sync temp state
    builderStateTemp.value = { ...builderState.value }
  }
}

onMounted(async () => {
  const builderId = route.params.builderId
  if (builderId && typeof builderId === 'string') {
    await getBuilderById(builderId)
    builderStateTemp.value = { ...builderState.value }
  }
})

onUnmounted(() => {
  if (hasChanges(builderState.value, builderStateTemp.value)) {
    const id = builderId.value
    if (id && typeof id === 'string') {
      updateBuilder(id, builderState.value)
    }
  }
})
</script>
