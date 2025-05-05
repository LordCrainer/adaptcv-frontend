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
              <v-menu
                v-model="stateMenu.startDate"
                :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    icon-color="primary"
                    prepend-inner-icon="mdi-calendar"
                    :value="standardFormatDate(localExperiencie.startDate)"
                    :label="$t('common.startDate')"
                    :active="true"
                    :placeholder="standardFormatDate(new Date())"
                    variant="outlined"
                    v-bind="props"
                    aria-label="Start Date"></v-text-field>
                </template>
                <v-date-picker
                  v-model="localExperiencie.startDate"
                  @update:modelValue="stateMenu.startDate = false"
                  show-adjacent-months></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="6">
              <v-menu
                v-model="stateMenu.endDate"
                :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    icon-color="primary"
                    prepend-inner-icon="mdi-calendar"
                    :value="standardFormatDate(localExperiencie.endDate)"
                    :label="$t('common.endDate')"
                    :active="true"
                    :placeholder="standardFormatDate(addYearToDate(new Date()))"
                    variant="outlined"
                    v-bind="props"
                    aria-label="End Date"></v-text-field>
                </template>
                <v-date-picker
                  v-model="localExperiencie.endDate"
                  :allowed-dates="allowedDates"
                  @update:modelValue="stateMenu.endDate = false"
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

const stateMenu = ref({
  startDate: false,
  endDate: false
})

const localExperiencie = computed({
  get: () => props.modelValue || { ...DEFAULT_ITEM },
  set: (value) => {
    localExperiencie.value = value
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localExperiencie.value = newVal
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['submit', 'cancel', 'close'])

const allowedDates = (date: unknown) =>
  date instanceof Date && date >= new Date(localExperiencie.value.startDate)

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
