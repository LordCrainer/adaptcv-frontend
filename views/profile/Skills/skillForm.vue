<template>
  <v-card :subtitle="subtitle" :title="title">
    <template v-slot:text>
      <v-form @submit.prevent="$emit('submit')">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="inputData.job"
              variant="outlined"
              label="Job"
              placeholder="Ej: My Project"
              required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              variant="outlined"
              v-model="inputData.year_experiences"
              :items="experienceOptions"
              label="Year Experiences"
              required></v-select>
          </v-col>

          <v-col cols="12">
            <v-combobox
              flat
              v-model="inputData.selectedSkills"
              :items="skillList"
              label="Skills"
              prepend-inner-icon="mdi-filter-variant"
              variant="outlined"
              chips
              clearable
              closable-chips
              :multiple="multiple">
              <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props">
                  <strong>{{ item.raw }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
      </v-form>
    </template>
    <slot name="actions">
      <v-card-actions class="">
        <v-btn
          text="Cancel"
          variant="flat"
          @click="$emit('cancel')"></v-btn>

        <v-btn
          text="Save"
          color="primary"
          variant="tonal"
          @click="submitForm"></v-btn>
      </v-card-actions>
    </slot>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ISkillForm } from '..'

const skillList = ref([
  'JavaScript',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Swift',
  'Kotlin',
  'TypeScript',
  'HTML',
  'CSS',
  'SQL'
])

const experienceOptions = [
  'less than 1 year',
  '1 - 2 years',
  '2 - 3 years',
  '3 - 5 years',
  '5 - 10 years',
  '10+ years'
]

const props = defineProps<{
  inputData: ISkillForm
  multiple?: boolean
  subtitle?: string
  title: string
}>()
const emit = defineEmits(['submit', 'cancel'])

const submitForm = () => {
  const skills = Array.isArray(props.inputData.selectedSkills)
    ? props.inputData.selectedSkills
    : [props.inputData.selectedSkills]

  const output = {
    ...props.inputData,
    selectedSkills: skills
  }
  emit('submit', output)
}
</script>
