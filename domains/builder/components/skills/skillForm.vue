<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex flex-column ga-2">
      <div class="d-flex ga-2">
        <v-autocomplete
          prepend-inner-icon="mdi-magnify"
          icon-color="primary"
          density="comfortable"
          v-model="localSkills.skill"
          variant="outlined"
          class="flex-grow-1"
          clearable
          :items="skillList"
          active
          :placeholder="$t('profile.skills.placeholderSkill')"
          :label="$t('profile.skills.skill')"
          :aria-label="$t('profile.skills.skill')"></v-autocomplete>

        <v-btn
          color="secondary"
          variant="flat"
          rounded
          aria-label="Add Skill"
          icon="mdi-plus"
          type="submit"></v-btn>
      </div>

      <v-select
        prepend-inner-icon="mdi-timeline-clock"
        icon-color="primary"
        density="comfortable"
        v-model="localSkills.yearsOfExperience"
        :items="experienceOptions"
        variant="outlined"
        :item-title="(i) => i && $t(`profile.skills.${i}`)"
        :label="$t('profile.skills.yearsOfExperience')"
        :aria-label="$t('profile.skills.yearsOfExperience')"
        required></v-select>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import type { ISkill } from '@lordcrainer/adaptcv-shared-types'

defineProps({
  experienceOptions: {
    type: Array,
    default: () => []
  },
  skillList: {
    type: Array,
    default: () => []
  }
})

const DEFAULT_SKILL_ITEM: ISkill = {
  skill: undefined,
  yearsOfExperience: 'less1year'
}

const localSkills = ref<ISkill>({ ...DEFAULT_SKILL_ITEM })

const emit = defineEmits(['submit'])

const submitForm = () => {
  if (localSkills.value?.skill) {
    emit('submit', { ...localSkills.value })
    _reset()
  }
}

const _reset = () => {
  localSkills.value = { ...DEFAULT_SKILL_ITEM }
}
</script>
