<template>
  <v-form @submit.prevent="submitForm">
    <v-card :title="title">
      <template v-slot:text>
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
              :item-title="(i) => $t(`profile.skills.${i}`)"
              label="Year Experiences"
              required></v-select>
          </v-col>

          <v-col cols="12">
            <v-combobox
              flat
              v-model="inputData.selectedSkills"
              :items="skillsList"
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
      </template>
      <slot name="actions">
        <v-card-actions class="">
          <v-btn variant="flat" @click="$emit('cancel')">
            {{ $t('actions.cancel') }}
          </v-btn>

          <v-btn text="Save" color="primary" variant="tonal" type="submit">
            {{ $t('actions.save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import type { ISkill, ISkillForm } from '~/features/profile'
import { useSkill } from './useSkill'

const { skillsList, toSkill } = useSkill()

const experienceOptions = [
  'less1year',
  '1to2years',
  '2to3years',
  '5to10years',
  '10plusyears'
]

const props = defineProps<{
  inputData: ISkillForm
  multiple?: boolean
  subtitle?: string
  title: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: ISkill[]): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const submitForm = () => {
  if (!props.inputData.selectedSkills) {
    emit('cancel')
    return
  }

  emit('submit', toSkill(props.inputData.selectedSkills))
  resetForm()
  emit('close')
}

const resetForm = () => {
  props.inputData.job = ''
  props.inputData.year_experiences = undefined
  props.inputData.selectedSkills = []
}
</script>
