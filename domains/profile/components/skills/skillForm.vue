<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex ga-2 align-start pa-2">
      <v-autocomplete
        v-model="localSkills.skill"
        variant="outlined"
        class="flex-grow-1"
        clearable
        :items="SKILLS_LIST"
        :label="$t('profile.skills.skill')"></v-autocomplete>

      <v-select
        v-model="localSkills.yearsOfExperience"
        :items="experienceOptions"
        variant="outlined"
        :item-title="(i) => i && $t(`profile.skills.${i}`)"
        :label="$t('profile.skills.yearsOfExperience')"
        required></v-select>

      <v-btn
        color="primary"
        variant="tonal"
        rounded
        size="large"
        icon="mdi-plus"
        type="submit"></v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import type { ISkill } from '~/domains/profile/shared/index'
import { useSkill } from './useSkill'

const { SKILLS_LIST, experienceOptions } = useSkill()

const DEFAULT_SKILL_ITEM: ISkill = {
  skill: '',
  yearsOfExperience: 'less1year'
}

const localSkills = ref<ISkill>(DEFAULT_SKILL_ITEM)

const emit = defineEmits(['submit'])

const submitForm = () => {
  if (localSkills.value?.skill) {
    emit('submit', { ...localSkills.value })
    _reset()
  }
}

const _reset = () => {
  localSkills.value = DEFAULT_SKILL_ITEM
}
</script>
