<template>
  <v-form @submit.prevent="submitForm">
    <div class="d-flex flex-column ga-2">
      <div class="d-flex ga-2">
        <v-autocomplete
          prepend-icon="mdi-magnify"
          density="comfortable"
          v-model="localSkills.skill"
          variant="underlined"
          class="flex-grow-1"
          clearable
          :items="SKILLS_LIST"
          :label="$t('profile.skills.skill')"
          :aria-label="$t('profile.skills.skill')"></v-autocomplete>

        <v-btn
          color="secondary"
          variant="flat"
          prepend-icon="mdi-plus"
          type="submit">
          {{ $t('actions.add') }}
        </v-btn>
      </div>

      <v-select
        prepend-icon="mdi-calendar"
        density="comfortable"
        v-model="localSkills.yearsOfExperience"
        :items="experienceOptions"
        variant="underlined"
        :item-title="(i) => i && $t(`profile.skills.${i}`)"
        :label="$t('profile.skills.yearsOfExperience')"
        :aria-label="$t('profile.skills.yearsOfExperience')"
        required></v-select>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import type { ISkill } from '~/domains/builder/shared/index'
import { useSkill } from './useSkill'

const { SKILLS_LIST, experienceOptions } = useSkill()

const DEFAULT_SKILL_ITEM: ISkill = {
  skill: '',
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
