<template>
  <v-form @submit.prevent="submitForm">
    <v-card :title="title">
      <div class="d-flex flex-column px-4">
        <v-autocomplete
          v-model="localEducation.degree"
          variant="outlined"
          :items="degreeOptions"
          clearable
          :item-title="(i: string) => i && $t(`profile.education.${i}`)"
          :label="$t('profile.education.degree')"
          aria-label="Degree"
          required></v-autocomplete>

        <v-text-field
          v-model="localEducation.fieldOfStudy"
          :label="$t('profile.education.fieldOfStudy')"
          variant="outlined"
          aria-label="Field of Study"
          required></v-text-field>

        <v-text-field
          v-model="localEducation.institution"
          :label="$t('profile.education.institution')"
          variant="outlined"
          aria-label="Institution"
          required></v-text-field>

        <div class="d-flex flex-row ga-4">
          <v-text-field
            v-model="localEducation.startDate"
            :label="$t('profile.common.startDate')"
            variant="outlined"
            type="date"
            aria-label="Start Date"></v-text-field>

          <v-text-field
            v-model="localEducation.endDate"
            :label="$t('profile.common.endDate')"
            variant="outlined"
            type="date"
            aria-label="End Date"></v-text-field>
        </div>
      </div>
      <slot name="actions">
        <v-card-actions>
          <v-btn variant="flat" @click="$emit('cancel')" aria-label="Cancel">
            {{ $t('actions.cancel') }}
          </v-btn>

          <v-btn text="Save" color="primary" variant="tonal" type="submit" aria-label="Save">
            {{ $t('actions.save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Degree, IEducationItem } from '~/domains/profile/shared/index'

const props = defineProps<{
  title: string
  inputData: IEducationItem
}>()

const DEFAULT_ITEM: IEducationItem = {
  id: '',
  degree: undefined,
  institution: '',
  startDate: '',
  endDate: '',
  fieldOfStudy: ''
}

const localEducation = ref<IEducationItem>({ ...props.inputData })

watch(
  () => props.inputData,
  (newVal) => {
    localEducation.value = { ...newVal }
  },
  { deep: true }
)

const emit = defineEmits(['submit', 'cancel', 'close'])

const degreeOptions = ref<Degree[]>([
  'secondary',
  'highSchool',
  'technical',
  'undergraduate',
  'graduate',
  'masters',
  'doctorate'
])

const submitForm = () => {
  if (localEducation.value.degree && localEducation.value.institution) {
    emit('submit', { ...localEducation.value })
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  Object.assign(localEducation.value, DEFAULT_ITEM)
}
</script>
