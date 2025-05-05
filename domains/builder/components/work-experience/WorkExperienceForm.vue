<template>
  <v-form @submit.prevent="submitForm">
    <v-card :title="title">
      <v-row class="pa-4">
        <v-col cols="12" md="6" class="py-1">
          <v-text-field
            icon-color="primary"
            prepend-inner-icon="mdi-briefcase"
            v-model="localExperiencie.jobTitle"
            variant="outlined"
            :label="$t('profile.experience.jobTitle')"
            placeholder="Ej: Software Engineer"
            aria-label="Job Title"
            required></v-text-field>
        </v-col>
        <v-col md="6" class="py-1">
          <v-text-field
            icon-color="primary"
            prepend-inner-icon="mdi-office-building"
            v-model="localExperiencie.company"
            :label="$t('profile.experience.company')"
            variant="outlined"
            placeholder="Ej: Tech Company"
            aria-label="Company"
            required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col md="6">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-text-field
                    icon-color="primary"
                    prepend-inner-icon="mdi-calendar"
                    :value="localExperiencie.startDate"
                    :placeholder="standardFormatDate(new Date())"
                    variant="outlined"
                    v-bind="props"
                    aria-label="Start Date"></v-text-field>
                </template>
                <v-date-picker
                  v-model="localExperiencie.startDate"
                  show-adjacent-months></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="6">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-text-field
                    icon-color="primary"
                    prepend-inner-icon="mdi-calendar"
                    :value="localExperiencie.endDate"
                    :placeholder="standardFormatDate(addYearToDate(new Date()))"
                    variant="outlined"
                    v-bind="props"
                    aria-label="End Date"></v-text-field>
                </template>
                <v-date-picker
                  v-model="localExperiencie.endDate"
                  show-adjacent-months></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex flex-column py-1 ga-2">
          <div>
            <h3>{{ $t('profile.experience.description') }}</h3>
          </div>
          <ClientOnly>
            <DragonEditor ref="$editor" />
          </ClientOnly>
        </v-col>
      </v-row>
      <slot name="actions">
        <v-card-actions class="pb-4 px-4">
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
import type { IWorkExperience } from '~/domains/builder/shared'
import { useFormatDate } from '~/composables/useFormatDate'

const { standardFormatDate, addYearToDate } = useFormatDate()

const props = defineProps<{
  title: string
  modelValue: IWorkExperience | null
}>()

const $editor = ref<DragonEditor>()

const DEFAULT_ITEM: IWorkExperience = {
  id: '',
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  description: {} as DEContentData
}

const localExperiencie = computed({
  get: () => props.modelValue || { ...DEFAULT_ITEM },
  set: (value) => {
    localExperiencie.value = {
      ...localExperiencie.value,
      startDate: standardFormatDate(value.startDate),
      endDate: standardFormatDate(value.endDate)
    }
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localExperiencie.value = {
        ...newVal,
        startDate: standardFormatDate(newVal.startDate),
        endDate: standardFormatDate(newVal.endDate)
      }
      $editor.value?.setContentData(newVal.description)
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['submit', 'cancel', 'close'])

const submitForm = () => {
  if (localExperiencie.value.company && localExperiencie.value.jobTitle) {
    emit('submit', {
      ...localExperiencie.value,
      description: $editor.value?.getContentData()
    })
    emit('close')
  }
}
</script>
