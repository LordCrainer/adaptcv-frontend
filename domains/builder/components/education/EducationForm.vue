<template>
  <v-form @submit.prevent="submitForm">
    <v-card :title="title">
      <div class="d-flex flex-column pa-4 ga-4">
        <v-autocomplete
          v-model="localEducation.degree"
          variant="outlined"
          :items="degreeOptions"
          :placeholder="$t('profile.education.degreePlaceholder')"
          clearable
          active
          :item-title="(i: string) => i && $t(`profile.education.${i}`)"
          :label="$t('profile.education.degree')"
          aria-label="Degree"
          required></v-autocomplete>

        <v-text-field
          v-model="localEducation.fieldOfStudy"
          :label="$t('profile.education.fieldOfStudy')"
          placeholder="Computer Science"
          variant="outlined"
          active
          aria-label="Field of Study"
          required></v-text-field>

        <v-text-field
          v-model="localEducation.institution"
          :label="$t('profile.education.institution')"
          variant="outlined"
          active
          placeholder="University of Example"
          aria-label="Institution"
          required></v-text-field>

        <div class="d-flex flex-row ga-4">
          <v-menu v-model="stateMenu.startDate" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                icon-color="primary"
                prepend-inner-icon="mdi-calendar"
                :value="standardFormatDate(localEducation.startDate)"
                :label="$t('common.startDate')"
                :placeholder="standardFormatDate(new Date())"
                variant="outlined"
                active
                v-bind="props"
                aria-label="Start Date"></v-text-field>
            </template>
            <v-date-picker
              v-model="localEducation.startDate"
              @update:modelValue="stateMenu.startDate = false"
              show-adjacent-months></v-date-picker>
          </v-menu>

          <v-menu v-model="stateMenu.endDate" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                icon-color="primary"
                prepend-inner-icon="mdi-calendar"
                :value="standardFormatDate(localEducation.endDate)"
                :label="$t('common.endDate')"
                :placeholder="standardFormatDate(addYearToDate(new Date()))"
                variant="outlined"
                v-bind="props"
                active
                aria-label="End Date"></v-text-field>
            </template>
            <v-date-picker
              v-model="localEducation.endDate"
              :allowed-dates="
                (date) => allowedDates(date, localEducation.startDate)
              "
              @update:modelValue="stateMenu.endDate = false"
              show-adjacent-months></v-date-picker>
          </v-menu>
        </div>
      </div>
      <slot name="actions">
        <v-card-actions>
          <v-btn variant="flat" @click="$emit('cancel')" aria-label="Cancel">
            {{ $t('actions.cancel') }}
          </v-btn>

          <v-btn
            text="Save"
            color="primary"
            variant="tonal"
            type="submit"
            aria-label="Save">
            {{ $t('actions.save') }}
          </v-btn>
        </v-card-actions>
      </slot>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Degree, IEducationItem } from '~/domains/builder/shared/index'
import { useFormatDate } from '~/composables/useFormatDate'

const { standardFormatDate, allowedDates, addYearToDate } = useFormatDate()

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

const stateMenu = ref({
  startDate: false,
  endDate: false
})

const localEducation = ref<IEducationItem>({ ...props.inputData })

watch(
  () => props.inputData,
  (newVal) => {
    localEducation.value = { ...newVal }
  },
  { deep: true, immediate: true }
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
