<template>
  <v-form>
    <v-row class="pa-4">
      <v-col cols="12" md="6" class="py-1">
        <v-text-field
          icon-color="primary"
          prepend-inner-icon="mdi-briefcase"
          v-model="localExperiencie.jobTitle"
          active
          variant="outlined"
          :label="$t('profile.experience.jobTitle')"
          placeholder="Software Engineer"
          aria-label="Job Title"
          required></v-text-field>
      </v-col>
      <v-col md="6" class="py-1">
        <v-text-field
          icon-color="primary"
          active
          prepend-inner-icon="mdi-office-building"
          v-model="localExperiencie.company"
          :label="$t('profile.experience.company')"
          variant="outlined"
          placeholder="Tech Company"
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
                  active
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
            <v-menu v-model="stateMenu.endDate" :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-text-field
                  icon-color="primary"
                  prepend-inner-icon="mdi-calendar"
                  :value="standardFormatDate(localExperiencie.endDate)"
                  :label="$t('common.endDate')"
                  active
                  :placeholder="standardFormatDate(addYearToDate(new Date()))"
                  variant="outlined"
                  v-bind="props"
                  aria-label="End Date"></v-text-field>
              </template>
              <v-date-picker
                v-model="localExperiencie.endDate"
                :allowed-dates="
                  (date) => allowedDates(date, localExperiencie.startDate)
                "
                @update:modelValue="stateMenu.endDate = false"
                show-adjacent-months></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
  <v-col cols="12" class="d-flex flex-column py-1 ga-2">
    <div class="d-flex align-center justify-space-between">
      <h3>{{ $t('profile.experience.description') }}</h3>
      <v-btn
        variant="text"
        color="primary"
        density="comfortable"
        href="https://tiptap.dev/docs/editor/core-concepts/keyboard-shortcuts"
        target="_blank"
        icon="mdi-information"></v-btn>
    </div>
    <Editor v-model="localExperiencie.description" class="editor-container" />
  </v-col>
  <v-card-actions class="d-flex justify-end">
    <v-btn variant="flat" aria-label="Cancel" @click="emit('cancel')">
      {{ $t('actions.cancel') }}
    </v-btn>

    <v-btn
      text="Save"
      color="primary"
      variant="tonal"
      aria-label="Save"
      @click="submitForm">
      {{ $t('actions.save') }}
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFormatDate } from '~/composables/useFormatDate'
import useWorkExperience from './useWorkExperience'
import Editor from '~/components/Editor/Editor.vue'
import type { IWorkExperience } from '@lordcrainer/adaptcv-shared-types'

const { DEFAULT_ITEM } = useWorkExperience()
const { standardFormatDate, addYearToDate, allowedDates } = useFormatDate()

const props = defineProps<{
  modelValue: IWorkExperience
}>()

const stateMenu = ref({
  startDate: false,
  endDate: false
})

const localExperiencie = ref<IWorkExperience>({
  ...DEFAULT_ITEM,
  ...props.modelValue
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localExperiencie.value = { ...newVal }
    }
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['submit', 'cancel', 'close'])

const submitForm = () => {
  if (localExperiencie.value.company && localExperiencie.value.jobTitle) {
    emit('submit', {
      ...localExperiencie.value
    })
  }
}
</script>
<style scoped>
.editor-container {
  height: 300px;
}
</style>
