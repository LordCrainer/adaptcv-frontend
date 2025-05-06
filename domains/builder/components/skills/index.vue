<template>
  <div class="d-flex flex-column ga-4">
    <div class="d-flex flex-wrap">
      <v-chip
        v-for="(item, index) in skills"
        :key="item.skill"
        class="ma-2 flex-grow-0"
        color="primary"
        closable
        @click:close="removeSkill(index)">
        {{ item.skill }} ({{ item.yearsOfExperience }})
      </v-chip>
    </div>
    <div>
      <SkillForm @submit="upsertSkill" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillForm from './skillForm.vue'
import { useSkill } from '~/domains/builder/components/skills/useSkill'

const { upsertSkill, skills, removeSkill } = useSkill()
</script>
