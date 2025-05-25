<template>
  <div class="d-flex flex-column ga-4">
    <div class="d-flex flex-wrap">
      <v-chip
        v-for="(item, index) in skills"
        :key="item.skill"
        class="ma-2 flex-grow-0"
        color="primary"
        closable
        @click="edit(item)"
        @click:close="removeSkill(index)">
        {{ item.skill }} ({{ $t(`profile.skills.${item.yearsOfExperience}`) }})
      </v-chip>
    </div>
    <div>
      <SkillForm :skill="selectedSkill" @submit="upsertSkill" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '@lordcrainer/adaptcv-shared-types'
import SkillForm from './skillForm.vue'
import { useSkill } from '~/modules/builder/components/skills/useSkill'

const {
  upsertSkill,
  skills,
  removeSkill,
  DEFAULT_SKILL_ITEM
} = useSkill()

const selectedSkill = ref<ISkill>({ ...DEFAULT_SKILL_ITEM })

function edit(skill: ISkill) {
  selectedSkill.value = skill
}
</script>
