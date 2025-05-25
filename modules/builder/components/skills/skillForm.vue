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
          :items="SKILLS_LIST"
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
        :items="EXPERIENCE_OPTIONS"
        :item-title="(i) => $t(`profile.skills.${i}`)"
        :item-value="(i) => i"
        variant="outlined"
        :label="$t('profile.skills.yearsOfExperience')"
        :aria-label="$t('profile.skills.yearsOfExperience')"
        required></v-select>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import type { ISkill } from '@lordcrainer/adaptcv-shared-types'
import { useSkill } from './useSkill'
const { t } = useI18n()

const { DEFAULT_SKILL_ITEM, EXPERIENCE_OPTIONS, SKILLS_LIST } = useSkill()

const props = defineProps({
  skill: {
    type: Object as () => ISkill,
    default: () => ({})
  }
})

const localSkills = ref<ISkill>({ ...props.skill })

watch(
  () => props.skill,
  (newSkill) => {
    localSkills.value = { ...newSkill }
  },
  { immediate: true }
)

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
